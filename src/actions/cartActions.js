import axios from "axios";
import { cartActions } from "../slicers/cartSlice.js";


export const addToCart = (id, qty) => async (dispatch, getState) => {
    // console.log('addToCart called with id:', id, 'qty:', qty);
    if (!id) {
        console.error('addToCart called with undefined id');
        return;
        }
    const { data } = await axios.get(`http://localhost:5000/api/products/${id}`) 
    
    dispatch({
        type: 'cart/cartAddItem',
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })


    const cartItems = getState().cart.cartItems;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: 'cart/cartRemoveItem',
        payload: id
    })
    const cartItems = getState().cart.cartItems;
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
}


export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: 'cart/cartSaveShippingAddress',
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: 'cart/cartSavePaymentMethod',
        payload: data
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}