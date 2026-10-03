import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";

export default function Toast() {
  const { toast, t } = useStore();
  return (
    <div
      className={`fixed bottom-[calc(24px+env(safe-area-inset-bottom))] left-1/2 z-20 flex -translate-x-1/2 items-center gap-4 rounded-full bg-ink px-5 py-3 text-sm text-bg shadow-2xl transition-all duration-300 ${
        toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span>✓ {toast} — {t.added}</span>
      <Link to="/cart" className="text-[11px] uppercase tracking-widest text-gold">{t.cart}</Link>
    </div>
  );
}
