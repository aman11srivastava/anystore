import React from "react";
import './Cart.css';
import CartItemCard from "./CartItemCard";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCart} from "../../redux/actions/cartActions";
import {RemoveShoppingCart} from "@material-ui/icons";
import {Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

export const Cart = () => {
    const dispatch = useDispatch();
    const {cartItems} = useSelector(state => state?.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) return;
        dispatch(addToCart(id, newQty));
    }

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (quantity <= 1) return;
        dispatch(addToCart(id, newQty));
    }

    const removeProductFromCart = (id) => {
        dispatch(removeFromCart(id));
        alert.success("Product removed from cart")
    }

    return (
        <>
            {cartItems.length === 0 ? (
                <>
                    <div className={"emptyCart"}>
                        <RemoveShoppingCart/>
                        <Typography>No products in your Cart!</Typography>
                        <Link to={"/products"}>View Products</Link>
                    </div>
                </>
            ) : (
                <>
                    <div className={"cartPage"}>
                        <div className={"cartHeader"}>
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>
                        {cartItems.map(item => (
                                <div key={item.product} className={"cartContainer"}>
                                    <CartItemCard removeProductFromCart={removeProductFromCart} item={item}/>
                                    <div className={"cartInput"}>
                                        <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                                        <input readOnly={true} value={item.quantity} type={"number"}/>
                                        <button
                                            onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+
                                        </button>
                                    </div>
                                    <p className={"cartSubtotal"}>Rs{item.quantity * item.price}</p>
                                </div>
                            )
                        )}
                        <div className={"cartGrossTotal"}>
                            <div/>
                            <div className={"cartGrossTotalBox"}>
                                <p>Gross Total</p>
                                <p>Rs{cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0)}</p>
                            </div>
                            <div/>
                            <div className={"checkOutBtn"}>
                                <button>Checkout</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Cart;
