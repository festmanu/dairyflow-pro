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
