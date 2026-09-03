import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorState({ 
  title = 'Information Unavailable', 
  message = "We couldn't synchronize live travel data at this moment. Please verify connection and retry.", 
  onRetry 
}) {
  return (
    <div className="p-8 sm:p-10 rounded-3xl bg-white border border-rose-100 shadow-luxury text-center max-w-md mx-auto my-8">
      <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-100 shadow-sm">
        <AlertCircle className="w-7 h-7" />
      </div>

      <h4 className="font-editorial text-2xl font-bold text-[#101413] mb-2">{title}</h4>
      <p className="text-xs text-[#586260] font-light leading-relaxed mb-6">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#1B4944] hover:bg-[#24655D] text-white font-bold text-xs transition-transform active:scale-95 shadow-md min-h-[44px]"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry Action</span>
        </button>
      )}
    </div>
  );
}
