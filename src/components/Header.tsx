import React from 'react';
import { useGuide } from '../context/GuideContext';

export const Header: React.FC = () => {
  const { language, setLanguage } = useGuide();

  return (
    <header className="relative w-full overflow-hidden border-b border-[#c5a059]">
      {/* Background Image: Full visibility, centered */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url('/images/hero-bg.jpg')`,
        }}
      />
      {/* Subtle contrast gradient to make text razor-sharp while keeping the photo fully visible */}
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />

      {/* Top Bar: Left = "Δρυός · Πάρος", Right = Language Switcher (No Admin Button) */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Left: Δρυός · Πάρος */}
        <div className="text-xs sm:text-sm font-pathos font-bold tracking-[0.25em] text-white uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
          {language === 'el' ? 'Δρυός · Πάρος' : 'Drios · Paros'}
        </div>

        {/* Right: Language Switcher */}
        <div className="inline-flex items-center p-0.5 border border-white/40 bg-black/40 backdrop-blur-md shadow-sm">
          <button
            type="button"
            onClick={() => setLanguage('el')}
            className={`px-3 py-1 text-[11px] font-pathos font-bold tracking-wider transition-all duration-200 ${
              language === 'el'
                ? 'bg-white text-[#24123a] shadow-sm'
                : 'text-white/80 hover:text-white'
            }`}
            aria-label="Ελληνικά"
          >
            ΕΛ
          </button>
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 text-[11px] font-pathos font-bold tracking-wider transition-all duration-200 ${
              language === 'en'
                ? 'bg-white text-[#24123a] shadow-sm'
                : 'text-white/80 hover:text-white'
            }`}
            aria-label="English"
          >
            EN
          </button>
        </div>
      </div>

      {/* Hero Center: ONLY "EFI STUDIOS" with 2 identical tapered hairline dividers */}
      {/* Scaled ~50% larger on mobile to span ~80% of screen width */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 sm:py-24 md:py-28 text-center flex flex-col items-center justify-center">
        {/* Top Tapered Hairline (tapers like a hair at the ends) */}
        <div className="w-[80vw] max-w-sm sm:max-w-md md:max-w-xl h-[1.5px] bg-gradient-to-r from-transparent via-[#dfc285] to-transparent mb-4 sm:mb-6 shadow-sm" />

        {/* Large EFI STUDIOS Title: ~50% larger on smartphone, filling ~80% width */}
        <h1 className="font-neohellenic font-bold text-[11.5vw] sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-[0.08em] sm:tracking-[0.14em] uppercase drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)] select-none leading-none whitespace-nowrap">
          EFI STUDIOS
        </h1>

        {/* Bottom Tapered Hairline (same size, tapers like a hair at the ends) */}
        <div className="w-[80vw] max-w-sm sm:max-w-md md:max-w-xl h-[1.5px] bg-gradient-to-r from-transparent via-[#dfc285] to-transparent mt-4 sm:mt-6 shadow-sm" />

        {/* Subtle Gold Welcome Line */}
        <p className="mt-3 sm:mt-4 text-[11px] sm:text-xs font-sans font-light tracking-[0.35em] uppercase text-[#dfc285] drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
          {language === 'el' ? 'Καλώς Ήρθατε' : 'Welcome'}
        </p>
      </div>

      {/* Bottom Dividing Hairline */}
      <div className="relative z-10 h-[2px] bg-gradient-to-r from-[#dfc285]/30 via-[#c5a059] to-[#dfc285]/30" />
    </header>
  );
};
