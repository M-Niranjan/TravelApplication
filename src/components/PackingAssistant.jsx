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
    { id: 'all', label: 'All Items', icon: <ListChecks className="w-3.5 h-3.5" /> },
    { id: 'docs', label: 'Documents', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'clothing', label: 'Clothing', icon: <Shirt className="w-3.5 h-3.5" /> },
    { id: 'tech', label: 'Electronics', icon: <Smartphone className="w-3.5 h-3.5" /> },
    { id: 'health', label: 'Health & Care', icon: <HeartPulse className="w-3.5 h-3.5" /> }
  ];

  return (
    <div id="packing-assistant" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#101413]/08 shadow-luxury space-y-8">
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#101413]/08 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1B4944]/10 text-[#1B4944] text-[10px] font-bold uppercase tracking-wider mb-2">
              <Luggage className="w-3.5 h-3.5 text-[#C29C61]" />
              <span>Smart Travel Gear</span>
            </div>
            <h3 className="font-editorial text-2xl sm:text-4xl font-bold text-[#101413]">
              Packing Checklist & Readiness
            </h3>
            <p className="text-xs text-[#586260] font-light mt-1">
              Keep track of essential travel documents, gear, electronics, and wardrobe.
            </p>
          </div>

          {/* Readiness Gauge */}
          <div className="bg-[#F9F8F5] p-4 rounded-2xl border border-[#101413]/06 min-w-[200px]">
            <div className="flex justify-between items-center text-xs font-bold mb-1.5">
              <span className="text-[#101413]">Luggage Readiness</span>
              <span className="text-[#1B4944]">{progressPercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-[#1B4944] to-[#24655D] rounded-full"
              />
            </div>
            <span className="text-[10px] text-[#586260] block mt-1">
              {completedCount} of {items.length} items packed
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                activeCategory === cat.id
                  ? 'bg-[#1B4944] text-white shadow-sm'
                  : 'bg-[#F9F8F5] text-[#586260] hover:text-[#101413] hover:bg-black/5'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Add New Item Form */}
        <form onSubmit={addItem} className="flex gap-2">
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Add custom packing item (e.g. Scuba goggles, hiking socks)..."
            className="flex-1 bg-[#F9F8F5] border border-[#101413]/10 rounded-2xl px-4 py-3 text-xs sm:text-sm font-medium text-[#101413] focus:outline-none focus:border-[#1B4944]"
          />
          <button
            type="submit"
            disabled={!newItemText.trim()}
            className="px-6 py-3 rounded-2xl bg-[#1B4944] hover:bg-[#24655D] text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm disabled:opacity-40 transition-transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Item</span>
          </button>
        </form>

        {/* Packing Items List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer select-none group ${
                item.checked
                  ? 'bg-[#1B4944]/05 border-[#1B4944]/20 text-[#8A9592]'
                  : 'bg-[#F9F8F5] border-transparent hover:border-[#101413]/10 text-[#101413]'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-colors ${
                  item.checked ? 'bg-[#1B4944] text-white' : 'border-2 border-gray-300'
                }`}>
                  {item.checked && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>

                <span className={`text-xs font-medium ${item.checked ? 'line-through text-[#8A9592]' : 'text-[#101413]'}`}>
                  {item.text}
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteItem(item.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-rose-500 transition-opacity"
                title="Remove item"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
