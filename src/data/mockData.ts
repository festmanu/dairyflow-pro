import { Animal, HealthRecord, MilkRecord, Alert, DashboardStats, BreedingRecord, FeedItem, Transaction } from '@/types';

export const mockAnimals: Animal[] = [
  {
    id: '1',
    tagNumber: 'HC-001',
    name: 'Bella',
    breed: 'Holstein',
    dateOfBirth: '2020-03-15',
    gender: 'female',
    status: 'active',
    notes: 'High producer, calm temperament'
  },
  {
    id: '2',
    tagNumber: 'HC-002',
    name: 'Daisy',
    breed: 'Jersey',
    dateOfBirth: '2019-07-22',
    gender: 'female',
    status: 'active',
    damId: '1'
  },
  {
    id: '3',
    tagNumber: 'HC-003',
    name: 'Rosie',
    breed: 'Holstein',
    dateOfBirth: '2021-01-10',
    gender: 'female',
    status: 'pregnant'
  },
  {
    id: '4',
    tagNumber: 'HC-004',
    name: 'Buttercup',
    breed: 'Guernsey',
    dateOfBirth: '2020-11-05',
    gender: 'female',
    status: 'dry'
  },
  {
    id: '5',
    tagNumber: 'HC-005',
    name: 'Max',
    breed: 'Holstein',
    dateOfBirth: '2018-06-20',
    gender: 'male',
    status: 'active',
    notes: 'Breeding bull'
  },
  {
    id: '6',
    tagNumber: 'HC-006',
    name: 'Clover',
    breed: 'Brown Swiss',
    dateOfBirth: '2022-04-12',
    gender: 'female',
    status: 'active'
  }
];

export const mockHealthRecords: HealthRecord[] = [
  {
    id: '1',
    animalId: '1',
    date: '2024-01-15',
    type: 'vaccination',
    description: 'Annual vaccination - BVD',
    medication: 'Bovilis BVD',
    dosage: '2ml',
    veterinarian: 'Dr. Smith',
    nextDueDate: '2025-01-15'
  },
  {
    id: '2',
    animalId: '2',
    date: '2024-01-10',
    type: 'treatment',
    description: 'Mastitis treatment',
    medication: 'Ceftiofur',
    dosage: '3ml',
    withdrawalPeriod: 72,
    veterinarian: 'Dr. Smith'
  },
  {
    id: '3',
    animalId: '3',
    date: '2024-01-20',
    type: 'breeding',
    description: 'Artificial insemination',
    notes: 'First breeding attempt this cycle'
  },
  {
    id: '4',
    animalId: '1',
    date: '2024-02-01',
    type: 'checkup',
    description: 'Routine health check',
    veterinarian: 'Dr. Johnson',
    notes: 'All vitals normal'
  }
];

export const mockMilkRecords: MilkRecord[] = [
  { id: '1', animalId: '1', date: '2024-01-20', morningYield: 15.2, eveningYield: 14.8, totalYield: 30, scc: 120, fatPercentage: 3.8, proteinPercentage: 3.2 },
  { id: '2', animalId: '1', date: '2024-01-21', morningYield: 15.5, eveningYield: 15.0, totalYield: 30.5, scc: 115, fatPercentage: 3.9, proteinPercentage: 3.3 },
  { id: '3', animalId: '1', date: '2024-01-22', morningYield: 15.0, eveningYield: 14.5, totalYield: 29.5, scc: 125, fatPercentage: 3.7, proteinPercentage: 3.2 },
  { id: '4', animalId: '2', date: '2024-01-20', morningYield: 12.0, eveningYield: 11.5, totalYield: 23.5, scc: 90, fatPercentage: 4.8, proteinPercentage: 3.8 },
  { id: '5', animalId: '2', date: '2024-01-21', morningYield: 12.3, eveningYield: 12.0, totalYield: 24.3, scc: 85, fatPercentage: 4.9, proteinPercentage: 3.9 },
  { id: '6', animalId: '6', date: '2024-01-20', morningYield: 14.0, eveningYield: 13.5, totalYield: 27.5, scc: 100, fatPercentage: 4.0, proteinPercentage: 3.4 },
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'vaccination',
    title: 'Vaccination Due',
    description: 'Annual BVD vaccination due for Bella (HC-001)',
    dueDate: '2024-01-25',
    animalId: '1',
    isRead: false,
    priority: 'high'
  },
  {
    id: '2',
    type: 'calving',
    title: 'Expected Calving',
    description: 'Rosie (HC-003) expected to calve within 2 weeks',
    dueDate: '2024-02-05',
    animalId: '3',
    isRead: false,
    priority: 'high'
  },
  {
    id: '3',
    type: 'breeding',
    title: 'Heat Detection',
    description: 'Clover (HC-006) showing signs of heat',
    dueDate: '2024-01-21',
    animalId: '6',
    isRead: true,
    priority: 'medium'
  },
  {
    id: '4',
    type: 'health',
    title: 'Follow-up Required',
    description: 'Daisy (HC-002) needs follow-up check after mastitis treatment',
    dueDate: '2024-01-23',
    animalId: '2',
    isRead: false,
    priority: 'medium'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalHerd: 48,
  lactatingCows: 32,
  dryCows: 8,
  heifers: 6,
  bulls: 2,
  todayMilkYield: 856.5,
  avgMilkPerCow: 26.8,
  pendingAlerts: 3
};

export const weeklyMilkData = [
  { day: 'Mon', yield: 825 },
  { day: 'Tue', yield: 842 },
  { day: 'Wed', yield: 856 },
  { day: 'Thu', yield: 838 },
  { day: 'Fri', yield: 861 },
  { day: 'Sat', yield: 849 },
  { day: 'Sun', yield: 856 },
];

export const herdComposition = [
  { name: 'Lactating', value: 32, color: 'hsl(var(--chart-1))' },
  { name: 'Dry', value: 8, color: 'hsl(var(--chart-2))' },
  { name: 'Heifers', value: 6, color: 'hsl(var(--chart-3))' },
  { name: 'Bulls', value: 2, color: 'hsl(var(--chart-4))' },
];

// Breeding Records
export const mockBreedingRecords: BreedingRecord[] = [
  {
    id: '1',
    animalId: '3',
    date: '2024-01-20',
    type: 'insemination',
    sireId: '5',
    sireName: 'Max',
    technician: 'John Doe',
    result: 'pending',
    notes: 'First service this cycle'
  },
  {
    id: '2',
    animalId: '6',
    date: '2024-01-21',
    type: 'heat_detection',
    notes: 'Strong standing heat observed at 6am'
  },
  {
    id: '3',
    animalId: '1',
    date: '2023-11-15',
    type: 'pregnancy_check',
    result: 'negative',
    notes: 'Recheck in 21 days'
  },
  {
    id: '4',
    animalId: '2',
    date: '2023-10-05',
    type: 'calving',
    notes: 'Normal delivery, heifer calf born'
  }
];

// Feed Items
export const mockFeedItems: FeedItem[] = [
  { id: '1', name: 'Corn Silage', category: 'forage', unit: 'kg', costPerUnit: 0.08, currentStock: 5000, minimumStock: 1000 },
  { id: '2', name: 'Alfalfa Hay', category: 'forage', unit: 'kg', costPerUnit: 0.15, currentStock: 2000, minimumStock: 500 },
  { id: '3', name: 'Dairy Concentrate', category: 'concentrate', unit: 'kg', costPerUnit: 0.45, currentStock: 800, minimumStock: 200 },
  { id: '4', name: 'Soybean Meal', category: 'concentrate', unit: 'kg', costPerUnit: 0.55, currentStock: 400, minimumStock: 100 },
  { id: '5', name: 'Mineral Mix', category: 'mineral', unit: 'kg', costPerUnit: 1.20, currentStock: 150, minimumStock: 50 },
  { id: '6', name: 'Rolled Corn', category: 'grain', unit: 'kg', costPerUnit: 0.28, currentStock: 1200, minimumStock: 300 },
];

// Financial Transactions
export const mockTransactions: Transaction[] = [
  { id: '1', date: '2024-01-20', type: 'income', category: 'Milk Sales', amount: 2450.00, description: 'Weekly milk payment' },
  { id: '2', date: '2024-01-19', type: 'expense', category: 'Feed', amount: 850.00, description: 'Concentrate feed purchase' },
  { id: '3', date: '2024-01-18', type: 'expense', category: 'Veterinary', amount: 320.00, description: 'Monthly vet visit' },
  { id: '4', date: '2024-01-17', type: 'income', category: 'Livestock Sales', amount: 1800.00, description: 'Sold bull calf' },
  { id: '5', date: '2024-01-15', type: 'expense', category: 'Labor', amount: 1200.00, description: 'Staff wages' },
  { id: '6', date: '2024-01-14', type: 'expense', category: 'Utilities', amount: 280.00, description: 'Electricity bill' },
  { id: '7', date: '2024-01-12', type: 'income', category: 'Milk Sales', amount: 2380.00, description: 'Weekly milk payment' },
  { id: '8', date: '2024-01-10', type: 'expense', category: 'Equipment', amount: 450.00, description: 'Milking machine parts' },
];

export const monthlyFinancialData = [
  { month: 'Jan', income: 9800, expenses: 6200 },
  { month: 'Feb', income: 10200, expenses: 5800 },
  { month: 'Mar', income: 11500, expenses: 6400 },
  { month: 'Apr', income: 10800, expenses: 5900 },
  { month: 'May', income: 12000, expenses: 6100 },
  { month: 'Jun', income: 11200, expenses: 6500 },
];
