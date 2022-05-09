import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import './UpdatePassword.css';
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom";
import {updatePassword} from "../../redux/actions/userActions";
import {clearErrors} from "../../redux/actions/productAction";
import {UPDATE_PASSWORD_RESET} from "../../redux/constants/userConstants";
import {Loader} from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import {Lock, LockOpen, VpnKey} from "@material-ui/icons";

export const UpdatePassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();
    const {isUpdated, loading, error} = useSelector(state => state?.profile)
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm))
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success('Password Updated Successfully');
            history.push('/account');
            dispatch({type: UPDATE_PASSWORD_RESET});
        }
    }, [dispatch, error, alert, isUpdated, history])


    return (
        <>
            {loading ? <Loader/> :
                <>
                    <MetaData title={"Update Password"}/>
                    <div className="updatePasswordContainer">
                        <div className="updatePasswordBox">
                            <h2 className={"updatePasswordHeading"}>Update Password</h2>
                            <form
                                className="updatePasswordForm"
                                onSubmit={updatePasswordSubmit}
                            >
                                <div className="signUpPassword">
                                    <VpnKey/>
                                    <input
                                        type="password"
                                        placeholder="Current Password"
                                        required
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>
                                <div className="signUpPassword">
                                    <LockOpen/>
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="signUpPassword">
                                    <Lock/>
                                    <input
                                        type="password"
                                        placeholder="Confirm New Password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <input type="submit" value="Update Password" className="updatePasswordBtn"/>
                            </form>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default UpdatePassword;
