import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { Currency, Lang } from "../data/i18n";
import { LogoMark } from "./Logo";

function Seg<T extends string>({ items, value, onChange }: { items: T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="flex shrink-0 rounded-full border border-line bg-card p-[3px]">
      {items.map((i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`w-[36px] rounded-full py-1 text-center text-[11px] tracking-wider transition-colors duration-200 ${
            value === i ? "bg-ink text-bg" : "text-mut hover:text-ink"
          }`}
        >
          {i}
        </button>
      ))}
    </div>
  );
}

export default function Header() {
  const { t, lang, setLang, cur, setCur, theme, toggleTheme, count, bump, wish } = useStore();
  const [pulse, setPulse] = useState(false);

  // Short highlight of the cart button after adding an item.
  useEffect(() => {
    if (!bump) return;
    setPulse(true);
    const id = window.setTimeout(() => setPulse(false), 600);
    return () => window.clearTimeout(id);
  }, [bump]);

  // Fixed width per link: the menu does not move when the language changes.
  const link = "inline-block w-[88px] text-center text-[11px] uppercase tracking-[.1em] text-mut transition-colors hover:text-ink";
  const round = "relative flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-line bg-card transition duration-300 hover:border-gold";

  return (
    <header className="sticky top-[env(safe-area-inset-top)] z-10 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line bg-bg/95 px-[4vw] py-3 backdrop-blur xl:flex-nowrap">
      <Link to="/" aria-label="GYRAT" className="order-1 flex items-center gap-3">
        <LogoMark className="h-9" />
        <span className="font-serif text-[26px] font-semibold leading-none tracking-[.2em] text-brand">GYRAT</span>
      </Link>

      <nav className="order-4 flex w-full justify-center xl:order-2 xl:w-auto xl:flex-1">
        <NavLink to="/shop" className={link}>{t.shop}</NavLink>
        <NavLink to="/story" className={link}>{t.story}</NavLink>
        <NavLink to="/verify" className={link}>{t.verify}</NavLink>
        <NavLink to="/orders" className={link}>{t.orders}</NavLink>
      </nav>

      <div className="order-3 flex w-full items-center justify-center gap-2 xl:w-auto">
        <Seg<Lang> items={["EN", "RU", "TM"]} value={lang} onChange={setLang} />
        <Seg<Currency> items={["USD", "EUR", "TMT"]} value={cur} onChange={setCur} />
        <button onClick={toggleTheme} aria-label="Toggle theme" className={`${round} hover:rotate-[20deg]`}>
          {theme === "dark" ? "☀" : "☾"}
        </button>
        <Link to="/wishlist" aria-label={t.wishTitle} className={round}>
          <span className={wish.length ? "text-brand" : ""}>{wish.length ? "♥" : "♡"}</span>
          {wish.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] text-[#171717]">{wish.length}</span>
          )}
        </Link>
      </div>

      <Link
        to="/cart"
        className={`order-2 inline-block min-w-[118px] shrink-0 rounded-full px-4 py-2 text-center text-xs tracking-widest transition-colors duration-300 xl:order-4 ${
          pulse ? "animate-bump bg-gold text-[#171717]" : "bg-ink text-bg"
        }`}
      >
        {t.cart} ({count})
      </Link>
    </header>
  );
}
