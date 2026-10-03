import { useStore } from "../context/StoreContext";
import { products } from "../data/products";

export default function Summary({ editable = false }: { editable?: boolean }) {
  const { cart, fmt, subtotal, shipping, t, setQty } = useStore();
  const qb = "h-7 w-7 border border-line text-sm transition-colors hover:border-gold hover:text-gold";
  return (
    <table className="w-full border-collapse">
      <tbody>
        {products.filter((p) => cart[p.id]).map((p) => (
          <tr key={p.id} className="border-b border-line">
            <td className="py-3">{p.name}</td>
            <td className="whitespace-nowrap">
              {editable ? (
                <span className="inline-flex items-center gap-2">
                  <button className={qb} onClick={() => setQty(p.id, cart[p.id] - 1)} aria-label="-">−</button>
                  <span className="w-5 text-center">{cart[p.id]}</span>
                  <button className={qb} onClick={() => setQty(p.id, cart[p.id] + 1)} aria-label="+">+</button>
                </span>
              ) : (
                <>× {cart[p.id]}</>
              )}
            </td>
            <td className="whitespace-nowrap text-right">
              {fmt(p.price * cart[p.id])}
              {editable && (
                <button className="ml-3 text-mut transition-colors hover:text-brand" onClick={() => setQty(p.id, 0)} aria-label="Remove">✕</button>
              )}
            </td>
          </tr>
        ))}
        <tr className="border-b border-line"><td colSpan={2} className="py-3">{t.sub2}</td><td className="text-right">{fmt(subtotal)}</td></tr>
        <tr className="border-b border-line"><td colSpan={2} className="py-3">{t.ship}</td><td className="text-right">{fmt(shipping)}</td></tr>
        <tr><td colSpan={2} className="py-3 font-semibold">{t.tot}</td><td className="text-right font-semibold">{fmt(subtotal + shipping)}</td></tr>
      </tbody>
    </table>
  );
}
