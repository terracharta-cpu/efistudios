import React, { useState, useEffect } from 'react';
import { GuideProvider, useGuide } from './context/GuideContext';
import { Header } from './components/Header';
import { CategoryGrid } from './components/CategoryGrid';
import { CategoryModal } from './components/CategoryModal';
import { AssistanceFooter } from './components/AssistanceFooter';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { Category } from './types/guide';

const GuideApp: React.FC = () => {
  const { language } = useGuide();
  const [isAdminView, setIsAdminView] = useState<boolean>(() => window.location.hash === '#admin');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('efi_admin_authenticated') === 'true';
  });
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminView(window.location.hash === '#admin');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenAdmin = () => {
    window.location.hash = '#admin';
    setIsAdminView(true);
  };

  const handleBackToGuide = () => {
    window.location.hash = '';
    setIsAdminView(false);
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    sessionStorage.setItem('efi_admin_authenticated', 'true');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('efi_admin_authenticated');
    window.location.hash = '';
    setIsAdminView(false);
  };

  // If in #admin mode
  if (isAdminView) {
    if (!isAdminAuthenticated) {
      return (
        <AdminLogin
          onSuccess={handleAdminLoginSuccess}
          onCancel={handleBackToGuide}
        />
      );
    }
    return (
      <AdminDashboard
        onBackToGuide={handleBackToGuide}
        onLogout={handleAdminLogout}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#faf6fb] text-[#221235] flex flex-col font-sans selection:bg-purple-100 selection:text-[#221235]">
      {/* Luxury Header with Language Switcher */}
      <Header />

      {/* Main Content: Mobile-First Luxury Portal */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-5 py-6 sm:py-8 space-y-6">
        {/* 9 Categories Grid */}
        <section aria-label="Guest Guide Categories" className="pt-1">
          <CategoryGrid onSelectCategory={(cat) => setSelectedCategory(cat)} />
        </section>

        {/* Category Detail Modal */}
        <CategoryModal
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
        />
      </main>

      {/* Quick Assistance Footer with Call, WhatsApp, Viber, Email & Maps */}
      <AssistanceFooter />
    </div>
  );
};

export function App() {
  return (
    <GuideProvider>
      <GuideApp />
    </GuideProvider>
  );
}

export default App;
