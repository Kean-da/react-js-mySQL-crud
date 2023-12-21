import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const baseQuery = fetchBaseQuery({ 
    baseUrl: VITE_BACKEND_URL,
    prepareHeaders(headers) {
        return headers;
    },
    credentials: "include"    
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User', 'Product'],
    endpoints: (build) => ({}),
});