import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductFilterState {
  categories: string[];
  authors: string[];
  price: "" | "Free" | "Low to High" | "High to Low";
  hasImage: boolean;
}

const initialState: ProductFilterState = {
  categories: [],
  authors: [],
  price: "",
  hasImage: false,
};

export const productFilterSlice = createSlice({
  name: "productFilter",
  initialState,
  reducers: {
    toggleCategory(state, action: PayloadAction<string>) {
      const category = action.payload;
      if (state.categories.includes(category)) {
        state.categories = state.categories.filter((item) => item !== category);
      } else {
        state.categories.push(category);
      }
    },
    toggleAuthor(state, action: PayloadAction<string>) {
      const author = action.payload;
      if (state.authors.includes(author)) {
        state.authors = state.authors.filter((item) => item !== author);
      } else {
        state.authors.push(author);
      }
    },
    setPrice(state, action: PayloadAction<ProductFilterState["price"]>) {
      state.price = state.price === action.payload ? "" : action.payload;
    },
    setHasImage(state, action: PayloadAction<boolean>) {
      state.hasImage = action.payload;
    },
    clearFilters(state) {
      state.categories = [];
      state.authors = [];
      state.price = "";
      state.hasImage = false;
    },
  },
});

export const {
  toggleCategory,
  toggleAuthor,
  setPrice,
  setHasImage,
  clearFilters,
} = productFilterSlice.actions;

export default productFilterSlice.reducer;
