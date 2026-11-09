-- ==============================================================================
-- AVELSORN - Supabase Initial Migration
-- Tabellen: contact_requests, booking_requests
-- Sicherheitsmodell: Row Level Security (RLS) ohne anonyme Lese-/Schreibberechtigung.
-- Speicherfrist: Automatische Bereinigung nach 6 Monaten (DSGVO Art. 5 Abs. 1 lit. e).
-- ==============================================================================

-- 1. Tabelle für allgemeine Kontaktanfragen
CREATE TABLE IF NOT EXISTS public.contact_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    name TEXT NOT NULL,
    company TEXT,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    consent_at TIMESTAMPTZ NOT NULL,
    source TEXT NOT NULL DEFAULT 'web_contact'
);

-- 2. Tabelle für Terminanfragen (Erstgespräch / Beratung)
CREATE TABLE IF NOT EXISTS public.booking_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    name TEXT NOT NULL,
    company TEXT,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    preferred_slots JSONB NOT NULL DEFAULT '[]'::jsonb,
    message TEXT,
    consent_at TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled'))
);

-- Indizes für effiziente Sortierung und Filterung
CREATE INDEX IF NOT EXISTS idx_contact_requests_created_at ON public.contact_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_booking_requests_created_at ON public.booking_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_booking_requests_status ON public.booking_requests(status);

-- ==============================================================================
-- 3. Row Level Security (RLS) aktivieren
-- WICHTIG: Niemand aus dem öffentlichen Web (Rolle 'anon' oder 'authenticated')
-- darf direkt Datensätze einsehen oder manipulieren.
-- Schreibzugriffe laufen ausschließlich über den Next.js Route Handler mit Service Role.
-- ==============================================================================

ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;

-- Explizite Blockade für 'anon' und 'authenticated' (kein Policy-Grant)
-- Nur die interne Rolle 'service_role' besitzt vollen Lese- und Schreibzugriff.

DROP POLICY IF EXISTS "Service role full access on contact_requests" ON public.contact_requests;
CREATE POLICY "Service role full access on contact_requests"
    ON public.contact_requests
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Service role full access on booking_requests" ON public.booking_requests;
CREATE POLICY "Service role full access on booking_requests"
    ON public.booking_requests
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- ==============================================================================
-- 4. DSGVO-Löschroutine (Speicherbegrenzung nach 6 Monaten)
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.cleanup_old_avelsorn_requests()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Löscht Kontaktanfragen, die älter als 180 Tage (ca. 6 Monate) sind
    DELETE FROM public.contact_requests
    WHERE created_at < (now() - INTERVAL '180 days');

    -- Löscht Terminanfragen, die älter als 180 Tage sind (sofern kein aktiver Vertrag vorliegt)
    DELETE FROM public.booking_requests
    WHERE created_at < (now() - INTERVAL '180 days')
      AND status IN ('pending', 'completed', 'cancelled');
END;
$$;

-- Kommentar: Falls die Supabase-Erweiterung 'pg_cron' aktiviert ist, kann die Routine
-- wöchentlich ausgeführt werden:
-- SELECT cron.schedule('cleanup-avelsorn-requests-weekly', '0 3 * * 0', 'SELECT public.cleanup_old_avelsorn_requests();');
