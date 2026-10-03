import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, ReactNode } from "react";
import { Currency, Dict, Lang, dictionaries, rates, symbols } from "../data/i18n";
import { products } from "../data/products";
import { usePersistedState } from "../hooks/usePersistedState";

type Theme = "light" | "dark";
type Cart = Record<number, number>;

export interface Order {
  id: string;
  date: string;
  items: { id: number; qty: number }[];
  total: number; // USD
}

interface Store {
  lang: Lang; setLang: (l: Lang) => void;
  cur: Currency; setCur: (c: Currency) => void;
  theme: Theme; toggleTheme: () => void;
  t: Dict;
  fmt: (usd: number) => string;
  cart: Cart; count: number; subtotal: number; shipping: number;
  add: (id: number) => void; setQty: (id: number, qty: number) => void; clear: () => void;
  wish: number[]; toggleWish: (id: number) => void;
  orders: Order[]; placeOrder: () => Order;
  toast: string | null; bump: number;
}

const Ctx = createContext<Store | null>(null);
const validIds = new Set(products.map((p) => p.id));

const parseLang = (r: unknown): Lang | null => (r === "EN" || r === "RU" || r === "TM" ? r : null);
const parseCur = (r: unknown): Currency | null => (typeof r === "string" && r in rates ? (r as Currency) : null);
const parseCart = (r: unknown): Cart | null => {
  if (!r || typeof r !== "object") return null;
  const out: Cart = {};
  for (const [k, v] of Object.entries(r as Record<string, unknown>)) {
    const id = Number(k);
    if (validIds.has(id) && typeof v === "number" && v > 0 && v < 100) out[id] = Math.floor(v);
  }
  return out;
};
const parseWish = (r: unknown): number[] | null =>
  Array.isArray(r) ? r.filter((x): x is number => typeof x === "number" && validIds.has(x)) : null;
const parseOrders = (r: unknown): Order[] | null =>
  Array.isArray(r)
    ? r.filter((o): o is Order => !!o && typeof o.id === "string" && typeof o.date === "string" && Array.isArray(o.items) && typeof o.total === "number")
    : null;

function initialTheme(): Theme {
  try {
    const s = localStorage.getItem("tp-theme");
    if (s === "dark" || s === "light") return s;
  } catch { /* ignore */ }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = usePersistedState<Lang>("tp-lang", "EN", parseLang);
  const [cur, setCur] = usePersistedState<Currency>("tp-cur", "USD", parseCur);
  const [cart, setCart] = usePersistedState<Cart>("tp-cart", {}, parseCart);
  const [wish, setWish] = usePersistedState<number[]>("tp-wish", [], parseWish);
  const [orders, setOrders] = usePersistedState<Order[]>("tp-orders", [], parseOrders);
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [toast, setToast] = useState<string | null>(null);
  const [bump, setBump] = useState(0);
  const timer = useRef<number>();
  const t = dictionaries[lang];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try { localStorage.setItem("tp-theme", theme); } catch { /* ignore */ }
  }, [theme]);

  useEffect(() => { document.documentElement.lang = lang.toLowerCase(); }, [lang]);

  const add = useCallback((id: number) => {
    setCart((c) => ({ ...c, [id]: Math.min((c[id] ?? 0) + 1, 99) }));
    const p = products.find((x) => x.id === id);
    setToast(p ? p.name : "");
    setBump((b) => b + 1);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 2600);
  }, [setCart]);

  const setQty = useCallback((id: number, qty: number) => {
    setCart((c) => {
      const next = { ...c };
      if (qty <= 0) delete next[id];
      else next[id] = Math.min(qty, 99);
      return next;
    });
  }, [setCart]);

  const toggleWish = useCallback((id: number) => {
    setWish((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
  }, [setWish]);

  const value = useMemo<Store>(() => {
    const count = Object.values(cart).reduce((a, b) => a + b, 0);
    const subtotal = products.reduce((s, p) => s + (cart[p.id] ?? 0) * p.price, 0);
    const shipping = subtotal === 0 ? 0 : subtotal > 1000 ? 120 : 45;
    const placeOrder = (): Order => {
      const o: Order = {
        id: `GYR-${Date.now().toString().slice(-6)}`,
        date: new Date().toISOString(),
        items: Object.entries(cart).map(([id, qty]) => ({ id: Number(id), qty })),
        total: subtotal + shipping,
      };
      setOrders((x) => [o, ...x].slice(0, 20));
      setCart({});
      return o;
    };
    return {
      lang, setLang, cur, setCur, theme,
      toggleTheme: () => setTheme((x) => (x === "dark" ? "light" : "dark")),
      t,
      fmt: (usd) => symbols[cur] + Math.round(usd * rates[cur]).toLocaleString("en-US"),
      cart, count, subtotal, shipping, add, setQty,
      clear: () => setCart({}),
      wish, toggleWish, orders, placeOrder,
      toast, bump,
    };
  }, [lang, cur, theme, t, cart, wish, orders, toast, bump, add, setQty, toggleWish, setLang, setCur, setCart, setOrders]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore must be used inside StoreProvider");
  return v;
}
