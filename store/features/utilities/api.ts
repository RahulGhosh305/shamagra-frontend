import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Constants } from "../../../utils/app.constant";
import { BannersResponse, ContentsResponse, CategoriesResponse } from "./type";

export const utilitiesApi = createApi({
  reducerPath: "utilitiesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: Constants.BASE_ENDPOINT,
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Basic ${btoa(`${Constants.CLIENT_ID}:${Constants.CLIENT_SECRET}`)}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBanners: builder.query<BannersResponse, void>({
      query: () => "utilities/banners",
    }),
    getHighlights: builder.query<BannersResponse, void>({
      query: () => "utilities/highlights",
    }),
    getContents: builder.query<ContentsResponse, void>({
      query: () => "utilities/contents",
    }),
    getCategories: builder.query<CategoriesResponse, void>({
      query: () => "utilities/categories",
    }),
    getAuthors: builder.query<any, void>({
      query: () => "utilities/authors",
    }),
  }),
});

export const {
  useGetBannersQuery,
  useGetHighlightsQuery,
  useGetContentsQuery,
  useGetCategoriesQuery,
  useGetAuthorsQuery,
} = utilitiesApi;
