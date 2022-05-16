import React, {useEffect, useState} from 'react';
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import {MailOutline, Person, VerifiedUser} from "@material-ui/icons";
import {Button} from "@material-ui/core";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert";
import {clearErrors} from "../../redux/actions/productAction";
import {UPDATE_USER_RESET} from "../../redux/constants/userConstants";
import {getSingleUser, updateUser} from "../../redux/actions/userActions";

export const UpdateUser = () => {
    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const alert = useAlert();
    const {error, user} = useSelector(state => state?.userDetails);
    const {loading: updateLoading, error: updateError, isUpdated} = useSelector(state => state?.profile);
    const [state, setState] = useState({
        name: "",
        email: "",
        role: "",
    });

    useEffect(() => {
        if (user && user._id !== id) {
            dispatch(getSingleUser(id));
        } else {
            setState({
                name: user.name,
                role: user.role,
                email: user.email,
            })
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("User updated Successfully");
            history.push('/admin/users');
            dispatch({type: UPDATE_USER_RESET});
        }
    }, [dispatch, error, alert, history, isUpdated, updateError, user, id])

    function handleChange(e) {
        setState({...state, [e.target.name]: e.target.value});
    }

    function updateUserSubmitHandler(e) {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", state.name);
        myForm.set("role", state.role);
        myForm.set("email", state.email);
        dispatch(updateUser(id, myForm));
    }

    return (
        <>
            <MetaData title={"Update User"}/>
            <div className={"dashboard"}>
                <Sidebar/>
                <div className={"newProductContainer"}>
                    <form onSubmit={updateUserSubmitHandler} className={"createProductForm"}>
                        <h1>Update User Details</h1>
                        <div>
                            <Person/>
                            <input type={"text"} placeholder={"Name"} required={true} value={state.name}
                                   onChange={handleChange} name={"name"}/>
                        </div>
                        <div>
                            <MailOutline/>
                            <input type={"email"} placeholder={"Email"} required={true} value={state.email}
                                   onChange={handleChange} name={"email"}/>
                        </div>
                        <div>
                            <VerifiedUser/>
                            <select value={state.role} name={"role"} onChange={handleChange}>
                                <option value={""}>Select Role</option>
                                <option value={"admin"}>Admin</option>
                                <option value={"user"}>User</option>
                            </select>
                        </div>
                        <Button id={"createProductBtn"} type={"submit"} disabled={updateLoading || (state.role === "")}>
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateUser;
