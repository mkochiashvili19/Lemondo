import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  CreditCard, 
  Users, 
  PieChart, 
  Settings,
  Wallet
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'მთავარი', icon: <LayoutDashboard size={20} /> },
    { id: 'invoices', label: 'ინვოისები', icon: <FileText size={20} /> },
    { id: 'expenses', label: 'ხარჯები', icon: <CreditCard size={20} /> },
    { id: 'customers', label: 'კლიენტები', icon: <Users size={20} /> },
    { id: 'reports', label: 'რეპორტები', icon: <PieChart size={20} /> },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3 text-white">
        <div className="bg-indigo-500 p-2 rounded-lg">
          <Wallet size={24} className="text-white" />
        </div>
        <span className="text-xl font-bold tracking-wide">ბუღალტერი</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors">
          <Settings size={20} />
          <span className="font-medium">პარამეტრები</span>
        </button>
      </div>
    </aside>
  );
}
