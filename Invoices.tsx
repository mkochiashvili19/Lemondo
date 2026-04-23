import React, { useState } from 'react';
import { Plus, Filter, Download, MoreHorizontal, X } from 'lucide-react';
import { useData } from '../context/DataContext.tsx';

export default function Invoices() {
  const { invoices, addInvoice } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form state
  const [clientName, setClientName] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !amount || !dueDate) return;

    addInvoice({
      clientName,
      amount: Number(amount),
      dueDate,
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    });

    // Reset and close
    setClientName('');
    setAmount('');
    setDueDate('');
    setIsModalOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">გადახდილი</span>;
      case 'pending':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">მოლოდინში</span>;
      case 'overdue':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-700">ვადაგადაცილებული</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ინვოისები</h1>
          <p className="text-gray-500 mt-1">მართეთ თქვენი გაგზავნილი ინვოისები</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <Filter size={16} />
            ფილტრი
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm"
          >
            <Plus size={16} />
            ახალი ინვოისი
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-sm">
                <th className="p-4 font-medium">ინვოისის #</th>
                <th className="p-4 font-medium">კლიენტი</th>
                <th className="p-4 font-medium">თარიღი</th>
                <th className="p-4 font-medium">გადახდის ვადა</th>
                <th className="p-4 font-medium">თანხა</th>
                <th className="p-4 font-medium">სტატუსი</th>
                <th className="p-4 font-medium text-right">მოქმედება</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm font-medium text-gray-900">{invoice.id}</td>
                  <td className="p-4 text-sm text-gray-700">{invoice.clientName}</td>
                  <td className="p-4 text-sm text-gray-500">{invoice.date}</td>
                  <td className="p-4 text-sm text-gray-500">{invoice.dueDate}</td>
                  <td className="p-4 text-sm font-semibold text-gray-900">₾ {invoice.amount.toLocaleString()}</td>
                  <td className="p-4">{getStatusBadge(invoice.status)}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors rounded-lg hover:bg-indigo-50">
                        <Download size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-100">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {invoices.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    ინვოისები არ მოიძებნა
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
          <span>ნაჩვენებია 1-დან {invoices.length}-მდე (სულ {invoices.length})</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50" disabled>წინა</button>
            <button className="px-3 py-1 border border-gray-300 rounded bg-indigo-50 text-indigo-600 font-medium">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50" disabled>შემდეგი</button>
          </div>
        </div>
      </div>

      {/* Add Invoice Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">ახალი ინვოისი</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">კლიენტის სახელი</label>
                <input 
                  type="text" 
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="მაგ: შპს ალფა"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">თანხა (₾)</label>
                <input 
                  type="number" 
                  required
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">გადახდის ვადა</label>
                <input 
                  type="date" 
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="pt-4 flex gap-3 justify-end">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                >
                  გაუქმება
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  შენახვა
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
