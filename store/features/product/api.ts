import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ProductsResponse,
  ProductResponse,
  ProductFilterParams,
  ProductSearchParams,
  SearchProductsResponse,
} from "./type";
import { Constants } from "../../../utils/app.constant";

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(Constants.ACCESS_TOKEN);
    if (token) {
      try {
        return JSON.parse(token).token || token;
      } catch {
        return token;
      }
    }
  }
  return null;
};

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: Constants.BASE_ENDPOINT,
    prepareHeaders: (headers) => {
      const token = getAuthToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Product", "Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, ProductFilterParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();

        if (params?.category?.length) {
          queryParams.append("category", params.category.join(","));
        }
        if (params?.author?.length) {
          queryParams.append("author", params.author.join(","));
        }
        if (params?.price) {
          queryParams.append("price", params.price);
        }
        if (params?.hasImage) {
          queryParams.append("hasImage", "true");
        }
        if (params?.limit) {
          queryParams.append("limit", String(params.limit));
        }

        const queryString = queryParams.toString();
        return `landing/products${queryString ? `?${queryString}` : ""}`;
      },
    }),
    getProductById: builder.query<ProductResponse, string>({
      query: (id) => `landing/product/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    searchProducts: builder.query<SearchProductsResponse, ProductSearchParams>({
      query: ({ q, limit = 8 }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("q", q);
        queryParams.append("limit", String(limit));

        return `search?${queryParams.toString()}`;
      },
    }),
    addReview: builder.mutation<
      { data: null; message: string | null; stack?: unknown },
      { id: string; rating: number; comment?: string }
    >({
      query: ({ id, ...body }) => ({
        url: `landing/product/${id}/review`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useLazySearchProductsQuery,
  useAddReviewMutation,
} = productApi;
