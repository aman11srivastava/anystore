import React from 'react'
import {Link} from 'react-router-dom';
import ReactStars from 'react-rating-stars-component'

export const Product = ({product}) => {
    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };
    return (
        <Link className={"productCard"} to={product._id}>
            <img src={product.images[0].url} alt={product.name}/>
            <p>{product.name}</p>
            <div>
                <ReactStars {...options}/> <span>(256 Reviews)</span>
            </div>
            <span>{product.price}</span>
        </Link>
    )
}

export default Product
