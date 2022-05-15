import axios from "axios";
import {
    ADMIN_PRODUCTS_FAIL, ADMIN_PRODUCTS_REQUEST, ADMIN_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    CLEAR_ERRORS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS
} from "../constants/productConstants";

export const getProducts = (keyword = "", currentPage = 1, price = [0, 25000], category, rating = 0) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCTS_REQUEST,
        })
        let link = `/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`;
        if (category) {
            link = link + `&category=${category}`;
        }
        const {data} = await axios.get(link);
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: err.response?.data?.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS})
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        })
        const {data} = await axios.get(`/api/product/${id}`);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: err.response?.data?.message
        })
    }
}

export const newReview = (review) => async (dispatch) => {
    try {
        dispatch({type: NEW_REVIEW_REQUEST});
        const config = {headers: {"Content-Type": "application/json"}};
        const {data} = await axios.put('/api/review', review, config);
        dispatch({type: NEW_REVIEW_SUCCESS, payload: data.success});
    } catch (err) {
        dispatch({type: NEW_REVIEW_FAIL, payload: err.response.data.message});
    }
}

export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch({type: ADMIN_PRODUCTS_REQUEST});
        const {data} = await axios.get('/api/admin/products');
        dispatch({type: ADMIN_PRODUCTS_SUCCESS, payload: data.products});
    } catch (err) {
        dispatch({type: ADMIN_PRODUCTS_FAIL, payload: err.response.data.message});
    }
}
