import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import productsSlice from './slicers/productSlice';
import productDetailsSlice from './slicers/productDetailsSlice';
import  cartSlice  from './slicers/cartSlice';
import userLoginSlice from './slicers/userSlice';



const reducer = combineReducers({
    productsList: productsSlice,
    productDetials: productDetailsSlice,
    cart: cartSlice,
    userLogin: userLoginSlice
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


        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            JSON.parse(localStorage.getItem('userInfo'));
        }else{
            null
        }


const initialState = {
    cart: {cartItems: cartItemsFromStorage},
    userLogin: {userInfo: storedUserInfo},
    };


const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: middleware,
});




export default store;

