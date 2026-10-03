import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Verify from "./pages/Verify";
import Story from "./pages/Story";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";

export default function App() {
  const { pathname } = useLocation();
  return (
    <div className="pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      <Header />
      {/* min-h keeps the footer in place on short pages */}
      <main key={pathname} className="mx-auto min-h-[70vh] max-w-[1200px] animate-rise px-[4vw] pb-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/story" element={<Story />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>
      <Footer />
      <Toast />
    </div>
  );
}
