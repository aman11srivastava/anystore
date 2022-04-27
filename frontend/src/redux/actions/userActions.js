import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS
} from "../constants/userConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({type: LOGIN_REQUEST});
        const config = {headers: {"Content-Type": "application/json"}};
        const {data} = await axios.post(`/api/login`, {email, password}, config);
        dispatch({type: LOGIN_SUCCESS, payload: data.user})
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.message
        })
    }
}

export const register = (user) => async (dispatch) => {
    try {
        // const {name, email, password, avatar} = user;
        dispatch({type: REGISTER_REQUEST});
        const config = {headers: {"Content-Type": "multipart/form-data"}};
        const { data } = axios.post(`/api/register`, {user}, config);
        dispatch({type: REGISTER_SUCCESS, payload: data.user})
    }
    catch (err) {
        dispatch({
            type: REGISTER_FAIL, payload: err.response.data.message
        })
    }
}
