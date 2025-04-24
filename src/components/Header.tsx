import React from 'react';
import { Check, MessageCircle } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 text-white py-5 px-8 rounded-b-3xl shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/10 to-transparent blur-2xl opacity-20 z-0" />
      <div className="container mx-auto flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-full bg-white/30 border border-white/20 flex items-center justify-center backdrop-blur-md shadow-md hover:scale-105 transition-transform duration-300">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-wide drop-shadow-md">NutriLokal</h1>
            <p className="text-sm flex items-center text-white/90">
              <Check className="h-4 w-4 mr-1 text-lime-200" />
              Solusi Gizi Lokal Terjangkau
            </p>
          </div>
        </div>
       
      </div>
    </header>
  );
}

export default Header;
