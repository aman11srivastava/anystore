import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {newReviewReducer, productDetailsReducer, productReducer} from "./redux/reducers/productReducer";
import {userReducer} from "./redux/reducers/userReducer";
import {profileReducer} from "./redux/reducers/profileReducer";
import {forgotPasswordReducer} from "./redux/reducers/forgotPasswordReducer";
import {cartReducer} from "./redux/reducers/cartReducer";
import {myOrdersReducer, orderDetailsReducer, orderReducer} from "./redux/reducers/orderReducer";

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: orderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
    },
};
const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
