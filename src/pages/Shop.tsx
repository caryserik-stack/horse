import { useState } from "react";
import { useStore } from "../context/StoreContext";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

type Sort = "def" | "low" | "high";

export default function Shop() {
  const { t } = useStore();
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("def");
  const cats = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const term = q.trim().toLowerCase();

  const list = products
    .filter((p) => (cat === "All" || p.category === cat) && (!term || `${p.name} ${p.desc}`.toLowerCase().includes(term)))
    .sort((a, b) => (sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : a.id - b.id));

  return (
    <>
      <h2 className="mb-5 mt-11 font-serif text-3xl">{t.shop}</h2>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`border px-3.5 py-1.5 text-sm transition-colors duration-200 ${cat === c ? "border-ink bg-ink text-bg" : "border-line hover:border-gold"}`}
          >
            {c === "All" ? t.all : c}
          </button>
        ))}
        <div className="flex w-full gap-2 sm:ml-auto sm:w-auto">
          <input className="input !m-0 !w-full !py-1.5 sm:!w-48" placeholder={t.search} value={q} onChange={(e) => setQ(e.target.value)} />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="border border-line bg-bg px-2 py-1.5 text-sm outline-none focus:border-gold"
          >
            <option value="def">{t.sortDef}</option>
            <option value="low">{t.sortLow}</option>
            <option value="high">{t.sortHigh}</option>
          </select>
        </div>
      </div>
      {list.length === 0 ? (
        <p className="min-h-[200px] text-mut">{t.none}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </>
  );
}
