import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert";
import {useHistory, useParams} from "react-router-dom";
import {resetPassword} from "../../redux/actions/userActions";
import {clearErrors} from "../../redux/actions/productAction";
import {Loader} from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import {Lock, LockOpen} from "@material-ui/icons";
import './ResetPassword.css';

export const ResetPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();
    const {token} = useParams();
    const {success, loading, error} = useSelector(state => state?.forgotPassword)
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(token, myForm));
        setPassword('');
        setConfirmPassword('');
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (success) {
            alert.success('Password was reset Successfully');
            history.push('/login');
        }
    }, [dispatch, error, alert, success, history])


    return (
        <>
            {loading ? <Loader/> :
                <>
                    <MetaData title={"Update Password"}/>
                    <div className="resetPasswordContainer">
                        <div className="resetPasswordBox">
                            <h2 className={"resetPasswordHeading"}>Reset Password</h2>
                            <form
                                className="resetPasswordForm"
                                onSubmit={resetPasswordSubmit}
                            >
                                <div className="resetPassword">
                                    <LockOpen/>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="resetPassword">
                                    <Lock/>
                                    <input
                                        type="password"
                                        placeholder="Confirm New Password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <input type="submit" value="Reset Password" className="resetPasswordBtn"/>
                            </form>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default ResetPassword;
