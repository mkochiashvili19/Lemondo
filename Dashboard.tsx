import React, { useMemo } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp, CreditCard } from 'lucide-react';
import { useData } from '../context/DataContext.tsx';

export default function Dashboard() {
  const { transactions, chartData } = useData();

  // Calculate dynamic stats based on transactions
  const stats = useMemo(() => {
    let income = 0;
    let expense = 0;
    
    transactions.forEach(trx => {
      if (trx.type === 'income') income += trx.amount;
      if (trx.type === 'expense') expense += trx.amount;
    });

    return {
      income,
      expense,
      net: income - expense
    };
  }, [transactions]);

  // Get only the 4 most recent transactions for the dashboard
  const recentTransactionsList = transactions.slice(0, 4);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">მიმოხილვა</h1>
          <p className="text-gray-500 mt-1">თქვენი ფინანსური მდგომარეობა ამ თვეში</p>
        </div>
        <select className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option>ბოლო 30 დღე</option>
          <option>ეს თვე</option>
          <option>წინა თვე</option>
          <option>ეს წელი</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">საერთო შემოსავალი</p>
              <h3 className="text-3xl font-bold text-gray-900">₾ {stats.income.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600">
              <DollarSign size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-emerald-600 flex items-center font-medium">
              <ArrowUpRight size={16} className="mr-1" />
              +12.5%
            </span>
            <span className="text-gray-400 ml-2">წინა თვესთან შედარებით</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">საერთო ხარჯი</p>
              <h3 className="text-3xl font-bold text-gray-900">₾ {stats.expense.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-rose-100 rounded-xl text-rose-600">
              <CreditCard size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-rose-600 flex items-center font-medium">
              <ArrowUpRight size={16} className="mr-1" />
              +4.1%
            </span>
            <span className="text-gray-400 ml-2">წინა თვესთან შედარებით</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">წმინდა მოგება</p>
              <h3 className="text-3xl font-bold text-gray-900">₾ {stats.net.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600">
              <TrendingUp size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-emerald-600 flex items-center font-medium">
              <ArrowUpRight size={16} className="mr-1" />
              +18.2%
            </span>
            <span className="text-gray-400 ml-2">წინა თვესთან შედარებით</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">შემოსავალი vs ხარჯი</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`₾ ${value}`, undefined]}
                />
                <Area type="monotone" dataKey="შემოსავალი" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                <Area type="monotone" dataKey="ხარჯი" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">ბოლო ტრანზაქციები</h3>
            <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800">ყველას ნახვა</button>
          </div>
          <div className="space-y-5">
            {recentTransactionsList.length > 0 ? (
              recentTransactionsList.map((trx) => (
                <div key={trx.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      trx.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                    }`}>
                      {trx.type === 'income' ? <ArrowDownRight size={20} /> : <ArrowUpRight size={20} />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{trx.description}</p>
                      <p className="text-xs text-gray-500">{trx.date} • {trx.category}</p>
                    </div>
                  </div>
                  <div className={`text-sm font-bold ${trx.type === 'income' ? 'text-emerald-600' : 'text-gray-900'}`}>
                    {trx.type === 'income' ? '+' : '-'}₾{trx.amount.toLocaleString()}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">ტრანზაქციები არ მოიძებნა</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
