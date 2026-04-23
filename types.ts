export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  status: 'completed' | 'pending';
}

export interface Invoice {
  id: string;
  clientName: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
}

export interface ChartData {
  name: string;
  შემოსავალი: number;
  ხარჯი: number;
}
