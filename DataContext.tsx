import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Transaction, Invoice, ChartData } from '../types.ts';
import { recentTransactions as initialTransactions, invoices as initialInvoices, chartData } from '../data/mockData.ts';

interface DataContextType {
  transactions: Transaction[];
  invoices: Invoice[];
  chartData: ChartData[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  addInvoice: (invoice: Omit<Invoice, 'id'>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  // Load transactions from localStorage or use initial mock data
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem('bughalteri_transactions');
      return saved ? JSON.parse(saved) : initialTransactions;
    } catch (error) {
      console.error('Error loading transactions from localStorage', error);
      return initialTransactions;
    }
  });

  // Load invoices from localStorage or use initial mock data
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    try {
      const saved = localStorage.getItem('bughalteri_invoices');
      return saved ? JSON.parse(saved) : initialInvoices;
    } catch (error) {
      console.error('Error loading invoices from localStorage', error);
      return initialInvoices;
    }
  });

  // Save to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem('bughalteri_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Save to localStorage whenever invoices change
  useEffect(() => {
    localStorage.setItem('bughalteri_invoices', JSON.stringify(invoices));
  }, [invoices]);

  const addTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: `TRX-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const addInvoice = (invoiceData: Omit<Invoice, 'id'>) => {
    const newInvoice: Invoice = {
      ...invoiceData,
      id: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    };
    setInvoices(prev => [newInvoice, ...prev]);
  };

  return (
    <DataContext.Provider value={{ transactions, invoices, chartData, addTransaction, addInvoice }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
