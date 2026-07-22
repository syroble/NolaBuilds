import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";
import { AuthenticatedRequest } from "../middleware/auth";

import { dbGetUserByEmail, dbGetUserById, dbInsertUser, dbUpdateUser, dbGetUserByUid } from "../config/supabase";
import { firebaseAdminAuth } from "../config/firebase-admin";

export const AuthController = {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
      }

      const user = await dbGetUserByEmail(email);

      if (!user || user.password !== password) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name, role: user.role },
        ENV.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          leadData: user.leadData,
          token
        }
      });
    } catch (err: any) {
      console.error("Login controller error:", err);
      res.status(500).json({ message: "Internal server error during login" });
    }
  },

  async signup(req: Request, res: Response) {
    try {
      const { 
        name, 
        email, 
        password, 
        address, 
        timeline, 
        budgetRange, 
        description,
        ownershipStatus,
        neighborhood,
        yearBuilt,
        propertySize,
        image,
        renovationInterests
      } = req.body;

      if (!name || !email || !password) {
        res.status(400).json({ message: "Name, email, and password are required" });
        return;
      }

      const exists = await dbGetUserByEmail(email);
      if (exists) {
        res.status(400).json({ message: "A user with this email already exists" });
        return;
      }

      const newUser = {
        id: "user_" + Date.now(),
        name,
        email: email.toLowerCase(),
        password,
        role: "client" as const,
        leadData: address ? { 
          address, 
          timeline, 
          budgetRange, 
          description,
          ownershipStatus,
          neighborhood,
          yearBuilt,
          propertySize,
          image,
          renovationInterests
        } : null
      };

      const createdUser = await dbInsertUser(newUser);

      const token = jwt.sign(
        { id: createdUser.id, email: createdUser.email, name: createdUser.name, role: createdUser.role },
        ENV.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.status(211).json({
        user: {
          id: createdUser.id,
          name: createdUser.name,
          email: createdUser.email,
          role: createdUser.role,
          leadData: createdUser.leadData,
          token
        }
      });
    } catch (err: any) {
      console.error("Signup controller error:", err);
      res.status(500).json({ message: "Internal server error during registration" });
    }
  },

  async getProfile(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const user = await dbGetUserById(req.user.id);
      if (!user) {
        res.status(444).json({ message: "User not found" });
        return;
      }

      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        leadData: user.leadData
      });
    } catch (err: any) {
      console.error("GetProfile controller error:", err);
      res.status(500).json({ message: "Internal server error fetching profile" });
    }
  },

  async updateProfile(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const { 
        name, 
        email, 
        address, 
        timeline, 
        budgetRange, 
        description,
        ownershipStatus,
        neighborhood,
        yearBuilt,
        propertySize,
        image,
        renovationInterests
      } = req.body;

      const user = await dbGetUserById(req.user.id);
      if (!user) {
        res.status(444).json({ message: "User not found" });
        return;
      }

      const leadData = user.role === "client" ? {
        address: address !== undefined ? address : (user.leadData?.address || ""),
        timeline: timeline !== undefined ? timeline : (user.leadData?.timeline || ""),
        budgetRange: budgetRange !== undefined ? budgetRange : (user.leadData?.budgetRange || ""),
        description: description !== undefined ? description : (user.leadData?.description || ""),
        ownershipStatus: ownershipStatus !== undefined ? ownershipStatus : (user.leadData?.ownershipStatus || ""),
        neighborhood: neighborhood !== undefined ? neighborhood : (user.leadData?.neighborhood || ""),
        yearBuilt: yearBuilt !== undefined ? yearBuilt : (user.leadData?.yearBuilt || ""),
        propertySize: propertySize !== undefined ? propertySize : (user.leadData?.propertySize || ""),
        image: image !== undefined ? image : (user.leadData?.image || ""),
        renovationInterests: renovationInterests !== undefined ? renovationInterests : (user.leadData?.renovationInterests || [])
      } : null;

      const updatedUser = await dbUpdateUser(req.user.id, {
        name: name || user.name,
        email: email || user.email,
        leadData
      });

      if (!updatedUser) {
        res.status(444).json({ message: "User not found for update" });
        return;
      }

      res.json({
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        leadData: updatedUser.leadData
      });
    } catch (err: any) {
      console.error("UpdateProfile controller error:", err);
      res.status(500).json({ message: "Internal server error updating profile" });
    }
  },

  async firebaseLogin(req: Request, res: Response) {
    try {
      const { idToken } = req.body;

      if (!idToken) {
        res.status(400).json({ message: "idToken is required" });
        return;
      }

      let decodedToken;
      try {
        decodedToken = await firebaseAdminAuth.verifyIdToken(idToken);
      } catch (tokenErr: any) {
        console.error("Firebase ID Token verification failed:", tokenErr);
        res.status(401).json({ message: "Invalid or expired Firebase ID Token" });
        return;
      }

      const { uid, email, name } = decodedToken;
      if (!email) {
        res.status(400).json({ message: "Firebase user must have an email address" });
        return;
      }

      let user = await dbGetUserByUid(uid);

      if (!user) {
        user = await dbGetUserByEmail(email);
        if (user) {
          const updated = await dbUpdateUser(user.id, { uid });
          if (updated) {
            user = {
              ...user,
              uid
            };
          }
        }
      }

      if (!user) {
        const newUser = {
          id: `user_fb_${uid.substring(0, 15)}_${Date.now().toString().slice(-4)}`,
          uid,
          name: name || email.split("@")[0],
          email: email.toLowerCase(),
          role: "client" as const,
          leadData: null
        };
        user = await dbInsertUser(newUser);
      }

      const localToken = jwt.sign(
        { id: user.id, email: user.email, name: user.name, role: user.role },
        ENV.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        user: {
          id: user.id,
          uid: user.uid,
          name: user.name,
          email: user.email,
          role: user.role,
          leadData: user.leadData,
          token: localToken
        }
      });
    } catch (err: any) {
      console.error("Firebase login controller error:", err);
      res.status(500).json({ message: "Internal server error during Firebase login" });
    }
  }
};
