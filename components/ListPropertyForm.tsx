
import React, { useState } from 'react';
import { Property, PropertyType, PricingPlan } from '../types';
import { enhanceDescription } from '../services/geminiService';

interface ListPropertyFormProps {
  plan: PricingPlan | null;
  onSubmit: (property: Property) => void;
}

const ListPropertyForm: React.FC<ListPropertyFormProps> = ({ plan, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    address: '',
    city: '',
    type: PropertyType.APARTMENT,
    bedrooms: '1',
    area: '',
    description: '',
    bullets: '',
    sellerName: '',
    sellerPhone: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const handleAiEnhance = async () => {
    if (!formData.title || !formData.bullets) {
      alert("אנא הזינו כותרת וכמה נקודות מפתח על הנכס קודם.");
      return;
    }
    setIsGenerating(true);
    const enhanced = await enhanceDescription({
      title: formData.title,
      type: formData.type,
      city: formData.city,
      bedrooms: Number(formData.bedrooms),
      area: Number(formData.area),
      bullets: formData.bullets
    });
    setFormData({ ...formData, description: enhanced });
    setIsGenerating(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImage = `https://picsum.photos/seed/prop${Date.now()}/800/600`;
      setImages([...images, newImage]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProperty: Property = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      price: Number(formData.price),
      address: formData.address,
      city: formData.city,
      type: formData.type,
      bedrooms: Number(formData.bedrooms),
      bathrooms: 1,
      area: Number(formData.area),
      description: formData.description,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'],
      sellerName: formData.sellerName,
      sellerPhone: formData.sellerPhone,
      listedAt: new Date(),
      isPremium: plan?.isPremium
    };
    onSubmit(newProperty);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border">
        <div className="bg-[#f7a100] p-10 text-white flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black mb-2">פרסום הנכס שלך</h1>
            <p className="text-orange-100 text-lg">אנחנו כמעט שם. מלאו את פרטי הנכס כדי להתחיל למכור.</p>
          </div>
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl text-center min-w-[120px]">
            <span className="block text-[10px] font-bold uppercase tracking-widest opacity-70">מסלול פעיל</span>
            <span className="block font-black text-xl">{plan?.name || 'בסיסי'}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-10">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center">
              <span className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-sm ml-3">1</span>
              פרטים בסיסיים
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">כותרת המודעה</label>
                <input 
                  required
                  type="text" 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none transition"
                  placeholder="לדוגמה: דירת 4 חדרים מרווחת עם נוף לים"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">מחיר מבוקש (₪)</label>
                <input 
                  required
                  type="number" 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none transition"
                  placeholder="2500000"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">סוג הנכס</label>
                <select 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none transition"
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value as PropertyType})}
                >
                  <option value={PropertyType.APARTMENT}>דירה</option>
                  <option value={PropertyType.HOUSE}>בית פרטי</option>
                  <option value={PropertyType.STUDIO}>סטודיו</option>
                  <option value={PropertyType.VILLA}>וילה</option>
                </select>
              </div>
              <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">כתובת</label>
                  <input required type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-400" placeholder="רחוב ומספר בית" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">עיר</label>
                  <input required type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-400" placeholder="לדוגמה: תל אביב" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center">
              <span className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-sm ml-3">2</span>
              תמונות ומדיה
            </h2>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center hover:border-orange-400 transition cursor-pointer relative">
              <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageUpload} />
              <div className="space-y-2">
                <svg className="w-12 h-12 mx-auto text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                <p className="text-slate-600 font-bold">לחצו כאן או גררו תמונות להעלאה</p>
                <p className="text-slate-400 text-sm">ניתן להעלות עד {plan?.isPremium ? '25' : '10'} תמונות (לפי המסלול שלכם)</p>
              </div>
            </div>
            {images.length > 0 && (
              <div className="flex gap-4 overflow-x-auto py-2">
                {images.map((img, idx) => (
                  <img key={idx} src={img} className="w-24 h-24 object-cover rounded-lg border shadow-sm" alt="Preview" />
                ))}
              </div>
            )}
          </section>

          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center">
                <span className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-sm mr-3">3</span>
                תיאור הנכס
              </h2>
              <button 
                type="button"
                onClick={handleAiEnhance}
                disabled={isGenerating}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2 space-x-reverse"
              >
                {isGenerating ? <span>כותב...</span> : (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/></svg>
                    <span>כתוב עבורי עם AI</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-slate-500 text-sm">הזינו נקודות מפתח (לדוגמה: קרוב לפארק, מטבח חדש, כיווני אוויר...), ואז לחצו על הכפתור כדי שה-AI יכתוב תיאור מקצועי.</p>
            <textarea 
              rows={3}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none transition mb-4"
              placeholder="נקודות מפתח (למשל: משופצת מהיסוד, נוף פתוח, מזגן בכל חדר...)"
              value={formData.bullets}
              onChange={e => setFormData({...formData, bullets: e.target.value})}
            />
            <textarea 
              required
              rows={8}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none transition"
              placeholder="תאר את הבית שלך בהרחבה..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </section>

          <section className="space-y-6 pb-10">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center">
              <span className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-sm mr-3">4</span>
              פרטי קשר
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">שם מלא של המוכר</label>
                <input required type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-400" value={formData.sellerName} onChange={e => setFormData({...formData, sellerName: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">מספר טלפון</label>
                <input required type="tel" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-400" value={formData.sellerPhone} onChange={e => setFormData({...formData, sellerPhone: e.target.value})} />
              </div>
            </div>
          </section>

          <div className="pt-8 border-t">
            <button 
              type="submit"
              className="w-full bg-[#f7a100] text-white py-6 rounded-2xl font-black text-2xl shadow-xl hover:bg-[#e69500] hover:scale-[1.02] active:scale-95 transition-all duration-300"
            >
              פרסם מודעה
            </button>
            <p className="text-center text-slate-400 text-sm mt-6">
              בלחיצה על פרסום, אתם מסכימים לתנאי השימוש ולהנחיות למכירה ישירה.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListPropertyForm;
