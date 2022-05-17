import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    clearErrors,
    deleteReview,
    getAllReviews
} from "../../redux/actions/productAction";
import './ProductReviews.css';
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom";
import {Delete, Star} from "@material-ui/icons";
import {Button} from "@material-ui/core";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import {DataGrid} from "@material-ui/data-grid";
import {DELETE_REVIEW_RESET} from "../../redux/constants/productConstants";

export const ProductReviews = () => {
    const PRODUCT_ID_LENGTH = 24;
    const dispatch = useDispatch();
    const history = useHistory();
    const {reviews, error} = useSelector(state => state?.productReviews);
    const {error: deleteError, isDeleted, loading} = useSelector(state => state?.deleteReview);
    const alert = useAlert();
    const [productId, setProductId] = useState('');

    useEffect(() => {
        if (productId.length === PRODUCT_ID_LENGTH) {
            dispatch(getAllReviews(productId))
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }
        if (isDeleted) {
            alert.success("Review Deleted Successfully");
            history.push('/admin/reviews');
            dispatch({type: DELETE_REVIEW_RESET});
        }
    }, [error, alert, dispatch, isDeleted, deleteError, history, productId])

    function deleteReviewHandler(id) {
        dispatch(deleteReview(id, productId));
    }

    const columns = [
        {field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5},
        {
            field: "user",
            headerName: "User",
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: "comment",
            headerName: "Comment",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 270,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "rating") >= 3 ? "greenColor" : "redColor"
            }
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Button onClick={() => deleteReviewHandler(params.getValue(params.id, "id"))}>
                            <Delete/>
                        </Button>
                    </>
                )
            }
        }
    ];

    const rows = [];

    reviews && reviews.forEach(item => (
        rows.push({
            id: item._id,
            rating: item.rating,
            comment: item.comment,
            user: item.name
        })
    ));

    function productReviewSubmitHandler(e) {
        e.preventDefault();
        dispatch(getAllReviews(productId))
    }

    return (
        <>
            <MetaData title={"All Reviews - Admin"}/>
            <div className={"dashboard"}>
                <Sidebar/>
                <div className={"productReviewsContainer"}>

                    <form onSubmit={productReviewSubmitHandler} className={"productReviewsForm"}>
                        <h1 className={"productReviewsFormHeading"}>All Reviews</h1>
                        <div>
                            <Star/>
                            <input type={"text"} placeholder={"Product ID"} required={true} value={productId}
                                   onChange={(e) => setProductId(e.target.value)}/>
                        </div>
                        <Button id={"createProductBtn"} type={"submit"} disabled={loading || (productId === "")}>
                            Search
                        </Button>
                    </form>
                    {reviews && reviews.length > 0 ? (
                            <DataGrid columns={columns} rows={rows} pageSize={10} disableSelectionOnClick={true}
                                      className={"productListTable"} autoHeight={true}/>
                        )
                        :
                        <h1 className={"productReviewsFormHeading"}>No reviews found</h1>
                    }
                </div>
            </div>
        </>
    )
}

export default ProductReviews;
