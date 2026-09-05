import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/context/ToastContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Categories from '@/pages/Categories';
import Category from '@/pages/Category';
import Product from '@/pages/Product';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import ComingSoon from '@/pages/ComingSoon';
import Terms from '@/pages/Terms';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CartProvider>
          <ToastProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/categories/:format" element={<Categories />} />
                <Route path="/category/:slug" element={<Category />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/coming-soon/:slug" element={<ComingSoon />} />
                <Route path="/coming-soon" element={<ComingSoon />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </Layout>
          </ToastProvider>
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
