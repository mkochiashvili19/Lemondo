import React from 'react';
import { Bell, Search, Plus } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 h-20 px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-96 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:bg-white transition-all">
        <Search size={18} className="text-gray-400" />
        <input 
          type="text" 
          placeholder="ძიება (მაგ: ინვოისი, კლიენტი...)" 
          className="bg-transparent border-none outline-none ml-3 w-full text-sm text-gray-700 placeholder-gray-400"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors shadow-sm">
          <Plus size={16} />
          ახალი ჩანაწერი
        </button>
        
        <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
            3
          </span>
        </button>

        <div className="flex items-center gap-3 border-l border-gray-200 pl-6 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
            გმ
          </div>
          <div className="hidden md:block text-sm">
            <p className="font-semibold text-gray-700">გიორგი მ.</p>
            <p className="text-gray-500 text-xs">ადმინისტრატორი</p>
          </div>
        </div>
      </div>
    </header>
  );
}
