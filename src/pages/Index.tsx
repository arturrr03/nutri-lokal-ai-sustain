
import React, { useState } from 'react';
import Header from '@/components/Header';
import ChatInterface from '@/components/ChatInterface';
import InfoSection from '@/components/InfoSection';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  // Featured local foods for the banner section
  const featuredFoods = [
    { name: 'Tempe', nutrient: 'Protein', benefit: 'Pembentukan otot' },
    { name: 'Ubi Jalar', nutrient: 'Vitamin A', benefit: 'Kesehatan mata' },
    { name: 'Kangkung', nutrient: 'Zat besi', benefit: 'Mencegah anemia' },
    { name: 'Ikan Teri', nutrient: 'Kalsium', benefit: 'Kesehatan tulang' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <section className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-nutrilokal-green-dark">
            Solusi Gizi Berbasis <span className="text-nutrilokal-blue-dark">Pangan Lokal</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            NutriLokal membantu Anda menemukan cara terbaik untuk memenuhi kebutuhan gizi dengan 
            memanfaatkan bahan makanan lokal yang terjangkau dan bergizi.
          </p>
        </section>

        {/* Featured Local Foods */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-center mb-4 text-nutrilokal-blue-dark">
            Pangan Lokal Kaya Nutrisi
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredFoods.map((food, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow pulse-animation"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <h3 className="font-medium text-nutrilokal-green-dark">{food.name}</h3>
                <div className="text-xs text-gray-500">Sumber {food.nutrient}</div>
                <div className="mt-1 text-sm">{food.benefit}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Chat Interface */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-center mb-4 text-nutrilokal-blue-dark">
            Tanya NutriLokal
          </h2>
          <div className="max-w-4xl mx-auto">
            <ChatInterface />
          </div>
          <div className="mt-4 text-sm text-center text-gray-600">
            Tanyakan tentang nilai gizi makanan lokal, resep sehat, atau kebutuhan nutrisi spesifik.
          </div>
        </section>

        {/* Info Section */}
        <InfoSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
