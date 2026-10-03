import { Navigate, useParams } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { products } from "../data/products";
import ProductArt from "../components/ProductArt";

const sections: [string, string][] = [
  [
    "Story",
    "A traditional form, rebuilt for today. Made by one craftsman from start to finish.",
  ],
  [
    "Materials",
    "Full-grain leather, hand-finished metal details (concept specification).",
  ],
  ["Maker", "Master craftsman, Ahal (fictional concept profile)."],
  [
    "Shipping",
    "Insured, tracked international delivery. Lead time to be confirmed.",
  ],
  ["Care", "Wipe dry, condition with leather balm, store away from heat."],
];

export default function ProductPage() {
  const { id } = useParams();
  const { t, fmt, add, wish, toggleWish } = useStore();
  const p = products.find((x) => x.id === Number(id));
  if (!p) return <Navigate to="/shop" replace />;
  return (
    <div className="grid gap-[5vw] pt-8 md:grid-cols-2">
      <ProductArt p={p} ratio="aspect-square" glyphSize="text-8xl" />
      <div>
        <div className="text-[11px] uppercase tracking-[.18em] text-brand">
          {p.edition ? `Limited edition ${p.edition}` : p.category}
        </div>
        <h1 className="my-1.5 font-serif text-4xl">{p.name}</h1>
        <div className="mb-1.5 text-2xl">{fmt(p.price)}</div>
        <div className="text-mut">{t.made}</div>
        <p className="my-5">{p.desc}. Concept product.</p>
        <div className="flex gap-2">
          <button className="btn" onClick={() => add(p.id)}>
            {t.add}
          </button>
          <button
            className="btn btn-o !px-4 text-base"
            onClick={() => toggleWish(p.id)}
            aria-label={t.wishTitle}
          >
            <span className={wish.includes(p.id) ? "text-brand" : ""}>
              {wish.includes(p.id) ? "♥" : "♡"}
            </span>
          </button>
        </div>
        <div className="mt-7">
          {sections.map(([h, b], i) => (
            <details
              key={h}
              open={i === 0}
              className="border-t border-line py-3 last:border-b"
            >
              <summary className="cursor-pointer text-xs uppercase tracking-widest">
                {h}
              </summary>
              <p className="mt-2 text-mut">{b}</p>
            </details>
          ))}
        </div>
        <div className="mt-5 border border-gold p-4 text-sm">
          <b className="font-serif text-lg">Authenticity certificate</b>
          <br />
          Product ID GYR-{String(p.id).padStart(4, "0")} · Origin: Turkmenistan
          · QR verification (concept)
        </div>
      </div>
    </div>
  );
}
