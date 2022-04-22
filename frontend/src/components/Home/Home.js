import React, {useEffect} from "react";
import {CgMouse} from "react-icons/all";
import './Home.css'
import Product from "./Product";
import MetaData from "../layout/MetaData";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../redux/actions/productAction";
import {Loader} from "../layout/Loader/Loader";
import {useAlert} from "react-alert";

export const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading, products, productsCount, error} = useSelector(state => state?.products);

    useEffect(() => {
        if (error) {
            return alert.error(error || "Internal Server Error")
        }
        dispatch(getProducts())
    }, [dispatch, error])

    return (
        <>
            {
                loading ? <Loader/> :
                    <>
                        <MetaData title={"Ecommerce"}/>
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
                            {products && products.products && products.products.map((product) => (
                                <Product key={product._id} product={product}/>
                            ))}
                        </div>
                    </>
            }
        </>

    )
}

export default Home
