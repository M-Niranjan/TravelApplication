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
  CheckCircle2
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
  const [selectedDestId, setSelectedDestId] = useState(DESTINATIONS[0].id);

  const activeDest = DESTINATIONS.find((d) => d.id === selectedDestId) || DESTINATIONS[0];

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

  return (
    <section id="packing-assistant" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#171A19]/10 shadow-lg">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#171A19]/08 mb-6 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#2F6F68]/10 text-[#2F6F68] text-[10px] font-bold uppercase tracking-wider mb-2">
              <Luggage className="w-3.5 h-3.5" />
              <span>TRAVEL PREPARATION</span>
            </div>
            <h3 className="font-editorial text-3xl font-bold text-[#171A19]">
              Smart Packing Checklist
            </h3>
            <p className="text-xs text-[#68706D] font-light mt-1">
              Essential gear, documents, and outfits tailored for your upcoming journey.
            </p>
          </div>

          {/* Progress Bar & Destination Pill */}
          <div className="bg-[#F7F5F0] p-4 rounded-2xl border border-[#171A19]/06 sm:min-w-[240px]">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-[#171A19]">Luggage Readiness</span>
              <span className="text-[#2F6F68]">{progressPercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-black/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-[#2F6F68] rounded-full"
              />
            </div>
            <div className="text-[10px] text-[#68706D] mt-1.5 flex items-center justify-between">
              <span>{completedCount} of {items.length} items packed</span>
              {progressPercent === 100 && (
                <span className="text-[#2F6F68] font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Ready!</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-3 mb-6">
          {[
            { id: 'all', label: 'All Items', icon: <Luggage className="w-3.5 h-3.5" /> },
            { id: 'docs', label: 'Documents', icon: <FileText className="w-3.5 h-3.5" /> },
            { id: 'clothing', label: 'Clothing', icon: <Shirt className="w-3.5 h-3.5" /> },
            { id: 'tech', label: 'Tech & Power', icon: <Smartphone className="w-3.5 h-3.5" /> },
            { id: 'health', label: 'Health & Care', icon: <HeartPulse className="w-3.5 h-3.5" /> }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 min-h-[38px] ${
                activeCategory === cat.id
                  ? 'bg-[#2F6F68] text-white shadow-sm'
                  : 'bg-[#F7F5F0] text-[#68706D] hover:text-[#171A19] border border-[#171A19]/06'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Add Item Input Form */}
        <form onSubmit={addItem} className="flex items-center space-x-2 mb-6">
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Add a custom item to your checklist (e.g. Hiking boots, Camera lenses)..."
            className="flex-1 bg-[#F7F5F0] border border-[#171A19]/10 rounded-full px-4 py-2.5 text-xs text-[#171A19] placeholder-[#68706D] focus:outline-none focus:border-[#2F6F68] min-h-[42px]"
          />
          <button
            type="submit"
            disabled={!newItemText.trim()}
            className="px-5 py-2.5 rounded-full bg-[#101413] hover:bg-black text-white font-bold text-xs flex items-center space-x-1.5 disabled:opacity-40 min-h-[42px] transition-transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Item</span>
          </button>
        </form>

        {/* Interactive Checklist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                item.checked
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                  : 'bg-[#F7F5F0] hover:bg-[#2F6F68]/05 border-[#171A19]/06 text-[#171A19]'
              }`}
            >
              <div className="flex items-center space-x-3">
                {item.checked ? (
                  <CheckSquare className="w-5 h-5 text-[#2F6F68] shrink-0" />
                ) : (
                  <Square className="w-5 h-5 text-[#68706D] shrink-0" />
                )}
                <span className={`text-xs font-semibold select-none ${item.checked ? 'line-through text-emerald-800 opacity-75' : ''}`}>
                  {item.text}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteItem(item.id);
                }}
                className="p-1 text-[#68706D] hover:text-red-600 opacity-60 hover:opacity-100 transition-opacity"
                title="Remove item"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
