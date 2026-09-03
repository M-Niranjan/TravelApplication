import React from 'react';
import { AlertCircle, RefreshCw, MapPinOff } from 'lucide-react';

export default function ErrorState({ title = 'Something went wrong.', message = "We couldn't load this information right now.", onRetry }) {
  return (
    <div className="p-8 rounded-3xl bg-white border border-red-100 shadow-sm text-center max-w-md mx-auto my-6">
      <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>

      <h4 className="font-editorial text-xl font-bold text-[#171A19] mb-2">{title}</h4>
      <p className="text-xs text-[#68706D] font-medium leading-relaxed mb-6">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-[#2F6F68] text-white font-semibold text-xs hover:bg-[#265953] transition-colors shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Try again</span>
        </button>
      )}
    </div>
  );
}
