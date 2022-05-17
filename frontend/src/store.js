import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {
    deleteReviewReducer,
    newProductReducer,
    newReviewReducer,
    productDetailsReducer,
    productReducer, productReviewsReducer, productsReducer
} from "./redux/reducers/productReducer";
import {allUsersReducer, userDetailsReducer, userReducer} from "./redux/reducers/userReducer";
import {profileReducer} from "./redux/reducers/profileReducer";
import {forgotPasswordReducer} from "./redux/reducers/forgotPasswordReducer";
import {cartReducer} from "./redux/reducers/cartReducer";
import {
    myAndAllOrdersReducer,
    orderDetailsReducer,
    orderReducer,
    updateDeleteOrderReducer
} from "./redux/reducers/orderReducer";

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: orderReducer,
    myOrders: myAndAllOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: productReducer,
    updateDeleteOrder: updateDeleteOrderReducer,
    allOrders: myAndAllOrdersReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    deleteReview: deleteReviewReducer
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
