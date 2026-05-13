import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import Menu from './pages/Menu';
import ARViewer from './pages/ARViewer';
import CartDrawer from './components/CartDrawer';
import useCartStore from './store/cartStore';
import { Toaster } from 'react-hot-toast';

const Navbar = ({ onCartClick }) => {
  const location = useLocation();
  const items = useCartStore(state => state.items);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  if (location.pathname.startsWith('/ar/')) return null;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-10 py-6 flex justify-between items-center backdrop-blur-lg bg-[#0A0F1A]/80 border-b border-white/5">
      <Link to="/" className="text-2xl font-black tracking-tighter flex items-center gap-2">
        <div className="bg-[#C06C50] w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-[#C06C50]/20">🍔</div>
        <span className="text-[#F5F3EF] uppercase tracking-tight font-serif">AR <span className="text-[#C06C50]">Bites</span></span>
      </Link>
      
      <div className="flex items-center gap-10">
        <Link to="/" className={`text-sm font-bold transition-colors ${location.pathname === '/' ? 'text-[#C06C50] border-b-2 border-[#C06C50] pb-1' : 'text-[#E8DCC2]/60 hover:text-white'}`}>Home</Link>
        <Link to="/menu" className={`text-sm font-bold transition-colors ${location.pathname === '/menu' ? 'text-[#C06C50] border-b-2 border-[#C06C50] pb-1' : 'text-[#E8DCC2]/60 hover:text-white'}`}>Menu</Link>
        <button 
          onClick={onCartClick}
          className="relative text-sm font-bold text-[#E8DCC2]/60 hover:text-white transition-colors"
        >
          Cart
          {totalItems > 0 && (
            <span className="absolute -top-3 -right-4 bg-[#C06C50] text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold text-white shadow-lg">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <div className="bg-black text-white min-h-screen selection:bg-orange-500/30">
        <Toaster position="top-center" />
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        <main className="pt-24 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/ar/:id" element={<ARViewer />} />
          </Routes>
        </main>

        <footer className="p-12 text-center text-gray-600 text-sm">
          <p>© 2026 ChickenAR Premium Dining. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
