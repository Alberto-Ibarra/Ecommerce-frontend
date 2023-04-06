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


    // localStorage.setItem('cartItems', JSON.stringify(getState().cartItems))
}
