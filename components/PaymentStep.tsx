
import React, { useState } from 'react';
import { PricingPlan } from '../types';

interface PaymentStepProps {
  plan: PricingPlan;
  onPaymentSuccess: () => void;
}

const PaymentStep: React.FC<PaymentStepProps> = ({ plan, onPaymentSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">פרטי תשלום</h2>
            <p className="text-slate-400 text-sm">סיכום הזמנה: {plan.name}</p>
          </div>
          <div className="text-left">
            <span className="text-3xl font-black">₪{plan.price}</span>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">כולל מע״מ</p>
          </div>
        </div>

        <form onSubmit={handlePay} className="p-10 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">שם בעל הכרטיס</label>
              <input required type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none" placeholder="ישראל ישראלי" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">מספר כרטיס</label>
              <div className="relative">
                <input required type="text" maxLength={16} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none" placeholder="**** **** **** ****" />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex space-x-2 space-x-reverse opacity-40">
                  <div className="w-8 h-5 bg-slate-300 rounded"></div>
                  <div className="w-8 h-5 bg-slate-300 rounded"></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">תוקף</label>
                <input required type="text" maxLength={5} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none" placeholder="MM/YY" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">CVV</label>
                <input required type="text" maxLength={3} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none" placeholder="123" />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit"
              disabled={isProcessing}
              className={`w-full py-5 rounded-2xl font-black text-xl transition-all ${
                isProcessing 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                : 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg active:scale-95'
              }`}
            >
              {isProcessing ? 'מעבד תשלום...' : `שלם ₪${plan.price} והמשך לפרסום`}
            </button>
            <div className="mt-6 flex items-center justify-center text-slate-400 text-xs">
              <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
              תשלום מאובטח בתקן SSL מחמיר
            </div>
          </div>
        </form>
      </div>
      
      <div className="mt-8 text-center">
        <button onClick={() => window.history.back()} className="text-slate-400 text-sm hover:text-slate-600">ביטול וחזרה</button>
      </div>
    </div>
  );
};

export default PaymentStep;
