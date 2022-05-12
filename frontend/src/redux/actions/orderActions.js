import {CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS} from "../constants/orderConstants";
import axios from "axios";
import {CLEAR_ERRORS} from "../constants/productConstants";

export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({type: CREATE_ORDER_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const {data} = await axios.post('/api/order/new', order, config);
        dispatch({type: CREATE_ORDER_SUCCESS, payload: data});
    } catch (err) {
        dispatch({type: CREATE_ORDER_FAIL, payload: err.response.data.message});
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS})
}
