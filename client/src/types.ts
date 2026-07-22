export interface RemodelOption {
  id: string;
  name: string;
  description: string;
  materialCost: number;
  laborCost: number;
  overhead: number;
  durationDays: number;
  isPremium?: boolean;
}

export interface RemodelCategory {
  id: string;
  name: string;
  description: string;
  iconName: string; // Used to determine lucide icon to render
  options: RemodelOption[];
}

export interface SavedEstimate {
  id: string;
  name: string;
  date: string;
  selections: Record<string, string>; // categoryId -> optionId
  totalCost: number;
  notes?: string;
  selectedServices?: string[];
}

export interface AISuggestionResult {
  style: string;
  budgetTier: string;
  suggestedMaterials: {
    countertops?: string;
    cabinets?: string;
    flooring?: string;
    backsplash?: string;
    appliances?: string;
    lighting?: string;
  };
  explanation: string;
  matchedOptionIds: Record<string, string>; // categoryId -> optionId to apply
}

export interface AdditionalService {
  id: string;
  name: string;
  description: string;
  materialCost: number;
  laborCost: number;
  overhead: number;
  durationDays: number;
}
