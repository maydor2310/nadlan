
import React from 'react';

interface HeaderProps {
  onNavigate: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div 
          className="flex items-center cursor-pointer"
          onClick={() => onNavigate('/')}
        >
          <div className="w-10 h-10 bg-[#f7a100] rounded-lg flex items-center justify-center font-bold text-white text-2xl ml-3">
            נ
          </div>
          <span className="text-2xl font-black text-slate-800 tracking-tight">נדל״ן ישיר</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
          <button onClick={() => onNavigate('/search')} className="font-medium text-slate-600 hover:text-[#f7a100] transition">קנייה</button>
          <button onClick={() => onNavigate('/add-listing')} className="font-medium text-slate-600 hover:text-[#f7a100] transition">מכירה ישירה</button>
          <button className="font-medium text-slate-600 hover:text-[#f7a100] transition">איך זה עובד?</button>
        </nav>

        <div className="flex items-center space-x-4 space-x-reverse">
          <button className="hidden sm:block text-slate-600 font-medium px-4 py-2 hover:bg-slate-50 rounded-lg transition">התחברות</button>
          <button 
            onClick={() => onNavigate('/add-listing')}
            className="bg-[#f7a100] text-white px-6 py-2.5 rounded-lg font-bold shadow-md hover:bg-[#e69500] transition transform active:scale-95"
          >
            פרסם נכס
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
