import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Wishlist() {
  const { t, wish } = useStore();
  const list = products.filter((p) => wish.includes(p.id));
  return (
    <>
      <h2 className="mb-5 mt-11 font-serif text-3xl">{t.wishTitle}</h2>
      {list.length === 0 ? (
        <p>{t.wishEmpty} <Link to="/shop" className="text-gold underline">{t.shop}</Link></p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </>
  );
}
