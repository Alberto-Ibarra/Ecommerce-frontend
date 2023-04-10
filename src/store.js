import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import productsSlice from './slicers/productSlice';
import productDetailsSlice from './slicers/productDetailsSlice';
import cartSlice  from './slicers/cartSlice';
import userLoginSlice from './slicers/userSlice';
import userRegisterSlice from './slicers/userRegisterSlice';
import userDetailsSlice from './slicers/userDetailsSlice';
import userUpdateProfileSlice from './slicers/userUpdateProfile';



const reducer = combineReducers({
    productsList: productsSlice,
    productDetials: productDetailsSlice,
    cart: cartSlice,
    userLogin: userLoginSlice,
    userRegister: userRegisterSlice,
    userDetails: userDetailsSlice,
    UpdateProfile: userUpdateProfileSlice
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

    let parsedUserInfo = null
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
        parsedUserInfo = JSON.parse(storedUserInfo);
    }else{
        null
    }


const initialState = {
    cart: {cartItems: cartItemsFromStorage},
    userLogin: {userInfo: parsedUserInfo},
    };


const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: middleware,
});




export default store;

