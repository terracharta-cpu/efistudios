import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Category } from '../types/guide';
import { useGuide } from '../context/GuideContext';
import { X, Copy, Check } from 'lucide-react';

interface CategoryModalProps {
  category: Category | null;
  onClose: () => void;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({ category, onClose }) => {
  const { language, items, propertySettings, t } = useGuide();
  const [copiedWifi, setCopiedWifi] = useState(false);

  // Close on Escape key & lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (category) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [category, onClose]);

  if (!category) return null;

  const categoryTitle = language === 'el' ? category.name_el : category.name_en;
  const categorySub = language === 'el' ? category.subtitle_el : category.subtitle_en;

  // Filter active items for this category
  const categoryItems = items
    .filter((item) => item.category_id === category.id && item.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);

  const handleCopyWifi = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(propertySettings.wifi_password);
      setCopiedWifi(true);
      setTimeout(() => setCopiedWifi(false), 2500);
    }
  };

  const isFacilitiesCategory = category.id === 'facilities';
  const modalBgImage = category.bg_image || '/images/hero-bg.jpg';

  // Render via Portal directly into document.body to guarantee 100% full-viewport coverage with zero top-strip leaks
  return createPortal(
    /* 4. Full screen backdrop attached directly to body: Absolutely no gap or top strip */
    <div
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fade-in"
      onClick={onClose}
    >
      {/* 2 & 3. Centered modal with rounded corners, pure white background + 15% faint photo, all text dark purple */}
      <div
        className={`relative w-full ${
          isFacilitiesCategory ? 'max-w-4xl' : 'max-w-2xl'
        } max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up text-[#24123a] bg-white border border-[#e8dff0]`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 2. Unified Faint Background Photo at exactly 15% opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-15"
          style={{ backgroundImage: `url('${modalBgImage}')` }}
        />

        {/* Crisp White Tint Overlay to guarantee maximum legibility */}
        <div className="absolute inset-0 bg-white/75 pointer-events-none" />

        {/* Modal Header: Seamless, no emojis, clean typography */}
        <div className="relative z-10 px-6 sm:px-8 py-5 border-b border-[#ebd7f5] flex items-center justify-between shrink-0">
          <div className="w-full pr-4">
            <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-medium text-[#24123a]/70 block">
              EFI STUDIOS · PAROS
            </span>
            <h3 className="font-pathos font-bold text-2xl sm:text-3xl md:text-4xl text-[#24123a] tracking-tight leading-tight mt-1">
              {categoryTitle}
            </h3>
          </div>

          {/* 5. Clean bare 'X' button: NO white background, just the X icon */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#24123a]/75 hover:text-[#24123a] transition-colors focus:outline-none cursor-pointer shrink-0"
            aria-label={t.close}
          >
            <X className="w-6 h-6 stroke-[2]" />
          </button>
        </div>

        {/* Modal Content Scroll Area: Content directly on white+photo background, ALL text & bullets in single dark purple */}
        <div className="relative z-10 p-6 sm:p-8 overflow-y-auto space-y-6 overscroll-contain no-scrollbar">
          {/* Wi-Fi Special Section */}
          {category.id === 'wifi' && (
            <div className="space-y-4 pb-4 border-b border-[#ebd7f5]">
              <div className="flex items-center justify-between gap-4">
                <span className="text-base sm:text-lg md:text-xl font-pathos font-bold uppercase tracking-wider text-[#24123a]">
                  {t.wifiConnectDirect}
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-lg bg-[#24123a] text-white font-sans font-medium uppercase tracking-wider">
                  High Speed Fiber
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 border-b sm:border-b-0 sm:border-r border-[#ebd7f5]">
                  <span className="text-[10px] font-sans font-medium text-[#24123a]/70 block uppercase tracking-wider">
                    {t.wifiQuickNetwork}
                  </span>
                  <span className="text-base font-bold text-[#24123a]">
                    {propertySettings.wifi_ssid}
                  </span>
                </div>
                <div className="p-3">
                  <span className="text-[10px] font-sans font-medium text-[#24123a]/70 block uppercase tracking-wider">
                    {t.wifiQuickPassword}
                  </span>
                  <span className="text-base font-mono font-bold text-[#24123a]">
                    {propertySettings.wifi_password}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyWifi}
                className={`w-full py-3 rounded-xl text-xs uppercase tracking-[0.16em] font-pathos font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                  copiedWifi
                    ? 'bg-emerald-700 text-white'
                    : 'border border-[#24123a] bg-[#24123a] text-white hover:bg-[#381c5a]'
                }`}
              >
                {copiedWifi ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{t.passwordCopied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{t.copyPassword}</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Facilities Editorial Typography View (All text & bullets in single dark purple #24123a) */}
          {isFacilitiesCategory ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-[#ebd7f5]">
              {/* Column 1: Equipment & Kitchenette */}
              <div className="space-y-6 pt-3 md:pt-0">
                {categoryItems[0] && (
                  <div className="space-y-3">
                    <h4 className="font-pathos text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#24123a] leading-snug">
                      {language === 'el' ? categoryItems[0].title_el : categoryItems[0].title_en}
                    </h4>
                    <div className="space-y-1.5 text-xs sm:text-sm text-[#24123a] font-sans leading-relaxed">
                      {(language === 'el' ? categoryItems[0].content_el : categoryItems[0].content_en)
                        .split('\n')
                        .map((line, idx) => {
                          const trimmed = line.trim();
                          if (!trimmed) return null;
                          return (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="text-[#24123a] font-bold shrink-0">•</span>
                              <span>{trimmed.replace(/^[•-]\s*/, '')}</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}

                {categoryItems[1] && (
                  <div className="pt-4 border-t border-[#ebd7f5] space-y-3">
                    <h4 className="font-pathos text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-[#24123a] leading-snug">
                      {language === 'el' ? categoryItems[1].title_el : categoryItems[1].title_en}
                    </h4>
                    <div className="space-y-1.5 text-xs sm:text-sm text-[#24123a] font-sans leading-relaxed">
                      {(language === 'el' ? categoryItems[1].content_el : categoryItems[1].content_en)
                        .split('\n')
                        .map((line, idx) => {
                          const trimmed = line.trim();
                          if (!trimmed) return null;
                          return (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="text-[#24123a] font-bold shrink-0">•</span>
                              <span>{trimmed.replace(/^[•-]\s*/, '')}</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>

              {/* Column 2: Linens, Laundry, BBQ, Dining */}
              <div className="space-y-5 pt-5 md:pt-0 md:pl-6">
                {categoryItems[2] && (
                  <div className="space-y-1.5">
                    <h4 className="font-pathos text-lg sm:text-xl font-bold tracking-tight text-[#24123a]">
                      {language === 'el' ? categoryItems[2].title_el : categoryItems[2].title_en}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#24123a] font-sans leading-relaxed">
                      {language === 'el' ? categoryItems[2].content_el : categoryItems[2].content_en}
                    </p>
                  </div>
                )}

                {categoryItems[3] && (
                  <div className="pt-3 border-t border-[#ebd7f5] space-y-1.5">
                    <h4 className="font-pathos text-lg sm:text-xl font-bold tracking-tight text-[#24123a]">
                      {language === 'el' ? categoryItems[3].title_el : categoryItems[3].title_en}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#24123a] font-sans leading-relaxed">
                      {language === 'el' ? categoryItems[3].content_el : categoryItems[3].content_en}
                    </p>
                  </div>
                )}

                {categoryItems[4] && (
                  <div className="pt-3 border-t border-[#ebd7f5] space-y-1.5">
                    <h4 className="font-pathos text-lg sm:text-xl font-bold tracking-tight text-[#24123a]">
                      {language === 'el' ? categoryItems[4].title_el : categoryItems[4].title_en}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#24123a] font-sans leading-relaxed">
                      {language === 'el' ? categoryItems[4].content_el : categoryItems[4].content_en}
                    </p>
                  </div>
                )}

                {categoryItems[5] && (
                  <div className="pt-3 border-t border-[#ebd7f5] space-y-1.5">
                    <h4 className="font-pathos text-lg sm:text-xl font-bold tracking-tight text-[#24123a]">
                      {language === 'el' ? categoryItems[5].title_el : categoryItems[5].title_en}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#24123a] font-sans leading-relaxed">
                      {language === 'el' ? categoryItems[5].content_el : categoryItems[5].content_en}
                    </p>
                  </div>
                )}
              </div>

              {/* Column 3: Parking, Playground, Internet */}
              <div className="space-y-5 pt-5 md:pt-0 md:pl-6">
                {categoryItems[6] && (
                  <div className="space-y-1.5">
                    <h4 className="font-pathos text-lg sm:text-xl font-bold tracking-tight text-[#24123a]">
                      {language === 'el' ? categoryItems[6].title_el : categoryItems[6].title_en}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#24123a] font-sans leading-relaxed">
                      {language === 'el' ? categoryItems[6].content_el : categoryItems[6].content_en}
                    </p>
                  </div>
                )}

                {categoryItems[7] && (
                  <div className="pt-3 border-t border-[#ebd7f5] space-y-1.5">
                    <h4 className="font-pathos text-lg sm:text-xl font-bold tracking-tight text-[#24123a]">
                      {language === 'el' ? categoryItems[7].title_el : categoryItems[7].title_en}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#24123a] font-sans leading-relaxed">
                      {language === 'el' ? categoryItems[7].content_el : categoryItems[7].content_en}
                    </p>
                  </div>
                )}

                {categoryItems[8] && (
                  <div className="pt-3 border-t border-[#ebd7f5] space-y-1.5">
                    <h4 className="font-pathos text-lg sm:text-xl font-bold tracking-tight text-[#24123a]">
                      {language === 'el' ? categoryItems[8].title_el : categoryItems[8].title_en}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#24123a] font-sans leading-relaxed">
                      {language === 'el' ? categoryItems[8].content_el : categoryItems[8].content_en}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Clean Editorial Typography for Other Categories (Single dark purple for all text & bullets) */
            <div className="space-y-6">
              {categoryItems.length === 0 ? (
                <div className="text-center py-12 text-[#24123a]/60 font-sans">
                  <p className="text-sm font-sans">{t.noItemsInCategory}</p>
                </div>
              ) : (
                categoryItems.map((item, index) => {
                  const title = language === 'el' ? item.title_el : item.title_en;
                  const content = language === 'el' ? item.content_el : item.content_en;

                  return (
                    <div
                      key={item.id || index}
                      className="space-y-3 pb-6 first:pt-0 border-b border-[#ebd7f5] last:border-b-0 last:pb-0"
                    >
                      <h4 className="font-pathos font-bold text-xl sm:text-2xl md:text-3xl text-[#24123a] tracking-normal leading-snug">
                        {title}
                      </h4>

                      <div className="text-[#24123a] text-xs sm:text-sm leading-relaxed space-y-2 font-sans font-light">
                        {content.split('\n').map((line, idx) => {
                          const trimmed = line.trim();
                          if (!trimmed) return <div key={idx} className="h-1" />;
                          if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
                            return (
                              <div key={idx} className="flex items-start gap-2 pl-1">
                                <span className="text-[#24123a] font-bold shrink-0">•</span>
                                <span>{trimmed.replace(/^[•-]\s*/, '')}</span>
                              </div>
                            );
                          }
                          return <p key={idx}>{line}</p>;
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom: Clean and minimal */}
        <div className="relative z-10 px-6 sm:px-8 py-3.5 border-t border-[#ebd7f5] flex justify-end shrink-0 bg-white/60">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-[#24123a] text-white hover:bg-[#381c5a] text-xs font-pathos font-bold uppercase tracking-[0.16em] transition-all cursor-pointer shadow-sm"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
