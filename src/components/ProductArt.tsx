import { useState } from "react";
import { Product } from "../data/products";

export default function ProductArt({
  p,
  ratio = "aspect-square",
  glyphSize = "text-5xl",
}: {
  p: Product;
  ratio?: string;
  glyphSize?: string;
}) {
  const [failed, setFailed] = useState(false);
  const src =
    p.image ?? `${import.meta.env.BASE_URL}images/products/${p.id}.jpg`;

  return (
    <div className={`art ${ratio} ${glyphSize}`}>
      {failed ? (
        p.glyph
      ) : (
        <img
          src={src}
          alt={p.name}
          loading="lazy"
          draggable={false}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
