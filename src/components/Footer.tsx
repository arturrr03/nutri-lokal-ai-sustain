import React, { useState } from 'react';

const Footer: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100; // Convert height to meters

    if (!weightNum || !heightNum) {
      alert('Masukkan berat dan tinggi badan yang valid!');
      return;
    }

    const bmiValue = weightNum / (heightNum * heightNum);
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setCategory('Kekurangan Berat Badan');
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setCategory('Normal');
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setCategory('Kelebihan Berat Badan');
    } else {
      setCategory('Obesitas');
    }
  };

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

        {/* BMI Calculator Section */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold text-nutrilokal-green-dark mb-4">Kalkulator BMI</h4>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="number"
              placeholder="Berat (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-nutrilokal-green"
            />
            <input
              type="number"
              placeholder="Tinggi (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-nutrilokal-green"
            />
            <button
              onClick={calculateBMI}
              className="bg-nutrilokal-green text-white px-4 py-2 rounded-lg shadow-md hover:bg-emerald-600 transition"
            >
              Hitung BMI
            </button>
          </div>
          {bmi !== null && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-700">BMI Anda: <span className="font-bold">{bmi.toFixed(1)}</span></p>
              <p className="text-sm text-gray-700">Kategori: <span className="font-bold">{category}</span></p>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-300 text-center text-xs font-bold text-gray-500">
          &copy; {new Date().getFullYear()} NutriLokal.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
