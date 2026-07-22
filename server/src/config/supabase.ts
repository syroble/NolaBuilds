import { eq } from "drizzle-orm";
import { db } from "../db/index.ts";
import { users, estimates, leads, projects, events } from "../db/schema.ts";

// Centralized default seed data to populate database if empty
import { USERS_DB, ESTIMATES_DB, LEADS_DB, PROJECTS_DB, CALENDAR_DB } from "../db/seedData.ts";

export const supabase = null;

// ==========================================
// Database Adapters (Cloud SQL with Drizzle ORM)
// ==========================================

export async function dbGetUsers() {
  try {
    const results = await db.select().from(users);
    return results.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      password: u.password || "",
      role: u.role as "client" | "staff",
      leadData: u.leadData as any
    }));
  } catch (error) {
    console.error("Database query dbGetUsers failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

export async function dbGetUserByEmail(email: string) {
  try {
    const results = await db.select().from(users).where(eq(users.email, email.toLowerCase()));
    if (results.length > 0) {
      const u = results[0];
      return {
        id: u.id,
        uid: u.uid,
        name: u.name,
        email: u.email,
        password: u.password || "",
        role: u.role as "client" | "staff",
        leadData: u.leadData as any
      };
    }
    return undefined;
  } catch (error) {
    console.error("Database query dbGetUserByEmail failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

export async function dbGetUserByUid(uid: string) {
  try {
    const results = await db.select().from(users).where(eq(users.uid, uid));
    if (results.length > 0) {
      const u = results[0];
      return {
        id: u.id,
        uid: u.uid,
        name: u.name,
        email: u.email,
        password: u.password || "",
        role: u.role as "client" | "staff",
        leadData: u.leadData as any
      };
    }
    return undefined;
  } catch (error) {
    console.error("Database query dbGetUserByUid failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

export async function dbGetUserById(id: string) {
  try {
    const results = await db.select().from(users).where(eq(users.id, id));
    if (results.length > 0) {
      const u = results[0];
      return {
        id: u.id,
        name: u.name,
        email: u.email,
        password: u.password || "",
        role: u.role as "client" | "staff",
        leadData: u.leadData as any
      };
    }
    return undefined;
  } catch (error) {
    console.error("Database query dbGetUserById failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

export async function dbInsertUser(user: any) {
  try {
    const result = await db.insert(users).values({
      id: user.id,
      uid: user.uid || null,
      name: user.name,
      email: user.email.toLowerCase(),
      password: user.password,
      role: user.role,
      leadData: user.leadData
    }).returning();
    const u = result[0];
    return {
      id: u.id,
      uid: u.uid,
      name: u.name,
      email: u.email,
      password: u.password || "",
      role: u.role as "client" | "staff",
      leadData: u.leadData as any
    };
  } catch (error) {
    console.error("Database query dbInsertUser failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

export async function dbUpdateUser(id: string, updates: any) {
  try {
    const result = await db.update(users).set({
      uid: updates.uid !== undefined ? updates.uid : undefined,
      name: updates.name,
      email: updates.email ? updates.email.toLowerCase() : undefined,
      leadData: updates.leadData
    }).where(eq(users.id, id)).returning();
    
    if (result.length > 0) {
      const u = result[0];
      return {
        id: u.id,
        uid: u.uid,
        name: u.name,
        email: u.email,
        password: u.password || "",
        role: u.role as "client" | "staff",
        leadData: u.leadData as any
      };
    }
    return null;
  } catch (error) {
    console.error("Database query dbUpdateUser failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

export async function dbGetEstimates() {
  try {
    const results = await db.select().from(estimates);
    return results.map(e => ({
      id: e.id,
      userId: e.userId,
      name: e.name,
      date: e.date,
      selections: e.selections as any,
      totalCost: Number(e.totalCost),
      notes: e.notes || "",
      selectedServices: e.selectedServices as any || []
    }));
  } catch (error) {
    console.error("Database query dbGetEstimates failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

export async function dbInsertEstimate(estimate: any) {
  try {
    const result = await db.insert(estimates).values({
      id: estimate.id,
      userId: estimate.userId,
      name: estimate.name,
      date: estimate.date,
      selections: estimate.selections,
      totalCost: estimate.totalCost.toString(),
      notes: estimate.notes,
      selectedServices: estimate.selectedServices
    }).returning();
    
    const e = result[0];
    return {
      id: e.id,
      userId: e.userId,
      name: e.name,
      date: e.date,
      selections: e.selections as any,
      totalCost: Number(e.totalCost),
      notes: e.notes || "",
      selectedServices: e.selectedServices as any || []
    };
  } catch (error) {
    console.error("Database query dbInsertEstimate failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

export async function dbDeleteEstimate(id: string) {
  try {
    const result = await db.delete(estimates).where(eq(estimates.id, id)).returning();
    return result.length > 0;
  } catch (error) {
    console.error("Database query dbDeleteEstimate failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

export async function dbGetLeads() {
  try {
    const results = await db.select().from(leads);
    return results.map(l => ({
      id: l.id,
      homeowner: l.homeowner,
      phone: l.phone || "",
      email: l.email || "",
      address: l.address || "",
      leadSource: l.leadSource || "",
      renovationInterest: l.renovationInterest || "",
      assignedSalesperson: l.assignedSalesperson || "",
      lastContact: l.lastContact || "",
      nextFollowUp: l.nextFollowUp || "",
      estimatedValue: l.estimatedValue ? Number(l.estimatedValue) : 0,
      probability: l.probability ? Number(l.probability) : 0,
      expectedCloseDate: l.expectedCloseDate || "",
      stage: l.stage || "New"
    }));
  } catch (error) {
    console.error("Database query dbGetLeads failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

export async function dbInsertLead(lead: any) {
  try {
    const result = await db.insert(leads).values({
      id: lead.id,
      homeowner: lead.homeowner,
      phone: lead.phone,
      email: lead.email,
      address: lead.address,
      leadSource: lead.leadSource,
      renovationInterest: lead.renovationInterest,
      assignedSalesperson: lead.assignedSalesperson,
      lastContact: lead.lastContact,
      nextFollowUp: lead.nextFollowUp,
      estimatedValue: lead.estimatedValue ? lead.estimatedValue.toString() : null,
      probability: lead.probability ? lead.probability.toString() : null,
      expectedCloseDate: lead.expectedCloseDate,
      stage: lead.stage
    }).returning();
    
    const l = result[0];
    return {
      id: l.id,
      homeowner: l.homeowner,
      phone: l.phone || "",
      email: l.email || "",
      address: l.address || "",
      leadSource: l.leadSource || "",
      renovationInterest: l.renovationInterest || "",
      assignedSalesperson: l.assignedSalesperson || "",
      lastContact: l.lastContact || "",
      nextFollowUp: l.nextFollowUp || "",
      estimatedValue: l.estimatedValue ? Number(l.estimatedValue) : 0,
      probability: l.probability ? Number(l.probability) : 0,
      expectedCloseDate: l.expectedCloseDate || "",
      stage: l.stage || "New"
    };
  } catch (error) {
    console.error("Database query dbInsertLead failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

export async function dbUpdateLead(id: string, updates: any) {
  try {
    const mapped: any = {};
    if (updates.homeowner !== undefined) mapped.homeowner = updates.homeowner;
    if (updates.phone !== undefined) mapped.phone = updates.phone;
    if (updates.email !== undefined) mapped.email = updates.email;
    if (updates.address !== undefined) mapped.address = updates.address;
    if (updates.leadSource !== undefined) mapped.leadSource = updates.leadSource;
    if (updates.renovationInterest !== undefined) mapped.renovationInterest = updates.renovationInterest;
    if (updates.assignedSalesperson !== undefined) mapped.assignedSalesperson = updates.assignedSalesperson;
    if (updates.lastContact !== undefined) mapped.lastContact = updates.lastContact;
    if (updates.nextFollowUp !== undefined) mapped.nextFollowUp = updates.nextFollowUp;
    if (updates.estimatedValue !== undefined) mapped.estimatedValue = updates.estimatedValue ? updates.estimatedValue.toString() : null;
    if (updates.probability !== undefined) mapped.probability = updates.probability ? updates.probability.toString() : null;
    if (updates.expectedCloseDate !== undefined) mapped.expectedCloseDate = updates.expectedCloseDate;
    if (updates.stage !== undefined) mapped.stage = updates.stage;

    const result = await db.update(leads).set(mapped).where(eq(leads.id, id)).returning();
    if (result.length > 0) {
      const l = result[0];
      return {
        id: l.id,
        homeowner: l.homeowner,
        phone: l.phone || "",
        email: l.email || "",
        address: l.address || "",
        leadSource: l.leadSource || "",
        renovationInterest: l.renovationInterest || "",
        assignedSalesperson: l.assignedSalesperson || "",
        lastContact: l.lastContact || "",
        nextFollowUp: l.nextFollowUp || "",
        estimatedValue: l.estimatedValue ? Number(l.estimatedValue) : 0,
        probability: l.probability ? Number(l.probability) : 0,
        expectedCloseDate: l.expectedCloseDate || "",
        stage: l.stage || "New"
      };
    }
    return undefined;
  } catch (error) {
    console.error("Database query dbUpdateLead failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

export async function dbDeleteLead(id: string) {
  try {
    await db.delete(leads).where(eq(leads.id, id));
    return true;
  } catch (error) {
    console.error("Database query dbDeleteLead failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

export async function dbGetProjects() {
  try {
    const results = await db.select().from(projects);
    return results.map(p => ({
      id: p.id,
      name: p.name,
      homeowner: p.homeowner || "",
      address: p.address || "",
      phone: p.phone || "",
      email: p.email || "",
      preferredContact: p.preferredContact || "",
      emergencyContact: p.emergencyContact || "",
      renovationType: p.renovationType || "",
      stage: p.stage || "",
      status: p.status || "",
      progress: p.progress ? Number(p.progress) : 0,
      contractValue: p.contractValue ? Number(p.contractValue) : 0,
      budget: p.budget ? Number(p.budget) : 0,
      startDate: p.startDate || "",
      estimatedCompletion: p.estimatedCompletion || "",
      accountManager: p.accountManager || "",
      projectManager: p.projectManager || "",
      superintendent: p.superintendent || "",
      crew: p.crew as any || [],
      subcontractors: p.subcontractors as any || [],
      scopeOfWork: p.scopeOfWork || "",
      roomsIncluded: p.roomsIncluded as any || [],
      permitStatus: p.permitStatus || "",
      materialSelections: p.materialSelections as any || [],
      changeOrders: p.changeOrders as any || [],
      milestones: p.milestones as any || [],
      amNotes: p.amNotes as any || [],
      pmNotes: p.pmNotes as any || [],
      contracts: p.contracts as any || [],
      payments: p.payments as any || [],
      warranty: p.warranty as any || null,
      documents: p.documents as any || [],
      activityFeed: p.activityFeed as any || []
    }));
  } catch (error) {
    console.error("Database query dbGetProjects failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

export async function dbUpdateProject(id: string, updates: any) {
  try {
    const mapped: any = {};
    if (updates.name !== undefined) mapped.name = updates.name;
    if (updates.homeowner !== undefined) mapped.homeowner = updates.homeowner;
    if (updates.address !== undefined) mapped.address = updates.address;
    if (updates.phone !== undefined) mapped.phone = updates.phone;
    if (updates.email !== undefined) mapped.email = updates.email;
    if (updates.preferredContact !== undefined) mapped.preferredContact = updates.preferredContact;
    if (updates.emergencyContact !== undefined) mapped.emergencyContact = updates.emergencyContact;
    if (updates.renovationType !== undefined) mapped.renovationType = updates.renovationType;
    if (updates.stage !== undefined) mapped.stage = updates.stage;
    if (updates.status !== undefined) mapped.status = updates.status;
    if (updates.progress !== undefined) mapped.progress = updates.progress.toString();
    if (updates.contractValue !== undefined) mapped.contractValue = updates.contractValue ? updates.contractValue.toString() : null;
    if (updates.budget !== undefined) mapped.budget = updates.budget ? updates.budget.toString() : null;
    if (updates.startDate !== undefined) mapped.startDate = updates.startDate;
    if (updates.estimatedCompletion !== undefined) mapped.estimatedCompletion = updates.estimatedCompletion;
    if (updates.accountManager !== undefined) mapped.accountManager = updates.accountManager;
    if (updates.projectManager !== undefined) mapped.projectManager = updates.projectManager;
    if (updates.superintendent !== undefined) mapped.superintendent = updates.superintendent;
    if (updates.crew !== undefined) mapped.crew = updates.crew;
    if (updates.subcontractors !== undefined) mapped.subcontractors = updates.subcontractors;
    if (updates.scopeOfWork !== undefined) mapped.scopeOfWork = updates.scopeOfWork;
    if (updates.roomsIncluded !== undefined) mapped.roomsIncluded = updates.roomsIncluded;
    if (updates.permitStatus !== undefined) mapped.permitStatus = updates.permitStatus;
    if (updates.materialSelections !== undefined) mapped.materialSelections = updates.materialSelections;
    if (updates.changeOrders !== undefined) mapped.changeOrders = updates.changeOrders;
    if (updates.milestones !== undefined) mapped.milestones = updates.milestones;
    if (updates.amNotes !== undefined) mapped.amNotes = updates.amNotes;
    if (updates.pmNotes !== undefined) mapped.pmNotes = updates.pmNotes;
    if (updates.contracts !== undefined) mapped.contracts = updates.contracts;
    if (updates.payments !== undefined) mapped.payments = updates.payments;
    if (updates.warranty !== undefined) mapped.warranty = updates.warranty;
    if (updates.documents !== undefined) mapped.documents = updates.documents;
    if (updates.activityFeed !== undefined) mapped.activityFeed = updates.activityFeed;

    const result = await db.update(projects).set(mapped).where(eq(projects.id, id)).returning();
    if (result.length > 0) {
      const p = result[0];
      return {
        id: p.id,
        name: p.name,
        homeowner: p.homeowner || "",
        address: p.address || "",
        phone: p.phone || "",
        email: p.email || "",
        preferredContact: p.preferredContact || "",
        emergencyContact: p.emergencyContact || "",
        renovationType: p.renovationType || "",
        stage: p.stage || "",
        status: p.status || "",
        progress: p.progress ? Number(p.progress) : 0,
        contractValue: p.contractValue ? Number(p.contractValue) : 0,
        budget: p.budget ? Number(p.budget) : 0,
        startDate: p.startDate || "",
        estimatedCompletion: p.estimatedCompletion || "",
        accountManager: p.accountManager || "",
        projectManager: p.projectManager || "",
        superintendent: p.superintendent || "",
        crew: p.crew as any || [],
        subcontractors: p.subcontractors as any || [],
        scopeOfWork: p.scopeOfWork || "",
        roomsIncluded: p.roomsIncluded as any || [],
        permitStatus: p.permitStatus || "",
        materialSelections: p.materialSelections as any || [],
        changeOrders: p.changeOrders as any || [],
        milestones: p.milestones as any || [],
        amNotes: p.amNotes as any || [],
        pmNotes: p.pmNotes as any || [],
        contracts: p.contracts as any || [],
        payments: p.payments as any || [],
        warranty: p.warranty as any || null,
        documents: p.documents as any || [],
        activityFeed: p.activityFeed as any || []
      };
    }
    return null;
  } catch (error) {
    console.error("Database query dbUpdateProject failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

export async function dbInsertProject(p: any) {
  try {
    const result = await db.insert(projects).values({
      id: p.id,
      name: p.name,
      homeowner: p.homeowner,
      address: p.address,
      phone: p.phone,
      email: p.email,
      preferredContact: p.preferredContact,
      emergencyContact: p.emergencyContact,
      renovationType: p.renovationType,
      stage: p.stage,
      status: p.status,
      progress: p.progress?.toString(),
      contractValue: p.contractValue?.toString(),
      budget: p.budget?.toString(),
      startDate: p.startDate,
      estimatedCompletion: p.estimatedCompletion,
      accountManager: p.accountManager,
      projectManager: p.projectManager,
      superintendent: p.superintendent,
      crew: p.crew,
      subcontractors: p.subcontractors,
      scopeOfWork: p.scopeOfWork,
      roomsIncluded: p.roomsIncluded,
      permitStatus: p.permitStatus,
      materialSelections: p.materialSelections,
      changeOrders: p.changeOrders,
      milestones: p.milestones,
      amNotes: p.amNotes,
      pmNotes: p.pmNotes,
      contracts: p.contracts,
      payments: p.payments,
      warranty: p.warranty,
      documents: p.documents,
      activityFeed: p.activityFeed
    }).returning();

    if (result.length > 0) {
      const inserted = result[0];
      return {
        id: inserted.id,
        name: inserted.name,
        homeowner: inserted.homeowner || "",
        address: inserted.address || "",
        phone: inserted.phone || "",
        email: inserted.email || "",
        preferredContact: inserted.preferredContact || "",
        emergencyContact: inserted.emergencyContact || "",
        renovationType: inserted.renovationType || "",
        stage: inserted.stage || "",
        status: inserted.status || "",
        progress: inserted.progress ? Number(inserted.progress) : 0,
        contractValue: inserted.contractValue ? Number(inserted.contractValue) : 0,
        budget: inserted.budget ? Number(inserted.budget) : 0,
        startDate: inserted.startDate || "",
        estimatedCompletion: inserted.estimatedCompletion || "",
        accountManager: inserted.accountManager || "",
        projectManager: inserted.projectManager || "",
        superintendent: inserted.superintendent || "",
        crew: inserted.crew as any || [],
        subcontractors: inserted.subcontractors as any || [],
        scopeOfWork: inserted.scopeOfWork || "",
        roomsIncluded: inserted.roomsIncluded as any || [],
        permitStatus: inserted.permitStatus || "",
        materialSelections: inserted.materialSelections as any || [],
        changeOrders: inserted.changeOrders as any || [],
        milestones: inserted.milestones as any || [],
        amNotes: inserted.amNotes as any || [],
        pmNotes: inserted.pmNotes as any || [],
        contracts: inserted.contracts as any || [],
        payments: inserted.payments as any || [],
        warranty: inserted.warranty as any || null,
        documents: inserted.documents as any || [],
        activityFeed: inserted.activityFeed as any || []
      };
    }
    return null;
  } catch (error) {
    console.error("Database query dbInsertProject failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

export async function dbGetEvents() {
  try {
    const results = await db.select().from(events);
    return results.map(ev => ({
      id: ev.id,
      title: ev.title,
      date: ev.date,
      time: ev.time || "",
      assignedEmployee: ev.assignedEmployee || "",
      homeowner: ev.homeowner || "",
      location: ev.location || "",
      notes: ev.notes || "",
      status: ev.status || "Scheduled",
      type: ev.type || ""
    }));
  } catch (error) {
    console.error("Database query dbGetEvents failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

export async function dbInsertEvent(event: any) {
  try {
    const result = await db.insert(events).values({
      id: event.id,
      title: event.title,
      date: event.date,
      time: event.time,
      assignedEmployee: event.assignedEmployee,
      homeowner: event.homeowner,
      location: event.location,
      notes: event.notes,
      status: event.status,
      type: event.type
    }).returning();
    
    const ev = result[0];
    return {
      id: ev.id,
      title: ev.title,
      date: ev.date,
      time: ev.time || "",
      assignedEmployee: ev.assignedEmployee || "",
      homeowner: ev.homeowner || "",
      location: ev.location || "",
      notes: ev.notes || "",
      status: ev.status || "Scheduled",
      type: ev.type || ""
    };
  } catch (error) {
    console.error("Database query dbInsertEvent failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

// Seeding utility to ensure the database starts populated with the application's rich default data
export async function seedDatabaseIfEmpty() {
  try {
    const userCount = await db.select().from(users);
    const projectCount = await db.select().from(projects);
    
    // Check if we have old or incomplete datasets (our new rich set contains 7 projects, old has 1)
    const hasOldData = projectCount.some(p => p.name.includes("Lower Parlor"));
    const isMissingNewData = projectCount.length < 5;
    
    if (userCount.length === 0 || hasOldData || isMissingNewData) {
      console.log("Database requires seeding or update. Clearing stale records and seeding Charlottesville datasets...");
      
      // Clear tables in reverse-relation order to avoid foreign key errors
      await db.delete(estimates);
      await db.delete(users);
      await db.delete(projects);
      await db.delete(leads);
      await db.delete(events);
      
      // 1. Seed Users
      for (const u of USERS_DB) {
        await db.insert(users).values({
          id: u.id,
          name: u.name,
          email: u.email.toLowerCase(),
          password: u.password,
          role: u.role,
          leadData: u.leadData
        });
      }
      
      // 2. Seed Leads
      for (const l of LEADS_DB) {
        await db.insert(leads).values({
          id: l.id,
          homeowner: l.homeowner,
          phone: l.phone,
          email: l.email,
          address: l.address,
          leadSource: l.leadSource,
          renovationInterest: l.renovationInterest,
          assignedSalesperson: l.assignedSalesperson,
          lastContact: l.lastContact,
          nextFollowUp: l.nextFollowUp,
          estimatedValue: l.estimatedValue?.toString(),
          probability: l.probability?.toString(),
          expectedCloseDate: l.expectedCloseDate,
          stage: l.stage
        });
      }
      
      // 3. Seed Projects
      for (const p of PROJECTS_DB) {
        await db.insert(projects).values({
          id: p.id,
          name: p.name,
          homeowner: p.homeowner,
          address: p.address,
          phone: p.phone,
          email: p.email,
          preferredContact: p.preferredContact,
          emergencyContact: p.emergencyContact,
          renovationType: p.renovationType,
          stage: p.stage,
          status: p.status,
          progress: p.progress?.toString(),
          contractValue: p.contractValue?.toString(),
          budget: p.budget?.toString(),
          startDate: p.startDate,
          estimatedCompletion: p.estimatedCompletion,
          accountManager: p.accountManager,
          projectManager: p.projectManager,
          superintendent: p.superintendent,
          crew: p.crew,
          subcontractors: p.subcontractors,
          scopeOfWork: p.scopeOfWork,
          roomsIncluded: p.roomsIncluded,
          permitStatus: p.permitStatus,
          materialSelections: p.materialSelections,
          changeOrders: p.changeOrders,
          milestones: p.milestones,
          amNotes: p.amNotes,
          pmNotes: p.pmNotes,
          contracts: p.contracts,
          payments: p.payments,
          warranty: p.warranty,
          documents: p.documents,
          activityFeed: p.activityFeed
        });
      }

      // 4. Seed Estimates
      for (const e of ESTIMATES_DB) {
        // Double check user exists before seeding estimate (referential integrity)
        const userExists = await db.select().from(users).where(eq(users.id, e.userId));
        if (userExists.length > 0) {
          await db.insert(estimates).values({
            id: e.id,
            userId: e.userId,
            name: e.name,
            date: e.date,
            selections: e.selections,
            totalCost: e.totalCost.toString(),
            notes: e.notes,
            selectedServices: e.selectedServices
          });
        }
      }

      // 5. Seed Events
      for (const ev of CALENDAR_DB) {
        await db.insert(events).values({
          id: ev.id,
          title: ev.title,
          date: ev.date,
          time: ev.time,
          assignedEmployee: ev.assignedEmployee,
          homeowner: ev.homeowner,
          location: ev.location,
          notes: ev.notes,
          status: ev.status,
          type: ev.type
        });
      }
      
      console.log("Database successfully seeded with new rich datasets!");
    } else {
      console.log(`Database is already populated and up-to-date. (Users: ${userCount.length}, Projects: ${projectCount.length}). Skipping seeding.`);
    }
  } catch (err) {
    console.error("Failed to seed database during startup:", err);
  }
}
