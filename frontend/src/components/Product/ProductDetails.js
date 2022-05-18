import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearErrors, getProductDetails, newReview} from "../../redux/actions/productAction";
import './ProductDetails.css';
import {Loader} from "../layout/Loader/Loader";
import {useAlert} from "react-alert";
import Carousel from "react-material-ui-carousel";
import ReviewCard from "./ReviewCard";
import MetaData from "../layout/MetaData";
import {addToCart} from "../../redux/actions/cartActions";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import {Rating} from "@material-ui/lab";
import {NEW_REVIEW_RESET} from "../../redux/constants/productConstants";

export const ProductDetails = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const {loading, product, error} = useSelector(state => state?.productDetails)
    const [comment, setComment] = useState("");
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const {success, error: reviewError} = useSelector(state => state?.newReview);

    useEffect(() => {
        if (error) {
            alert.error(error || "Internal Server Error")
            dispatch(clearErrors())
        }
        if (reviewError) {
            alert.error(reviewError || "Internal Server Error");
            dispatch(clearErrors())
        }
        if (success) {
            alert.success("Review submitted successfully");
            dispatch({type: NEW_REVIEW_RESET});
        }
        dispatch(getProductDetails(id))
    }, [dispatch, error, alert, id, success, reviewError])

    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };

    const [quantity, setQuantity] = useState(1);

    function decreaseQuantity() {
        if (quantity <= 1) return;
        setQuantity(qty => (qty - 1));
    }

    function increaseQuantity() {
        if (product.stock <= quantity) return;
        setQuantity(qty => (qty + 1));
    }

    function addProductToCart() {
        dispatch(addToCart(id, quantity))
        alert.success("Item added to cart successfully");
    }

    function submitReviewToggle() {
        setOpen(!open);
    }

    function submitReview() {
        const myForm = new FormData();
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);
        dispatch(newReview(myForm));
        setOpen(false);
    }

    return (
        <>
            {
                loading ? <Loader/> : <>
                    <MetaData title={`${product.name} -- Anystore`}/>
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
                                <Rating {...options}/>
                                <span className={"detailsBlock-2-span"}>({product.numOfReviews} Reviews)</span>
                            </div>
                            <div className={"detailsBlock-3"}>
                                <h1>{`₹${product.price}`}</h1>
                                <div className={"detailsBlock-3-1"}>
                                    <div className={"detailsBlock-3-1-1"}>
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly={true} value={quantity} type={"number"}/>
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button disabled={product.stock < 1} onClick={addProductToCart}>Add to Cart</button>
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
                            <button onClick={submitReviewToggle} className={"submitReview"}>Submit Review</button>
                        </div>
                    </div>
                    <h3 className={"reviewsHeading"}>Reviews</h3>

                    <Dialog aria-labelledby={"dialog-title"} open={open} onClose={submitReviewToggle}>
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className={"submitDialog"}>
                            <Rating onChange={(e) => setRating(e.target.value)} value={rating} size={"large"}/>
                            <textarea className={"submitDialogTextArea"} cols={"30"} rows={"5"} value={comment}
                                      onChange={(e) => setComment(e.target.value)}>
                            </textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color={"secondary"}>Cancel</Button>
                            <Button onClick={submitReview}>Submit</Button>
                        </DialogActions>
                    </Dialog>

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
