import { create } from 'zustand';

const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => {
    const existing = state.items.find((i) => 
      i.id === item.id && JSON.stringify(i.selectedIngredients) === JSON.stringify(item.selectedIngredients)
    );
    if (existing) {
      return {
        items: state.items.map((i) =>
          (i.id === item.id && JSON.stringify(i.selectedIngredients) === JSON.stringify(item.selectedIngredients)) 
            ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    }
    return { items: [...state.items, { ...item, quantity: 1 }] };
  }),
  updateQuantity: (index, quantity) => set((state) => ({
    items: state.items.map((i, idx) =>
      idx === index ? { ...i, quantity: Math.max(0, quantity) } : i
    ).filter((i) => i.quantity > 0),
  })),
  removeItem: (index) => set((state) => ({
    items: state.items.filter((_, idx) => idx !== index),
  })),
  clearCart: () => set({ items: [] }),
}));

export default useCartStore;
