import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";

export interface SavedEstimate {
  id: string;
  userId: string;
  name: string;
  date: string;
  selections: Record<string, string>;
  totalCost: number;
  notes: string;
  selectedServices: string[];
}

import { dbGetEstimates, dbInsertEstimate, dbDeleteEstimate } from "../config/supabase";

export const EstimatesController = {
  async getEstimates(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const allEstimates = await dbGetEstimates();

      // Filter estimates belonging to the authenticated client, or let staff see all
      const userEstimates = req.user.role === "staff"
        ? allEstimates
        : allEstimates.filter((est) => est.userId === req.user?.id);

      res.json(userEstimates);
    } catch (err: any) {
      console.error("getEstimates controller error:", err);
      res.status(500).json({ message: "Internal server error fetching estimates" });
    }
  },

  async createEstimate(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const { name, selections, totalCost, notes, selectedServices } = req.body;

      if (!name || !selections || totalCost === undefined) {
        res.status(400).json({ message: "Name, selections, and total cost are required" });
        return;
      }

      const newEstimate: SavedEstimate = {
        id: "est_" + Date.now(),
        userId: req.user.id,
        name,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        selections,
        totalCost,
        notes: notes || "Custom estimator configuration",
        selectedServices: selectedServices || []
      };

      const created = await dbInsertEstimate(newEstimate);
      res.status(211).json(created);
    } catch (err: any) {
      console.error("createEstimate controller error:", err);
      res.status(500).json({ message: "Internal server error creating estimate" });
    }
  },

  async deleteEstimate(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const { id } = req.params;
      const allEstimates = await dbGetEstimates();
      const est = allEstimates.find((e) => e.id === id);

      if (!est) {
        res.status(444).json({ message: "Estimate not found" });
        return;
      }

      // Security check: must own the estimate or be staff
      if (req.user.role !== "staff" && est.userId !== req.user.id) {
        res.status(403).json({ message: "You do not have permission to delete this estimate" });
        return;
      }

      await dbDeleteEstimate(id);
      res.json({ message: "Estimate deleted successfully" });
    } catch (err: any) {
      console.error("deleteEstimate controller error:", err);
      res.status(500).json({ message: "Internal server error deleting estimate" });
    }
  }
};
