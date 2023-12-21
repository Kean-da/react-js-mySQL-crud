import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    productsData: [],
};

export const productSlice = createSlice({
    initialState,
    name: 'products',
    reducers: {
        setProducts: (state, action) => {
            state.productsData = action.payload;
        },
    }
});

export const { setProducts }        = productSlice.actions;

export const selectProductsData     = (state) => state.products.productsData;

export default productSlice.reducer;