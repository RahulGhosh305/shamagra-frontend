import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateOrderRequest, OrderResponse, OrdersListResponse } from "@/types";
import { Constants } from "@/utils/app.constant";

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("feAuthToken");
  }
  return null;
};

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: Constants.BASE_ENDPOINT,
    prepareHeaders: (headers) => {
      const token = getAuthToken();
      const token2 =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiX2lkIjoiNjllNDdkNjc4Y2JiYzcyMWU1MjA3NjUwIiwicm9sZSI6eyJfaWQiOiI2OWU0N2Q2N2U4NjRjN2NhYWEwZGY0NjAiLCJuYW1lIjoiU3VwZXJBZG1pbiJ9LCJmaXJzdE5hbWUiOiJSYWh1bCIsImxhc3ROYW1lIjoiR2hvc2giLCJwaG9uZSI6IjAxNTIxNDUwNzI3IiwiZ2VuZGVyIjoibWFsZSIsInBob3RvIjpudWxsLCJlbWFpbCI6InJhaHVsLmluZm8zMDVAZ21haWwuY29tIiwidXNlcm5hbWUiOiJyZ2hvc2giLCJzdXBlckFkbWluIjp0cnVlLCJzdGF0dXMiOiJhY3RpdmUiLCJkZXBhcnRtZW50Ijp7Im5hbWUiOm51bGx9LCJ0ZWFtIjp7Im5hbWUiOm51bGx9LCJwZXJzb25hbCI6eyJkYXRlT2ZCaXJ0aCI6bnVsbCwiYmlydGhQbGFjZSI6bnVsbCwiYmxvb2RHcm91cCI6bnVsbCwiZmF0aGVyc05hbWUiOm51bGwsImZhdGhlcnNQaG9uZSI6bnVsbCwiZmF0aGVyc09jY3VwYXRpb24iOm51bGwsIm1vdGhlcnNOYW1lIjpudWxsLCJtb3RoZXJzUGhvbmUiOm51bGwsIm1vdGhlcnNPY2N1cGF0aW9uIjpudWxsLCJyZWxpZ2lvbiI6bnVsbCwicHJlc2VudEFkZHJlc3MiOm51bGwsInBlcm1hbmVudEFkZHJlc3MiOm51bGx9LCJlbWVyZ2VuY3kiOnsibmFtZSI6bnVsbCwibnVtYmVyIjpudWxsLCJyZWxhdGlvbiI6bnVsbCwiYWRkcmVzcyI6bnVsbH0sIm9mZmljZSI6eyJkZXNpZ25hdGlvbiI6bnVsbCwiam9pbmluZ0RhdGUiOm51bGwsInJlc2lnbmF0aW9uRGF0ZSI6bnVsbCwibGFzdFdvcmtpbmdEYXRlIjpudWxsfSwiYWNjZXNzIjp7ImluVGltZSI6bnVsbCwib3V0VGltZSI6bnVsbCwiaXAiOm51bGwsImFjY2Vzc1dpdGhvdXRJcCI6ZmFsc2V9LCJ2ZW5kb3IiOnsiaXNWZW5kb3IiOmZhbHNlLCJkZXNpZ25hdGlvbiI6bnVsbCwiZW1wbG95ZWVJZCI6bnVsbCwiZGVwYXJ0bWVudCI6bnVsbCwib3ZlcnZpZXciOm51bGwsInN0YXR1cyI6bnVsbCwib3JnYW5pemF0aW9uIjp7Im5hbWUiOm51bGx9fX0sInBsYXRmb3JtIjoiYmFjay1lbmQiLCJpYXQiOjE3Nzc3MDQxMTcsImV4cCI6MTc3Nzk2MzMxN30.xXwmFFRmIRfOqcd9jxwebGR4tspACQcC9Z4Jcx63ea4";
      if (token) {
        headers.set("Authorization", `Bearer ${token2}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation<OrderResponse, CreateOrderRequest>({
      query: (orderData) => {
        console.log("Creating order with data:", orderData);
        return {
          url: "/checkout/order",
          method: "POST",
          body: orderData,
        };
      },
    }),
    getOrders: builder.query<OrdersListResponse, void>({
      query: () => ({
        url: "front-end/orders",
        method: "GET",
      }),
    }),
    getOrderById: builder.query<OrderResponse, string>({
      query: (orderId) => ({
        url: `checkout/order/${encodeURIComponent(orderId)}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useLazyGetOrderByIdQuery,
} = orderApi;
