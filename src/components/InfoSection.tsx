
import React from 'react';

interface InfoCardProps {
  title: string;
  content: string;
  icon: React.ReactNode;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, content, icon, className }) => {
  return (
    <div className={`bg-white/80 backdrop-blur-sm p-5 rounded-xl shadow-md transition-all hover:shadow-lg ${className}`}>
      <div className="flex items-center mb-3">
        <div className="mr-3 text-nutrilokal-blue">{icon}</div>
        <h3 className="text-lg font-semibold text-nutrilokal-blue-dark">{title}</h3>
      </div>
      <p className="text-gray-700 text-sm">{content}</p>
    </div>
  );
};

const InfoSection: React.FC = () => {
  return (
    <section className="py-6 px-4">
      <h2 className="text-xl font-bold text-center mb-6 text-nutrilokal-green-dark">Mengapa NutriLokal?</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <InfoCard
          title="Promosi Pangan Lokal"
          content="Mendorong konsumsi makanan lokal yang terjangkau dan bergizi untuk mendukung ekonomi petani dan ketahanan pangan nasional."
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>}
        />
        
        <InfoCard
          title="Edukasi Gizi"
          content="Informasi nutrisi dalam bahasa yang mudah dipahami untuk membantu keluarga membuat keputusan makan yang lebih baik."
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>}
        />
        
        <InfoCard
          title="Mencegah Stunting"
          content="Panduan nutrisi khusus untuk anak-anak dan ibu hamil untuk mengatasi masalah stunting di Indonesia."
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>}
          className="md:col-span-2 lg:col-span-1"
        />
      </div>
      
      <div className="mt-8 bg-nutrilokal-green/10 p-4 rounded-lg">
        <h3 className="font-medium text-nutrilokal-green-dark mb-2">Tujuan Pembangunan Berkelanjutan (SDGs)</h3>
        <p className="text-sm text-gray-700">
          NutriLokal mendukung SDG 2 (Tanpa Kelaparan), SDG 3 (Kesehatan yang Baik), dan SDG 1 (Tanpa Kemiskinan) 
          dengan mempromosikan pola makan sehat berbasis pangan lokal yang terjangkau.
        </p>
      </div>
    </section>
  );
};

export default InfoSection;
