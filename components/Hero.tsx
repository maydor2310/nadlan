
import React, { useState } from 'react';
import { FilterState, PropertyType } from '../types';

interface HeroProps {
  onSearch: (filters: FilterState) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');
  
  const handleSearch = () => {
    onSearch({
      city,
      minPrice: 0,
      maxPrice: 10000000,
      type: 'All',
      minBedrooms: 0
    });
  };

  return (
    <div className="relative h-[550px] flex items-center justify-center overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80" 
        alt="Hero background" 
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      />
      
      <div className="relative z-10 text-center px-4 w-full max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-lg leading-tight">
          מצאו את הבית החדש שלכם, <br/>
          <span className="text-[#f7a100]">בלי לשלם עמלת תיווך.</span>
        </h1>
        <p className="text-xl text-slate-100 mb-10 drop-shadow">
          אלפי נכסים ישירות מהבעלים. בטוח, ישיר, ומשתלם יותר.
        </p>

        <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
          <input 
            type="text" 
            placeholder="חפש לפי עיר, שכונה או רחוב..."
            className="flex-grow px-6 py-4 text-lg border-none focus:ring-0 rounded-xl outline-none"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={handleSearch}
            className="bg-[#f7a100] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#e69500] transition shadow-lg whitespace-nowrap"
          >
            חפש נכסים
          </button>
        </div>
        
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-white font-medium">
          <div className="flex items-center">
            <svg className="w-5 h-5 ml-2 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
            תקשורת ישירה
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 ml-2 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
            0% עמלת תיווך
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 ml-2 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
            בעלים מאומתים
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
