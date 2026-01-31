import { createClient } from '@supabase/supabase-js';

// Use NEXT_PUBLIC_ for client-side usage, fallback to process.env.SUPABASE_KEY if available (server-side)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hvxkrjkkokzxfptqndrn.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || '';

if (!supabaseKey) {
    console.warn("Supabase Key is missing. Features requiring database access will fail.");
}

// Ensure we don't crash if key is missing during build/render - provide dummy if empty to allow UI to load
export const supabase = createClient(supabaseUrl, supabaseKey || 'missing-key-placeholder');
