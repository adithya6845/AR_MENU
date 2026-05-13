import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useCartStore from '../store/cartStore';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';

const ARViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const addItem = useCartStore(state => state.addItem);

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    fetch('/data/menu.json')
      .then(res => res.json())
      .then(data => {
        const dish = data.find(d => d.id === id);
        setItem(dish);
        if (dish) setSelectedIngredients(dish.ingredients);
      });
  }, [id]);

  const [specialInstructions, setSpecialInstructions] = useState('');

  const toggleIngredient = (ing) => {
    setSelectedIngredients(prev => 
      prev.includes(ing) ? prev.filter(i => i !== ing) : [...prev, ing]
    );
  };

  const modelViewerRef = React.useRef(null);

  if (!item) return <div className="h-screen flex items-center justify-center bg-[#050A15]">
    <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
  </div>;

  return (
    <div className="h-screen w-full flex flex-col md:flex-row mesh-gradient overflow-hidden">
      <SEO title={`${item.name} - AR Experience`} description={`View the ${item.name} in 3D and AR.`} />
      
      {/* Back Button */}
      <button 
        onClick={() => navigate('/menu')}
        className="absolute top-10 left-10 z-50 w-14 h-14 glass-dark rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all border border-white/10 group"
      >
        <span className="text-2xl group-hover:-translate-x-1 transition-transform text-white">←</span>
      </button>

      {/* LEFT SIDE: 3D Model Viewport */}
      <div className="flex-1 relative h-[60vh] md:h-full flex flex-col items-center justify-center p-6 md:pt-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.1),transparent_70%)] opacity-50" />
        
        {/* Model Viewer */}
        <model-viewer
          ref={modelViewerRef}
          src={item.model}
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          auto-rotate
          rotation-per-second="30deg"
          shadow-intensity="1"
          exposure="1.2"
          loading="eager"
          style={{ width: '100%', height: '70%', cursor: 'grab' }}
          className="floating"
        >
          {/* Hide the default AR button slot */}
          <div slot="ar-button" style={{ display: 'none' }} />
        </model-viewer>

        {/* PROPER AR BUTTON: Positioned below the burger in the flex flow */}
        <button 
          onClick={() => modelViewerRef.current?.activateAR()}
          className="w-auto px-10 py-4 bg-gradient-to-r from-orange-600 to-orange-400 text-black font-black rounded-2xl shadow-[0_15px_30px_rgba(255,107,0,0.3)] flex items-center justify-center gap-3 cyber-button transition-all hover:scale-105 active:scale-95 z-50 mt-4"
        >
           <span className="text-xl">📱</span> <span className="text-base uppercase tracking-tight">View In Your Space</span>
        </button>
        
        <div className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
           Interact to rotate • Pinch to zoom
        </div>

        {/* Scan Glow Effect */}
        <div className="absolute bottom-20 w-[300px] h-[300px] bg-orange-500/10 blur-[100px] rounded-full -z-10 animate-pulse" />
        
        {/* Help Text */}
        <div className="absolute bottom-10 right-10 text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hidden md:block">
           Drag to rotate • Pinch to zoom
        </div>
      </div>

      {/* RIGHT SIDE: Detail Panel */}
      <div className="w-full md:w-[500px] lg:w-[600px] h-[50vh] md:h-full glass-dark border-l border-white/5 p-12 md:p-20 overflow-y-auto no-scrollbar relative z-20">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-between items-center mb-8">
            <span className="px-4 py-1.5 bg-orange-500/20 text-orange-400 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border border-orange-500/20">
              Premium Selection
            </span>
            <div className="flex items-center gap-2 text-white/40 text-xs font-bold">
               <span>🔥</span>
               <span>{item.calories} Calories</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 font-serif italic tracking-tighter leading-[1.1] text-white">{item.name}</h1>
          <div className="text-4xl font-black text-orange-500 mb-10 tracking-tight">₹{item.price}</div>
          
          <p className="text-xl text-white/60 font-light leading-relaxed mb-12 italic">
            "{item.description}"
          </p>

          {/* Ingredient Customization */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-white/40">Customize Ingredients</h3>
              <span className="text-[10px] text-orange-500 font-black uppercase tracking-[0.3em]">Tap to remove</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {item.ingredients.map((ing, i) => (
                <button 
                  key={i}
                  onClick={() => toggleIngredient(ing)}
                  className={`px-6 py-4 rounded-full text-[12px] font-black transition-all border flex items-center gap-4 group ${
                    selectedIngredients.includes(ing)
                      ? 'bg-white/5 text-white/90 border-white/10 hover:border-orange-500/30 shadow-lg'
                      : 'bg-red-500/5 text-white/20 border-white/5 line-through opacity-40'
                  }`}
                >
                  <div className={`w-2.5 h-2.5 rounded-full shadow-[0_0_10px_rgba(255,107,0,0.5)] ${
                    selectedIngredients.includes(ing) ? 'bg-orange-500' : 'bg-white/10'
                  }`} />
                  <span className="truncate">{ing}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Nutrition Section */}
          <div className="mb-16">
            <div className="flex justify-between items-end mb-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Nutritional Value</h3>
              <div className="text-right">
                <div className="text-xs text-white/40 font-bold uppercase tracking-widest mb-1">Total Calories</div>
                <div className="text-2xl font-black text-white glow-text">
                  {Math.round(item.nutrition.calories * (selectedIngredients.length / item.ingredients.length))} <span className="text-[10px] text-orange-500/60 ml-1">kcal</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              {[
                { label: 'Protein', value: item.nutrition.protein, max: 100, color: 'bg-orange-500' },
                { label: 'Carbs', value: item.nutrition.carbs, max: 100, color: 'bg-blue-500' },
                { label: 'Fats', value: item.nutrition.fats, max: 100, color: 'bg-emerald-500' }
              ].map((nutri, i) => {
                // Dynamic reduction logic: scale nutrition based on remaining ingredients
                const adjustedValue = Math.round(nutri.value * (selectedIngredients.length / item.ingredients.length));
                
                return (
                  <div key={i}>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-white/60">
                      <span>{nutri.label}</span>
                      <span className="text-white">{adjustedValue}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${adjustedValue}%` }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className={`h-full ${nutri.color} shadow-[0_0_15px_rgba(255,107,0,0.3)]`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Special Instructions */}
          <div className="mb-12">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-6">Special Instructions</h3>
            <textarea 
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Any allergies or cooking preferences?"
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-orange-500/50 transition-all resize-none h-32"
            />
          </div>

          {/* CTA Button */}
          <button 
            onClick={() => {
              addItem({ ...item, selectedIngredients, specialInstructions });
              toast.success(`${item.name} added with your customizations!`);
            }}
            className="w-full py-6 bg-orange-500 hover:bg-orange-600 text-black font-black text-xl rounded-[32px] transition-all shadow-[0_20px_50px_rgba(255,107,0,0.3)] flex items-center justify-center gap-4 cyber-button"
          >
            Add to Order
            <span className="text-2xl">+</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ARViewer;
