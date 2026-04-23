import React from 'react';
import { Code, Sparkles, Rocket } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/1920/1080?blur=2')] bg-cover bg-center mix-blend-overlay"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 bg-indigo-500 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col items-center text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
          <Sparkles className="w-4 h-4 text-indigo-300" />
          <span className="text-sm font-medium text-indigo-100">დიახ, შემიძლია დაგეხმაროთ!</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          ვებსაიტების შექმნა <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            მარტივად და სწრაფად
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl max-w-3xl text-slate-300 mb-10 leading-relaxed">
          მე ვარ AI ასისტენტი. შემიძლია შეგიქმნათ თანამედროვე, რესპონსიული და ულამაზესი ვებ-აპლიკაციები React-ისა და Tailwind CSS-ის გამოყენებით.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button className="bg-indigo-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 hover:-translate-y-1">
            <Rocket size={20} />
            დავიწყოთ მუშაობა
          </button>
          <button className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all backdrop-blur-sm flex items-center justify-center gap-2 hover:-translate-y-1">
            <Code size={20} />
            კოდის ნახვა
          </button>
        </div>
      </div>
    </section>
  );
}