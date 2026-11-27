import React, { useState } from 'react';
import { useGuide } from '../context/GuideContext';
import { Wifi, Copy, Check } from 'lucide-react';

export const QuickWifiBanner: React.FC = () => {
  const { propertySettings, t } = useGuide();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(propertySettings.wifi_password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="w-full bg-white text-[#0c2340] rounded-2xl p-4 sm:p-5 border border-[#e2dcd2] shadow-sm relative overflow-hidden group">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full border border-[#c5a059] bg-[#fbf7ee] text-[#997530] flex items-center justify-center shrink-0">
            <Wifi className="w-4 h-4 text-[#997530]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#997530]">
                {t.wifiQuickTitle}
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5 text-xs text-slate-600 font-sans">
              <span>
                <strong className="text-slate-400 font-normal">{t.wifiQuickNetwork}:</strong>{' '}
                <span className="font-semibold text-[#0c2340]">{propertySettings.wifi_ssid}</span>
              </span>
              <span className="text-[#c5a059]">•</span>
              <span>
                <strong className="text-slate-400 font-normal">{t.wifiQuickPassword}:</strong>{' '}
                <span className="font-mono font-bold text-[#997530] bg-[#fbf7ee] px-2 py-0.5 rounded border border-[#ebd7a7]">
                  {propertySettings.wifi_password}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Editorial Outline Pill Button */}
        <button
          type="button"
          onClick={handleCopy}
          className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.15em] font-bold transition-all duration-200 active:scale-95 shrink-0 ${
            copied
              ? 'bg-emerald-700 text-white border border-emerald-700 shadow-sm'
              : 'border border-[#0c2340] hover:bg-[#0c2340] hover:text-[#dfc285] text-[#0c2340] bg-white shadow-xs'
          }`}
          aria-label={t.copyPassword}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-white" />
              <span>{t.passwordCopied}</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>{t.copyPassword}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
