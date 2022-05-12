import React, {useEffect, useRef} from "react";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import './Payment.css';
import {Typography} from "@material-ui/core";
import {CreditCard, Event, VpnKey} from "@material-ui/icons";
import {CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {clearErrors, createOrder} from "../../redux/actions/orderActions";

export const Payment = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const {shippingInfo, cartItems} = useSelector(state => state?.cart);
    const {user} = useSelector(state => state?.user);
    const {error} = useSelector(state => state?.newOrder);
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    const payBtn = useRef(null);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    }

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        payBtn.current.disabled = true;
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const {data} = await axios.post('/api/payment/process', paymentData, config);
            const client_secret = data.client_secret;
            if (!stripe || !elements) return;
            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country
                        }
                    }
                }
            });
            if (result.error) {
                payBtn.current.disabled = false;
                alert.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };
                    dispatch(createOrder(order));
                    history.push('/success');
                } else {
                    alert.error('There was some issue while processing your payment');
                }
            }

        } catch (err) {
            payBtn.current.disabled = false;
            alert.error(err.response.data.message);
        }
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, alert])

    return (
        <>
            <MetaData title={"Process Payment"}/>
            <CheckoutSteps activeStep={2}/>
            <div className={"paymentContainer"}>
                <form className={"paymentForm"} onSubmit={(e) => submitHandler(e)}>
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCard/>
                        <CardNumberElement className={"paymentInput"}/>
                    </div>
                    <div>
                        <Event/>
                        <CardExpiryElement className={"paymentInput"}/>
                    </div>
                    <div>
                        <VpnKey/>
                        <CardCvcElement className={"paymentInput"}/>
                    </div>

                    <input
                        type={"submit"}
                        value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className={"paymentFormBtn"}
                    />
                </form>
            </div>
        </>
    )
}

export default Payment;
