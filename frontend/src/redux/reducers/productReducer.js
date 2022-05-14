import {
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    CLEAR_ERRORS, NEW_REVIEW_FAIL,
    NEW_REVIEW_REQUEST, NEW_REVIEW_RESET,
    NEW_REVIEW_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS
} from "../constants/productConstants";

export const productReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            }
        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productCount,
                resultPerPage: action.payload.RESULT_PER_PAGE,
                filteredProductsCount: action.payload.filteredProductsCount
            }
        case ALL_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const productDetailsReducer = (state = {product: {}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload.product
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }
        case NEW_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}
