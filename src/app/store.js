import { configureStore }       from '@reduxjs/toolkit';
import { apiSlice  }            from './slices/apiSlice';
import authSlice                from './slices/usersSlice/AuthSlice';
import productSlice             from './slices/productsSlice/ProductSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
        products: productSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;