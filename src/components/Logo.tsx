import { useStore } from "../context/StoreContext";

/** GYRAT mark + wordmark. Switches to the light version in dark mode. */
export function LogoMark({ className = "h-9" }: { className?: string }) {
  const { theme } = useStore();
  return (
    <img
      src={theme === "dark" ? "/logo-mark-light.png" : "/logo-mark.png"}
      alt="GYRAT"
      className={`w-auto select-none ${className}`}
      draggable={false}
    />
  );
}

export function LogoFull({ className = "h-28" }: { className?: string }) {
  const { theme } = useStore();
  return (
    <img
      src={theme === "dark" ? "/logo-full-light.png" : "/logo-full.png"}
      alt="GYRAT"
      className={`w-auto select-none ${className}`}
      draggable={false}
    />
  );
}
