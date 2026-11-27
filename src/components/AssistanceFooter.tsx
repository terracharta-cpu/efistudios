import React from 'react';
import { useGuide } from '../context/GuideContext';
import {
  Phone,
  Smartphone,
  MessageCircle,
  Mail,
  MapPin,
  Globe,
  ExternalLink,
  Star,
} from 'lucide-react';

interface AssistanceFooterProps {
  onOpenAdmin?: () => void;
}

// TripAdvisor Owl Icon
const TripAdvisorLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="6.5" cy="13.5" r="3.5" />
    <circle cx="17.5" cy="13.5" r="3.5" />
    <circle cx="6.5" cy="13.5" r="1.3" fill="currentColor" />
    <circle cx="17.5" cy="13.5" r="1.3" fill="currentColor" />
    <path d="M12 11.5l1.3 2.5h-2.6z" fill="currentColor" />
    <path d="M3 9C5 6.2 8.2 4.5 12 4.5s7 1.7 9 4.5" />
    <path d="M12 4.5V2" />
  </svg>
);

// Google 'G' Logo
const GoogleLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

export const AssistanceFooter: React.FC<AssistanceFooterProps> = () => {
  const { propertySettings, language, t } = useGuide();

  const tripadvisorUrl =
    propertySettings.tripadvisor_url ||
    'https://www.tripadvisor.com.gr/Hotel_Review-g1066347-d2709783-Reviews-Efi_Studios_Apartments-Drios_Paros_Cyclades_South_Aegean.html';

  const googleReviewsUrl =
    propertySettings.google_reviews_url ||
    'https://www.google.com/maps/place/Efi+Studios/@37.0094,25.2155,17z/data=!4m8!3m7!1s0x149854b85f3fba43:0xa85b379864fa9f5f!8m2!3d37.0094!4d25.2155!9m1!1b1';

  const websiteUrl = propertySettings.website_url || 'https://www.efistudios.gr/el/';

  // Format WhatsApp URL using primary mobile (6942 422511)
  const whatsappUrl = `https://wa.me/306942422511?text=${encodeURIComponent(
    language === 'el'
      ? 'Γεια σας! Είμαι επισκέπτης στα Efi Studios και θα ήθελα μια πληροφορία.'
      : 'Hello! I am a guest staying at Efi Studios and would like some information.'
  )}`;

  // Format Viber URL using primary mobile
  const viberUrl = 'viber://chat?number=%2B306942422511';

  return (
    <footer className="w-full mt-20 sm:mt-24">
      <div className="max-w-4xl mx-auto px-4 pb-12 space-y-8">
        {/* ============================================================== */}
        {/* 3. COMPACT REVIEW CARDS: TRIPADVISOR & GOOGLE REVIEWS */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 gap-2.5">
          {/* Card A: TripAdvisor Review (Whole card clickable, no stars, no button, lowercase/normal case) */}
          <a
            href={tripadvisorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-white hover:bg-[#faf6fb] border border-[#e8dff0] hover:border-[#24123a] shadow-xs hover:shadow-sm transition-all group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#24123a] text-emerald-400 flex items-center justify-center shrink-0">
              <TripAdvisorLogo className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[9px] font-sans font-medium tracking-wider uppercase text-[#24123a]/60 block">
                TripAdvisor
              </span>
              <p className="font-sans font-semibold text-xs sm:text-sm text-[#24123a] leading-snug">
                {t.tripadvisorTitle}
              </p>
              <p className="text-[11px] sm:text-xs text-[#24123a]/70 font-sans font-normal leading-snug">
                {t.tripadvisorSub}
              </p>
            </div>
          </a>

          {/* Card B: Google Reviews (Whole card clickable, no stars, no button, lowercase/normal case) */}
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-white hover:bg-[#faf6fb] border border-[#e8dff0] hover:border-[#24123a] shadow-xs hover:shadow-sm transition-all group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#faf6fb] border border-[#e8dff0] flex items-center justify-center shrink-0">
              <GoogleLogo className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[9px] font-sans font-medium tracking-wider uppercase text-[#24123a]/60 block">
                Google Reviews
              </span>
              <p className="font-sans font-semibold text-xs sm:text-sm text-[#24123a] leading-snug">
                {t.googleReviewsTitle}
              </p>
              <p className="text-[11px] sm:text-xs text-[#24123a]/70 font-sans font-normal leading-snug">
                {t.googleReviewsSub}
              </p>
            </div>
          </a>
        </div>

        {/* ============================================================== */}
        {/* 2. CONTACT DETAILS SECTION */}
        {/* ============================================================== */}
        <div>
          <div className="text-center mb-7">
            <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-light text-[#24123a]/70 block mb-1">
              {language === 'el' ? 'ΣΤΟΙΧΕΙΑ ΕΠΙΚΟΙΝΩΝΙΑΣ' : 'CONTACT DETAILS'}
            </span>
            <h3 className="font-pathos font-bold text-2xl sm:text-3xl tracking-tight text-[#24123a] mb-1.5">
              {t.assistanceTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#24123a]/70 font-sans font-light">
              {t.assistanceSub}
            </p>
            <div className="w-12 h-px bg-[#24123a]/30 mx-auto mt-2.5" />
          </div>

          {/* Contact Action Cards Grid: 2 per row (except Location full width at bottom), uniform purple, whole card clickable */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
            {/* 1. Phone (Landline: +30 22840 41015) */}
            <a
              href="tel:+302284041015"
              className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-white hover:bg-[#faf6fb] border border-[#e8dff0] hover:border-[#24123a] transition-all duration-200 group shadow-xs hover:shadow-sm"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-[#e8dff0] group-hover:border-[#24123a] bg-[#faf6fb] group-hover:bg-[#24123a] text-[#24123a] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                <Phone className="w-4 h-4 stroke-[1.7]" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-sans font-medium text-[#24123a]/60 uppercase tracking-wider block truncate">
                  {t.landlineLabel}
                </span>
                <span className="text-[10px] sm:text-xs font-sans font-semibold text-[#24123a] block leading-tight break-all">
                  +30 22840 41015
                </span>
              </div>
            </a>

            {/* 2. Mobiles (6942 422511, 6942 402355) */}
            <a
              href="tel:+306942422511"
              className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-white hover:bg-[#faf6fb] border border-[#e8dff0] hover:border-[#24123a] transition-all duration-200 group shadow-xs hover:shadow-sm"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-[#e8dff0] group-hover:border-[#24123a] bg-[#faf6fb] group-hover:bg-[#24123a] text-[#24123a] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                <Smartphone className="w-4 h-4 stroke-[1.7]" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-sans font-medium text-[#24123a]/60 uppercase tracking-wider block truncate">
                  {t.mobileLabel}
                </span>
                <span className="text-[10px] sm:text-xs font-sans font-semibold text-[#24123a] block leading-tight">
                  6942 422511 · 6942 402355
                </span>
              </div>
            </a>

            {/* 3. WhatsApp Direct Chat */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-white hover:bg-[#faf6fb] border border-[#e8dff0] hover:border-[#24123a] transition-all duration-200 group shadow-xs hover:shadow-sm"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-[#e8dff0] group-hover:border-[#24123a] bg-[#faf6fb] group-hover:bg-[#24123a] text-[#24123a] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                <MessageCircle className="w-4 h-4 stroke-[1.7]" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-sans font-medium text-[#24123a]/60 uppercase tracking-wider block truncate">
                  WhatsApp
                </span>
                <span className="text-[10px] sm:text-xs font-sans font-semibold text-[#24123a] block leading-tight break-all">
                  +30 6942 422511
                </span>
              </div>
            </a>

            {/* 4. Viber Direct Chat */}
            <a
              href={viberUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-white hover:bg-[#faf6fb] border border-[#e8dff0] hover:border-[#24123a] transition-all duration-200 group shadow-xs hover:shadow-sm"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-[#e8dff0] group-hover:border-[#24123a] bg-[#faf6fb] group-hover:bg-[#24123a] text-[#24123a] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                <MessageCircle className="w-4 h-4 stroke-[1.7]" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-sans font-medium text-[#24123a]/60 uppercase tracking-wider block truncate">
                  Viber
                </span>
                <span className="text-[10px] sm:text-xs font-sans font-semibold text-[#24123a] block leading-tight break-all">
                  +30 6942 422511
                </span>
              </div>
            </a>

            {/* 5. Direct Email (anna@efistudios.gr) */}
            <a
              href="mailto:anna@efistudios.gr?subject=Efi%20Studios%20Inquiry"
              className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-white hover:bg-[#faf6fb] border border-[#e8dff0] hover:border-[#24123a] transition-all duration-200 group shadow-xs hover:shadow-sm"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-[#e8dff0] group-hover:border-[#24123a] bg-[#faf6fb] group-hover:bg-[#24123a] text-[#24123a] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                <Mail className="w-4 h-4 stroke-[1.7]" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-sans font-medium text-[#24123a]/60 uppercase tracking-wider block truncate">
                  Email
                </span>
                <span className="text-[10px] sm:text-xs font-sans font-semibold text-[#24123a] block leading-tight break-all">
                  anna@efistudios.gr
                </span>
              </div>
            </a>

            {/* 6. Official Website (www.efistudios.gr/el/) */}
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-white hover:bg-[#faf6fb] border border-[#e8dff0] hover:border-[#24123a] transition-all duration-200 group shadow-xs hover:shadow-sm"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-[#e8dff0] group-hover:border-[#24123a] bg-[#faf6fb] group-hover:bg-[#24123a] text-[#24123a] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                <Globe className="w-4 h-4 stroke-[1.7]" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-sans font-medium text-[#24123a]/60 uppercase tracking-wider block truncate">
                  Website
                </span>
                <span className="text-[10px] sm:text-xs font-sans font-semibold text-[#24123a] block leading-tight break-all">
                  efistudios.gr
                </span>
              </div>
            </a>

            {/* 7. Google Maps Pin (Full width across bottom) */}
            <a
              href="https://maps.google.com/?q=Efi+Studios+Drios+Paros+84400"
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-2 flex items-center justify-center gap-3 p-3 sm:p-3.5 rounded-xl bg-white hover:bg-[#faf6fb] border border-[#e8dff0] hover:border-[#24123a] transition-all duration-200 group shadow-xs hover:shadow-sm"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-[#e8dff0] group-hover:border-[#24123a] bg-[#faf6fb] group-hover:bg-[#24123a] text-[#24123a] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                <MapPin className="w-4 h-4 stroke-[1.7]" />
              </div>
              <div className="min-w-0 text-left">
                <span className="text-[9px] font-sans font-medium text-[#24123a]/60 uppercase tracking-wider block">
                  {t.locationLabel}
                </span>
                <span className="text-xs sm:text-sm font-sans font-semibold text-[#24123a] block leading-tight">
                  {language === 'el' ? 'Δρυός, Πάρος 84400' : 'Drios, Paros 84400'}
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. CLEAN MINIMAL LOWER FOOTER (Noise-free, single tone, no duplicates) */}
      {/* ============================================================== */}
      <div className="w-full bg-[#180c26] text-purple-200/60 py-8 border-t border-[#29173e]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-1.5">
          <p className="font-pathos text-sm font-bold tracking-[0.2em] text-purple-200/80 uppercase">
            {language === 'el' ? 'Δρυός · Πάρος' : 'Drios · Paros'}
          </p>
          <p className="text-xs text-purple-200/40 font-sans font-light">
            © {new Date().getFullYear()} Efi Studios. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
