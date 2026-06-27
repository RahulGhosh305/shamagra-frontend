import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductState } from './type';

const initialState: ProductState = {
    searchQuery: '',
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
    },
});

export const { setSearchQuery } = productSlice.actions;

export default productSlice.reducer;
