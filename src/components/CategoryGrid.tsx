import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useGuide } from '../context/GuideContext';
import { Category } from '../types/guide';
import { CategoryIcon } from './CategoryIcon';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryGridProps {
  onSelectCategory: (category: Category) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  const { categories, language } = useGuide();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Sort categories by sort_order
  const sortedCategories = [...categories].sort((a, b) => a.sort_order - b.sort_order);

  // Synchronize activeIndex on scroll
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const cardElements = cardRefs.current;
    if (!cardElements || cardElements.length === 0) return;

    let closestIndex = 0;
    let minDistance = Infinity;

    cardElements.forEach((el, index) => {
      if (!el) return;
      const distance = Math.abs(el.offsetLeft - container.offsetLeft - scrollLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Scroll smoothly to a specific category index
  const scrollToCategory = (index: number) => {
    const container = scrollContainerRef.current;
    const targetCard = cardRefs.current[index];
    if (!container || !targetCard) return;

    const targetOffset = targetCard.offsetLeft - container.offsetLeft - 8;
    container.scrollTo({
      left: Math.max(0, targetOffset),
      behavior: 'smooth',
    });
    setActiveIndex(index);
  };

  // Step scroll left/right for desktop controls
  const stepScroll = (direction: 'left' | 'right') => {
    const nextIndex =
      direction === 'left'
        ? Math.max(0, activeIndex - 1)
        : Math.min(sortedCategories.length - 1, activeIndex + 1);
    scrollToCategory(nextIndex);
  };

  return (
    <div className="w-full">
      {/* 1. Guest Guide Subtitle: Slightly larger, clean minimal sans-serif */}
      <div className="text-center mb-6">
        <p className="text-sm sm:text-base uppercase tracking-[0.28em] font-sans font-normal text-[#24123a]/85">
          {language === 'el'
            ? 'Οδηγός Επισκέπτη'
            : 'Guest Guide'}
        </p>
        <div className="w-12 h-px bg-[#c5a059] mx-auto mt-2" />
      </div>

      {/* Categories Carousel Container */}
      <div className="relative group/carousel">
        {/* Optional Desktop Arrow Navigation Buttons */}
        <button
          type="button"
          onClick={() => stepScroll('left')}
          disabled={activeIndex === 0}
          className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-lg bg-white/95 hover:bg-white border border-[#c5a059] text-[#24123a] items-center justify-center shadow-md disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2]" />
        </button>

        <button
          type="button"
          onClick={() => stepScroll('right')}
          disabled={activeIndex === sortedCategories.length - 1}
          className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-lg bg-white/95 hover:bg-white border border-[#c5a059] text-[#24123a] items-center justify-center shadow-md disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          aria-label="Next"
        >
          <ChevronRight className="w-4 h-4 stroke-[2]" />
        </button>

        {/* Horizontal Single-Row Scrollable Container: 2 cards visible on smartphone */}
        {/* Minimalist faint right arrow hint for mobile */}
        {activeIndex < sortedCategories.length - 1 && (
          <button
            type="button"
            onClick={() => stepScroll('right')}
            aria-label="Next"
            className="md:hidden absolute right-0.5 top-1/2 -translate-y-1/2 z-20 p-1 text-[#24123a]/35 hover:text-[#24123a]/70 transition-colors"
          >
            <ChevronRight className="w-6 h-6 stroke-[1.75]" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex flex-nowrap gap-3 sm:gap-4 overflow-x-auto pb-4 pt-1 px-1.5 snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {sortedCategories.map((category, index) => {
            const categoryTitle = language === 'el' ? category.name_el : category.name_en;
            const categorySub = language === 'el' ? category.subtitle_el : category.subtitle_en;

            return (
              <button
                key={category.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                type="button"
                onClick={() => onSelectCategory(category)}
                className={`group relative flex flex-col items-center justify-between px-2.5 py-4 sm:p-6 rounded-xl text-center snap-start shrink-0 transition-all duration-300 active:scale-[0.98] focus:outline-none overflow-hidden cursor-pointer
                  /* Width: Exactly 2 cards per view on smartphone */
                  w-[calc(50vw-22px)] sm:w-[220px] md:w-[240px] lg:w-[250px]
                  min-h-[235px] sm:min-h-[270px] md:min-h-[290px]
                  /* Clean white card with soft purple drop shadow */
                  bg-white hover:bg-[#faf6fb]
                  border border-[#e8dff0] hover:border-[#b0873e]
                  shadow-[0_6px_20px_-4px_rgba(36,18,58,0.14),0_2px_8px_-2px_rgba(36,18,58,0.08)]
                  hover:shadow-[0_10px_28px_-4px_rgba(36,18,58,0.22)]
                `}
              >
                {/* Background Image with ~22% opacity */}
                {category.bg_image && (
                  <div
                    className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-[0.22] transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${category.bg_image}')` }}
                  />
                )}

                {/* Minimalist Top Gold Hairline Indicator on hover */}
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Icon stands freely in dark purple */}
                <div className="relative z-10 pt-2 text-[#24123a] group-hover:text-[#997530] transition-colors drop-shadow-xs">
                  <CategoryIcon
                    name={category.icon}
                    className="w-9 h-9 sm:w-11 sm:h-11 stroke-[1.5] transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Large, prominent typography in dark purple and Pathos font, centered without mid-word breaks */}
                <div className="relative z-10 my-auto py-2 w-full px-0.5 flex items-center justify-center">
                  <h3 className="font-pathos font-bold text-[15px] sm:text-xl md:text-2xl text-[#24123a] tracking-normal leading-snug text-center w-full">
                    {categoryTitle}
                  </h3>
                </div>

                {/* Subtle Bottom Accent */}
                <div className="relative z-10 w-8 h-[1.5px] bg-[#dfc285]/60 group-hover:bg-[#c5a059] group-hover:w-14 transition-all duration-300" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Jump Indicator Bar: 9 slightly larger rounded buttons side-by-side underneath */}
      <div className="w-full mt-6 flex flex-col items-center">
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 p-2 bg-white border border-[#e8dff0] rounded-xl shadow-xs max-w-full overflow-x-auto no-scrollbar">
          {sortedCategories.map((category, index) => {
            const isActive = activeIndex === index;
            const categoryTitle = language === 'el' ? category.name_el : category.name_en;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => scrollToCategory(index)}
                title={categoryTitle}
                className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none ${
                  isActive
                    ? 'bg-[#24123a] text-white shadow-xs scale-105'
                    : 'bg-[#faf6fb] hover:bg-[#f3eaf7] text-[#24123a]/70 hover:text-[#24123a] border border-[#e8dff0]'
                }`}
                aria-label={categoryTitle}
              >
                <CategoryIcon name={category.icon} className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.6]" />
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-[#dfc285]" />
                )}
              </button>
            );
          })}
        </div>
        <p className="text-[10px] uppercase tracking-[0.24em] text-[#24123a]/50 mt-1.5 font-sans font-light">
          {language === 'el' ? 'Σύρετε ή πατήστε για περιήγηση' : 'Swipe or tap to browse'}
        </p>
      </div>
    </div>
  );
};
