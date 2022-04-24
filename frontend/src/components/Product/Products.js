import React, {useEffect, useState} from "react";
import './Products.css'
import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert";
import {clearErrors, getProducts} from "../../redux/actions/productAction";
import {Loader} from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import {useParams} from "react-router-dom";
import Pagination from 'react-js-pagination';

export const Products = () => {
    const dispatch = useDispatch();
    const {keyword} = useParams();
    const {loading, products, productsCount, error, resultPerPage} = useSelector(state => state?.products);
    const alert = useAlert();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (error) {
            alert.error(error || "Internal Server Error")
            dispatch(clearErrors())
        }
        dispatch(getProducts(keyword, currentPage))
    }, [dispatch, error, alert, keyword, currentPage])

    function setCurrentPageNumber(e) {
        setCurrentPage(e);
    }

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
                        {
                            resultPerPage < productsCount && (
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
