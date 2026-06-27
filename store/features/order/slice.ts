import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, CreateOrderRequest } from "@/types";

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
  success: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // Add order to local state
    addOrderLocal: (state, action: PayloadAction<Order>) => {
      state.currentOrder = action.payload;
      state.orders.unshift(action.payload);
      state.success = true;
    },
    // Set current order
    setCurrentOrder: (state, action: PayloadAction<Order>) => {
      state.currentOrder = action.payload;
    },
    // Set all orders
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // Set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    // Reset order state
    resetOrderState: (state) => {
      state.currentOrder = null;
      state.error = null;
      state.success = false;
    },
    // Clear orders
    clearOrders: (state) => {
      state.orders = [];
      state.currentOrder = null;
    },
  },
});

export const {
  addOrderLocal,
  setCurrentOrder,
  setOrders,
  setLoading,
  setError,
  resetOrderState,
  clearOrders,
} = orderSlice.actions;

export default orderSlice.reducer;
