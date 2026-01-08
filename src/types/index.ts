export interface Animal {
  id: string;
  tagNumber: string;
  name: string;
  breed: string;
  dateOfBirth: string;
  gender: 'female' | 'male';
  status: 'active' | 'dry' | 'pregnant' | 'sold' | 'deceased';
  sireId?: string;
  damId?: string;
  photo?: string;
  notes?: string;
}

export interface HealthRecord {
  id: string;
  animalId: string;
  date: string;
  type: 'vaccination' | 'treatment' | 'checkup' | 'breeding';
  description: string;
  medication?: string;
  dosage?: string;
  veterinarian?: string;
  withdrawalPeriod?: number;
  nextDueDate?: string;
  notes?: string;
}

export interface MilkRecord {
  id: string;
  animalId: string;
  date: string;
  morningYield: number;
  eveningYield: number;
  totalYield: number;
  scc?: number;
  fatPercentage?: number;
  proteinPercentage?: number;
}

export interface Alert {
  id: string;
  type: 'vaccination' | 'calving' | 'breeding' | 'health' | 'general';
  title: string;
  description: string;
  dueDate: string;
  animalId?: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface DashboardStats {
  totalHerd: number;
  lactatingCows: number;
  dryCows: number;
  heifers: number;
  bulls: number;
  todayMilkYield: number;
  avgMilkPerCow: number;
  pendingAlerts: number;
}

// Breeding & Reproduction
export interface BreedingRecord {
  id: string;
  animalId: string;
  date: string;
  type: 'heat_detection' | 'insemination' | 'pregnancy_check' | 'calving';
  sireId?: string;
  sireName?: string;
  technician?: string;
  result?: 'positive' | 'negative' | 'pending';
  expectedCalvingDate?: string;
  notes?: string;
}

// Feed & Nutrition
export interface FeedItem {
  id: string;
  name: string;
  category: 'forage' | 'grain' | 'concentrate' | 'supplement' | 'mineral';
  unit: string;
  costPerUnit: number;
  currentStock: number;
  minimumStock: number;
}

export interface FeedRation {
  id: string;
  name: string;
  targetGroup: 'lactating' | 'dry' | 'heifers' | 'calves' | 'bulls';
  ingredients: { feedItemId: string; quantity: number }[];
  totalCostPerDay: number;
}

// Financial
export interface Transaction {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  relatedAnimalId?: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  incomeByCategory: { category: string; amount: number }[];
  expensesByCategory: { category: string; amount: number }[];
}
