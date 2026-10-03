export interface Product {
  id: number;
  name: string;
  category: string;
  desc: string;
  price: number; // USD, conceptual
  edition?: string;
  glyph: string;
}

export const products: Product[] = [
  { id: 1, name: "Akhal-Teke Saddle", category: "Saddles", desc: "Hand-stitched full-grain leather", price: 1850, edition: "01/25", glyph: "♞" },
  { id: 2, name: "Ahal Bridle", category: "Tack", desc: "Vegetable-tanned leather, brass", price: 320, glyph: "◈" },
  { id: 3, name: "Steppe Halter", category: "Tack", desc: "Soft-lined, adjustable", price: 140, glyph: "○" },
  { id: 4, name: "Woven Saddle Blanket", category: "Textile", desc: "Wool, traditional weave", price: 210, glyph: "▦" },
  { id: 5, name: "Silver Headpiece", category: "Silver", desc: "Hand-worked silver detail", price: 640, edition: "04/12", glyph: "✧" },
  { id: 6, name: "Rider Leather Bag", category: "Leather", desc: "Full-grain, saddle-stitched", price: 380, glyph: "▭" },
  { id: 7, name: "Riding Gloves", category: "Leather", desc: "Supple goat leather", price: 120, glyph: "✋" },
  { id: 8, name: "Miniature Saddle", category: "Heritage", desc: "Collector's scale piece", price: 160, glyph: "◇" },
];
