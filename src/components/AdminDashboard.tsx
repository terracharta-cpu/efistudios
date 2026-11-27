import React, { useState } from 'react';
import { useGuide } from '../context/GuideContext';
import { GuideItem, PropertySettings } from '../types/guide';
import { CategoryIcon } from './CategoryIcon';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Save,
  X,
  ArrowLeft,
  LogOut,
  Wifi,
  Phone,
  Mail,
  MapPin,
  Lock,
  Layers,
  Settings,
  Search,
  CheckCircle,
  Image as ImageIcon,
} from 'lucide-react';

const PRESET_PHOTOS = [
  { label: 'Καλωσόρισμα', url: '/images/categories/welcome.jpg' },
  { label: 'Wi-Fi / Σαλόνι', url: '/images/categories/wifi.jpg' },
  { label: 'Δωμάτιο 1', url: '/images/categories/rooms.jpg' },
  { label: 'Δωμάτιο 2 (Facilities)', url: '/images/categories/facilities.jpg' },
  { label: 'Μπαλκόνι / Θέα', url: '/images/categories/dining.jpg' },
  { label: 'Καθαριότητα / Κρεβάτι', url: '/images/categories/housekeeping.jpg' },
  { label: 'Πάρος / Παραλία', url: '/images/categories/paros.jpg' },
  { label: 'Εξωτερικός Χώρος', url: '/images/categories/info.jpg' },
  { label: 'Αναχώρηση', url: '/images/categories/checkout.jpg' },
  { label: 'Background Αρχικής', url: '/images/hero-bg.jpg' },
  { label: 'Apartment 5 (Μπαλκόνι)', url: '/images/apartment-5-efi-paros-6-600x401.jpg' },
  { label: 'Room 3 (Κρεβάτι)', url: '/images/drios-paros-room3-2-600x400.jpg' },
  { label: 'Room 1 (Υπνοδωμάτιο)', url: '/images/EfiStudiosDriosParosRoom1-4-1.jpg' },
];

interface AdminDashboardProps {
  onBackToGuide: () => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToGuide, onLogout }) => {
  const {
    categories,
    items,
    propertySettings,
    isLiveCloud,
    addItem,
    updateItem,
    deleteItem,
    toggleItemActive,
    updateCategory,
    updatePropertySettings,
    t,
  } = useGuide();

  // Tabs: 'items' | 'categories' | 'settings' | 'pin'
  const [activeTab, setActiveTab] = useState<'items' | 'categories' | 'settings' | 'pin'>('items');
  const [categorySavedToast, setCategorySavedToast] = useState<string | null>(null);
  const [categoryImagesState, setCategoryImagesState] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    categories.forEach((c) => {
      init[c.id] = c.bg_image || '';
    });
    return init;
  });

  // Filter & Search states
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Item Modal (Add / Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GuideItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    category_id: categories[0]?.id || 'welcome',
    title_el: '',
    title_en: '',
    content_el: '',
    content_en: '',
    badge_el: '',
    badge_en: '',
    has_image: false,
    image: '',
    sort_order: 1,
    is_active: true,
  });

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState<PropertySettings>({ ...propertySettings });
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  // PIN change state
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [pinSuccessToast, setPinSuccessToast] = useState(false);

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      category_id: selectedCategoryFilter !== 'all' ? selectedCategoryFilter : categories[0]?.id || 'welcome',
      title_el: '',
      title_en: '',
      content_el: '',
      content_en: '',
      badge_el: '',
      badge_en: '',
      has_image: false,
      image: '',
      sort_order: items.length + 1,
      is_active: true,
    });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (item: GuideItem) => {
    setEditingItem(item);
    setFormData({
      category_id: item.category_id,
      title_el: item.title_el,
      title_en: item.title_en,
      content_el: item.content_el,
      content_en: item.content_en,
      badge_el: item.badge_el || '',
      badge_en: item.badge_en || '',
      has_image: Boolean(item.has_image && item.image),
      image: item.image || '',
      sort_order: item.sort_order,
      is_active: item.is_active,
    });
    setIsModalOpen(true);
  };

  // Save Item
  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title_el.trim() || !formData.content_el.trim()) {
      alert('Παρακαλώ συμπληρώστε τουλάχιστον τον Ελληνικό τίτλο και περιεχόμενο.');
      return;
    }

    const payload = {
      category_id: formData.category_id,
      title_el: formData.title_el.trim(),
      title_en: formData.title_en.trim() || formData.title_el.trim(),
      content_el: formData.content_el.trim(),
      content_en: formData.content_en.trim() || formData.content_el.trim(),
      badge_el: formData.badge_el.trim() || undefined,
      badge_en: formData.badge_en.trim() || undefined,
      has_image: formData.has_image,
      image: formData.has_image && formData.image.trim() ? formData.image.trim() : null,
      sort_order: Number(formData.sort_order) || 1,
      is_active: formData.is_active,
    };

    if (editingItem) {
      await updateItem({
        ...editingItem,
        ...payload,
      });
    } else {
      await addItem(payload);
    }

    setIsModalOpen(false);
  };

  // Delete Item
  const handleDeleteItem = async (id: string) => {
    if (window.confirm(t.confirmDelete)) {
      await deleteItem(id);
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePropertySettings(settingsForm);
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 3000);
  };

  // Change PIN
  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError('');
    if (!newPin || newPin.length < 4) {
      setPinError('Ο κωδικός PIN πρέπει να περιέχει τουλάχιστον 4 ψηφία.');
      return;
    }
    if (newPin !== confirmPin) {
      setPinError('Οι κωδικοί δεν ταιριάζουν.');
      return;
    }
    localStorage.setItem('efi_admin_pin', newPin.trim());
    setPinSuccessToast(true);
    setNewPin('');
    setConfirmPin('');
    setTimeout(() => setPinSuccessToast(false), 3000);
  };

  // Filter items
  const filteredItems = items
    .filter((item) => {
      const matchesCategory =
        selectedCategoryFilter === 'all' || item.category_id === selectedCategoryFilter;
      const matchesSearch =
        searchQuery === '' ||
        item.title_el.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content_el.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content_en.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="min-h-screen bg-slate-50/70 text-[#0c2340] flex flex-col font-sans">
      {/* Top Header: White, Deep Navy, Gold Accents */}
      <header className="bg-white border-b border-amber-200/80 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0c2340] border border-amber-300 text-amber-300 flex items-center justify-center font-serif font-bold text-lg shadow-sm">
              ES
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-[#0c2340] tracking-tight">
                  Efi Studios Admin
                </h1>
                {/* Live Database status pill */}
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    isLiveCloud
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-50 text-amber-800 border border-amber-300'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isLiveCloud ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                    }`}
                  />
                  {isLiveCloud ? '🟢 Live Cloud (Supabase)' : '🟡 Local Sync Mode'}
                </span>
              </div>
              <p className="text-xs text-slate-500">Διαχείριση Οδηγού Επισκέπτη & Ρυθμίσεων</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBackToGuide}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50/80 hover:bg-amber-100/80 text-[#0c2340] text-xs font-bold transition-all border border-amber-200/80"
            >
              <ArrowLeft className="w-4 h-4 text-amber-700" />
              <span>{t.backToGuestGuide}</span>
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-all border border-red-200"
              title="Αποσύνδεση"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Έξοδος</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-6xl mx-auto px-4 flex space-x-1 sm:space-x-3 border-t border-amber-100 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('items')}
            className={`py-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'items'
                ? 'border-[#0c2340] text-[#0c2340]'
                : 'border-transparent text-slate-500 hover:text-[#0c2340]'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-600" />
            <span>{t.tabItems}</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[10px] text-amber-800 font-bold">
              {items.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('categories')}
            className={`py-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'categories'
                ? 'border-[#0c2340] text-[#0c2340]'
                : 'border-transparent text-slate-500 hover:text-[#0c2340]'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-amber-600" />
            <span>Φωτογραφίες Κατηγοριών</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[10px] text-amber-800 font-bold">
              {categories.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'settings'
                ? 'border-[#0c2340] text-[#0c2340]'
                : 'border-transparent text-slate-500 hover:text-[#0c2340]'
            }`}
          >
            <Settings className="w-4 h-4 text-amber-600" />
            <span>{t.tabSettings}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pin')}
            className={`py-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'pin'
                ? 'border-[#0c2340] text-[#0c2340]'
                : 'border-transparent text-slate-500 hover:text-[#0c2340]'
            }`}
          >
            <Lock className="w-4 h-4 text-amber-600" />
            <span>{t.tabPin}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6">
        {/* ============================================================== */}
        {/* TAB 1: GUIDES & CONTENT MANAGEMENT */}
        {/* ============================================================== */}
        {activeTab === 'items' && (
          <div className="space-y-6">
            {/* Top Toolbar: Search, Category Filter, and Add Button */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-amber-200/80 shadow-luxury">
              <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Search input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#0c2340] placeholder-slate-400 focus:outline-none focus:border-amber-400"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0c2340] text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div className="sm:w-60">
                  <select
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    aria-label="Filter by category"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#0c2340] font-medium focus:outline-none focus:border-amber-400"
                  >
                    <option value="all">📂 {t.filterByCategory}</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name_el} ({cat.name_en})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Add New Item Button */}
              <button
                type="button"
                onClick={handleOpenAdd}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#0c2340] hover:bg-[#163c63] text-amber-300 text-xs font-bold shadow-md transition-all active:scale-95 shrink-0"
              >
                <Plus className="w-4 h-4 text-amber-300" />
                <span>{t.addNewItem}</span>
              </button>
            </div>

            {/* Guide Items List */}
            {filteredItems.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-amber-200 p-8 shadow-sm">
                <Layers className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-[#0c2340]">Δεν βρέθηκαν οδηγίες</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Δεν υπάρχουν καταχωρήσεις για τα επιλεγμένα κριτήρια. Πατήστε «Νέα Οδηγία» για να προσθέσετε.
                </p>
                <button
                  type="button"
                  onClick={handleOpenAdd}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0c2340] text-amber-300 text-xs font-bold"
                >
                  <Plus className="w-4 h-4 text-amber-300" />
                  <span>Προσθήκη πρώτης οδηγίας</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3.5">
                {filteredItems.map((item) => {
                  const itemCat = categories.find((c) => c.id === item.category_id);
                  return (
                    <div
                      key={item.id}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                        item.is_active
                          ? 'bg-white border-amber-200/70 hover:border-amber-400 shadow-luxury'
                          : 'bg-white/60 border-slate-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-start gap-3.5 flex-1 min-w-0">
                        {/* Mini Thumbnail or Category Icon */}
                        {item.has_image && item.image ? (
                          <img
                            src={item.image}
                            alt={item.title_el}
                            className="w-14 h-14 rounded-xl object-cover shrink-0 border border-amber-200 shadow-sm"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                            <CategoryIcon
                              name={itemCat?.icon || 'help'}
                              className="w-6 h-6 stroke-[1.8] text-amber-700"
                            />
                          </div>
                        )}

                        {/* Text info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                              {itemCat?.name_el || item.category_id}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-400">
                              #{item.sort_order}
                            </span>
                            {item.is_active ? (
                              <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                {t.statusActive}
                              </span>
                            ) : (
                              <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                {t.statusHidden}
                              </span>
                            )}
                          </div>

                          <h4 className="font-bold text-sm sm:text-base text-[#0c2340] tracking-tight line-clamp-1">
                            {item.title_el}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {item.title_en}
                          </p>
                          <p className="text-[11px] text-slate-600 line-clamp-1 mt-1 font-sans">
                            {item.content_el}
                          </p>
                        </div>
                      </div>

                      {/* Actions: Toggle Active, Edit, Delete */}
                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        {/* Soft-hide Toggle Button */}
                        <button
                          type="button"
                          onClick={() => toggleItemActive(item.id)}
                          title={item.is_active ? 'Απόκρυψη' : 'Εμφάνιση'}
                          className={`p-2 rounded-xl text-xs font-semibold transition-all border ${
                            item.is_active
                              ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-400 border-slate-200'
                          }`}
                        >
                          {item.is_active ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </button>

                        {/* Edit Button */}
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 text-xs font-semibold transition-all"
                          title="Επεξεργασία"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-semibold transition-all"
                          title="Διαγραφή"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB: CATEGORY BACKGROUND PHOTOS */}
        {/* ============================================================== */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-amber-200/80 shadow-luxury">
              <h3 className="text-lg font-bold text-[#0c2340]">Φωτογραφίες Background Κατηγοριών</h3>
              <p className="text-xs text-slate-500 mt-1">
                Ορίστε τη φωτογραφία φόντου για κάθε μία από τις 9 κατηγορίες. Εμφανίζεται με εφέ γυαλιού (~25% opacity) στην αρχική κάρτα και (~60% opacity) στο αναλυτικό παράθυρο.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {categories.map((category) => {
                const currentImg = categoryImagesState[category.id] ?? (category.bg_image || '');
                const isSaved = categorySavedToast === category.id;

                return (
                  <div
                    key={category.id}
                    className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-luxury space-y-4 flex flex-col justify-between"
                  >
                    <div>
                      {/* Category Header */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center">
                          <CategoryIcon name={category.icon} className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#0c2340]">{category.name_el}</h4>
                          <span className="text-[11px] text-slate-400">{category.name_en}</span>
                        </div>
                      </div>

                      {/* Live Image Preview */}
                      <div className="relative w-full h-32 rounded-xl border border-slate-200 overflow-hidden bg-slate-100 mb-3 flex items-center justify-center">
                        {currentImg ? (
                          <>
                            <img
                              src={currentImg}
                              alt={category.name_el}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                            <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
                            <span className="absolute bottom-2 left-2 text-[10px] px-2 py-0.5 rounded bg-black/60 text-white font-mono">
                              Live Preview (~25-60% Glass)
                            </span>
                          </>
                        ) : (
                          <div className="text-center text-slate-400 text-xs">
                            <ImageIcon className="w-6 h-6 mx-auto mb-1 opacity-40" />
                            <span>Χωρίς φωτογραφία φόντου</span>
                          </div>
                        )}
                      </div>

                      {/* URL / Path Input */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-slate-600 block">
                          Διαδρομή ή URL Εικόνας:
                        </label>
                        <input
                          type="text"
                          value={currentImg}
                          onChange={(e) =>
                            setCategoryImagesState({
                              ...categoryImagesState,
                              [category.id]: e.target.value,
                            })
                          }
                          placeholder="/images/categories/..."
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#0c2340] font-mono focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      {/* Preset Picker Dropdown */}
                      <div className="mt-3">
                        <span className="text-[10px] text-slate-400 block mb-1">
                          Γρήγορη επιλογή από αρχείο:
                        </span>
                        <select
                          className="w-full px-2.5 py-1.5 rounded-lg bg-amber-50/60 border border-amber-200 text-xs text-[#0c2340] focus:outline-none"
                          onChange={(e) => {
                            if (e.target.value) {
                              setCategoryImagesState({
                                ...categoryImagesState,
                                [category.id]: e.target.value,
                              });
                            }
                          }}
                          value={currentImg}
                        >
                          <option value="">-- Επιλέξτε από τη συλλογή --</option>
                          {PRESET_PHOTOS.map((p, idx) => (
                            <option key={idx} value={p.url}>
                              {p.label} ({p.url.split('/').pop()})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={async () => {
                          await updateCategory({
                            ...category,
                            bg_image: currentImg || null,
                          });
                          setCategorySavedToast(category.id);
                          setTimeout(() => setCategorySavedToast(null), 2500);
                        }}
                        className="w-full py-2.5 rounded-xl bg-[#0c2340] hover:bg-[#163c63] text-amber-300 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                      >
                        {isSaved ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                            <span>Αποθηκεύτηκε!</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 text-amber-300" />
                            <span>Αποθήκευση Φωτογραφίας</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: PROPERTY SETTINGS & CONTACTS */}
        {/* ============================================================== */}
        {activeTab === 'settings' && (
          <form
            onSubmit={handleSaveSettings}
            className="space-y-6 max-w-4xl bg-white p-5 sm:p-8 rounded-3xl border border-amber-200/80 shadow-luxury"
          >
            <div className="flex items-center justify-between border-b border-amber-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#0c2340]">Ρυθμίσεις Καταλύματος & Επαφές</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Αλλάξτε κωδικό Wi-Fi, τηλέφωνα, email και τοποθεσία. Ενημερώνονται αυτόματα παντού!
                </p>
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0c2340] hover:bg-[#163c63] text-amber-300 text-xs font-bold shadow-md transition-all active:scale-95"
              >
                <Save className="w-4 h-4 text-amber-300" />
                <span>{t.save}</span>
              </button>
            </div>

            {settingsSavedToast && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fade-in">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>{t.settingsSaved}</span>
              </div>
            )}

            {/* Wi-Fi Section */}
            <div className="bg-amber-50/30 p-4 sm:p-5 rounded-2xl border border-amber-200/70 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-2">
                <Wifi className="w-4 h-4 text-amber-600" />
                <span>Ρυθμίσεις Wi-Fi</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 font-medium block mb-1">
                    Όνομα Δικτύου (SSID)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.wifi_ssid}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, wifi_ssid: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-[#0c2340] font-semibold focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 font-medium block mb-1">
                    Κωδικός Wi-Fi (Password)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.wifi_password}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, wifi_password: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-amber-300 text-xs font-mono font-bold text-amber-900 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-amber-50/30 p-4 sm:p-5 rounded-2xl border border-amber-200/70 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-600" />
                <span>Τηλέφωνα & Instant Messaging</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-slate-500 font-medium block mb-1">
                    Σταθερό Τηλέφωνο (Phone)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.phone_primary}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, phone_primary: e.target.value })
                    }
                    placeholder="+30 22840 41015"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-[#0c2340] font-medium focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 font-medium block mb-1">
                    Κινητό 1 (WhatsApp / Viber)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.phone_secondary || ''}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, phone_secondary: e.target.value })
                    }
                    placeholder="+30 6942 422511"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-[#0c2340] font-medium focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 font-medium block mb-1">
                    Κινητό 2 (Mobile 2)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.mobile_secondary || ''}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, mobile_secondary: e.target.value })
                    }
                    placeholder="6942 402355"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-[#0c2340] font-medium focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs text-slate-500 font-medium block mb-1">
                    WhatsApp (Αριθμός με πρόθεμα)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.whatsapp_number}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, whatsapp_number: e.target.value })
                    }
                    placeholder="+306942422511"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-[#0c2340] font-medium focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 font-medium block mb-1">
                    Viber (Αριθμός)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.viber_number}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, viber_number: e.target.value })
                    }
                    placeholder="+306942422511"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-[#0c2340] font-medium focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="text-xs text-slate-500 font-medium block mb-1">
                    Email Επικοινωνίας
                  </label>
                  <input
                    type="email"
                    value={settingsForm.email}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, email: e.target.value })
                    }
                    placeholder="anna@efistudios.gr"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-[#0c2340] font-medium focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 font-medium block mb-1">
                    Επίσημη Ιστοσελίδα (Website)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.website_url || ''}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, website_url: e.target.value })
                    }
                    placeholder="https://www.efistudios.gr/el/"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-[#0c2340] font-medium focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 font-medium block mb-1">
                    TripAdvisor Σύνδεσμος Αξιολογήσεων
                  </label>
                  <input
                    type="text"
                    value={settingsForm.tripadvisor_url || ''}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, tripadvisor_url: e.target.value })
                    }
                    placeholder="https://www.tripadvisor.com.gr/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-[#0c2340] font-medium focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 font-medium block mb-1">
                    Google Reviews Σύνδεσμος
                  </label>
                  <input
                    type="text"
                    value={settingsForm.google_reviews_url || ''}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, google_reviews_url: e.target.value })
                    }
                    placeholder="https://www.google.com/maps/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-[#0c2340] font-medium focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Check-in & Address */}
            <div className="bg-amber-50/30 p-4 sm:p-5 rounded-2xl border border-amber-200/70 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>Ώρες & Διεύθυνση Καταλύματος</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 font-medium block mb-1">
                    Ώρα Check-in
                  </label>
                  <input
                    type="text"
                    value={settingsForm.check_in_time}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, check_in_time: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-[#0c2340] font-medium focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 font-medium block mb-1">
                    Ώρα Check-out
                  </label>
                  <input
                    type="text"
                    value={settingsForm.check_out_time}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, check_out_time: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-[#0c2340] font-medium focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 font-medium block mb-1">
                    Διεύθυνση (Ελληνικά)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.address_el}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, address_el: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-[#0c2340] font-medium focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 font-medium block mb-1">
                    Address (English)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.address_en}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, address_en: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-[#0c2340] font-medium focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#0c2340] hover:bg-[#163c63] text-amber-300 text-xs font-bold shadow-md transition-all active:scale-95"
              >
                {t.save}
              </button>
            </div>
          </form>
        )}

        {/* ============================================================== */}
        {/* TAB 3: CHANGE PIN */}
        {/* ============================================================== */}
        {activeTab === 'pin' && (
          <div className="max-w-md mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-luxury space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 border border-amber-300 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0c2340]">{t.changePinTitle}</h3>
              <p className="text-xs text-slate-500 mt-1">
                Ορίστε νέο κωδικό PIN για την είσοδο στο Admin Panel.
              </p>
            </div>

            {pinSuccessToast && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fade-in">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>{t.pinUpdatedSuccess}</span>
              </div>
            )}

            {pinError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-300 text-red-700 text-xs font-bold animate-shake">
                {pinError}
              </div>
            )}

            <form onSubmit={handleChangePin} className="space-y-4">
              <div>
                <label className="text-xs text-slate-500 font-medium block mb-1">
                  {t.newPinLabel}
                </label>
                <input
                  type="password"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="π.χ. 2026"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-center tracking-widest text-[#0c2340] font-bold focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-500 font-medium block mb-1">
                  Επιβεβαίωση Νέου PIN
                </label>
                <input
                  type="password"
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  placeholder="Επαναλάβετε το νέο PIN"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-center tracking-widest text-[#0c2340] font-bold focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0c2340] hover:bg-[#163c63] text-amber-300 text-xs font-bold shadow-md transition-all active:scale-95"
              >
                {t.savePin}
              </button>
            </form>
          </div>
        )}
      </main>

      {/* ============================================================== */}
      {/* ADD / EDIT GUIDE ITEM MODAL */}
      {/* ============================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0c2340]/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-amber-200/90 w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#0c2340] my-auto animate-scale-up">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-amber-50/50 via-white to-amber-50/50 border-b border-amber-200/80 flex items-center justify-between shrink-0">
              <h3 className="font-bold text-base sm:text-lg text-[#0c2340]">
                {editingItem ? t.editItem : t.addNewItem}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-[#0c2340] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveItem} className="p-6 overflow-y-auto space-y-4">
              {/* Category Select */}
              <div>
                <label className="text-xs text-slate-500 font-medium block mb-1">
                  {t.categorySelect} *
                </label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  aria-label={t.categorySelect}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#0c2340] font-medium focus:outline-none focus:border-amber-400"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name_el} ({c.name_en})
                    </option>
                  ))}
                </select>
              </div>

              {/* Titles EL & EN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 font-medium block mb-1">
                    {t.itemTitleEl} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title_el}
                    onChange={(e) => setFormData({ ...formData, title_el: e.target.value })}
                    placeholder="π.χ. Οδηγίες Κλιματισμού"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#0c2340] focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 font-medium block mb-1">
                    {t.itemTitleEn}
                  </label>
                  <input
                    type="text"
                    value={formData.title_en}
                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                    placeholder="e.g. Air Conditioning Guide"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#0c2340] focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Contents EL & EN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 font-medium block mb-1">
                    {t.contentEl} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.content_el}
                    onChange={(e) => setFormData({ ...formData, content_el: e.target.value })}
                    placeholder="Αναλυτικές πληροφορίες (χρησιμοποιήστε • για bullets)..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#0c2340] focus:outline-none focus:border-amber-400 font-sans"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 font-medium block mb-1">
                    {t.contentEn}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.content_en}
                    onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
                    placeholder="Detailed information in English..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#0c2340] focus:outline-none focus:border-amber-400 font-sans"
                  />
                </div>
              </div>

              {/* Badges EL & EN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 font-medium block mb-1">
                    {t.badgeEl}
                  </label>
                  <input
                    type="text"
                    value={formData.badge_el}
                    onChange={(e) => setFormData({ ...formData, badge_el: e.target.value })}
                    placeholder="π.χ. Δωρεάν, 15:00"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#0c2340] focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 font-medium block mb-1">
                    {t.badgeEn}
                  </label>
                  <input
                    type="text"
                    value={formData.badge_en}
                    onChange={(e) => setFormData({ ...formData, badge_en: e.target.value })}
                    placeholder="e.g. Free, 15:00"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#0c2340] focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Image Toggle & URL slot (Clean / Ready for user) */}
              <div className="bg-amber-50/40 p-4 rounded-2xl border border-amber-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0c2340] flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-amber-600" />
                    <span>{t.hasImageToggle}</span>
                  </span>
                  <div className="inline-flex rounded-xl p-1 bg-white border border-amber-200">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, has_image: false, image: '' })}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        !formData.has_image
                          ? 'bg-[#0c2340] text-amber-300'
                          : 'text-slate-500 hover:text-[#0c2340]'
                      }`}
                    >
                      {t.withoutImage}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, has_image: true })}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        formData.has_image
                          ? 'bg-[#0c2340] text-amber-300'
                          : 'text-slate-500 hover:text-[#0c2340]'
                      }`}
                    >
                      {t.withImage}
                    </button>
                  </div>
                </div>

                {formData.has_image && (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-xs text-slate-500 font-medium block mb-1">
                        {t.imageUrl}
                      </label>
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="Επικολλήστε το URL της νέας φωτογραφίας..."
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-amber-300 text-xs text-[#0c2340] focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    {/* Live Preview if user enters an image URL */}
                    {formData.image && (
                      <div className="pt-2">
                        <span className="text-[11px] text-slate-500 block mb-1">
                          {t.previewImage}:
                        </span>
                        <div className="relative h-32 rounded-xl overflow-hidden border border-amber-200 bg-slate-50">
                          <img
                            src={formData.image}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://placehold.co/600x400/ffffff/0c2340?text=Invalid+Image+URL';
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Sort Order & Active */}
              <div className="grid grid-cols-2 gap-4 items-center">
                <div>
                  <label className="text-xs text-slate-500 font-medium block mb-1">
                    {t.sortOrder}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.sort_order}
                    onChange={(e) =>
                      setFormData({ ...formData, sort_order: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#0c2340] font-semibold focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="is_active_checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4 rounded text-[#0c2340] border-slate-300 focus:ring-0"
                  />
                  <label htmlFor="is_active_checkbox" className="text-xs font-bold text-[#0c2340]">
                    {t.statusActive}
                  </label>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-amber-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0c2340] hover:bg-[#163c63] text-amber-300 text-xs font-bold shadow-md"
                >
                  {t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
