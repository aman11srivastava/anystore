import React, {useEffect} from "react";
import './Products.css'
import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert";
import {clearErrors, getProducts} from "../../redux/actions/productAction";
import {Loader} from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";

export const Products = () => {
    const dispatch = useDispatch();
    const {loading, products, productsCount, error} = useSelector(state => state?.products);
    const alert = useAlert();

    useEffect(() => {
        if (error) {
            alert.error(error || "Internal Server Error")
            dispatch(clearErrors())
        }
        dispatch(getProducts())
    }, [dispatch, error, alert])

    return (
        <>
            {
                loading ? <Loader/> : (
                    <>
                        <h2 className={"productsHeading"}>Products</h2>
                        <div className={"products"}>
                            {products && products.map((product) => (
                                <ProductCard key={product._id} product={product}/>
                            ))}
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Products
