// IP-basiertes Rate Limiting für Formularübermittlungen
// Schützt vor automatisierten Denial-of-Service- und Spam-Attacken ohne Drittanbieter-Tracking.

interface RateLimitRecord {
  timestamps: number[];
}

const memoryStore = new Map<string, RateLimitRecord>();

// Standard: Maximal 5 Anfragen pro 15 Minuten (900.000 ms)
const DEFAULT_LIMIT = 5;
const DEFAULT_WINDOW_MS = 15 * 60 * 1000;

// Automatischer Speichercleanup alle 30 Minuten
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of memoryStore.entries()) {
      const active = record.timestamps.filter((ts) => now - ts < DEFAULT_WINDOW_MS);
      if (active.length === 0) {
        memoryStore.delete(ip);
      } else {
        record.timestamps = active;
      }
    }
  }, 30 * 60 * 1000).unref?.();
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
}

export async function checkRateLimit(
  ip: string,
  limit: number = DEFAULT_LIMIT,
  windowMs: number = DEFAULT_WINDOW_MS
): Promise<RateLimitResult> {
  const normalizedIp = ip || "anonymous";
  const now = Date.now();

  // Optionale Upstash Redis Anbindung, falls konfiguriert
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (redisUrl && redisToken) {
    try {
      // Direkter Aufruf über die REST-API von Upstash ohne zusätzliche SDK-Abhängigkeit
      const key = `ratelimit:${normalizedIp}`;
      const url = `${redisUrl}/pipeline`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${redisToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", key],
          ["EXPIRE", key, Math.ceil(windowMs / 1000)],
        ]),
        cache: "no-store",
      });

      if (response.ok) {
        const json = await response.json();
        const count = json[0]?.result ?? 1;
        const remaining = Math.max(0, limit - count);
        return {
          success: count <= limit,
          limit,
          remaining,
          resetTime: now + windowMs,
        };
      }
    } catch (err) {
      console.warn("Upstash Rate Limiter Fehler, wechsle auf internen Speicher:", err);
    }
  }

  // Integrierter In-Memory Sliding-Window Limiter
  let record = memoryStore.get(normalizedIp);
  if (!record) {
    record = { timestamps: [] };
    memoryStore.set(normalizedIp, record);
  }

  // Entferne Timestamps außerhalb des Fensters
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (record.timestamps.length >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      resetTime: record.timestamps[0] + windowMs,
    };
  }

  record.timestamps.push(now);
  return {
    success: true,
    limit,
    remaining: limit - record.timestamps.length,
    resetTime: now + windowMs,
  };
}
