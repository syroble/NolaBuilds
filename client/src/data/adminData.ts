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
  probability: number; // e.g. 80 for 80%
  expectedCloseDate: string;
  stage: "New Lead" | "Consultation Scheduled" | "Estimate Sent" | "Follow-up" | "Negotiation" | "Contract Pending";
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
  stage: 
    | "Consultation"
    | "Material Selection"
    | "Estimating"
    | "Proposal"
    | "Contract Signed"
    | "Permits"
    | "Scheduling"
    | "Demolition"
    | "Construction"
    | "Final Walkthrough"
    | "Completed"
    | "Warranty";
  status: "On Track" | "Delayed" | "Completed" | "Pending";
  progress: number; // 0 to 100
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
  permitStatus: "Not Required" | "Pending Approval" | "Approved" | "In Inspection";
  materialSelections: { item: string; selection: string; cost: number; status: string }[];
  changeOrders: { id: string; title: string; cost: number; status: "Pending" | "Approved" | "Rejected" }[];
  milestones: { id: string; name: string; date: string; completed: boolean; actualDate?: string }[];
  amNotes: { id: string; text: string; author: string; timestamp: string; isCustomerComm?: boolean }[];
  pmNotes: { id: string; text: string; author: string; timestamp: string; crewCount: number; weather: string; issues: string; safetyNotes: string }[];
  contracts: { id: string; title: string; type: string; url: string; uploadDate: string; version: string }[];
  payments: { id: string; title: string; invoiceNumber: string; amount: number; dueDate: string; status: "Paid" | "Pending" | "Overdue" }[];
  warranty: {
    coverage: string;
    startDate: string;
    expirationDate: string;
    laborWarranty: string;
    manufacturerWarranties: string[];
    claims: { id: string; issue: string; fileDate: string; status: "Open" | "Resolved"; notes: string }[];
  };
  documents: { id: string; name: string; category: string; uploadDate: string; size: string; version: string }[];
  activityFeed: { id: string; text: string; timestamp: string; type: string }[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  assignedEmployee: string;
  homeowner: string;
  location: string;
  notes: string;
  status: "Scheduled" | "Completed" | "Cancelled";
  type:
    | "Initial Consultation"
    | "Measure Appointment"
    | "Design Review"
    | "Material Selection Meeting"
    | "Site Visit"
    | "Permit Inspection"
    | "Material Delivery"
    | "Construction Start"
    | "Customer Walkthrough"
    | "Final Walkthrough"
    | "Warranty Inspection"
    | "Calendly Booking";
}
