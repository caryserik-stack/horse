import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import Summary from "../components/Summary";

export default function Checkout() {
  const { t, count, placeOrder } = useStore();
  const [step, setStep] = useState(0);
  const [orderNo, setOrderNo] = useState("");

  if (count === 0 && step < 4) {
    return <p className="mt-11">{t.empty} <Link to="/shop" className="text-gold underline">{t.shop}</Link></p>;
  }

  const next = () => {
    if (step === 3) {
      setOrderNo(placeOrder().id);
    }
    setStep(step + 1);
  };

  return (
    <>
      <h2 className="mb-5 mt-11 font-serif text-3xl">Checkout</h2>
      <div className="mb-5 flex flex-wrap gap-x-4 text-xs uppercase tracking-widest">
        {t.steps.map((s, i) => (
          <span key={s} className={`border-b-2 py-1 ${i === step ? "border-gold text-ink" : "border-line text-mut"}`}>{i + 1}. {s}</span>
        ))}
      </div>
      {step === 0 && <><input className="input" placeholder="Email" /><input className="input" placeholder="Full name" /></>}
      {step === 1 && <><input className="input" placeholder="Address" /><input className="input" placeholder="City / Country" /><p className="note">Concept: insured air freight with tracking; customs details shown at review.</p></>}
      {step === 2 && <><p><b>Visa · Mastercard</b> (Apple Pay / Google Pay where supported)</p><input className="input" placeholder="Card number (demo, do not enter real data)" /><p className="note">Payment providers and regional acquiring are a concept and subject to availability and compliance checks.</p></>}
      {step === 3 && <Summary />}
      {step === 4 && (
        <>
          <p className="font-serif text-3xl">{t.ok}</p>
          <div className="mt-4 border border-gold p-4 text-sm">Order {orderNo} · Tracking: to be issued at dispatch (concept)</div>
        </>
      )}
      {step < 4 && <button className="btn mt-2" onClick={next}>{step === 3 ? t.place : t.next}</button>}
    </>
  );
}
