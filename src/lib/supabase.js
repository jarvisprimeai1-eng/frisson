import { createClient } from "@supabase/supabase-js";

const url = "https://klcunkatwofjeasioolm.supabase.co";
const anon = "sb_publishable_7i6XtISW8Lr0t5v7hpbKPw_fFQVWae3";

export const supabase = createClient(url, anon, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});

// ─── Content fetchers (read-only, cached) ───

// Fetch meditations from backend, fall back to empty array on error.
// Called once on app load — result cached in localStorage for offline access.
export async function fetchMeditations() {
  try {
    const { data, error } = await supabase
      .from("meditations")
      .select("*, sections(id, name, color)")
      .eq("active", true)
      .order("sort_order");
    if (error) throw error;
    localStorage.setItem("frisson_cache_meds", JSON.stringify({ data, ts: Date.now() }));
    return data || [];
  } catch (e) {
    const cached = localStorage.getItem("frisson_cache_meds");
    if (cached) return JSON.parse(cached).data || [];
    return [];
  }
}

export async function fetchSections() {
  try {
    const { data, error } = await supabase.from("sections").select("*").eq("active", true).order("sort_order");
    if (error) throw error;
    localStorage.setItem("frisson_cache_sections", JSON.stringify({ data, ts: Date.now() }));
    return data || [];
  } catch (e) {
    const cached = localStorage.getItem("frisson_cache_sections");
    if (cached) return JSON.parse(cached).data || [];
    return [];
  }
}

export async function fetchBooks() {
  try {
    const { data, error } = await supabase.from("books").select("*").eq("active", true).order("sort_order");
    if (error) throw error;
    return data || [];
  } catch { return []; }
}
