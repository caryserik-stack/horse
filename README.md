# GYRAT marketplace (concept prototype)

Stack: Vite, React 18, TypeScript, Tailwind CSS 3, React Router (hash routing).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
```

Structure:
- `src/data/products.ts` products (edit prices and items here)
- `src/data/i18n.ts` EN/RU/TM texts and conceptual currency rates
- `src/context/StoreContext.tsx` language, currency, theme, cart, toast
- `src/components/` Header, Toast, ProductCard, Summary, Footer
- `src/pages/` Home, Shop, ProductPage, Cart, Checkout, Verify, Story

Prices, rates, delivery and payment methods are illustrative. TM texts need native review.
