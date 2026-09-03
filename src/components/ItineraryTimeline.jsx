import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  Printer, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Sparkles, 
  Compass, 
  Layers, 
  CheckCircle2,
  MapPin
} from 'lucide-react';

function generatePrintHTML(itinerary) {
  const now = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const totalActivities = itinerary.days?.reduce(
    (sum, day) => sum + (day.activities?.length || 0),
    0
  ) || 0;

  const daysHTML = itinerary.days
    ?.map((dayObj) => {
      const activitiesHTML = dayObj.activities
        ?.map(
          (act) => `
          <div class="activity-card">
            <div class="activity-left">
              <div class="time-badge">${act.time || ''}</div>
              <div class="activity-info">
                <div class="activity-title">
                  <span class="dot"></span>
                  ${act.title || ''}
                </div>
                <div class="activity-desc">${act.description || ''}</div>
              </div>
            </div>
            ${act.duration ? `<div class="duration-pill">⏱ ${act.duration}</div>` : ''}
          </div>
        `
        )
        .join('');

      return `
        <div class="day-block">
          <div class="day-header">
            <div class="day-number">${dayObj.day}</div>
            <div class="day-header-text">
              <div class="day-label">DAY ${String(dayObj.day).padStart(2, '0')}</div>
              <div class="day-title">${dayObj.title || ''}</div>
            </div>
          </div>
          <div class="activities-list">
            ${activitiesHTML}
          </div>
        </div>
      `;
    })
    .join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${itinerary.destination} — Travel Itinerary</title>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @page { size: A4; margin: 18mm 14mm 18mm 14mm; }
        body {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #0F172A;
          background: #ffffff;
          font-size: 11px;
          line-height: 1.6;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding-bottom: 20px;
          border-bottom: 3px solid #2563EB;
          margin-bottom: 24px;
        }
        .brand { display: flex; align-items: center; gap: 12px; }
        .brand-icon {
          width: 44px; height: 44px; border-radius: 12px;
          background: #2563EB; color: #fff; display: flex;
          align-items: center; justify-content: center; font-size: 20px;
        }
        .brand-name { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 20px; color: #0F172A; }
        .brand-sub { font-size: 9px; color: #2563EB; text-transform: uppercase; letter-spacing: 2px; font-weight: 700; margin-top: 2px; }
        .header-meta { text-align: right; font-size: 9px; color: #64748b; line-height: 1.8; }
        .dest-section { margin-bottom: 28px; }
        .dest-title { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 26px; color: #0F172A; margin-bottom: 6px; }
        .dest-overview { font-size: 11px; color: #475569; line-height: 1.6; max-width: 520px; }
        .stats-row { display: flex; gap: 14px; margin-top: 12px; }
        .stat-chip {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 5px 12px; border-radius: 20px; background: #EFF6FF;
          color: #1D4ED8; font-size: 10px; font-weight: 700;
        }
        .day-block { margin-bottom: 22px; page-break-inside: avoid; }
        .day-header {
          display: flex; align-items: center; gap: 12px; padding: 10px 14px;
          background: #F8FAFC; border-radius: 10px; border-left: 4px solid #2563EB; margin-bottom: 10px;
        }
        .day-number {
          width: 32px; height: 32px; border-radius: 50%; background: #2563EB;
          color: #fff; font-weight: 700; font-size: 13px; display: flex;
          align-items: center; justify-content: center; flex-shrink: 0;
        }
        .day-label { font-size: 9px; text-transform: uppercase; letter-spacing: 2px; color: #2563EB; font-weight: 700; }
        .day-title { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 15px; color: #0F172A; margin-top: 1px; }
        .activities-list { padding-left: 28px; border-left: 2px solid #E2E8F0; margin-left: 15px; }
        .activity-card {
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 12px; padding: 9px 12px; margin-bottom: 8px; border-radius: 8px;
          border: 1px solid #E2E8F0; background: #fff; page-break-inside: avoid;
        }
        .activity-left { display: flex; align-items: flex-start; gap: 10px; flex: 1; }
        .time-badge {
          background: #EFF6FF; color: #2563EB; font-weight: 700; font-size: 9px;
          padding: 3px 8px; border-radius: 6px; white-space: nowrap; flex-shrink: 0; margin-top: 2px;
        }
        .activity-info { flex: 1; }
        .activity-title { font-weight: 700; font-size: 11.5px; color: #0F172A; display: flex; align-items: center; gap: 6px; }
        .dot { width: 6px; height: 6px; border-radius: 50%; background: #F43F5E; flex-shrink: 0; }
        .activity-desc { font-size: 10px; color: #475569; margin-top: 2px; line-height: 1.5; padding-left: 12px; }
        .duration-pill { font-size: 9px; color: #475569; font-weight: 600; background: #F1F5F9; padding: 3px 8px; border-radius: 20px; }
        .print-footer { margin-top: 32px; padding-top: 14px; border-top: 1px solid #E2E8F0; display: flex; align-items: center; justify-content: space-between; }
        .print-footer-left, .print-footer-right { font-size: 8.5px; color: #94A3B8; }
        .print-btn-bar { position: fixed; bottom: 0; left: 0; right: 0; background: #fff; border-top: 1px solid #eee; padding: 12px 24px; display: flex; justify-content: center; z-index: 100; }
        .print-btn { padding: 10px 28px; background: #2563EB; color: #fff; border: none; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; }
        @media print { .print-btn-bar { display: none !important; } }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="brand">
          <div class="brand-icon">✈</div>
          <div>
            <div class="brand-name">Aetheria Luxe</div>
            <div class="brand-sub">AI-Powered Day-by-Day Plan</div>
          </div>
        </div>
        <div class="header-meta">
          <div><strong>Generated:</strong> ${now}</div>
          <div><strong>Duration:</strong> ${itinerary.days?.length || 0} Days</div>
          <div><strong>Activities:</strong> ${totalActivities} Total</div>
        </div>
      </div>
      <div class="dest-section">
        <div class="dest-title">${itinerary.destination || 'Travel Itinerary'}</div>
        ${itinerary.overview ? `<div class="dest-overview">${itinerary.overview}</div>` : ''}
        <div class="stats-row">
          <div class="stat-chip">📅 ${itinerary.days?.length || 0} Days</div>
          <div class="stat-chip">📍 ${totalActivities} Activities</div>
          <div class="stat-chip">✈ ${itinerary.destination || ''}</div>
        </div>
      </div>
      ${daysHTML}
      <div class="print-footer">
        <div class="print-footer-left">Generated by <strong>Aetheria</strong> · AI-Powered Itinerary Planner</div>
        <div class="print-footer-right">${now} · ${itinerary.destination}</div>
      </div>
      <div class="print-btn-bar">
        <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
      </div>
    </body>
    </html>
  `;
}

export default function ItineraryTimeline({ itinerary }) {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [viewMode, setViewMode] = useState('carousel');

  const daysList = itinerary?.days || [];
  const currentDay = daysList[activeDayIndex] || daysList[0];

  useEffect(() => {
    setActiveDayIndex(0);
  }, [itinerary]);

  const handlePrint = () => {
    const printHTML = generatePrintHTML(itinerary);
    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (printWindow) {
      printWindow.document.write(printHTML);
      printWindow.document.close();
    }
  };

  if (!itinerary || daysList.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-luxury space-y-6"
    >
      
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-blue-600">
              DAY-BY-DAY SCHEDULE
            </span>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
              {daysList.length} Days Total
            </span>
          </div>
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            {itinerary.destination} Journey
          </h3>
          <p className="text-xs text-slate-600 font-light mt-1 max-w-lg leading-relaxed">
            {itinerary.overview}
          </p>
        </div>

        {/* View Mode & Print Buttons */}
        <div className="flex items-center space-x-2 shrink-0">
          <div className="bg-slate-100 p-1 rounded-full border border-slate-200/80 flex items-center">
            <button
              onClick={() => setViewMode('carousel')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'carousel' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Day View
            </button>
            <button
              onClick={() => setViewMode('full')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'full' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Full Plan
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={handlePrint}
            className="p-2.5 rounded-full bg-slate-900 hover:bg-black text-white shadow-sm transition-all min-h-[38px] min-w-[38px] flex items-center justify-center cursor-pointer"
            title="Print or Save PDF"
          >
            <Printer className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* 2. Interactive Day Carousel Mode */}
      {viewMode === 'carousel' && (
        <div className="space-y-5">
          
          {/* Horizontal Day Navigation Ribbon */}
          <div className="flex items-center justify-between gap-2 pb-2">
            
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setActiveDayIndex((prev) => Math.max(prev - 1, 0))}
              disabled={activeDayIndex === 0}
              className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
              title="Previous Day"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>

            {/* Scrollable Day Pills */}
            <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1 px-1 flex-1 justify-start sm:justify-center">
              {daysList.map((dayObj, idx) => {
                const isActive = idx === activeDayIndex;
                return (
                  <motion.button
                    whileTap={{ scale: 0.94 }}
                    key={dayObj.day}
                    onClick={() => setActiveDayIndex(idx)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all min-h-[34px] flex items-center space-x-1 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/25 scale-105'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                    }`}
                  >
                    <span>Day {dayObj.day < 10 ? `0${dayObj.day}` : dayObj.day}</span>
                  </motion.button>
                );
              })}
            </div>

            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setActiveDayIndex((prev) => Math.min(prev + 1, daysList.length - 1))}
              disabled={activeDayIndex === daysList.length - 1}
              className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
              title="Next Day"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>

          </div>

          {/* Current Day Showcase Card with Slide Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDay.day}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-5"
            >
              {/* Day Header Banner */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-sm flex items-center justify-center shadow-md shadow-blue-500/20">
                    {currentDay.day}
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 block">
                      DAY {currentDay.day < 10 ? `0${currentDay.day}` : currentDay.day} OF {daysList.length}
                    </span>
                    <h4 className="font-editorial text-xl font-bold text-slate-900">
                      {currentDay.title}
                    </h4>
                  </div>
                </div>

                <div className="text-xs font-bold text-slate-500 hidden sm:block">
                  {currentDay.activities?.length || 3} Activities
                </div>
              </div>

              {/* Day Activity Cards */}
              <div className="space-y-3">
                {currentDay.activities?.map((act, aIdx) => (
                  <motion.div
                    whileHover={{ x: 4 }}
                    key={aIdx}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-400/40 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
                  >
                    <div className="flex items-start space-x-3.5">
                      <div className="text-xs font-extrabold text-blue-700 bg-blue-50 border border-blue-200/60 px-2.5 py-1 rounded-xl shrink-0 mt-0.5">
                        {act.time}
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                          <span className="w-2 h-2 rounded-full bg-rose-500" />
                          <span>{act.title}</span>
                        </h5>
                        <p className="text-xs text-slate-600 leading-relaxed mt-1 font-light">
                          {act.description}
                        </p>
                      </div>
                    </div>

                    {act.duration && (
                      <div className="flex items-center space-x-1 text-[11px] text-slate-600 font-bold bg-slate-100 px-3 py-1 rounded-full shrink-0 self-start sm:self-auto">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        <span>{act.duration}</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Bottom Quick Day Switcher Footer */}
              <div className="pt-2 flex items-center justify-between text-xs font-bold text-blue-600">
                <button
                  onClick={() => setActiveDayIndex((prev) => Math.max(prev - 1, 0))}
                  disabled={activeDayIndex === 0}
                  className="hover:underline disabled:opacity-0 transition-opacity flex items-center space-x-1 min-h-[36px] cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous Day</span>
                </button>

                <span className="text-[11px] text-slate-400 font-normal">
                  Swipe or click tabs to explore
                </span>

                <button
                  onClick={() => setActiveDayIndex((prev) => Math.min(prev + 1, daysList.length - 1))}
                  disabled={activeDayIndex === daysList.length - 1}
                  className="hover:underline disabled:opacity-0 transition-opacity flex items-center space-x-1 min-h-[36px] cursor-pointer"
                >
                  <span>Next Day</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      )}

      {/* 3. Full Overview Mode */}
      {viewMode === 'full' && (
        <div className="space-y-3 max-h-[500px] overflow-y-auto no-scrollbar pr-1">
          {daysList.map((dayObj) => (
            <div key={dayObj.day} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shadow-sm">
                    {dayObj.day}
                  </span>
                  <span className="font-bold text-xs text-slate-900">{dayObj.title}</span>
                </div>
                <button
                  onClick={() => {
                    setActiveDayIndex(dayObj.day - 1);
                    setViewMode('carousel');
                  }}
                  className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  Open Day View →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </motion.div>
  );
}
