import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          state.items.push({ name, image, cost, quantity: 1 });
        }
      },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    // updateQuantity: (state, action) => {
    //   const { name, quantity } = action.payload;
    //   const itemToUpdate = state.items.find(item => item.name === name);
    //   if (itemToUpdate) {
    //     itemToUpdate.quantity = quantity;
    //   }
    // },

    updateQuantity: (state, action) => {
      const { item, change } = action.payload; 
      const existingItem = state.items.find(CartItem => CartItem.name === item.name);
      if (existingItem) {
        existingItem.quantity += change;
        if (existingItem.quantity < 1) {
          existingItem.quantity = 1; 
        }
      }
    },

  },
});

export const { addItem, updateQuantity } = CartSlice.actions;
export const { removeItem } = CartSlice.actions; 

export default CartSlice.reducer;
