import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

// Put your photo here: public/images/hero-akhalteke.jpg
// If the file is missing the hero falls back to the plain design.
const HERO_SRC = "/images/hero-akhalteke.jpg";

export default function Home() {
  const { t } = useStore();
  const [img, setImg] = useState<"wait" | "ok" | "none">("wait");
  const photo = img === "ok";
  const blocks: [string, string][] = [[t.art, t.artp], [t.meet, t.meetp], [t.glob, t.globp]];

  return (
    <>
      <section className="relative mt-4 flex min-h-[520px] flex-col items-center justify-center overflow-hidden border-b border-line py-[10vh] text-center md:min-h-[600px]">
        {img !== "none" && (
          <img
            src={HERO_SRC}
            alt="Akhal-Teke horse"
            fetchPriority="high"
            onLoad={() => setImg("ok")}
            onError={() => setImg("none")}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ${photo ? "opacity-100" : "opacity-0"}`}
          />
        )}
        {/* dark gradient keeps the text readable on any photo */}
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${
            photo ? "bg-gradient-to-b from-black/50 via-black/25 to-black/65 opacity-100" : "bg-[radial-gradient(ellipse_at_top,rgba(198,161,91,.16),transparent_65%)]"
          }`}
        />
        <div className="relative px-4">
          <div className={`text-[11px] uppercase tracking-[.18em] transition-colors duration-700 ${photo ? "text-sand" : "text-brand"}`}>
            Turkmen Equestrian Heritage
          </div>
          <h1
            className={`mx-auto my-4 min-h-[2.1em] max-w-4xl font-serif text-[clamp(2.4rem,7vw,5rem)] font-normal leading-[1.05] tracking-wide transition-colors duration-700 ${
              photo ? "text-[#F1EBDD]" : ""
            }`}
          >
            {t.h1}
          </h1>
          <p className={`mx-auto mb-8 min-h-[3rem] max-w-[520px] transition-colors duration-700 ${photo ? "text-[#F1EBDD]/85" : "text-mut"}`}>{t.sub}</p>
          <Link to="/shop" className={`btn inline-block ${photo ? "!bg-gold !text-[#171717] hover:!bg-[#F1EBDD]" : ""}`}>{t.cta}</Link>
        </div>
      </section>

      <section className="my-12 grid gap-px border border-line bg-line sm:grid-cols-3">
        {blocks.map(([h, p]) => (
          <div key={h} className="min-h-[130px] bg-bg p-8">
            <h3 className="mb-1.5 font-serif text-2xl">{h}</h3>
            <p className="text-sm text-mut">{p}</p>
          </div>
        ))}
      </section>
      <h2 className="mb-5 font-serif text-3xl">Horse · Rider · Heritage</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 4).map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </>
  );
}
