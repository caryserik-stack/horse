import { LogoFull } from "./Logo";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4 border-t border-line px-[4vw] py-10 text-center text-xs text-mut">
      <LogoFull className="h-24 opacity-90" />
      <p className="max-w-2xl">
        © GYRAT · Concept prototype. Prices, rates, delivery times and payment methods are illustrative, not confirmed offers. TM/RU texts need native review.
      </p>
    </footer>
  );
}
