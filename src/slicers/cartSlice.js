import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: { cartItems: [] },
    reducers: {
        cartAddItem: (state, action) => {
            // console.log('test');
            // console.log(action);
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)
            if(existItem){
                return{
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }
            }else{
                return{
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        },
        cartRemoveItem: (state, action) => {
            return{
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }
        }
    }
});

// console.log(cartSlice.actions);

export const cartActions = cartSlice.actions;
// console.log(cartAddItem);
export default cartSlice.reducer;
// console.log(cartSlice.reducer);
