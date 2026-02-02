
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PropertyListings from './components/PropertyListings';
import PropertyDetail from './components/PropertyDetail';
import ListPropertyForm from './components/ListPropertyForm';
import Pricing from './components/Pricing';
import PaymentStep from './components/PaymentStep';
import { Property, FilterState, PropertyType, PricingPlan } from './types';

const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'פנטהאוז מודרני עם נוף לעיר',
    price: 3850000,
    address: 'רוטשילד 45',
    city: 'תל אביב',
    type: PropertyType.APARTMENT,
    bedrooms: 4,
    bathrooms: 2,
    area: 120,
    description: 'פנטהאוז משופץ ומעוצב בלב העיר. קנייה ישירה מהבעלים וחוסכים מעל 70,000 ש״ח בעמלות תיווך! מרפסת שמש גדולה ונוף פנורמי.',
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80'],
    sellerName: 'יוסי כהן',
    sellerPhone: '054-1234567',
    listedAt: new Date(),
    isPremium: true
  },
  {
    id: '2',
    title: 'בית משפחתי מרווח עם גינה',
    price: 4625000,
    address: 'האורנים 12',
    city: 'רעננה',
    type: PropertyType.HOUSE,
    bedrooms: 5,
    bathrooms: 3,
    area: 185,
    description: 'בית מושלם למשפחה עם גינה ענקית. מכירה ישירה ללא מתווכים. הבית עבר שיפוץ מקיף ב-2023.',
    images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'],
    sellerName: 'מיכל לוי',
    sellerPhone: '052-8765432',
    listedAt: new Date(Date.now() - 86400000),
  }
];

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'list' | 'detail' | 'pricing' | 'payment' | 'add'>('home');
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    city: '',
    minPrice: 0,
    maxPrice: 10000000,
    type: 'All',
    minBedrooms: 0
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/property/')) {
        const id = hash.split('#/property/')[1];
        setSelectedPropertyId(id);
        setView('detail');
      } else if (hash === '#/add-listing') {
        setView('pricing');
      } else if (hash === '#/search') {
        setView('list');
      } else if (hash === '#/payment') {
        setView('payment');
      } else if (hash === '#/listing-form') {
        setView('add');
      } else {
        setView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (path: string) => {
    window.location.hash = path;
  };

  const filteredProperties = properties.filter(p => {
    const matchesCity = !filters.city || p.city.toLowerCase().includes(filters.city.toLowerCase());
    const matchesPrice = p.price >= filters.minPrice && p.price <= filters.maxPrice;
    const matchesType = filters.type === 'All' || p.type === filters.type;
    const matchesBeds = p.bedrooms >= filters.minBedrooms;
    return matchesCity && matchesPrice && matchesType && matchesBeds;
  });

  const selectedProperty = properties.find(p => p.id === selectedPropertyId);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={navigateTo} />
      
      <main className="flex-grow">
        {view === 'home' && (
          <>
            <Hero onSearch={(f) => { setFilters(f); navigateTo('/search'); }} />
            <div className="max-w-7xl mx-auto px-4 py-12 text-center border-b bg-white">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">למה למכור בנדל״ן ישיר?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto py-8">
                <div className="p-6 rounded-2xl bg-orange-50 border border-orange-100">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">₪</div>
                  <h3 className="font-bold mb-2">0% עמלת תיווך</h3>
                  <p className="text-slate-600 text-sm">הכסף נשאר אצלכם בכיס. חיסכון של עשרות אלפי שקלים.</p>
                </div>
                <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">⚡</div>
                  <h3 className="font-bold mb-2">תהליך מהיר</h3>
                  <p className="text-slate-600 text-sm">קשר ישיר עם הקונים. ללא עיכובים של מתווכים.</p>
                </div>
                <div className="p-6 rounded-2xl bg-green-50 border border-green-100">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">🛡️</div>
                  <h3 className="font-bold mb-2">ביטחון מלא</h3>
                  <p className="text-slate-600 text-sm">ליווי משפטי ואימות מוכרים מובנה בפלטפורמה.</p>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-12">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-slate-800">נכסים נבחרים</h2>
                </div>
                <button onClick={() => navigateTo('/search')} className="text-blue-600 font-semibold hover:underline">צפה בכל הנכסים ←</button>
              </div>
              <PropertyListings 
                properties={properties.filter(p => p.isPremium).slice(0, 3)} 
                onPropertyClick={(id) => navigateTo(`/property/${id}`)}
              />
            </div>
          </>
        )}

        {view === 'list' && (
          <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-72 flex-shrink-0">
              <div className="bg-white p-6 rounded-xl shadow-sm border sticky top-24">
                <h3 className="font-bold text-lg mb-4">סינון תוצאות</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">עיר / אזור</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 p-2 border rounded-md outline-none focus:ring-1 focus:ring-orange-400"
                      value={filters.city}
                      onChange={(e) => setFilters({...filters, city: e.target.value})}
                      placeholder="לדוגמה: תל אביב"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">מחיר מקסימלי</label>
                    <select 
                      className="w-full mt-1 p-2 border rounded-md"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({...filters, maxPrice: Number(e.target.value)})}
                    >
                      <option value={2000000}>עד 2 מיליון ₪</option>
                      <option value={3500000}>עד 3.5 מיליון ₪</option>
                      <option value={5000000}>עד 5 מיליון ₪</option>
                      <option value={10000000}>ללא הגבלה</option>
                    </select>
                  </div>
                </div>
              </div>
            </aside>
            <div className="flex-grow">
              <h1 className="text-2xl font-bold mb-6">נמצאו {filteredProperties.length} נכסים</h1>
              <PropertyListings 
                properties={filteredProperties} 
                onPropertyClick={(id) => navigateTo(`/property/${id}`)}
              />
            </div>
          </div>
        )}

        {view === 'pricing' && (
          <Pricing onSelectPlan={(plan) => {
            setSelectedPlan(plan);
            navigateTo('/payment');
          }} />
        )}

        {view === 'payment' && selectedPlan && (
          <PaymentStep plan={selectedPlan} onPaymentSuccess={() => {
            navigateTo('/listing-form');
          }} />
        )}

        {view === 'add' && (
          <ListPropertyForm plan={selectedPlan} onSubmit={(p) => {
            const finalProp = {...p, isPremium: selectedPlan?.isPremium};
            setProperties([finalProp, ...properties]);
            navigateTo(`/property/${finalProp.id}`);
          }} />
        )}

        {view === 'detail' && selectedProperty && (
          <PropertyDetail property={selectedProperty} />
        )}
      </main>

      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="bg-orange-500 p-1 rounded ml-2">נ</span> נדל״ן ישיר
            </h3>
            <p className="text-slate-400 max-w-sm">
              הדרך המהפכנית לקנות ולמכור נדל״ן בישראל. 
              ללא מתווכים, ללא עמלות מיותרות, הכל ישירות מהבעלים.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">קישורים מהירים</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => navigateTo('/')} className="hover:text-orange-400">דף הבית</button></li>
              <li><button onClick={() => navigateTo('/search')} className="hover:text-orange-400">חיפוש נכסים</button></li>
              <li><button onClick={() => navigateTo('/add-listing')} className="hover:text-orange-400">פרסום נכס למכירה</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">תמיכה</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-orange-400">מדריך בטיחות</a></li>
              <li><a href="#" className="hover:text-orange-400">מסמכים משפטיים</a></li>
              <li><a href="#" className="hover:text-orange-400">צור קשר</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} נדל״ן ישיר. זירת המסחר הישירה בישראל.
        </div>
      </footer>
    </div>
  );
};

export default App;
