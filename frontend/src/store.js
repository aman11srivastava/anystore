import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {productDetailsReducer, productReducer} from "./redux/reducers/productReducer";
import {userReducer} from "./redux/reducers/userReducer";
import {profileReducer} from "./redux/reducers/profileReducer";
import {forgotPasswordReducer} from "./redux/reducers/forgotPasswordReducer";

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer
})

let initialState = {};
const middleware = [thunk];

const store = createStore(reducer,  initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
