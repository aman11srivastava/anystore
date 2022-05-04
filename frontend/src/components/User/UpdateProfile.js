import React, {useEffect, useState} from "react";
import './UpdateProfile.css';
import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert";
import {loadUser, updateProfile} from "../../redux/actions/userActions";
import {clearErrors} from "../../redux/actions/productAction";
import {UPDATE_PROFILE_RESET} from "../../redux/constants/userConstants";
import {Face, MailOutline} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import MetaData from "../layout/MetaData";
import {Loader} from "../layout/Loader/Loader";

export const UpdateProfile = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();
    const {user} = useSelector(state => state?.user);
    const {isUpdated, loading, error} = useSelector(state => state?.profile)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        if (avatar === undefined) {
            alert.error("There was some issue with the picture, please upload the picture once again!");
        }
        else {
            dispatch(updateProfile(myForm))
        }
    }

    const updateProfilePictureChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    };

    useEffect(() => {
        if (user) {
            setEmail(user.email);
            setName(user.name);
            setAvatarPreview(user.avatar.url)
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success('Profile Updated Successfully');
            dispatch(loadUser());
            history.push('/account');
            dispatch({type: UPDATE_PROFILE_RESET});
        }
    }, [dispatch, error, alert, isUpdated, history, user])

    return (
        <>
            {loading ? <Loader/> :
                <>
                    <MetaData title={"Update Profile"}/>
                    <div className="updateProfileContainer">
                        <div className="updateProfileBox">
                            <h2 className={"updateProfileHeading"}>Update Profile</h2>
                            <form
                                className="updateProfileForm"
                                encType="multipart/form-data"
                                onSubmit={updateProfileSubmit}
                            >
                                <div className="updateProfileName">
                                    <Face/>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="updateProfileEmail">
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
                                <div id="updateProfileImage">
                                    <img src={avatarPreview} alt="Avatar Preview"/>
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={updateProfilePictureChange}
                                    />
                                </div>
                                <input type="submit" value="Update Profile" className="updateProfileBtn"/>
                            </form>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default UpdateProfile;
