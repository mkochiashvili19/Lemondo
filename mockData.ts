import { Transaction, Invoice, ChartData } from '../types.ts';

export const chartData: ChartData[] = [
  { name: 'იან', შემოსავალი: 4000, ხარჯი: 2400 },
  { name: 'თებ', შემოსავალი: 3000, ხარჯი: 1398 },
  { name: 'მარ', შემოსავალი: 2000, ხარჯი: 9800 },
  { name: 'აპრ', შემოსავალი: 2780, ხარჯი: 3908 },
  { name: 'მაი', შემოსავალი: 1890, ხარჯი: 4800 },
  { name: 'ივნ', შემოსავალი: 2390, ხარჯი: 3800 },
  { name: 'ივლ', შემოსავალი: 3490, ხარჯი: 4300 },
];

export const recentTransactions: Transaction[] = [
  { id: 'TRX-001', date: '2023-10-25', description: 'ვებსაიტის შექმნა - შპს ალფა', amount: 2500, type: 'income', category: 'მომსახურება', status: 'completed' },
  { id: 'TRX-002', date: '2023-10-24', description: 'ოფისის იჯარა', amount: 800, type: 'expense', category: 'იჯარა', status: 'completed' },
  { id: 'TRX-003', date: '2023-10-22', description: 'მარკეტინგული კამპანია (Facebook)', amount: 350, type: 'expense', category: 'მარკეტინგი', status: 'completed' },
  { id: 'TRX-004', date: '2023-10-20', description: 'კონსულტაცია - გიორგი მაისურაძე', amount: 400, type: 'income', category: 'კონსულტაცია', status: 'pending' },
];

export const invoices: Invoice[] = [
  { id: 'INV-2023-041', clientName: 'შპს ტექნოგრუპი', date: '2023-10-01', dueDate: '2023-10-15', amount: 1200, status: 'overdue' },
  { id: 'INV-2023-042', clientName: 'ინდ. მეწარმე ნინო', date: '2023-10-10', dueDate: '2023-10-24', amount: 450, status: 'paid' },
  { id: 'INV-2023-043', clientName: 'სს გლობალ ნეტვორქს', date: '2023-10-20', dueDate: '2023-11-04', amount: 3400, status: 'pending' },
  { id: 'INV-2023-044', clientName: 'შპს მეგა სერვისი', date: '2023-10-25', dueDate: '2023-11-09', amount: 890, status: 'pending' },
];
