
import React, { useState } from 'react';
import { Property, PropertyType } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PropertyDetailProps {
  property: Property;
}

const translateType = (type: PropertyType) => {
  const map = {
    [PropertyType.HOUSE]: 'בית פרטי',
    [PropertyType.APARTMENT]: 'דירה',
    [PropertyType.STUDIO]: 'סטודיו',
    [PropertyType.VILLA]: 'וילה'
  };
  return map[type] || type;
};

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
  const [activeImage, setActiveImage] = useState(0);

  const trendData = [
    { name: '2020', price: property.price * 0.82 },
    { name: '2021', price: property.price * 0.88 },
    { name: '2022', price: property.price * 0.95 },
    { name: '2023', price: property.price * 0.98 },
    { name: '2024', price: property.price },
  ];

  return (
    <div className="bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow space-y-8">
            <div className="space-y-4">
              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-200 shadow-lg">
                <img 
                  src={property.images[activeImage]} 
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {property.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden border-2 transition ${activeImage === idx ? 'border-[#f7a100]' : 'border-transparent'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${idx}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 mb-2">{property.title}</h1>
                  <p className="text-xl text-slate-500 font-medium">{property.address}, {property.city}</p>
                </div>
                <div className="text-left">
                  <span className="block text-3xl font-black text-blue-600">₪ {property.price.toLocaleString()}</span>
                  <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">מחיר סופי</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-y my-8">
                <div className="text-center">
                  <span className="block text-2xl font-bold text-slate-800">{property.area} מ״ר</span>
                  <span className="text-slate-400 text-xs font-bold uppercase">שטח בנוי</span>
                </div>
                <div className="text-center border-r">
                  <span className="block text-2xl font-bold text-slate-800">{property.bedrooms}</span>
                  <span className="text-slate-400 text-xs font-bold uppercase">חדרי שינה</span>
                </div>
                <div className="text-center border-r">
                  <span className="block text-2xl font-bold text-slate-800">{property.bathrooms}</span>
                  <span className="text-slate-400 text-xs font-bold uppercase">חדרי רחצה</span>
                </div>
                <div className="text-center border-r">
                  <span className="block text-2xl font-bold text-slate-800">{Math.round(property.price / property.area).toLocaleString()}</span>
                  <span className="text-slate-400 text-xs font-bold uppercase">מחיר למ״ר</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-800 mb-4">תיאור הנכס</h2>
              <div className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                {property.description}
              </div>
              
              <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-xl flex items-center space-x-4 space-x-reverse">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM5.884 6.68a1 1 0 101.454-1.373L6.554 4.52a1 1 0 00-1.454 1.373l.784.787zm9.593-1.373a1 1 0 10-1.454 1.373l.784.787a1 1 0 001.454-1.373l-.784-.787zM8 11a2 2 0 114 0 2 2 0 01-4 0zM5.5 14a.5.5 0 110-1 .5.5 0 010 1zm1.44-.92a.5.5 0 11-.707-.707.5.5 0 01.707.707zM11 14a.5.5 0 110-1 .5.5 0 010 1zm1.44-.92a.5.5 0 11-.707-.707.5.5 0 01.707.707zM15.5 14a.5.5 0 110-1 .5.5 0 010 1z"/><path fillRule="evenodd" d="M10 21c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16z" clipRule="evenodd"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-orange-800">מכירה ישירה מהבעלים</h4>
                  <p className="text-sm text-orange-700">חסכו כ-₪ {(property.price * 0.02).toLocaleString()} בעמלות תיווך בקנייה ישירה.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">מגמות שוק ב{property.city}</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                      formatter={(value: any) => [`₪ ${value.toLocaleString()}`, 'מחיר ממוצע']}
                    />
                    <Line type="monotone" dataKey="price" stroke="#f7a100" strokeWidth={4} dot={{r: 6, fill: '#f7a100', strokeWidth: 2, stroke: '#fff'}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-slate-400 text-xs mt-4 italic text-center">מבוסס על נתוני קהילה ומידע גלוי באזור.</p>
            </div>
          </div>

          <div className="w-full lg:w-96 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-slate-100 sticky top-24">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                צור קשר עם המוכר
                <span className="mr-auto bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full">מחובר</span>
              </h3>
              
              <div className="flex items-center space-x-4 space-x-reverse mb-8">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-600 border-2 border-white shadow-sm">
                  {property.sellerName.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-lg">{property.sellerName}</p>
                  <p className="text-slate-400 text-sm">בעלים באתר מ-2022</p>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-[#f7a100] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#e69500] transition flex items-center justify-center space-x-2 space-x-reverse">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  <span>שלח הודעה</span>
                </button>
                <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition flex items-center justify-center space-x-2 space-x-reverse">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  <span>הצג מספר טלפון</span>
                </button>
              </div>

              <div className="mt-8 pt-8 border-t">
                <div className="flex items-center text-sm text-slate-500 mb-4">
                  <svg className="w-5 h-5 ml-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  מודעה מאומתת
                </div>
                <div className="flex items-center text-sm text-slate-500">
                  <svg className="w-5 h-5 ml-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"/></svg>
                  ליווי משפטי זמין באתר
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
