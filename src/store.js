import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import productsSlice from './slicers/productSlice';

const middleware = [thunk]

const store = configureStore({
    reducer: {
        productsList: productsSlice
    },
    preloadedState: {},
    middleware
})

export default store;

