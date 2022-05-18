import React, {useEffect} from "react";
import {ReactNavbar} from "overlay-navbar";
import logo from "../../../images/logo.png";
import {useDispatch, useSelector} from "react-redux";
import {loadUser} from "../../../redux/actions/userActions";


export const Header = () => {
    const {isAuthenticated} = useSelector(state => state?.user);
    const dispatch = useDispatch();
    const options = {
        burgerColorHover: "#eb4034",
        logo,
        logoWidth: "20vmax",
        navColor1: "white",
        logoHoverSize: "10px",
        logoHoverColor: "#eb4034",
        link1Text: "Home",
        link2Text: "Products",
        link3Text: isAuthenticated ? "My Account" : "Login",
        link4Text: isAuthenticated ? "Cart" : "",
        link1Url: "/",
        link2Url: "/products",
        link3Url: isAuthenticated ? "/account" : "/login",
        link4Url: "/cart",
        link1Size: "1.3vmax",
        link1Color: "rgba(35, 35, 35,0.8)",
        nav1justifyContent: "flex-end",
        nav2justifyContent: "flex-end",
        nav3justifyContent: "flex-start",
        nav4justifyContent: "flex-start",
        link1ColorHover: "#eb4034",
        link1Margin: "1vmax",
        profileIconUrl: "/login",
        profileIconColor: "rgba(35, 35, 35,0.8)",
        searchIconColor: "rgba(35, 35, 35,0.8)",
        cartIconColor: "rgba(35, 35, 35,0.8)",
        profileIconColorHover: "#eb4034",
        searchIconColorHover: "#eb4034",
        cartIconColorHover: "#eb4034",
        cartIconMargin: "1vmax",
    };

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch])

    return <ReactNavbar {...options} />;
};

export default Header;
