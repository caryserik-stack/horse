import { useState } from "react";

export default function Verify() {
  const [id, setId] = useState("");
  const [msg, setMsg] = useState("Concept feature: each premium item gets a unique ID and QR.");
  const check = () =>
    setMsg(/^GYR-\d{4}$/.test(id) ? "Demo result: record found. Origin Turkmenistan, handcrafted." : "Demo: enter an ID like GYR-0001.");
  return (
    <>
      <h2 className="mb-3 mt-11 font-serif text-3xl">Verify your GYRAT product</h2>
      <p className="mb-3 text-mut">Enter the Product ID printed on your certificate.</p>
      <input className="input max-w-sm" placeholder="GYR-0001" value={id} onChange={(e) => setId(e.target.value)} />
      <div><button className="btn btn-o" onClick={check}>Verify</button></div>
      <p className="note">{msg}</p>
    </>
  );
}
