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
  CheckCircle2 
} from 'lucide-react';

/**
 * Generates a standalone, beautifully formatted HTML document
 * designed specifically for A4 PDF printing.
 */
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
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @page { size: A4; margin: 20mm 16mm 20mm 16mm; }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #1a1a1a;
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
          border-bottom: 3px solid #2F6F68;
          margin-bottom: 28px;
        }
        .brand { display: flex; align-items: center; gap: 12px; }
        .brand-icon {
          width: 44px; height: 44px; border-radius: 12px;
          background: #2F6F68; color: #fff; display: flex;
          align-items: center; justify-content: center; font-size: 20px;
        }
        .brand-name { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 20px; color: #171A19; }
        .brand-sub { font-size: 9px; color: #888; text-transform: uppercase; letter-spacing: 2.5px; font-weight: 600; margin-top: 2px; }
        .header-meta { text-align: right; font-size: 9px; color: #888; line-height: 1.8; }
        .header-meta strong { color: #555; font-weight: 600; }
        .dest-section { margin-bottom: 32px; }
        .dest-title { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 28px; color: #171A19; margin-bottom: 6px; }
        .dest-overview { font-size: 11px; color: #666; line-height: 1.7; max-width: 520px; }
        .stats-row { display: flex; gap: 16px; margin-top: 14px; }
        .stat-chip {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 5px 12px; border-radius: 20px; background: #f0f7f6;
          color: #2F6F68; font-size: 10px; font-weight: 600;
        }
        .day-block { margin-bottom: 24px; page-break-inside: avoid; }
        .day-header {
          display: flex; align-items: center; gap: 14px; padding: 12px 16px;
          background: #f8f7f4; border-radius: 10px; border-left: 4px solid #2F6F68; margin-bottom: 12px;
        }
        .day-number {
          width: 36px; height: 36px; border-radius: 50%; background: #2F6F68;
          color: #fff; font-weight: 700; font-size: 14px; display: flex;
          align-items: center; justify-content: center; flex-shrink: 0;
        }
        .day-label { font-size: 9px; text-transform: uppercase; letter-spacing: 2px; color: #2F6F68; font-weight: 700; }
        .day-title { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 16px; color: #171A19; margin-top: 1px; }
        .activities-list { padding-left: 32px; border-left: 2px solid #e0e0e0; margin-left: 18px; }
        .activity-card {
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 12px; padding: 10px 14px; margin-bottom: 8px; border-radius: 8px;
          border: 1px solid #eee; background: #fff; page-break-inside: avoid;
        }
        .activity-left { display: flex; align-items: flex-start; gap: 10px; flex: 1; }
        .time-badge {
          background: #eef7f6; color: #2F6F68; font-weight: 700; font-size: 9px;
          padding: 3px 8px; border-radius: 6px; white-space: nowrap; flex-shrink: 0; margin-top: 2px;
        }
        .activity-info { flex: 1; }
        .activity-title { font-weight: 600; font-size: 11.5px; color: #1a1a1a; display: flex; align-items: center; gap: 6px; }
        .dot { width: 6px; height: 6px; border-radius: 50%; background: #D8B98A; flex-shrink: 0; }
        .activity-desc { font-size: 10px; color: #777; margin-top: 3px; line-height: 1.5; padding-left: 12px; }
        .duration-pill { font-size: 9px; color: #666; font-weight: 500; background: #f5f5f2; padding: 4px 10px; border-radius: 20px; }
        .print-footer { margin-top: 36px; padding-top: 16px; border-top: 1px solid #ddd; display: flex; align-items: center; justify-content: space-between; }
        .print-footer-left, .print-footer-right { font-size: 8.5px; color: #aaa; }
        .print-btn-bar { position: fixed; bottom: 0; left: 0; right: 0; background: #fff; border-top: 1px solid #eee; padding: 12px 24px; display: flex; justify-content: center; z-index: 100; }
        .print-btn { padding: 10px 28px; background: #2F6F68; color: #fff; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; }
        @media print { .print-btn-bar { display: none !important; } }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="brand">
          <div class="brand-icon">✈</div>
          <div>
            <div class="brand-name">Travel Explorer</div>
            <div class="brand-sub">AI-Powered Itinerary</div>
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
        <div class="print-footer-left">Generated by <strong>Travel Explorer</strong> · AI-Powered Itinerary Planner</div>
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
  const [viewMode, setViewMode] = useState('carousel'); // 'carousel' or 'full'

  const daysList = itinerary?.days || [];
  const currentDay = daysList[activeDayIndex] || daysList[0];

  // Reset to day 1 if itinerary days change
  useEffect(() => {
    setActiveDayIndex(0);
  }, [itinerary]);

  // Open clean printable A4 document
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
      className="bg-white p-6 sm:p-8 rounded-3xl border border-[#171A19]/10 shadow-lg space-y-6"
    >
      
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#171A19]/08 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#2F6F68]">
              DAY-BY-DAY SCHEDULE
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#2F6F68]/10 text-[#2F6F68]">
              {daysList.length} Days Total
            </span>
          </div>
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#171A19] mt-1">
            {itinerary.destination} Journey
          </h3>
          <p className="text-xs text-[#68706D] font-light mt-1 max-w-lg">
            {itinerary.overview}
          </p>
        </div>

        {/* View Mode & Print Buttons */}
        <div className="flex items-center space-x-2 shrink-0">
          <div className="bg-[#F7F5F0] p-1 rounded-full border border-[#171A19]/06 flex items-center">
            <button
              onClick={() => setViewMode('carousel')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                viewMode === 'carousel' ? 'bg-[#2F6F68] text-white shadow-sm' : 'text-[#68706D] hover:text-[#171A19]'
              }`}
            >
              Day View
            </button>
            <button
              onClick={() => setViewMode('full')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                viewMode === 'full' ? 'bg-[#2F6F68] text-white shadow-sm' : 'text-[#68706D] hover:text-[#171A19]'
              }`}
            >
              Full Plan
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="p-2.5 rounded-full bg-[#101413] hover:bg-black text-white shadow-sm transition-transform active:scale-95"
            title="Print or Save PDF"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Interactive Day Carousel / Stepper Mode (Zero Long Scrolling) */}
      {viewMode === 'carousel' && (
        <div className="space-y-5">
          
          {/* Horizontal Day Navigation Ribbon */}
          <div className="flex items-center justify-between gap-2 pb-2">
            
            <button
              onClick={() => setActiveDayIndex((prev) => Math.max(prev - 1, 0))}
              disabled={activeDayIndex === 0}
              className="p-2 rounded-xl bg-[#F7F5F0] hover:bg-[#2F6F68]/10 text-[#171A19] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="Previous Day"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Scrollable Day Pills */}
            <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1 px-1 flex-1 justify-start sm:justify-center">
              {daysList.map((dayObj, idx) => {
                const isActive = idx === activeDayIndex;
                return (
                  <button
                    key={dayObj.day}
                    onClick={() => setActiveDayIndex(idx)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all min-h-[34px] flex items-center space-x-1 ${
                      isActive
                        ? 'bg-[#2F6F68] text-white shadow-md scale-105'
                        : 'bg-[#F7F5F0] text-[#68706D] hover:text-[#171A19] hover:bg-black/5'
                    }`}
                  >
                    <span>Day {dayObj.day < 10 ? `0${dayObj.day}` : dayObj.day}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setActiveDayIndex((prev) => Math.min(prev + 1, daysList.length - 1))}
              disabled={activeDayIndex === daysList.length - 1}
              className="p-2 rounded-xl bg-[#F7F5F0] hover:bg-[#2F6F68]/10 text-[#171A19] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="Next Day"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

          </div>

          {/* Current Day Showcase Card with Slide Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDay.day}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="p-6 rounded-3xl bg-[#F7F5F0] border border-[#171A19]/08 space-y-5"
            >
              {/* Day Header Banner */}
              <div className="flex items-center justify-between pb-4 border-b border-[#171A19]/08">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#2F6F68] text-white font-extrabold text-sm flex items-center justify-center shadow-sm">
                    {currentDay.day}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#2F6F68] block">
                      DAY {currentDay.day < 10 ? `0${currentDay.day}` : currentDay.day} OF {daysList.length}
                    </span>
                    <h4 className="font-editorial text-xl font-bold text-[#171A19]">
                      {currentDay.title}
                    </h4>
                  </div>
                </div>

                <div className="text-xs font-semibold text-[#68706D] hidden sm:block">
                  {currentDay.activities?.length || 3} Activities
                </div>
              </div>

              {/* Day Activity Cards */}
              <div className="space-y-3">
                {currentDay.activities?.map((act, aIdx) => (
                  <div
                    key={aIdx}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-[#171A19]/08 hover:border-[#2F6F68]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-xs font-extrabold text-[#2F6F68] bg-[#2F6F68]/10 px-2.5 py-1 rounded-lg shrink-0 mt-0.5">
                        {act.time}
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-[#171A19] flex items-center space-x-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#D8B98A]" />
                          <span>{act.title}</span>
                        </h5>
                        <p className="text-xs text-[#68706D] leading-relaxed mt-1 font-light">
                          {act.description}
                        </p>
                      </div>
                    </div>

                    {act.duration && (
                      <div className="flex items-center space-x-1 text-[11px] text-[#68706D] font-semibold bg-[#F7F5F0] px-3 py-1 rounded-full shrink-0 self-start sm:self-auto">
                        <Clock className="w-3.5 h-3.5 text-[#2F6F68]" />
                        <span>{act.duration}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom Quick Day Switcher Footer */}
              <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#2F6F68]">
                <button
                  onClick={() => setActiveDayIndex((prev) => Math.max(prev - 1, 0))}
                  disabled={activeDayIndex === 0}
                  className="hover:underline disabled:opacity-0 transition-opacity flex items-center space-x-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous Day</span>
                </button>

                <span className="text-[11px] text-[#68706D] font-normal">
                  Swipe or click tabs to explore
                </span>

                <button
                  onClick={() => setActiveDayIndex((prev) => Math.min(prev + 1, daysList.length - 1))}
                  disabled={activeDayIndex === daysList.length - 1}
                  className="hover:underline disabled:opacity-0 transition-opacity flex items-center space-x-1"
                >
                  <span>Next Day</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      )}

      {/* 3. Full Overview Mode (Optional expandable summary) */}
      {viewMode === 'full' && (
        <div className="space-y-4 max-h-[500px] overflow-y-auto no-scrollbar pr-1">
          {daysList.map((dayObj) => (
            <div key={dayObj.day} className="p-4 rounded-2xl bg-[#F7F5F0] border border-[#171A19]/06 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-[#2F6F68] text-white text-[11px] font-bold flex items-center justify-center">
                    {dayObj.day}
                  </span>
                  <span className="font-bold text-xs text-[#171A19]">{dayObj.title}</span>
                </div>
                <button
                  onClick={() => {
                    setActiveDayIndex(dayObj.day - 1);
                    setViewMode('carousel');
                  }}
                  className="text-[10px] font-bold text-[#2F6F68] hover:underline"
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
