import {
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS
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
        dispatch({type: REGISTER_REQUEST});
        const config = {headers: {"Content-Type": "multipart/form-data"}};
        const {data} = await axios.post(`/api/register`, user, config);
        dispatch({type: REGISTER_SUCCESS, payload: data.user})
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL, payload: err.response.data.message
        })
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({type: LOAD_USER_REQUEST});
        const {data} = await axios.get('/api/me');
        dispatch({type: LOAD_USER_SUCCESS, payload: data.user})
    } catch (err) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: err.response.data.message
        })
    }
}

export const logout = () => async (dispatch) => {
    try {
        await axios.get('/api/logout');
        dispatch({type: LOGOUT_SUCCESS})
    } catch (err) {
        dispatch({type: LOGOUT_FAIL, payload: err.response.data?.message})
    }
}

export const updateProfile = (user) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_PROFILE_REQUEST});
        const config = {headers: {"Content-Type": "multipart/form-data"}};
        const {data} = await axios.put('/api/me/update', user, config);
        dispatch({type: UPDATE_PROFILE_SUCCESS, payload: data.success});
    } catch (err) {
        dispatch({type: UPDATE_PROFILE_FAIL, payload: err.response.data.message});
    }
}

export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_PASSWORD_REQUEST});
        const config = {headers: {"Content-Type": "application/json"}};
        const {data} = await axios.put('/api/password/update', passwords, config);
        dispatch({type: UPDATE_PASSWORD_SUCCESS, payload: data.success});
    } catch (err) {
        dispatch({type: UPDATE_PASSWORD_FAIL, payload: err.response.data.message})
    }
}

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({type: FORGOT_PASSWORD_REQUEST});
        const config = {headers: {"Content-Type": "application/json"}};
        const {data} = await axios.post('/api/password/forgot', email, config);
        dispatch({type: FORGOT_PASSWORD_SUCCESS, payload: data.message});
    } catch (err) {
        dispatch({type: FORGOT_PASSWORD_FAIL, payload: err.response.data.message})
    }
}
