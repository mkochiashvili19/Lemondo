import React, { useState } from 'react';
import Sidebar from './components/Sidebar.tsx';
import Header from './components/Header.tsx';
import Dashboard from './components/Dashboard.tsx';
import Invoices from './components/Invoices.tsx';
import Expenses from './components/Expenses.tsx';
import { DataProvider } from './context/DataContext.tsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'invoices':
        return <Invoices />;
      case 'expenses':
        return <Expenses />;
      case 'customers':
      case 'reports':
        return (
          <div className="p-8 flex flex-col items-center justify-center h-[60vh] text-gray-500">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">მალე დაემატება</h2>
            <p>ეს მოდული ამჟამად დამუშავების პროცესშია.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <DataProvider>
      <div className="flex h-screen bg-gray-50 overflow-hidden font-sans selection:bg-indigo-200 selection:text-indigo-900">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </DataProvider>
  );
}
