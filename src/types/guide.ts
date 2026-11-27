export type Language = 'el' | 'en';

export interface Category {
  id: string;
  name_el: string;
  name_en: string;
  subtitle_el?: string;
  subtitle_en?: string;
  icon: string;
  sort_order: number;
  bg_image?: string | null;
}

export interface GuideItem {
  id: string;
  category_id: string;
  title_el: string;
  title_en: string;
  content_el: string;
  content_en: string;
  image?: string | null;
  has_image?: boolean;
  is_active: boolean;
  sort_order: number;
  badge_el?: string;
  badge_en?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PropertySettings {
  property_name: string;
  location_name_el: string;
  location_name_en: string;
  wifi_ssid: string;
  wifi_password: string;
  phone_primary: string;
  phone_secondary?: string;
  mobile_secondary?: string;
  whatsapp_number: string;
  viber_number: string;
  email: string;
  website_url?: string;
  tripadvisor_url?: string;
  google_reviews_url?: string;
  google_maps_url: string;
  address_el: string;
  address_en: string;
  check_in_time: string;
  check_out_time: string;
  emergency_police: string;
  emergency_health_center: string;
  emergency_pharmacy: string;
  admin_pin?: string;
}
