
import React from 'react';
import { PricingPlan } from '../types';

const PLANS: PricingPlan[] = [
  {
    id: 'basic',
    name: 'מסלול בסיסי',
    price: 249,
    isPremium: false,
    features: [
      'פרסום נכס למשך שנה',
      'תיאור נכס מבוסס AI',
      'עד 10 תמונות',
      'קשר ישיר עם קונים',
      '0% עמלת תיווך'
    ]
  },
  {
    id: 'premium',
    name: 'מסלול פרימיום',
    price: 499,
    isPremium: true,
    features: [
      'פרסום נכס למשך שנה',
      'מיקום מודגש בתוצאות החיפוש',
      'תיאור נכס AI משודרג',
      'עד 25 תמונות',
      'ליווי משפטי טלפוני',
      'דו"ח הערכת שווי לנכס'
    ]
  }
];

interface PricingProps {
  onSelectPlan: (plan: PricingPlan) => void;
}

const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black text-slate-900 mb-4">בחרו את חבילת הפרסום שלכם</h1>
        <p className="text-xl text-slate-500">תשלום שנתי אחד, בלי הפתעות ובלי עמלות תיווך בקצה.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PLANS.map(plan => (
          <div 
            key={plan.id}
            className={`bg-white rounded-3xl p-8 border-2 transition-all duration-300 flex flex-col ${
              plan.isPremium ? 'border-orange-500 shadow-xl scale-105' : 'border-slate-100 shadow-sm'
            }`}
          >
            {plan.isPremium && (
              <div className="bg-orange-500 text-white text-xs font-bold py-1 px-4 rounded-full self-start mb-4 uppercase tracking-wider">
                הכי משתלם
              </div>
            )}
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
            <div className="flex items-baseline mb-8">
              <span className="text-5xl font-black text-slate-900">₪{plan.price}</span>
              <span className="text-slate-400 mr-2 text-lg">/ שנה</span>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-slate-600">
                  <svg className="w-5 h-5 text-green-500 ml-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button 
              onClick={() => onSelectPlan(plan)}
              className={`w-full py-4 rounded-xl font-bold text-lg transition ${
                plan.isPremium 
                ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg' 
                : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              בחירה במסלול זה
            </button>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-slate-100 p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6">
        <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-sm flex-shrink-0">
          💡
        </div>
        <div>
          <h4 className="font-bold text-slate-800 mb-1">יודעים כמה תחסכו?</h4>
          <p className="text-slate-500">
            בעסקה של 2 מיליון ש״ח, עמלת תיווך ממוצעת היא 40,000 ש״ח (2%). בנדל״ן ישיר אתם משלמים רק את דמי הפרסום השנתיים וחוסכים את כל השאר.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
