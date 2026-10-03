import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import Summary from "../components/Summary";

export default function Cart() {
  const { t, count } = useStore();
  return (
    <>
      <h2 className="mb-5 mt-11 font-serif text-3xl">{t.cart}</h2>
      {count === 0 ? (
        <p>{t.empty} <Link to="/shop" className="text-gold underline">{t.shop}</Link></p>
      ) : (
        <>
          <Summary editable />
          <p className="note">Taxes and duties are calculated by destination (concept).</p>
          <Link to="/checkout" className="btn inline-block">{t.go}</Link>
        </>
      )}
    </>
  );
}
