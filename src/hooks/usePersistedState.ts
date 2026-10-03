import { useEffect, useState } from "react";

/**
 * useState that is mirrored to localStorage.
 * `parse` validates whatever was stored; return null to fall back to `initial`.
 */
export function usePersistedState<T>(key: string, initial: T, parse: (raw: unknown) => T | null) {
  const [value, setValue] = useState<T>(() => {
    try {
      const s = localStorage.getItem(key);
      if (s !== null) {
        const r = parse(JSON.parse(s));
        if (r !== null) return r;
      }
    } catch { /* storage blocked or corrupted: use the default */ }
    return initial;
  });

  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
  }, [key, value]);

  return [value, setValue] as const;
}
