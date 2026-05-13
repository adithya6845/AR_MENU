import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';

const Menu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    fetch('/data/menu.json')
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  const categories = ['All', 'Mains', 'Starters', 'Indian', 'Japanese', 'Seafood', 'Breakfast', 'Desserts', 'Drinks'];

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const handleAddToCart = (item) => {
    addItem({ ...item, selectedIngredients: item.ingredients });
    toast.success(`${item.name} added to cart!`);
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#050A15]">
    <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
  </div>;

  return (
    <div className="min-h-screen pt-40 pb-20 mesh-gradient">
      <SEO title="Menu" description="Explore our futuristic AR menu." />
      
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-black mb-6 font-serif italic tracking-tight">
            Our <span className="text-[#C06C50] glow-text">Menu</span>
          </h1>
          <p className="text-[#E8DCC2]/60 font-light max-w-2xl mx-auto text-lg">Tap <span className="text-[#C06C50] font-bold">"View AR"</span> on any dish to see it on your table in augmented reality.</p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex gap-4 overflow-x-auto pb-16 justify-start md:justify-center no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-2xl text-[10px] font-black transition-all uppercase tracking-[0.2em] whitespace-nowrap border ${
                activeCategory === cat 
                  ? 'bg-orange-500 text-black border-orange-500 shadow-[0_0_20px_rgba(255,107,0,0.3)]' 
                  : 'glass-dark text-[#E8DCC2]/40 hover:text-white border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#0D0D0D] rounded-[40px] overflow-hidden group border border-white/5 flex flex-col h-full hover:border-orange-500/20 transition-all duration-500"
            >
              {/* Card Image Area */}
              <div className="h-72 bg-[#0A0A0A] flex items-center justify-center relative overflow-hidden">
                <model-viewer
                  src={item.model}
                  poster={item.poster}
                  alt={item.name}
                  auto-rotate
                  camera-controls
                  disable-zoom
                  shadow-intensity="1"
                  exposure="0.8"
                  environment-image="neutral"
                  style={{ width: '100%', height: '100%', '--poster-color': 'transparent' }}
                  className="w-full h-full pointer-events-none"
                >
                </model-viewer>
                
                <div className="absolute top-8 left-8 bg-[#1A1A1A]/80 backdrop-blur-md text-orange-500/80 px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border border-white/5 z-20">
                  {item.category}
                </div>
                <div className="absolute top-8 right-8 bg-[#1A1621]/80 backdrop-blur-md text-blue-400/80 px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border border-white/5 flex items-center gap-2 z-20">
                   <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" /> AR READY
                </div>
              </div>

              {/* Card Info Area */}
              <div className="p-10 flex-1 flex flex-col text-left">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-black font-serif text-white tracking-tight leading-tight">{item.name}</h3>
                  <span className="text-[#C06C50] font-black text-2xl">₹{item.price}</span>
                </div>
                <p className="text-white/40 text-sm mb-10 line-clamp-2 leading-relaxed font-light">
                  {item.description}
                </p>

                <div className="w-full h-px bg-white/5 mb-8" />

                <div className="flex items-center gap-6 mb-10">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500 text-sm">⭐</span>
                    <span className="text-sm font-bold text-white/80">{item.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/40">
                     <span>⏲️</span>
                     <span>{item.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/40">
                     <span>🔥</span>
                     <span>{item.calories} Cal</span>
                  </div>
                </div>

                <div className="flex gap-4 mt-auto">
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 py-4 bg-[#1A1A1A] hover:bg-[#222] text-white rounded-2xl font-bold text-sm transition-all"
                  >
                    Add to Cart
                  </button>
                  <Link 
                    to={`/ar/${item.id}`}
                    title="View in AR"
                    className="w-14 h-14 bg-[#1E293B] hover:bg-[#334155] text-blue-400 rounded-2xl transition-all flex items-center justify-center shadow-lg shadow-blue-500/10 border border-white/5 active:scale-95"
                  >
                    <span className="text-xl">📹</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
