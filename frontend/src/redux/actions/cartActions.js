import axios from "axios";
import {ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO} from "../constants/cartConstants";

export const addToCart = (productId, quantity) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/product/${productId}`);
    dispatch({
        type: ADD_TO_CART, payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => async (dispatch, getState) => {
    dispatch({type: REMOVE_CART_ITEM, payload: productId})
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({type: SAVE_SHIPPING_INFO, payload: data});
    localStorage.setItem("shippingInfo", JSON.stringify(data));
}
