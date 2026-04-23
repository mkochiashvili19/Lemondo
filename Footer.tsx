import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="flex items-center gap-2 mb-4">
          <span>შექმნილია</span>
          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          <span>Vertex AI Studio-ს მიერ</span>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} AI Web Builder. ყველა უფლება დაცულია.
        </p>
      </div>
    </footer>
  );
}