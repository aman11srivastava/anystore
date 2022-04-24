import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearErrors, getProductDetails} from "../../redux/actions/productAction";
import './ProductDetails.css';
import {Loader} from "../layout/Loader/Loader";
import {useAlert} from "react-alert";
import Carousel from "react-material-ui-carousel";
import ReactStars from "react-rating-stars-component/dist/react-stars";
import ReviewCard from "./ReviewCard";
import MetaData from "../layout/MetaData";

export const ProductDetails = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const {loading, product, error} = useSelector(state => state?.productDetails)

    useEffect(() => {
        if (error) {
            alert.error(error || "Internal Server Error")
            dispatch(clearErrors())
        }
        dispatch(getProductDetails(id))
    }, [dispatch, error, alert, id])

    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };
    
    return (
        <>
            {
                loading ? <Loader/> : <>
                    <MetaData title={`${product.name} -- Ecommerce`}/>
                    <div className={"ProductDetails"}>
                        <div>
                            <Carousel>
                                {
                                    product.images && product.images.map((item, index) => (
                                        <img className={"CarouselImage"} src={item.url} key={item.url}
                                             alt={`${index} slide`}/>
                                    ))
                                }
                            </Carousel>
                        </div>
                        <div>
                            <div className={"detailsBlock-1"}>
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className={"detailsBlock-2"}>
                                <ReactStars {...options}/>
                                <span>({product.numOfReviews} Reviews)</span>
                            </div>
                            <div className={"detailsBlock-3"}>
                                <h1>{`₹${product.price}`}</h1>
                                <div className={"detailsBlock-3-1"}>
                                    <div className={"detailsBlock-3-1-1"}>
                                        <button>-</button>
                                        <input value={"1"} type={"number"}/>
                                        <button>+</button>
                                    </div>
                                    <button>Add to Cart</button>
                                </div>
                                <p>
                                    Status: {" "}
                                    <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                        {product.stock < 1 ? "Out of Stock" : "In Stock"}
                                    </b>
                                </p>
                            </div>
                            <div className={"detailsBlock-4"}>
                                Description: <p>{product.description}</p>
                            </div>
                            <button className={"submitReview"}>Submit Review</button>
                        </div>
                    </div>
                    <h3 className={"reviewsHeading"}>Reviews</h3>
                    {product.reviews && product.reviews[0] ? (
                        <div className={"reviews"}>
                            {
                                product.reviews && product.reviews.map((review) => (
                                    <ReviewCard review={review}/>
                                ))
                            }
                        </div>
                    ) : <p className={"noReviews"}>Not Reviews yet</p>}
                </>
            }
        </>
    )
}

export default ProductDetails
