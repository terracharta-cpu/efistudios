import React, { useState } from 'react';

interface AdminLoginProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const DEFAULT_PIN = '2025';
const DEFAULT_ALT_PASSWORD = 'efi';

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const customPin = localStorage.getItem('efi_admin_pin');
    const trimmed = password.trim();

    // If custom PIN is set, require it; otherwise allow default 2025 or efi
    const isValid = customPin
      ? trimmed.toLowerCase() === customPin.trim().toLowerCase()
      : trimmed.toLowerCase() === DEFAULT_PIN ||
        trimmed.toLowerCase() === DEFAULT_ALT_PASSWORD ||
        trimmed.toLowerCase() === 'efi2025';

    if (isValid) {
      setError(false);
      onSuccess();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 font-sans selection:bg-amber-100">
      <div className="bg-white rounded-3xl shadow-luxury hover:shadow-luxury-hover border border-amber-200/90 w-full max-w-sm p-6 sm:p-8 text-center animate-fade-in">
        {/* Brand Header */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#0c2340] text-amber-300 flex items-center justify-center text-2xl font-serif font-bold shadow-md border border-amber-300/60">
          ES
        </div>

        <div className="mb-6">
          <h2 className="font-serif font-bold text-lg sm:text-xl text-[#0c2340]">
            Efi Studios Management
          </h2>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Περιοχή ασφαλείας • Εισάγετε τον κωδικό πρόσβασης διαχείρισης
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              autoFocus
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Κωδικός ή PIN (π.χ. 2025)"
              className={`w-full text-center tracking-widest text-base font-semibold px-4 py-3 rounded-2xl border transition-all focus:outline-none ${
                error
                  ? 'border-red-400 bg-red-50/50 text-red-700 focus:border-red-500'
                  : 'border-amber-200/80 bg-amber-50/20 text-[#0c2340] focus:border-amber-400 focus:bg-white'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          {error && (
            <p className="text-xs text-red-600 font-semibold animate-shake">
              Λανθασμένος κωδικός πρόσβασης. Δοκιμάστε ξανά.
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-[#0c2340] hover:bg-[#163c63] text-amber-300 text-sm font-bold shadow-md transition-all active:scale-[0.99]"
          >
            Είσοδος στο Dashboard →
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-amber-100">
          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-slate-500 hover:text-[#0c2340] font-medium transition-colors"
          >
            ← Επιστροφή στον Οδηγό Επισκέπτη
          </button>
        </div>
      </div>
    </div>
  );
};
