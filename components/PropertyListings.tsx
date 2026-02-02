
import React from 'react';
import { Property, PropertyType } from '../types';

interface PropertyListingsProps {
  properties: Property[];
  onPropertyClick: (id: string) => void;
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

const PropertyListings: React.FC<PropertyListingsProps> = ({ properties, onPropertyClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map(property => (
        <div 
          key={property.id} 
          className="bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
          onClick={() => onPropertyClick(property.id)}
        >
          <div className="relative h-64 overflow-hidden">
            <img 
              src={property.images[0]} 
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 uppercase tracking-wider">
                {translateType(property.type)}
              </span>
              {property.isPremium && (
                <span className="bg-[#f7a100] px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-sm">
                  נכס מומלץ
                </span>
              )}
            </div>
            <div className="absolute bottom-4 right-4">
              <span className="bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xl font-bold">
                ₪ {property.price.toLocaleString()}
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition truncate">
              {property.title}
            </h3>
            <p className="text-slate-500 text-sm mb-4 flex items-center">
              <svg className="w-4 h-4 ml-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              {property.address}, {property.city}
            </p>
            
            <div className="flex items-center justify-between border-t pt-4 text-slate-600 text-sm font-medium">
              <div className="flex items-center">
                <span className="font-bold text-slate-800 ml-1">{property.bedrooms}</span> חד׳
              </div>
              <div className="flex items-center">
                <span className="font-bold text-slate-800 ml-1">{property.bathrooms}</span> רחצה
              </div>
              <div className="flex items-center">
                <span className="font-bold text-slate-800 ml-1">{property.area}</span> מ״ר
              </div>
            </div>

            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 uppercase">
                  {property.sellerName.charAt(0)}
                </div>
                <span className="text-xs text-slate-500 font-medium">נמכר ע״י {property.sellerName}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
                מכירה ישירה
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyListings;
