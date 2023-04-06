import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import productsSlice from './slicers/productSlice';
import productDetailsSlice from './slicers/productDetailsSlice';
import  cartReducer  from './slicers/cartSlice';



const reducer = combineReducers({
    productsList: productsSlice,
    productDetials: productDetailsSlice,
    cart: cartReducer
});

const middleware = [thunk]


    let cartItemsFromStorage = [];
    try {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            cartItemsFromStorage = JSON.parse(storedCartItems);
        }
    } catch (error) {
        console.error('Error parsing cart items from local storage', error);
    }

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        },
    };


const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: middleware,
});




export default store;

