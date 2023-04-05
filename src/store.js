import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import productsSlice from './slicers/productSlice';
import productDetailsSlice from './slicers/productDetailsSlice';

const middleware = [thunk]

const store = configureStore({
    reducer: {
        productsList: productsSlice,
        productDetials: productDetailsSlice
    },
    preloadedState: {},
    middleware
})

export default store;

