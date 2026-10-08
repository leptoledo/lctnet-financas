/**
 * @financas/core - Supabase Client
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://inuboqltymsifipyzrka.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludWJvcWx0eW1zaWZpcHl6cmthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwMTgwMTMsImV4cCI6MjA5NDU5NDAxM30.BerRaKYqEDii_5DCC9iTmxePnHuzLqDGFgS1-QHRbS8';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!supabaseInstance) {
    supabaseInstance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
  }
  return supabaseInstance;
}
