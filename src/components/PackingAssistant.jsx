import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckSquare, 
  Square, 
  Sparkles, 
  Luggage, 
  FileText, 
  Shirt, 
  Smartphone, 
  HeartPulse, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ListChecks 
} from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';

const DEFAULT_PACKING_ITEMS = [
  { id: 'doc-1', category: 'docs', text: 'Passport & Travel Visas (or National ID)', checked: true },
  { id: 'doc-2', category: 'docs', text: 'Flight tickets & Hotel confirmation bookings', checked: true },
  { id: 'doc-3', category: 'docs', text: 'International Travel & Medical Insurance cards', checked: false },
  { id: 'doc-4', category: 'docs', text: 'Credit/Debit cards & local currency cash', checked: false },
  
  { id: 'clt-1', category: 'clothing', text: 'Comfortable walking shoes (broken-in sneakers)', checked: false },
  { id: 'clt-2', category: 'clothing', text: 'Lightweight breathable shirts / tops', checked: false },
  { id: 'clt-3', category: 'clothing', text: 'Light jacket or evening layers', checked: false },
  { id: 'clt-4', category: 'clothing', text: 'Sunglasses & UV protection hat', checked: false },
  
  { id: 'tch-1', category: 'tech', text: 'Universal power plug adapter', checked: false },
  { id: 'tch-2', category: 'tech', text: 'Portable power bank (10,000mAh+)', checked: false },
  { id: 'tch-3', category: 'tech', text: 'Phone charger cables & camera memory card', checked: false },
  { id: 'tch-4', category: 'tech', text: 'Noise-canceling headphones for flight', checked: false },
  
  { id: 'hlt-1', category: 'health', text: 'Prescription medications & mini first-aid kit', checked: false },
  { id: 'hlt-2', category: 'health', text: 'Sunscreen (SPF 50) & Lip balm', checked: false },
  { id: 'hlt-3', category: 'health', text: 'Travel-size toiletries & hand sanitizer', checked: false }
];

export default function PackingAssistant() {
  const [items, setItems] = useState(DEFAULT_PACKING_ITEMS);
  const [activeCategory, setActiveCategory] = useState('all');
  const [newItemText, setNewItemText] = useState('');

  const toggleItem = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const addItem = (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    const newItem = {
      id: `custom-${Date.now()}`,
      category: activeCategory === 'all' ? 'clothing' : activeCategory,
      text: newItemText.trim(),
      checked: false
    };
    setItems((prev) => [newItem, ...prev]);
    setNewItemText('');
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter((item) => item.category === activeCategory);

  const completedCount = items.filter((i) => i.checked).length;
  const progressPercent = Math.round((completedCount / items.length) * 100) || 0;

  const categories = [
    { id: 'all', label: 'All Items', icon: <ListChecks className="w-3.5 h-3.5 text-blue-500" /> },
    { id: 'docs', label: 'Documents', icon: <FileText className="w-3.5 h-3.5 text-blue-500" /> },
    { id: 'clothing', label: 'Clothing', icon: <Shirt className="w-3.5 h-3.5 text-indigo-500" /> },
    { id: 'tech', label: 'Electronics', icon: <Smartphone className="w-3.5 h-3.5 text-purple-500" /> },
    { id: 'health', label: 'Health & Care', icon: <HeartPulse className="w-3.5 h-3.5 text-rose-500" /> }
  ];

  return (
    <div id="packing-assistant" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-luxury space-y-8">
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider mb-2 border border-blue-200/60 shadow-sm">
              <Luggage className="w-3.5 h-3.5 text-rose-500" />
              <span>Smart Travel Gear</span>
            </div>
            <h3 className="font-editorial text-2xl sm:text-4xl font-bold text-slate-900">
              Packing Checklist & Readiness
            </h3>
            <p className="text-xs text-slate-600 font-light mt-1">
              Keep track of essential travel documents, gear, electronics, and wardrobe.
            </p>
          </div>

          {/* Readiness Gauge with Electric Azure to Coral Gradient */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 min-w-[220px]">
            <div className="flex justify-between items-center text-xs font-bold mb-1.5">
              <span className="text-slate-800">Luggage Readiness</span>
              <span className="text-blue-600 font-extrabold">{progressPercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-rose-500 rounded-full shadow-sm"
              />
            </div>
            <span className="text-[10px] text-slate-500 block mt-1 font-medium">
              {completedCount} of {items.length} items packed
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <motion.button
              whileTap={{ scale: 0.94 }}
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
              }`}
            >
              <span className={activeCategory === cat.id ? 'text-white' : ''}>{cat.icon}</span>
              <span>{cat.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Add New Item Form */}
        <form onSubmit={addItem} className="flex gap-2">
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Add custom packing item (e.g. Scuba goggles, hiking socks)..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500"
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!newItemText.trim()}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-blue-500/20 disabled:opacity-40 transition-transform cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Item</span>
          </motion.button>
        </form>

        {/* Packing Items List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredItems.map((item) => (
            <motion.div
              whileHover={{ x: 3 }}
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer select-none group ${
                item.checked
                  ? 'bg-blue-50/50 border-blue-200/80 text-slate-400'
                  : 'bg-slate-50 border-slate-200/70 hover:border-blue-400/40 text-slate-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-colors ${
                  item.checked ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-sm' : 'border-2 border-slate-300 bg-white'
                }`}>
                  {item.checked && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>

                <span className={`text-xs font-medium ${item.checked ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                  {item.text}
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteItem(item.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-rose-500 transition-opacity cursor-pointer"
                title="Remove item"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
