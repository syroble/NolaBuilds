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

export interface AdminLead {
  id: string;
  homeowner: string;
  phone: string;
  email: string;
  address: string;
  leadSource: string;
  renovationInterest: string;
  assignedSalesperson: string;
  lastContact: string;
  nextFollowUp: string;
  estimatedValue: number;
  probability: number;
  expectedCloseDate: string;
  stage: string;
}

export interface AdminProject {
  id: string;
  name: string;
  homeowner: string;
  address: string;
  phone: string;
  email: string;
  preferredContact: string;
  emergencyContact: string;
  renovationType: string;
  stage: string;
  status: string;
  progress: number;
  contractValue: number;
  budget: number;
  startDate: string;
  estimatedCompletion: string;
  accountManager: string;
  projectManager: string;
  superintendent: string;
  crew: string[];
  subcontractors: string[];
  scopeOfWork: string;
  roomsIncluded: string[];
  permitStatus: string;
  materialSelections: any[];
  changeOrders: any[];
  milestones: any[];
  amNotes: any[];
  pmNotes: any[];
  contracts: any[];
  payments: any[];
  warranty: any;
  documents: any[];
  activityFeed: any[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  assignedEmployee: string;
  homeowner: string;
  location: string;
  notes: string;
  status: string;
  type: string;
}

export const USERS_DB = [
  {
    id: "user_client_1",
    name: "Penelope Cruz",
    email: "homeowner@nolabuilts.com",
    password: "client123",
    role: "client" as const,
    leadData: {
      address: "818 Belmont Ave, Charlottesville, VA 22902",
      timeline: "3-6 months",
      budgetRange: "$50,000 - $100,000",
      description: "Complete historic siding wrap and window casing casing."
    }
  },
  {
    id: "user_staff_1",
    name: "Louis Contractor",
    email: "estimator.louis@nolabuilts.com",
    password: "staff123",
    role: "staff" as const,
    leadData: null
  }
];

export const ESTIMATES_DB: SavedEstimate[] = [
  {
    id: "est_default_1",
    userId: "user_client_1",
    name: "Historic Garden Parlor Layout",
    date: "Jul 15, 2026, 03:22 PM",
    selections: {
      cabinets: "shaker",
      countertops: "marble",
      flooring: "oak-hardwood",
      paint: "premium-paint",
      backsplash: "subway-tile",
      sink: "farmhouse",
      faucet: "pro-brass",
      appliances: "premium-package",
      lighting: "smart-lighting"
    },
    totalCost: 52400,
    notes: "Historical preservation specifications",
    selectedServices: ["demolition", "permit_fees", "architect_design"]
  },
  {
    id: "est_default_2",
    userId: "user_client_1",
    name: "Rear Cypress Master Bath",
    date: "Jun 28, 2026, 11:45 AM",
    selections: {
      vanity: "custom-double-vanity",
      tubShower: "spa-walk-in-shower",
      flooring: "porcelain-slate-tile",
      fixtures: "brushed-gold-package",
      toilet: "smart-dual-flush",
      lighting: "accent-sconces"
    },
    totalCost: 24800,
    notes: "Spas master restroom package",
    selectedServices: ["demolition", "permit_fees"]
  }
];

export const LEADS_DB: AdminLead[] = [
  {
    id: "lead_1",
    homeowner: "Marcus Vance",
    phone: "(540) 555-0143",
    email: "marcus.vance@gmail.com",
    address: "812 Park Street, Charlottesville, VA 22902",
    leadSource: "Google Search",
    renovationInterest: "Whole Home Renovation & Deck",
    assignedSalesperson: "Sarah Connor",
    lastContact: "2026-07-15",
    nextFollowUp: "2026-07-19",
    estimatedValue: 185000,
    probability: 80,
    expectedCloseDate: "2026-08-10",
    stage: "Negotiation"
  },
  {
    id: "lead_2",
    homeowner: "Clara Higgins",
    phone: "(434) 555-0199",
    email: "clara.hig@outlook.com",
    address: "204 Locust Ave, Charlottesville, VA 22902",
    leadSource: "Customer Referral",
    renovationInterest: "Premium Kitchen Remodel",
    assignedSalesperson: "Sarah Connor",
    lastContact: "2026-07-16",
    nextFollowUp: "2026-07-18",
    estimatedValue: 85000,
    probability: 95,
    expectedCloseDate: "2026-07-28",
    stage: "Contract Pending"
  },
  {
    id: "lead_3",
    homeowner: "Donald Brewster",
    phone: "(804) 555-9281",
    email: "dbrewster@gmail.com",
    address: "1540 Dairy Road, Charlottesville, VA 22903",
    leadSource: "Instagram Ad",
    renovationInterest: "Finished Basement Suite & Bath",
    assignedSalesperson: "Louis Ducreux",
    lastContact: "2026-07-10",
    nextFollowUp: "2026-07-20",
    estimatedValue: 65000,
    probability: 60,
    expectedCloseDate: "2026-08-15",
    stage: "Estimate Sent"
  },
  {
    id: "lead_4",
    homeowner: "Genevieve Mercer",
    phone: "(434) 555-2201",
    email: "g.mercer@yahoo.com",
    address: "411 Rugby Road, Charlottesville, VA 22903",
    leadSource: "Signage on Site",
    renovationInterest: "Bathroom Remodel & Siding Repairs",
    assignedSalesperson: "Louis Ducreux",
    lastContact: "2026-07-17",
    nextFollowUp: "2026-07-22",
    estimatedValue: 42000,
    probability: 30,
    expectedCloseDate: "2026-09-01",
    stage: "Consultation Scheduled"
  },
  {
    id: "lead_5",
    homeowner: "Richard Vance",
    phone: "(434) 555-9988",
    email: "rvance@virginia.edu",
    address: "125 Hessian Road, Charlottesville, VA 22901",
    leadSource: "Architect Referral",
    renovationInterest: "Deck & Custom Patio Build",
    assignedSalesperson: "Sarah Connor",
    lastContact: "2026-07-14",
    nextFollowUp: "2026-07-25",
    estimatedValue: 35000,
    probability: 10,
    expectedCloseDate: "2026-09-15",
    stage: "New Lead"
  },
  {
    id: "lead_6",
    homeowner: "Audrey Hepburn",
    phone: "(434) 555-4089",
    email: "audrey.h@breakfastlounge.com",
    address: "312 East Water St, Charlottesville, VA 22902",
    leadSource: "Instagram Portfolio",
    renovationInterest: "Bathroom Remodel",
    assignedSalesperson: "Louis Ducreux",
    lastContact: "2026-07-16",
    nextFollowUp: "2026-07-21",
    estimatedValue: 55000,
    probability: 75,
    expectedCloseDate: "2026-08-05",
    stage: "Follow-up"
  },
  {
    id: "lead_7",
    homeowner: "Fitzgerald Kennedy",
    phone: "(703) 555-1960",
    email: "f.kennedy@virginia.edu",
    address: "1600 Ridge Rd, Charlottesville, VA 22901",
    leadSource: "Google Search",
    renovationInterest: "Whole Home Renovation",
    assignedSalesperson: "Sarah Connor",
    lastContact: "2026-07-17",
    nextFollowUp: "2026-07-24",
    estimatedValue: 120000,
    probability: 45,
    expectedCloseDate: "2026-09-12",
    stage: "New Lead"
  }
];

export const PROJECTS_DB: AdminProject[] = [
  {
    id: "proj_1",
    name: "Rugby Road Historic Kitchen Remodel",
    homeowner: "Evelyn Sterling",
    address: "612 Rugby Road, Charlottesville, VA 22903",
    phone: "(434) 555-3392",
    email: "evelyn@sterlingdesigns.co",
    preferredContact: "Email",
    emergencyContact: "Robert Sterling (Spouse) - (434) 555-3390",
    renovationType: "Kitchen Remodel",
    stage: "Construction",
    status: "On Track",
    progress: 65,
    contractValue: 98400,
    budget: 92000,
    startDate: "2026-05-15",
    estimatedCompletion: "2026-08-15",
    accountManager: "Sarah Connor",
    projectManager: "David Vance",
    superintendent: "Jerry Myers",
    crew: ["Billy Cole", "Sammy Green", "Tom Hicks"],
    subcontractors: ["Blue Ridge Electrical", "Albemarle Plumbing Pros"],
    scopeOfWork: "Complete down-to-studs historical kitchen remodeling including solid cherry custom cabinetry, Calacatta Gold marble countertops, professional Wolf appliance package, premium wire-brushed white oak hardwood floors, and period-accurate crown moldings.",
    roomsIncluded: ["Kitchen", "Pantry", "Rear Breakfast Nook"],
    permitStatus: "Approved",
    materialSelections: [
      { item: "Cabinets", selection: "Custom Shaker Painted Ivory", cost: 24500, status: "Delivered" },
      { item: "Countertops", selection: "Calacatta Gold Marble 3cm", cost: 12800, status: "Delivered" },
      { item: "Appliances", selection: "Wolf/Sub-Zero Professional Pack", cost: 22000, status: "Delivered" },
      { item: "Flooring", selection: "5\" White Oak Select Hardwood", cost: 7200, status: "Ordered" }
    ],
    changeOrders: [
      { id: "co_1", title: "Add custom breakfast bar recessed outlet channels", cost: 1450, status: "Approved" },
      { id: "co_2", title: "Upgrade to premium solid brass unlacquered hardware", cost: 2300, status: "Approved" },
      { id: "co_3", title: "Additional under-cabinet accent lighting run", cost: 850, status: "Pending" }
    ],
    milestones: [
      { id: "ms_1", name: "Lead Created", date: "2026-03-01", completed: true, actualDate: "2026-03-01" },
      { id: "ms_2", name: "Consultation Completed", date: "2026-03-10", completed: true, actualDate: "2026-03-09" },
      { id: "ms_3", name: "Estimate Approved", date: "2026-03-25", completed: true, actualDate: "2026-03-24" },
      { id: "ms_4", name: "Proposal Sent", date: "2026-04-01", completed: true, actualDate: "2026-04-01" },
      { id: "ms_5", name: "Contract Signed", date: "2026-04-10", completed: true, actualDate: "2026-04-08" },
      { id: "ms_6", name: "Deposit Received", date: "2026-04-12", completed: true, actualDate: "2026-04-11" },
      { id: "ms_7", name: "Material Selection Complete", date: "2026-04-20", completed: true, actualDate: "2026-04-19" },
      { id: "ms_8", name: "Permits Submitted", date: "2026-04-25", completed: true, actualDate: "2026-04-25" },
      { id: "ms_9", name: "Permits Approved", date: "2026-05-05", completed: true, actualDate: "2026-05-04" },
      { id: "ms_10", name: "Materials Ordered", date: "2026-05-08", completed: true, actualDate: "2026-05-08" },
      { id: "ms_11", name: "Materials Delivered", date: "2026-05-14", completed: true, actualDate: "2026-05-14" },
      { id: "ms_12", name: "Construction Started", date: "2026-05-15", completed: true, actualDate: "2026-05-15" },
      { id: "ms_13", name: "Rough Inspection", date: "2026-06-20", completed: true, actualDate: "2026-06-22" },
      { id: "ms_14", name: "Final Inspection", date: "2026-08-01", completed: false },
      { id: "ms_15", name: "Punch List", date: "2026-08-05", completed: false },
      { id: "ms_16", name: "Final Walkthrough", date: "2026-08-10", completed: false },
      { id: "ms_17", name: "Project Completed", date: "2026-08-15", completed: false },
      { id: "ms_18", name: "Warranty Activated", date: "2026-08-16", completed: false }
    ],
    amNotes: [
      { id: "amn_1", text: "Evelyn selected the Calacatta Gold marble slabs from the regional stone distributor. Excellent choice, perfectly aligned with historic review guidelines.", author: "Sarah Connor", timestamp: "2026-04-19 14:30" },
      { id: "amn_2", text: "Client prefers email communication but requested phone calls specifically for schedule changes.", author: "Sarah Connor", timestamp: "2026-05-02 09:15" },
      { id: "amn_3", text: "Sent email updating client about cabinet installation completion. She is absolutely thrilled with the craftsmanship.", author: "Sarah Connor", timestamp: "2026-07-12 16:45", isCustomerComm: true }
    ],
    pmNotes: [
      { id: "pmn_1", text: "Cabinet install finished. Electrical rough-in passed inspection. Drywall patching is underway and progressing well.", author: "David Vance", timestamp: "2026-07-15 17:00", crewCount: 4, weather: "Sunny, 85F", issues: "None", safetyNotes: "Hard hats worn, workspace swept cleanly." },
      { id: "pmn_2", text: "Plumbing trim layout mapped out. Trim carpenters started hanging crown molding profiles.", author: "David Vance", timestamp: "2026-07-16 16:30", crewCount: 3, weather: "Slight Humid, 88F", issues: "None", safetyNotes: "Scaffolding checks complete." }
    ],
    contracts: [
      { id: "con_1", title: "Sterling Main Kitchen Proposal.pdf", type: "Proposal", url: "#", uploadDate: "2026-04-01", version: "v1.2" },
      { id: "con_2", title: "Executed Renovation Agreement - Sterling.pdf", type: "Signed Contract", url: "#", uploadDate: "2026-04-10", version: "v1.0" },
      { id: "con_3", title: "Approved Permit #RES-26-8831.pdf", type: "Permit Document", url: "#", uploadDate: "2026-05-05", version: "v1.0" }
    ],
    payments: [
      { id: "pay_1", title: "Initial Project Retainer Deposit (30%)", invoiceNumber: "INV-26-091", amount: 29520, dueDate: "2026-04-12", status: "Paid" },
      { id: "pay_2", title: "Rough-In Inspection Milestone Draw (40%)", invoiceNumber: "INV-26-145", amount: 39360, dueDate: "2026-06-25", status: "Paid" },
      { id: "pay_3", title: "Final Trim & Substantial Completion (30%)", invoiceNumber: "INV-26-190", amount: 29520, dueDate: "2026-08-15", status: "Pending" }
    ],
    warranty: {
      coverage: "10-Year Structural, 2-Year Craftsmanship Labor, Full OEM Component coverage.",
      startDate: "2026-08-16",
      expirationDate: "2036-08-16",
      laborWarranty: "2-Year Craftsmanship Labor Warranty",
      manufacturerWarranties: [
        "Wolf Range 3-Year Limited Warranty",
        "Sub-Zero Compressor 5-Year Sealed System Warranty",
        "Kallista Faucets Lifetime Finish Warranty"
      ],
      claims: []
    },
    documents: [
      { id: "doc_1", name: "Approved Historic Review Permit.pdf", category: "Permits", uploadDate: "2026-05-04", size: "2.4 MB", version: "v1.0" },
      { id: "doc_2", name: "Wolf Range Specs.pdf", category: "Material Specifications", uploadDate: "2026-04-22", size: "1.1 MB", version: "v1.0" },
      { id: "doc_3", name: "Final Structural Cabinet Layout.dwg", category: "Plans", uploadDate: "2026-04-18", size: "8.5 MB", version: "v1.4" }
    ],
    activityFeed: [
      { id: "act_1", text: "Deposit check processed successfully.", timestamp: "2026-04-11 10:00", type: "payment" },
      { id: "act_2", text: "Historic Preservation Permit issued by the Albemarle County Planning Commission.", timestamp: "2026-05-04 14:00", type: "permit" },
      { id: "act_3", text: "Rough-in plumbing and electrical passed on-site county inspection.", timestamp: "2026-06-22 11:30", type: "inspection" },
      { id: "act_4", text: "Recessed ambient light channels dry-fit tested by master carpenter.", timestamp: "2026-07-16 11:15", type: "progress" }
    ]
  },
  {
    id: "proj_2",
    name: " Locust Ave Cypress Master Bath Spa",
    homeowner: "Franklin Vance",
    address: "204 Locust Ave, Charlottesville, VA 22902",
    phone: "(434) 555-9012",
    email: "franklin.vance@yahoo.com",
    preferredContact: "Phone",
    emergencyContact: "Thomas Vance (Brother) - (434) 555-8911",
    renovationType: "Bathroom Remodel",
    stage: "Permits",
    status: "On Track",
    progress: 25,
    contractValue: 45000,
    budget: 41000,
    startDate: "2026-07-01",
    estimatedCompletion: "2026-09-05",
    accountManager: "Louis Ducreux",
    projectManager: "Sarah Connor",
    superintendent: "Jerry Myers",
    crew: ["Billy Cole", "Tom Hicks"],
    subcontractors: ["Blue Ridge Electrical"],
    scopeOfWork: "Luxury primary bathroom transformation using premium local Tidewater Red Cypress custom panel accents, dynamic smart dual-flush restroom system, zero-threshold glass rainfall shower stall, freestanding volcanic limestone soaking basin, and heated limestone floor panels.",
    roomsIncluded: ["Master Bath"],
    permitStatus: "Pending Approval",
    materialSelections: [
      { item: "Vanity", selection: "Custom Tidewater Red Cypress Floating", cost: 8900, status: "Ordered" },
      { item: "Shower", selection: "Porcelain Calacatta Statuario Tile Stall", cost: 6500, status: "Ordered" },
      { item: "Tub", selection: "Volcanic Limestone Soaking Basin", cost: 7200, status: "Ordered" }
    ],
    changeOrders: [],
    milestones: [
      { id: "ms_1", name: "Lead Created", date: "2026-05-10", completed: true, actualDate: "2026-05-10" },
      { id: "ms_2", name: "Consultation Completed", date: "2026-05-18", completed: true, actualDate: "2026-05-18" },
      { id: "ms_3", name: "Estimate Approved", date: "2026-06-01", completed: true, actualDate: "2026-05-30" },
      { id: "ms_4", name: "Proposal Sent", date: "2026-06-05", completed: true, actualDate: "2026-06-04" },
      { id: "ms_5", name: "Contract Signed", date: "2026-06-15", completed: true, actualDate: "2026-06-14" },
      { id: "ms_6", name: "Deposit Received", date: "2026-06-18", completed: true, actualDate: "2026-06-17" },
      { id: "ms_7", name: "Material Selection Complete", date: "2026-06-28", completed: true, actualDate: "2026-06-25" },
      { id: "ms_8", name: "Permits Submitted", date: "2026-07-02", completed: true, actualDate: "2026-07-02" },
      { id: "ms_9", name: "Permits Approved", date: "2026-07-20", completed: false },
      { id: "ms_10", name: "Materials Ordered", date: "2026-07-22", completed: false },
      { id: "ms_11", name: "Materials Delivered", date: "2026-07-28", completed: false },
      { id: "ms_12", name: "Construction Started", date: "2026-08-01", completed: false }
    ],
    amNotes: [
      { id: "amn_1", text: "Franklin selected the Tidewater Red Cypress and wants a specific horizontal layout direction. Updated technical specifications.", author: "Louis Ducreux", timestamp: "2026-06-25 11:30" }
    ],
    pmNotes: [],
    contracts: [
      { id: "con_1", title: "Bath Spa Proposal - Franklin.pdf", type: "Proposal", url: "#", uploadDate: "2026-06-04", version: "v1.1" },
      { id: "con_2", title: "Signed Agreement - Spa Bath.pdf", type: "Signed Contract", url: "#", uploadDate: "2026-06-14", version: "v1.0" }
    ],
    payments: [
      { id: "pay_1", title: "Initial Mobilization Deposit (35%)", invoiceNumber: "INV-26-105", amount: 15750, dueDate: "2026-06-18", status: "Paid" }
    ],
    warranty: {
      coverage: "5-Year Waterproofing Warranty, 2-Year Labor Warranty.",
      startDate: "2026-09-10",
      expirationDate: "2031-09-10",
      laborWarranty: "2-Year Craftsmanship Labor Warranty",
      manufacturerWarranties: [],
      claims: []
    },
    documents: [
      { id: "doc_1", name: "Limestone Slip Coefficiency Test.pdf", category: "Material Specifications", uploadDate: "2026-06-24", size: "0.8 MB", version: "v1.0" }
    ],
    activityFeed: [
      { id: "act_1", text: "Building permits successfully filed online.", timestamp: "2026-07-02 15:30", type: "permit" }
    ]
  },
  {
    id: "proj_3",
    name: "Park Street Finished Basement Suite",
    homeowner: "Arthur Pendleton",
    address: "1012 Park Street, Charlottesville, VA 22902",
    phone: "(434) 555-8273",
    email: "art.pendleton@hotmail.com",
    preferredContact: "Text Message",
    emergencyContact: "Molly Pendleton (Daughter) - (434) 555-8200",
    renovationType: "Basement Finishing",
    stage: "Proposal",
    status: "Pending",
    progress: 10,
    contractValue: 55000,
    budget: 55000,
    startDate: "2026-08-10",
    estimatedCompletion: "2026-10-15",
    accountManager: "Sarah Connor",
    projectManager: "David Vance",
    superintendent: "Unassigned",
    crew: [],
    subcontractors: [],
    scopeOfWork: "Complete basement restoration including framing damp-proof insulation walls, installing a modern split HVAC unit, full acoustic ceiling tiles, built-in mahogany bookcase shelving, and a small custom kitchenette.",
    roomsIncluded: ["Basement Recreation Space", "Kitchenette"],
    permitStatus: "Not Required",
    materialSelections: [],
    changeOrders: [],
    milestones: [
      { id: "ms_1", name: "Lead Created", date: "2026-06-01", completed: true, actualDate: "2026-06-01" },
      { id: "ms_2", name: "Consultation Completed", date: "2026-06-12", completed: true, actualDate: "2026-06-11" },
      { id: "ms_3", name: "Estimate Approved", date: "2026-07-05", completed: true, actualDate: "2026-07-04" },
      { id: "ms_4", name: "Proposal Sent", date: "2026-07-15", completed: true, actualDate: "2026-07-14" },
      { id: "ms_5", name: "Contract Signed", date: "2026-08-01", completed: false }
    ],
    amNotes: [
      { id: "amn_1", text: "Sent the formal proposal with split HVAC details yesterday. Customer is reviewing with family.", author: "Sarah Connor", timestamp: "2026-07-15 10:15" }
    ],
    pmNotes: [],
    contracts: [
      { id: "con_1", title: "Pendleton Basement Suite Proposal.pdf", type: "Proposal", url: "#", uploadDate: "2026-07-14", version: "v1.0" }
    ],
    payments: [],
    warranty: {
      coverage: "10-Year Water Intrusion Prevention Guarantee.",
      startDate: "2026-10-16",
      expirationDate: "2036-10-16",
      laborWarranty: "2-Year Craftsmanship Labor Warranty",
      manufacturerWarranties: [],
      claims: []
    },
    documents: [],
    activityFeed: [
      { id: "act_1", text: "Base estimate converted into draft proposal contract.", timestamp: "2026-07-14 09:30", type: "system" }
    ]
  },
  {
    id: "proj_4",
    name: "Broad Avenue Red Cedar Outdoor Living Deck",
    homeowner: "Marilyn Monroe",
    address: "240 Broad Ave, Charlottesville, VA 22902",
    phone: "(434) 555-5020",
    email: "marilyn.m@gmail.com",
    preferredContact: "Email",
    emergencyContact: "James Doherty (Manager) - (434) 555-5022",
    renovationType: "Deck",
    stage: "Completed",
    status: "Completed",
    progress: 100,
    contractValue: 32400,
    budget: 31000,
    startDate: "2026-04-10",
    estimatedCompletion: "2026-05-25",
    accountManager: "Louis Ducreux",
    projectManager: "Sarah Connor",
    superintendent: "Jerry Myers",
    crew: ["Sammy Green"],
    subcontractors: [],
    scopeOfWork: "Design-build of a wrapping 400 sq ft custom cedar outdoor living deck with steel cable balustrades, integrated low-voltage warm riser lighting, and a stone outdoor wood-burning fireplace hearth.",
    roomsIncluded: ["Outdoor Deck", "Fireplace Lounge"],
    permitStatus: "Approved",
    materialSelections: [
      { item: "Decking Timber", selection: "Select Tight Knot Western Red Cedar", cost: 9500, status: "Delivered" },
      { item: "Lighting", selection: "LED Under-Cap Post Low-Voltage Accent Lighting", cost: 1400, status: "Delivered" }
    ],
    changeOrders: [],
    milestones: [
      { id: "ms_1", name: "Lead Created", date: "2026-02-15", completed: true, actualDate: "2026-02-15" },
      { id: "ms_2", name: "Consultation Completed", date: "2026-02-22", completed: true, actualDate: "2026-02-22" },
      { id: "ms_3", name: "Contract Signed", date: "2026-03-20", completed: true, actualDate: "2026-03-18" },
      { id: "ms_4", name: "Construction Started", date: "2026-04-10", completed: true, actualDate: "2026-04-10" },
      { id: "ms_5", name: "Project Completed", date: "2026-05-25", completed: true, actualDate: "2026-05-24" },
      { id: "ms_6", name: "Warranty Activated", date: "2026-05-25", completed: true, actualDate: "2026-05-25" }
    ],
    amNotes: [
      { id: "amn_1", text: "Walkthrough completed. Owner signed off happily with full marks on customer satisfaction card.", author: "Louis Ducreux", timestamp: "2026-05-24 15:30" }
    ],
    pmNotes: [
      { id: "pmn_1", text: "Final wood sealing coat applied. Post lighting tested. Clean-up complete.", author: "Sarah Connor", timestamp: "2026-05-23 16:00", crewCount: 2, weather: "Overcast, 72F", issues: "None", safetyNotes: "All waste boards carted off properly." }
    ],
    contracts: [
      { id: "con_1", title: "Monroe Cedar Deck Main Contract.pdf", type: "Signed Contract", url: "#", uploadDate: "2026-03-18", version: "v1.0" }
    ],
    payments: [
      { id: "pay_1", title: "Project Mobilization Retainer (50%)", invoiceNumber: "INV-26-032", amount: 16200, dueDate: "2026-03-22", status: "Paid" },
      { id: "pay_2", title: "Substantial Finish Draw (50%)", invoiceNumber: "INV-26-079", amount: 16200, dueDate: "2026-05-26", status: "Paid" }
    ],
    warranty: {
      coverage: "5-Year Deck Framing and Timber Warranty, 2-Year Craftsmanship Labor Warranty.",
      startDate: "2026-05-25",
      expirationDate: "2031-05-25",
      laborWarranty: "2-Year Craftsmanship Labor Warranty",
      manufacturerWarranties: ["Deckorators Cable Balustrade 25-Year Limited Warranty"],
      claims: []
    },
    documents: [],
    activityFeed: [
      { id: "act_1", text: "Final warranty cert generated and mailed to homeowner.", timestamp: "2026-05-25 10:00", type: "warranty" }
    ]
  },
  {
    id: "proj_5",
    name: "Belmont Hill Whole Home Renovation",
    homeowner: "James Sterling",
    address: "914 Belmont Ave, Charlottesville, VA 22902",
    phone: "(434) 555-8833",
    email: "james.ster@sterling.org",
    preferredContact: "Email",
    emergencyContact: "Evelyn Sterling (Sister) - (434) 555-3392",
    renovationType: "Whole Home Renovation",
    stage: "Contract Signed",
    status: "Pending",
    progress: 15,
    contractValue: 312000,
    budget: 300000,
    startDate: "2026-08-01",
    estimatedCompletion: "2026-12-15",
    accountManager: "Sarah Connor",
    projectManager: "David Vance",
    superintendent: "Jerry Myers",
    crew: [],
    subcontractors: [],
    scopeOfWork: "Complete historic Belmont bungalow modernization. Includes foundation leveling, plumbing re-pipe, high-efficiency hybrid geothermal heat pump installation, 3 fully-renovated baths, full designer custom kitchen layout, and custom pine board flooring preservation.",
    roomsIncluded: ["Kitchen", "Living Room", "Master Bath", "Guest Bath 1", "Guest Bath 2", "Porch"],
    permitStatus: "Pending Approval",
    materialSelections: [],
    changeOrders: [],
    milestones: [
      { id: "ms_1", name: "Lead Created", date: "2026-04-12", completed: true, actualDate: "2026-04-12" },
      { id: "ms_2", name: "Consultation Completed", date: "2026-04-20", completed: true, actualDate: "2026-04-19" },
      { id: "ms_3", name: "Estimate Approved", date: "2026-05-15", completed: true, actualDate: "2026-05-12" },
      { id: "ms_4", name: "Proposal Sent", date: "2026-06-01", completed: true, actualDate: "2026-05-28" },
      { id: "ms_5", name: "Contract Signed", date: "2026-06-25", completed: true, actualDate: "2026-06-24" },
      { id: "ms_6", name: "Deposit Received", date: "2026-06-28", completed: true, actualDate: "2026-06-28" },
      { id: "ms_7", name: "Material Selection Complete", date: "2026-07-10", completed: true, actualDate: "2026-07-09" },
      { id: "ms_8", name: "Permits Submitted", date: "2026-07-15", completed: true, actualDate: "2026-07-15" }
    ],
    amNotes: [
      { id: "amn_1", text: "Filing geothermal heat pump zoning permits with the municipal board today. May take 2-3 weeks for comprehensive green energy approval.", author: "Sarah Connor", timestamp: "2026-07-16 14:00" }
    ],
    pmNotes: [],
    contracts: [
      { id: "con_1", title: "Executed Belmont Bungalow Contract - Executed.pdf", type: "Signed Contract", url: "#", uploadDate: "2026-06-24", version: "v1.0" }
    ],
    payments: [
      { id: "pay_1", title: "Initial Contract Deposit Draw (25%)", invoiceNumber: "INV-26-118", amount: 78000, dueDate: "2026-06-28", status: "Paid" }
    ],
    warranty: {
      coverage: "Comprehensive Whole Home 10-Year structural guarantee.",
      startDate: "2026-12-16",
      expirationDate: "2036-12-16",
      laborWarranty: "2-Year Craftsmanship Labor Warranty",
      manufacturerWarranties: [],
      claims: []
    },
    documents: [],
    activityFeed: [
      { id: "act_1", text: "Deposit invoice paid successfully.", timestamp: "2026-06-28 16:30", type: "payment" }
    ]
  },
  {
    id: "proj_6",
    name: "Faulkner Historic Carriage House Remodel",
    homeowner: "William Faulkner",
    address: "512 Park Street, Charlottesville, VA 22902",
    phone: "(434) 555-6120",
    email: "w.faulkner@oxforddesigns.com",
    preferredContact: "Email",
    emergencyContact: "Estelle Faulkner (Spouse) - (434) 555-6122",
    renovationType: "Whole Home Renovation",
    stage: "Construction",
    status: "On Track",
    progress: 40,
    contractValue: 145000,
    budget: 138000,
    startDate: "2026-06-10",
    estimatedCompletion: "2026-09-20",
    accountManager: "Louis Ducreux",
    projectManager: "David Vance",
    superintendent: "Jerry Myers",
    crew: ["Billy Cole", "Sammy Green"],
    subcontractors: ["Blue Ridge Electrical", "VA Timber Framing"],
    scopeOfWork: "Restoring a 19th-century timber carriage house into a state-of-the-art office workspace and writing retreat. Includes stabilizing original timber rafters, retrofitting architectural insulated glass panels, installing premium heart pine custom flooring, and implementing zoned heating and cooling.",
    roomsIncluded: ["Main Study", "Second Floor Loft", "Bath & Kitchenette"],
    permitStatus: "Approved",
    materialSelections: [
      { item: "Timber Posts", selection: "Reclaimed Heart Pine Beam Stock", cost: 14800, status: "Delivered" },
      { item: "Glass Panels", selection: "Double-Glazed Argon Historic Frame Units", cost: 22000, status: "Delivered" },
      { item: "Flooring", selection: "6\" Wide Plank Reclaimed Pine Flooring", cost: 8500, status: "Ordered" }
    ],
    changeOrders: [
      { id: "co_faulk_1", title: "Reinforce sub-floor joists for structural bookcase loads", cost: 3200, status: "Approved" }
    ],
    milestones: [
      { id: "ms_1", name: "Lead Created", date: "2026-04-01", completed: true, actualDate: "2026-04-01" },
      { id: "ms_2", name: "Consultation Completed", date: "2026-04-12", completed: true, actualDate: "2026-04-12" },
      { id: "ms_5", name: "Contract Signed", date: "2026-05-02", completed: true, actualDate: "2026-04-30" },
      { id: "ms_6", name: "Deposit Received", date: "2026-05-05", completed: true, actualDate: "2026-05-05" },
      { id: "ms_8", name: "Permits Submitted", date: "2026-05-15", completed: true, actualDate: "2026-05-15" },
      { id: "ms_9", name: "Permits Approved", date: "2026-06-01", completed: true, actualDate: "2026-05-29" },
      { id: "ms_12", name: "Construction Started", date: "2026-06-10", completed: true, actualDate: "2026-06-10" },
      { id: "ms_13", name: "Rough Framing Passed", date: "2026-07-05", completed: true, actualDate: "2026-07-04" }
    ],
    amNotes: [
      { id: "amn_1", text: "William Faulkner approved the framing alignment. He wants to make sure the library book channels have dedicated low-voltage wiring. Updated layout drawings sent.", author: "Louis Ducreux", timestamp: "2026-07-04 11:15" }
    ],
    pmNotes: [
      { id: "pmn_1", text: "Sub-floor structural bookcase channels finished and lag bolted. Insulation run passed inspection. Preparing for heart pine board delivery.", author: "David Vance", timestamp: "2026-07-16 17:15", crewCount: 3, weather: "Humid, 90F", issues: "None", safetyNotes: "All harnesses worn for roof skylight panel work." }
    ],
    contracts: [
      { id: "con_1", title: "Faulkner Carriage Proposal.pdf", type: "Proposal", url: "#", uploadDate: "2026-04-28", version: "v1.0" },
      { id: "con_2", title: "Executed Retainer Agreement.pdf", type: "Signed Contract", url: "#", uploadDate: "2026-05-05", version: "v1.0" }
    ],
    payments: [
      { id: "pay_1", title: "Project Mobilization Retainer (35%)", invoiceNumber: "INV-26-441", amount: 50750, dueDate: "2026-05-05", status: "Paid" },
      { id: "pay_2", title: "Framing Sign-Off Draw (35%)", invoiceNumber: "INV-26-512", amount: 50750, dueDate: "2026-07-08", status: "Paid" }
    ],
    warranty: {
      coverage: "10-Year Timber framing, 2-Year craftsmanship guarantee.",
      startDate: "2026-09-21",
      expirationDate: "2036-09-21",
      laborWarranty: "2-Year Craftsmanship Labor Warranty",
      manufacturerWarranties: [],
      claims: []
    },
    documents: [],
    activityFeed: [
      { id: "act_1", text: "Rough framing passed Albemarle county inspection.", timestamp: "2026-07-04 14:30", type: "inspection" }
    ]
  },
  {
    id: "proj_7",
    name: "Belmont Cedar Shingle Wrap",
    homeowner: "Penelope Cruz",
    address: "818 Belmont Ave, Charlottesville, VA 22902",
    phone: "(434) 555-9080",
    email: "penelope.c@cruzfilms.com",
    preferredContact: "Phone",
    emergencyContact: "None",
    renovationType: "Whole Home Renovation",
    stage: "Demolition",
    status: "Delayed",
    progress: 30,
    contractValue: 58000,
    budget: 54000,
    startDate: "2026-07-01",
    estimatedCompletion: "2026-08-30",
    accountManager: "Sarah Connor",
    projectManager: "David Vance",
    superintendent: "Jerry Myers",
    crew: ["Billy Cole", "Tom Hicks"],
    subcontractors: [],
    scopeOfWork: "Complete replacement of water-compromised siding with premium pre-stained cedar siding shingles. Includes wrapping home in Tyvek weather barriers, replacing rotting window trim profiles with custom Cypress casings, and caulking to passive-house standards.",
    roomsIncluded: ["Exterior Envelope", "Main Porch Facing Envelope"],
    permitStatus: "Approved",
    materialSelections: [
      { item: "Shingles", selection: "Pre-Stained Slate Gray Cedar Shingles", cost: 16500, status: "Delivered" },
      { item: "Trim", selection: "Select Cypress Shiplap Profiles", cost: 4200, status: "Ordered" }
    ],
    changeOrders: [],
    milestones: [
      { id: "ms_1", name: "Lead Created", date: "2026-05-15", completed: true, actualDate: "2026-05-15" },
      { id: "ms_5", name: "Contract Signed", date: "2026-06-15", completed: true, actualDate: "2026-06-15" },
      { id: "ms_6", name: "Deposit Received", date: "2026-06-18", completed: true, actualDate: "2026-06-18" },
      { id: "ms_12", name: "Construction Started", date: "2026-07-01", completed: true, actualDate: "2026-07-01" }
    ],
    amNotes: [
      { id: "amn_1", text: "Severe rainstorms on July 14-16 delayed scaffolding assembly. Home is safely wrapped in heavy-duty tarps to prevent moisture intrusion.", author: "Sarah Connor", timestamp: "2026-07-16 11:30" }
    ],
    pmNotes: [
      { id: "pmn_1", text: "Rain delayed shingle application. Tarps inspected and fully secure. Weather clearing up, plan to resume full operations on Monday.", author: "David Vance", timestamp: "2026-07-17 14:00", crewCount: 0, weather: "Heavy Rain & Winds", issues: "Weather Delay", safetyNotes: "All power equipment unplugged and locked." }
    ],
    contracts: [
      { id: "con_1", title: "Siding Agreement Cruz Belmont.pdf", type: "Signed Contract", url: "#", uploadDate: "2026-06-15", version: "v1.0" }
    ],
    payments: [
      { id: "pay_1", title: "Siding Mobilization Retainer (50%)", invoiceNumber: "INV-26-409", amount: 29000, dueDate: "2026-06-18", status: "Paid" }
    ],
    warranty: {
      coverage: "5-Year Waterproofing Envelope labor warranty, 25-Year cedar material warranty.",
      startDate: "2026-08-31",
      expirationDate: "2051-08-31",
      laborWarranty: "2-Year Craftsmanship Labor Warranty",
      manufacturerWarranties: ["Cedar Valley 25-Year Product Warranty"],
      claims: []
    },
    documents: [],
    activityFeed: [
      { id: "act_1", text: "Weather delay daily log posted by David Vance.", timestamp: "2026-07-17 14:00", type: "delay" }
    ]
  }
];

export const CALENDAR_DB: CalendarEvent[] = [
  {
    id: "evt_1",
    title: "Initial Consultation - Marcus Vance",
    date: "2026-07-18",
    time: "10:00",
    assignedEmployee: "Sarah Connor",
    homeowner: "Marcus Vance",
    location: "812 Park Street, Charlottesville, VA 22902",
    notes: "Reviewing spatial deck expansion details and whole-home framing estimates.",
    status: "Scheduled",
    type: "Initial Consultation"
  },
  {
    id: "evt_2",
    title: "Permit Site Visit Inspection - Sterling Kitchen",
    date: "2026-07-20",
    time: "14:00",
    assignedEmployee: "David Vance",
    homeowner: "Evelyn Sterling",
    location: "61 Rugby Road, Charlottesville, VA 22903",
    notes: "Electrical rough wiring check with county inspector.",
    status: "Scheduled",
    type: "Permit Inspection"
  },
  {
    id: "evt_3",
    title: "Material Selection Meeting - Clara Higgins",
    date: "2026-07-22",
    time: "11:00",
    assignedEmployee: "Sarah Connor",
    homeowner: "Clara Higgins",
    location: "204 Locust Ave, Charlottesville, VA 22902",
    notes: "Review granite and marble selections at local stone warehouse.",
    status: "Scheduled",
    type: "Material Selection Meeting"
  },
  {
    id: "evt_4",
    title: "Cypress Lumber Delivery - Spa Bath",
    date: "2026-07-24",
    time: "08:30",
    assignedEmployee: "Jerry Myers",
    homeowner: "Franklin Vance",
    location: "204 Locust Ave, Charlottesville, VA 22902",
    notes: "Delivery of 300 lineal ft of Tidewater Red Cypress panel stock.",
    status: "Scheduled",
    type: "Material Delivery"
  },
  {
    id: "evt_5",
    title: "Progress Walkthrough - Sterling Kitchen",
    date: "2026-07-17",
    time: "15:00",
    assignedEmployee: "David Vance",
    homeowner: "Evelyn Sterling",
    location: "61 Rugby Road, Charlottesville, VA 22903",
    notes: "Reviewing crown molding profiles and lighting layout.",
    status: "Completed",
    type: "Customer Walkthrough"
  },
  {
    id: "evt_6",
    title: "Design Review - William Faulkner",
    date: "2026-07-19",
    time: "11:00",
    assignedEmployee: "Louis Ducreux",
    homeowner: "William Faulkner",
    location: "512 Park Street, Charlottesville, VA 22902",
    notes: "Finalize sub-floor reinforcement blueprint and low-voltage cable routing.",
    status: "Scheduled",
    type: "Design Review"
  },
  {
    id: "evt_7",
    title: "Scaffolding Safety Check - Belmont Cedar Siding",
    date: "2026-07-21",
    time: "13:30",
    assignedEmployee: "Jerry Myers",
    homeowner: "Penelope Cruz",
    location: "818 Belmont Ave, Charlottesville, VA 22902",
    notes: "Post-rain safety alignment on steel pipe scaffold towers.",
    status: "Scheduled",
    type: "Site Visit"
  }
];
