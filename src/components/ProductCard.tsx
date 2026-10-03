import { Link } from "react-router-dom";
import { Product } from "../data/products";
import { useStore } from "../context/StoreContext";
import ProductArt from "./ProductArt";

export default function ProductCard({ p }: { p: Product }) {
  const { fmt, add, t, wish, toggleWish } = useStore();
  const liked = wish.includes(p.id);
  return (
    <div className="group relative flex flex-col">
      <Link to={`/product/${p.id}`} className="relative block">
        <div className="transition duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl">
          <ProductArt p={p} ratio="aspect-[4/5]" glyphSize="text-5xl" />
        </div>
        {p.edition && <small className="absolute left-5 top-5 text-[10px] tracking-[.15em] text-sand">LIMITED {p.edition}</small>}
        <h4 className="mt-3 font-medium">{p.name}</h4>
        <div className="min-h-[2.75rem] text-sm text-mut">{p.desc}</div>
      </Link>
      <button
        onClick={() => toggleWish(p.id)}
        aria-label={t.wishTitle}
        className={`absolute right-5 top-5 z-10 text-xl leading-none transition duration-200 hover:scale-125 ${liked ? "text-brand" : "text-sand"}`}
      >
        {liked ? "♥" : "♡"}
      </button>
      <div className="mt-1 flex items-center justify-between">
        <b>{fmt(p.price)}</b>
        <button onClick={() => add(p.id)} className="border border-line px-3 py-1 text-xs transition-colors duration-200 hover:border-gold hover:text-gold">
          {t.add}
        </button>
      </div>
    </div>
  );
}
