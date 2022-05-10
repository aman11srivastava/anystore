import React from "react";
import './CartItemCard.css';
import {Link} from "react-router-dom";

export const CartItemCard = ({item, removeProductFromCart}) => {
    const {product, name, price, image} = item;

    return (
        <>
            <div className={"CartItemCard"}>
                <img src={image} alt={name}/>
                <div>
                    <Link to={`/product/${product}`}>{name}</Link>
                    <span>{`Price: Rs${price}`}</span>
                    <p onClick={() => removeProductFromCart(product)}>Remove</p>
                </div>
            </div>
        </>
    )
}

export default CartItemCard;
