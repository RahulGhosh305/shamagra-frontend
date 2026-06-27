import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItem } from './type';

const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const newItem = action.payload;
            const quantityToAdd = newItem.quantity || 1;
            const existingItem = state.items.find(item => item._id === newItem._id);
            state.totalQuantity += quantityToAdd;
            const price = newItem.pricing?.discountPrice || newItem.pricing?.originalPrice || 0;
            state.totalAmount += price * quantityToAdd;

            if (!existingItem) {
                state.items.push({
                    ...newItem,
                    quantity: quantityToAdd,
                });
            } else {
                existingItem.quantity = (existingItem.quantity || 0) + quantityToAdd;
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            const existingItem = state.items.find(item => item._id === id);

            if (existingItem) {
                state.totalQuantity--;
                const price = existingItem.pricing?.discountPrice || existingItem.pricing?.originalPrice || 0;
                state.totalAmount -= price;

                if (existingItem.quantity && existingItem.quantity > 1) {
                    existingItem.quantity--;
                } else {
                    state.items = state.items.filter(item => item._id !== id);
                }
            }
        },
        clearItemFromCart: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            const existingItem = state.items.find(item => item._id === id);

            if (existingItem) {
                const quantity = existingItem.quantity || 1;
                state.totalQuantity -= quantity;
                const price = existingItem.pricing?.discountPrice || existingItem.pricing?.originalPrice || 0;
                state.totalAmount -= price * quantity;
                state.items = state.items.filter(item => item._id !== id);
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        }
    },
});

export const { addToCart, removeFromCart, clearItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
