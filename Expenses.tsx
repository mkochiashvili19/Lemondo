import React, { useState } from 'react';
import { Plus, Filter, Receipt, X } from 'lucide-react';
import { useData } from '../context/DataContext.tsx';

export default function Expenses() {
  const { transactions, addTransaction } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('სხვა');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const expenses = transactions.filter(t => t.type === 'expense');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !date) return;

    addTransaction({
      description,
      amount: Number(amount),
      category,
      date,
      type: 'expense',
      status: 'completed'
    });

    // Reset and close
    setDescription('');
    setAmount('');
    setCategory('სხვა');
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ხარჯები</h1>
          <p className="text-gray-500 mt-1">აკონტროლეთ თქვენი კომპანიის ხარჯები</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <Filter size={16} />
            ფილტრი
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm"
          >
            <Plus size={16} />
            ხარჯის დამატება
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-sm">
                <th className="p-4 font-medium">თარიღი</th>
                <th className="p-4 font-medium">აღწერა</th>
                <th className="p-4 font-medium">კატეგორია</th>
                <th className="p-4 font-medium">თანხა</th>
                <th className="p-4 font-medium text-right">ქვითარი</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {expenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm text-gray-500">{expense.date}</td>
                  <td className="p-4 text-sm font-medium text-gray-900">{expense.description}</td>
                  <td className="p-4 text-sm">
                    <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium">
                      {expense.category}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-semibold text-rose-600">₾ {expense.amount.toLocaleString()}</td>
                  <td className="p-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors rounded-lg hover:bg-indigo-50 inline-flex">
                      <Receipt size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {expenses.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    ხარჯები არ მოიძებნა
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Expense Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">ახალი ხარჯი</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">აღწერა</label>
                <input 
                  type="text" 
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  placeholder="მაგ: ოფისის იჯარა"
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">კატეგორია</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                >
                  <option value="იჯარა">იჯარა</option>
                  <option value="კომუნალური">კომუნალური</option>
                  <option value="მარკეტინგი">მარკეტინგი</option>
                  <option value="ხელფასი">ხელფასი</option>
                  <option value="სხვა">სხვა</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">თარიღი</label>
                <input 
                  type="date" 
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
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
                  className="px-4 py-2 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700 transition-colors"
                >
                  დამატება
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
