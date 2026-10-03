import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { products } from "../data/products";

export default function Orders() {
  const { t, orders, fmt, lang } = useStore();
  const locale = lang === "RU" ? "ru-RU" : "en-GB";
  return (
    <>
      <h2 className="mb-5 mt-11 font-serif text-3xl">{t.orders}</h2>
      {orders.length === 0 ? (
        <p>{t.ordersEmpty} <Link to="/shop" className="text-gold underline">{t.shop}</Link></p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="border border-line p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <b className="tracking-wider">{o.id}</b>
                <span className="text-sm text-mut">{new Date(o.date).toLocaleDateString(locale)}</span>
              </div>
              <ul className="my-3 text-sm text-mut">
                {o.items.map((i) => (
                  <li key={i.id}>{products.find((p) => p.id === i.id)?.name ?? `#${i.id}`} × {i.qty}</li>
                ))}
              </ul>
              <div className="font-semibold">{t.tot}: {fmt(o.total)}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
