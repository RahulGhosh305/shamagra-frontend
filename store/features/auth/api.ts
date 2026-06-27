import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from './type';
import { Constants } from '@/utils/app.constant';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: Constants.BASE_ENDPOINT, }), // Replace with your actual base URL
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
                headers: {
                    Authorization: `Basic ${btoa('demo-client:demo-secret')}`
                }
            })
        }),
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (credentials) => ({
                url: 'auth/register',
                method: 'POST',
                body: credentials,
                headers: {
                    Authorization: `Basic ${btoa('demo-client:demo-secret')}`
                }
            }),
        }),
        // define other endpoints...
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useRegisterMutation } = authApi;
