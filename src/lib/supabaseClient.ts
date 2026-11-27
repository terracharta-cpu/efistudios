import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Read from Vite environment (import.meta.env.VITE_*)
const rawUrl: string = (import.meta.env.VITE_SUPABASE_URL || '').trim();
// Automatically sanitize URL: strip /rest/v1, /rest/v1/, or any trailing slashes
const supabaseUrl: string = rawUrl.replace(/\/rest\/v1\/?$/i, '').replace(/\/+$/, '');
const supabaseAnonKey: string = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('your-project-id') &&
  supabaseUrl.startsWith('http')
);

// Create the Supabase client instance if credentials are valid, or a safe null client
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
    })
  : null;
