import React, {useEffect, useState} from "react";
import MetaData from "../layout/MetaData";
import {MailOutline} from "@material-ui/icons";
import './ForgotPassword.css';
import {useDispatch, useSelector} from "react-redux";
import {forgotPassword} from "../../redux/actions/userActions";
import {useAlert} from "react-alert";
import {Loader} from "../layout/Loader/Loader";
import {clearErrors} from "../../redux/actions/productAction";

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const alert = useAlert();
    const {message, error, loading} = useSelector(state => state?.forgotPassword);

    const sendResetPasswordLink = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (message) {
            alert.success(message);
        }
    }, [dispatch, error, alert, message])

    return (
        loading ? <Loader/> :
            <>
                <MetaData title={"Forgot Password"}/>
                <div className="forgotPasswordContainer">
                    <div className="forgotPasswordBox">
                        <h2 className={"forgotPasswordHeading"}>Forgot Password ?</h2>
                        <form
                            className="forgotPasswordForm"
                            onSubmit={sendResetPasswordLink}
                        >
                            <div className="forgotPasswordEmail">
                                <MailOutline/>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <input type="submit" value="Send Reset Link" className="forgotPasswordBtn"/>
                        </form>
                    </div>
                </div>
            </>

    )
}

export default ForgotPassword;
