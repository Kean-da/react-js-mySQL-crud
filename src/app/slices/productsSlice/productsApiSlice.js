import { apiSlice } from "../apiSlice";
const PRODUCT_URL   = '/api/products';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.mutation({
            query: () => ({
                url:        `${PRODUCT_URL}/`,
                method:     'GET',
            }),
        }),

        addProduct: build.mutation({
            query: (data) => ({
                url:        `${PRODUCT_URL}/addProduct`,
                method:     'POST',
                body:       data,
            }),
        }),

        updateProduct: build.mutation({
            query: (data) => ({
                url:        `${PRODUCT_URL}/updateProduct/${data.id}`,
                method:     'PUT',
                body:       data,
            }),
        }),

        deleteProduct: build.mutation({
            query: (id) => ({
                url:        `${PRODUCT_URL}/deleteProduct/${id}`,
                method:     'DELETE',
            }),
        }),
    }),
});

export const { 
    useGetProductsMutation, 
    useAddProductMutation, 
    useUpdateProductMutation, 
    useDeleteProductMutation 
} = productsApiSlice;