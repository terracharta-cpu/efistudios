import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Category, GuideItem, Language, PropertySettings } from '../types/guide';
import { initialCategories, initialGuideItems, defaultPropertySettings } from '../data/guideData';
import { translations } from '../data/translations';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

interface GuideContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['el'];
  categories: Category[];
  items: GuideItem[];
  propertySettings: PropertySettings;
  isLiveCloud: boolean;
  isLoading: boolean;
  addItem: (item: Omit<GuideItem, 'id'>) => Promise<boolean>;
  updateItem: (item: GuideItem) => Promise<boolean>;
  deleteItem: (id: string) => Promise<boolean>;
  toggleItemActive: (id: string) => Promise<boolean>;
  updateCategory: (category: Category) => Promise<boolean>;
  updatePropertySettings: (newSettings: Partial<PropertySettings>) => Promise<boolean>;
  refreshData: () => Promise<void>;
}

const STORAGE_KEYS = {
  CATEGORIES: 'efi_categories_v3',
  ITEMS: 'efi_guide_items_v3',
  SETTINGS: 'efi_property_settings_v3',
  LANG: 'efi_guide_lang_v3',
};

const GuideContext = createContext<GuideContextType | undefined>(undefined);

export const GuideProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language State
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANG);
    return saved === 'en' ? 'en' : 'el';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
  };

  const t = translations[language];

  // Core Data States
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (stored) {
        const parsed: Category[] = JSON.parse(stored);
        // Ensure every category has valid bg_image from initialCategories fallback
        return parsed.map((cat) => {
          const init = initialCategories.find((c) => c.id === cat.id);
          return {
            ...cat,
            bg_image: cat.bg_image || init?.bg_image || null,
          };
        });
      }
      return initialCategories;
    } catch {
      return initialCategories;
    }
  });

  const [items, setItems] = useState<GuideItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ITEMS);
      return stored ? JSON.parse(stored) : initialGuideItems;
    } catch {
      return initialGuideItems;
    }
  });

  const [propertySettings, setPropertySettings] = useState<PropertySettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...defaultPropertySettings,
          ...parsed,
          phone_primary: defaultPropertySettings.phone_primary,
          phone_secondary: defaultPropertySettings.phone_secondary,
          mobile_secondary: defaultPropertySettings.mobile_secondary,
          whatsapp_number: defaultPropertySettings.whatsapp_number,
          viber_number: defaultPropertySettings.viber_number,
          email: defaultPropertySettings.email,
          website_url: defaultPropertySettings.website_url,
          tripadvisor_url: defaultPropertySettings.tripadvisor_url,
          google_reviews_url: defaultPropertySettings.google_reviews_url,
          address_el: defaultPropertySettings.address_el,
          address_en: defaultPropertySettings.address_en,
        };
      }
      return defaultPropertySettings;
    } catch {
      return defaultPropertySettings;
    }
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLiveCloud, setIsLiveCloud] = useState<boolean>(false);

  // Sync state to local storage as fallback cache
  const saveToLocalStorage = useCallback(
    (newCategories?: Category[], newItems?: GuideItem[], newSettings?: PropertySettings) => {
      try {
        if (newCategories) {
          localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(newCategories));
        }
        if (newItems) {
          localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(newItems));
        }
        if (newSettings) {
          localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings));
        }
      } catch (err) {
        console.warn('LocalStorage save error:', err);
      }
    },
    []
  );

  // Load from Supabase or Fallback
  const loadData = useCallback(async () => {
    setIsLoading(true);

    if (isSupabaseConfigured && supabase) {
      try {
        // Fetch categories
        const { data: catData, error: catError } = await supabase
          .from('categories')
          .select('*')
          .order('sort_order', { ascending: true });

        // Fetch guide items
        const { data: itemsData, error: itemsError } = await supabase
          .from('guide_items')
          .select('*')
          .order('sort_order', { ascending: true });

        // Fetch settings
        const { data: settingsData, error: settingsError } = await supabase
          .from('property_settings')
          .select('*');

        if (!catError && !itemsError) {
          if (catData && catData.length > 0) {
            setCategories(catData);
            saveToLocalStorage(catData);
          }
          if (itemsData && itemsData.length > 0) {
            setItems(itemsData);
            saveToLocalStorage(undefined, itemsData);
          }
          if (settingsData && settingsData.length > 0) {
            const mappedSettings = { ...defaultPropertySettings };
            settingsData.forEach((row: { key: string; value: string }) => {
              if (row.key in mappedSettings) {
                (mappedSettings as Record<string, string>)[row.key] = row.value;
              }
            });
            setPropertySettings(mappedSettings);
            saveToLocalStorage(undefined, undefined, mappedSettings);
          }
          setIsLiveCloud(true);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local data:', err);
      }
    }

    // Local Storage / Seed Data Fallback
    setIsLiveCloud(false);
    setIsLoading(false);
  }, [saveToLocalStorage]);

  // Initial Load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Realtime Supabase Subscription
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;
    const client = supabase;

    const channel = client
      .channel('public:guide_realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'guide_items' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newItem = payload.new as GuideItem;
            setItems((prev) => {
              const updated = [...prev.filter((i) => i.id !== newItem.id), newItem].sort(
                (a, b) => a.sort_order - b.sort_order
              );
              saveToLocalStorage(undefined, updated);
              return updated;
            });
          } else if (payload.eventType === 'UPDATE') {
            const updatedItem = payload.new as GuideItem;
            setItems((prev) => {
              const updated = prev.map((item) => (item.id === updatedItem.id ? updatedItem : item));
              saveToLocalStorage(undefined, updated);
              return updated;
            });
          } else if (payload.eventType === 'DELETE') {
            const deletedId = (payload.old as { id: string }).id;
            setItems((prev) => {
              const updated = prev.filter((item) => item.id !== deletedId);
              saveToLocalStorage(undefined, updated);
              return updated;
            });
          }
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'categories' },
        (payload) => {
          if (payload.new) {
            const updatedCat = payload.new as Category;
            setCategories((prev) => {
              const updated = prev.map((cat) => (cat.id === updatedCat.id ? updatedCat : cat));
              saveToLocalStorage(updated);
              return updated;
            });
          }
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'property_settings' },
        (payload) => {
          if (payload.new) {
            const row = payload.new as { key: string; value: string };
            setPropertySettings((prev) => {
              const updated = { ...prev, [row.key]: row.value };
              saveToLocalStorage(undefined, undefined, updated);
              return updated;
            });
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setIsLiveCloud(true);
        }
      });

    return () => {
      client.removeChannel(channel);
    };
  }, [saveToLocalStorage]);

  // Cross-tab LocalStorage Synchronization (for local demo mode)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.ITEMS && e.newValue) {
        try {
          setItems(JSON.parse(e.newValue));
        } catch {
          // ignore
        }
      }
      if (e.key === STORAGE_KEYS.SETTINGS && e.newValue) {
        try {
          setPropertySettings(JSON.parse(e.newValue));
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // CRUD Operations
  const addItem = async (itemData: Omit<GuideItem, 'id'>): Promise<boolean> => {
    const newItem: GuideItem = {
      ...itemData,
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Optimistic / Local Update
    const updated = [...items, newItem].sort((a, b) => a.sort_order - b.sort_order);
    setItems(updated);
    saveToLocalStorage(undefined, updated);

    // Supabase persist
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('guide_items').insert([newItem]);
        if (error) {
          console.error('Supabase insert error:', error);
          return false;
        }
      } catch (err) {
        console.error('Supabase addItem error:', err);
      }
    }
    return true;
  };

  const updateItem = async (updatedItem: GuideItem): Promise<boolean> => {
    const prepared = {
      ...updatedItem,
      updated_at: new Date().toISOString(),
    };

    const updated = items.map((i) => (i.id === prepared.id ? prepared : i));
    setItems(updated);
    saveToLocalStorage(undefined, updated);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('guide_items')
          .update(prepared)
          .eq('id', prepared.id);
        if (error) {
          console.error('Supabase update error:', error);
          return false;
        }
      } catch (err) {
        console.error('Supabase updateItem error:', err);
      }
    }
    return true;
  };

  const deleteItem = async (id: string): Promise<boolean> => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    saveToLocalStorage(undefined, updated);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('guide_items').delete().eq('id', id);
        if (error) {
          console.error('Supabase delete error:', error);
          return false;
        }
      } catch (err) {
        console.error('Supabase deleteItem error:', err);
      }
    }
    return true;
  };

  const toggleItemActive = async (id: string): Promise<boolean> => {
    const target = items.find((i) => i.id === id);
    if (!target) return false;

    return updateItem({
      ...target,
      is_active: !target.is_active,
    });
  };

  const updateCategory = async (updatedCategory: Category): Promise<boolean> => {
    const updated = categories.map((c) => (c.id === updatedCategory.id ? updatedCategory : c));
    setCategories(updated);
    saveToLocalStorage(updated);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('categories')
          .update({
            name_el: updatedCategory.name_el,
            name_en: updatedCategory.name_en,
            subtitle_el: updatedCategory.subtitle_el,
            subtitle_en: updatedCategory.subtitle_en,
            icon: updatedCategory.icon,
            sort_order: updatedCategory.sort_order,
            bg_image: updatedCategory.bg_image,
          })
          .eq('id', updatedCategory.id);
        if (error) {
          console.error('Supabase updateCategory error:', error);
          return false;
        }
      } catch (err) {
        console.error('Supabase updateCategory error:', err);
      }
    }
    return true;
  };

  const updatePropertySettings = async (newSettings: Partial<PropertySettings>): Promise<boolean> => {
    const merged = { ...propertySettings, ...newSettings };
    setPropertySettings(merged);
    saveToLocalStorage(undefined, undefined, merged);

    if (isSupabaseConfigured && supabase) {
      const client = supabase;
      try {
        const upsertPromises = Object.entries(newSettings).map(([key, value]) =>
          client
            .from('property_settings')
            .upsert({ id: `setting_${key}`, key, value: String(value) }, { onConflict: 'key' })
        );
        await Promise.all(upsertPromises);
      } catch (err) {
        console.error('Supabase updatePropertySettings error:', err);
      }
    }
    return true;
  };

  return (
    <GuideContext.Provider
      value={{
        language,
        setLanguage,
        t,
        categories,
        items,
        propertySettings,
        isLiveCloud,
        isLoading,
        addItem,
        updateItem,
        deleteItem,
        toggleItemActive,
        updateCategory,
        updatePropertySettings,
        refreshData: loadData,
      }}
    >
      {children}
    </GuideContext.Provider>
  );
};

export const useGuide = () => {
  const context = useContext(GuideContext);
  if (!context) {
    throw new Error('useGuide must be used within a GuideProvider');
  }
  return context;
};
