
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  title: string;
  price: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.total = calculateTotal(action.payload);
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        state.total = calculateTotal(state.items);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.total = calculateTotal(state.items);
    },
  },
});

const calculateTotal = (items: CartItem[]): number => {
  return +items.reduce((sum, item) => sum + item.price, 0).toFixed(2);
};

export const { loadCart, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
