import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import authReducer from "./features/auth/slice";
import productReducer from "./features/product/slice";
import cartReducer from "./features/cart/slice";
import wishlistReducer from "./features/wishlist/slice";
import productFilterReducer from "./features/product/filterSlice";
import orderReducer from "./features/order/slice";

import { authApi } from "./features/auth/api";
import { productApi } from "./features/product/api";
import { utilitiesApi } from "./features/utilities/api";
import { orderApi } from "./features/order/api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    productFilter: productFilterReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    order: orderReducer,

    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [utilitiesApi.reducerPath]: utilitiesApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productApi.middleware,
      utilitiesApi.middleware,
      orderApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
