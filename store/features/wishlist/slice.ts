import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WishlistState, WishlistItem } from './type';

const initialState: WishlistState = {
    items: [],
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        toggleWishlist: (state, action: PayloadAction<WishlistItem>) => {
            const newItem = action.payload;
            const existingItemIndex = state.items.findIndex(item => item._id === newItem._id);

            if (existingItemIndex >= 0) {
                state.items.splice(existingItemIndex, 1);
            } else {
                state.items.push(newItem);
            }
        },
        clearWishlist: (state) => {
            state.items = [];
        }
    },
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
