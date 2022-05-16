import React, {useEffect, useState} from "react";
import MetaData from "../layout/MetaData";
import {Link, useParams} from "react-router-dom";
import {Typography} from "@material-ui/core";
import SideBar from "./Sidebar";
import {useSelector, useDispatch} from "react-redux";
import {useAlert} from "react-alert";
import {Button} from "@material-ui/core";
import './ProcessOrder.css';
import {clearErrors, orderDetails, updateOrder} from "../../redux/actions/orderActions";
import {UPDATE_ORDER_RESET} from "../../redux/constants/orderConstants";
import {Loader} from "../layout/Loader/Loader";
import {DELIVERED} from "../../utils/utils";
import {AccountTree} from "@material-ui/icons";

const ProcessOrder = () => {
    const {id} = useParams();
    const {order, error, loading} = useSelector((state) => state?.orderDetails);
    const {error: updateError, isUpdated} = useSelector((state) => state?.updateDeleteOrder);
    const dispatch = useDispatch();
    const alert = useAlert();
    const [status, setStatus] = useState("");

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("status", status);
        dispatch(updateOrder(id, myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Order Updated Successfully");
            dispatch({type: UPDATE_ORDER_RESET});
        }
        dispatch(orderDetails(id));
    }, [dispatch, alert, error, id, isUpdated, updateError]);

    return (
        <>
            <MetaData title="Process Order"/>
            <div className="dashboard">
                <SideBar/>
                <div className="newProductContainer">
                    {loading ? (
                        <Loader/>
                    ) : (
                        <div className="confirmOrderPage"
                             style={{display: order?.orderStatus === DELIVERED ? "block" : "grid"}}
                        >
                            <div>
                                <div className="confirmshippingArea">
                                    <Typography>Shipping Info</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p>Name:</p>
                                            <span>{order?.user && order?.user.name}</span>
                                        </div>
                                        <div>
                                            <p>Phone:</p>
                                            <span>{order?.shippingInfo && order?.shippingInfo.phoneNo}</span>
                                        </div>
                                        <div>
                                            <p>Address:</p>
                                            <span>
                                                {order && order?.shippingInfo &&
                                                `${order?.shippingInfo.address}, ${order?.shippingInfo.city}, ${order?.shippingInfo.state}, ${order?.shippingInfo.pinCode}, ${order?.shippingInfo.country}`}
                                            </span>
                                        </div>
                                    </div>
                                    <Typography>Payment</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p className={
                                                order?.paymentInfo &&
                                                order?.paymentInfo.status === "succeeded"
                                                    ? "greenColor"
                                                    : "redColor"
                                            }
                                            >
                                                {order?.paymentInfo &&
                                                order.paymentInfo.status === "succeeded"
                                                    ? "PAID"
                                                    : "NOT PAID"}
                                            </p>
                                        </div>
                                        <div>
                                            <p>Amount:</p>
                                            <span>{order?.totalPrice && order?.totalPrice}</span>
                                        </div>
                                    </div>

                                    <Typography>Order Status</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p
                                                className={
                                                    order?.orderStatus && order?.orderStatus === DELIVERED
                                                        ? "greenColor"
                                                        : "redColor"
                                                }
                                            >
                                                {order?.orderStatus && order?.orderStatus}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="confirmCartItems">
                                    <Typography>Your Cart Items:</Typography>
                                    <div className="confirmCartItemsContainer">
                                        {order?.orderItems &&
                                        order?.orderItems.map((item) => (
                                            <div key={item.product}>
                                                <img src={item.image} alt="Product"/>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>{" "}<span>{item.quantity} X ₹{item.price} ={" "}
                                                <b>₹{item.price * item.quantity}</b>
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div style={{display: order?.orderStatus === DELIVERED ? "none" : "block"}}>
                                <form className="updateOrderForm" onSubmit={updateOrderSubmitHandler}>
                                    <h1>Process Order</h1>
                                    <div>
                                        <AccountTree />
                                        <select onChange={(e) => setStatus(e.target.value)}>
                                            <option value="">Choose Category</option>
                                            {order?.orderStatus === "Processing" && (
                                                <option value="Shipped">Shipped</option>
                                            )}

                                            {order?.orderStatus === "Shipped" && (
                                                <option value="Delivered">Delivered</option>
                                            )}
                                        </select>
                                    </div>
                                    <Button id="createProductBtn" type="submit" disabled={loading || (status === "")}>
                                        Process
                                    </Button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProcessOrder;
