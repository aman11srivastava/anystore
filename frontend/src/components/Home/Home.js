import React from "react";
import {CgMouse} from "react-icons/all";
import './Home.css'
import Product from "./Product";

export const Home = () => {
    const product = {
        name: 'Blue Shirt',
        price: "Rs 3000",
        _id: "test",
        images: [{url: "https://shop.googlemerchandisestore.com/store/20160512512/assets/items/largeimages/GGOEGXXX0907.jpg"}]
    }
    return (
        <>
            <div className={"banner"}>
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>
                <a href={"#container"}>
                    <button>
                        Scroll <CgMouse/>
                    </button>
                </a>
            </div>
            <h2 className="homeHeading">Featured Products</h2>
            <div className="container" id="container">
                <Product product={product}/>
                <Product product={product}/>
                <Product product={product}/>
                <Product product={product}/>
                <Product product={product}/>
                <Product product={product}/>
                <Product product={product}/>
                <Product product={product}/>
            </div>
        </>
    )
}

export default Home
