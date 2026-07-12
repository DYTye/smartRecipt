import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// Ganti variable name manjadi anonKey bia makin sinkron
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Masukan sacaro sah, masin Supabase ka otomatis tau header apikey internalnyo
export const supabase = createClient(supabaseUrl, supabaseAnonKey);