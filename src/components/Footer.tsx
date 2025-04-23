
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 mt-8 py-6 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-nutrilokal-green-dark font-bold text-lg mb-2">NutriLokal</h3>
            <p className="text-sm text-gray-600">
              Solusi Gizi Inklusif untuk Ketahanan Pangan dan Kesejahteraan
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-600 mb-2">
              Mendukung Tujuan Pembangunan Berkelanjutan (SDGs)
            </p>
            <div className="flex justify-center md:justify-end space-x-2">
              <div className="bg-nutrilokal-blue-dark text-white text-xs px-2 py-1 rounded">SDG 2</div>
              <div className="bg-nutrilokal-green-dark text-white text-xs px-2 py-1 rounded">SDG 3</div>
              <div className="bg-nutrilokal-orange-dark text-white text-xs px-2 py-1 rounded">SDG 1</div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-300 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} NutriLokal. Powered by Gemini AI
        </div>
      </div>
    </footer>
  );
};

export default Footer;
