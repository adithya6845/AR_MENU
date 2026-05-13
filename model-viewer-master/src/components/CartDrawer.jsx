import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '../store/cartStore';

const CartDrawer = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeItem } = useCartStore();
  
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md glass z-[70] p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Your Order</h2>
              <button onClick={onClose} className="w-10 h-10 flex items-center justify-center glass rounded-full">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6">
              {items.length === 0 ? (
                <div className="text-center py-12 opacity-50">
                  <span className="text-6xl mb-4 block">🛒</span>
                  <p>Your cart is empty</p>
                </div>
              ) : (
                items.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex gap-5 glass-dark p-4 rounded-3xl border border-white/5">
                    <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center text-3xl">
                      {item.id === 'burger' ? '🍔' : '🍢'}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white">{item.name}</h4>
                      <p className="text-orange-500 text-sm mb-2 font-black">₹{item.price}</p>
                      
                      {/* Ingredient Customization Info */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.selectedIngredients?.length < (item.ingredients?.length || 0) ? (
                          item.ingredients.map(ing => (
                            !item.selectedIngredients.includes(ing) && (
                              <span key={ing} className="text-[9px] px-2 py-0.5 bg-red-500/10 text-red-400 rounded-md border border-red-500/20">
                                - No {ing}
                              </span>
                            )
                          ))
                        ) : (
                          <span className="text-[9px] text-white/30 uppercase tracking-widest font-bold">Standard Config</span>
                        )}
                      </div>

                      {/* Special Instructions Info */}
                      {item.specialInstructions && (
                        <p className="text-[10px] text-white/40 italic mt-2 bg-white/5 p-2 rounded-lg border border-white/5">
                          " {item.specialInstructions} "
                        </p>
                      )}

                      <div className="flex items-center gap-3 mt-6">
                        <button 
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white"
                        >
                          -
                        </button>
                        <span className="font-bold text-white">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button onClick={() => removeItem(index)} className="text-gray-500 hover:text-red-400 transition-colors">
                      🗑️
                    </button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="pt-6 border-t border-white/10 mt-6">
                <div className="flex justify-between text-xl font-bold mb-6">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <button className="w-full py-4 bg-orange-600 text-white rounded-2xl font-bold text-lg hover:bg-orange-700 transition-colors shadow-lg">
                  Place Order
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
