import { createClient, SupabaseClient } from "@supabase/supabase-js";

// WICHTIG: Dieser Client nutzt den SUPABASE_SERVICE_ROLE_KEY und darf
// AUSSCHLIESSLICH serverseitig in Route Handlers aufgerufen werden.
// Er wird NIEMALS im Client-Bundle exponiert (kein NEXT_PUBLIC_ Prefix).

let serverClientInstance: SupabaseClient | null = null;

export function getServiceRoleSupabase(): SupabaseClient | null {
  if (serverClientInstance) {
    return serverClientInstance;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.warn(
      "[Avelsorn Backend] Supabase Umgebungsvariablen (NEXT_PUBLIC_SUPABASE_URL oder SUPABASE_SERVICE_ROLE_KEY) sind noch nicht hinterlegt. Bitte .env.local ausfüllen."
    );
    return null;
  }

  serverClientInstance = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return serverClientInstance;
}
