import React, {useEffect, useState} from "react";
import './Products.css'
import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert";
import {clearErrors, getProducts} from "../../redux/actions/productAction";
import {Loader} from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import {useParams} from "react-router-dom";
import Pagination from 'react-js-pagination';
import {Slider, Typography} from "@material-ui/core";
import MetaData from "../layout/MetaData";
import {categories} from "../../utils/utils";

export const Products = () => {
    const dispatch = useDispatch();
    const {keyword} = useParams();
    const {loading, products, productsCount, error, resultPerPage, filteredProductsCount} = useSelector(state => state?.products);
    const alert = useAlert();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState(0);

    useEffect(() => {
        if (error) {
            alert.error(error || "Internal Server Error")
            dispatch(clearErrors())
        }
        dispatch(getProducts(keyword, currentPage, price, category, rating))
    }, [dispatch, error, alert, keyword, currentPage, price, category, rating])

    function setCurrentPageNumber(e) {
        setCurrentPage(e);
    }

    function priceHandler(e, newPrice) {
        setPrice(newPrice);
    }

    return (
        <>
            {
                loading ? <Loader/> : (
                    <>
                        <MetaData title={"Products -- Ecommerce"}/>
                        <h2 className={"productsHeading"}>Products</h2>
                        <div className={"products"}>
                            {products && products.map((product) => (
                                <ProductCard key={product._id} product={product}/>
                            ))}
                        </div>

                        <div className={"filterBox"}>
                            <Typography>Price</Typography>
                            <Slider value={price} onChange={priceHandler} valueLabelDisplay={"auto"}
                                    aria-labelledby={"range-slider"} min={0} max={25000}
                            />

                            <Typography>Categories</Typography>
                            <ul className={"categoryBox"}>
                                {categories.map((category) => (
                                    <li className={"category-link"}
                                        key={category}
                                        onClick={() => setCategory(category)}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>

                            <fieldset>
                                <Typography component={"legend"}>Ratings above</Typography>
                                <Slider
                                    value={rating}
                                    onChange={(e, newRating) => {
                                        setRating(newRating)
                                    }}
                                    aria-labelledby={"continuous-slider"}
                                    min={0}
                                    max={5}
                                    valueLabelDisplay={"auto"}
                                />
                            </fieldset>

                        </div>

                        {
                            resultPerPage < filteredProductsCount && (
                                <div className={"paginationBox"}>
                                    <Pagination
                                        activePage={currentPage}
                                        itemsCountPerPage={resultPerPage}
                                        totalItemsCount={productsCount}
                                        onChange={setCurrentPageNumber}
                                        nextPageText={"Next"}
                                        prevPageText={"Previous"}
                                        firstPageText={"1st"}
                                        lastPageText={"Last"}
                                        itemClass={"page-item"}
                                        linkClass={"page-link"}
                                        activeClass={"pageItemActive"}
                                        activeLinkClass={"pageLinkActive"}
                                    />
                                </div>
                            )
                        }

                    </>
                )
            }
        </>
    )
}

export default Products
