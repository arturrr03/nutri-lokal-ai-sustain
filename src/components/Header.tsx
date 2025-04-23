
import React from 'react';
import { Check, MessageCircle } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-flow text-white py-4 px-6 rounded-b-lg shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">NutriLokal</h1>
            <p className="text-xs opacity-90 flex items-center">
              <Check className="h-3 w-3 mr-1" /> 
              Solusi Gizi Lokal Terjangkau
            </p>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="px-4 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
            Powered by Gemini AI
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
