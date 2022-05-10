import React, {useState} from "react";
import {SpeedDial, SpeedDialAction} from "@material-ui/lab";
import {Dashboard, ExitToApp, ListAlt, Person, ShoppingCart} from "@material-ui/icons";
import {ADMIN} from "../../../utils/utils";
import {useHistory} from "react-router-dom";
import {useAlert} from "react-alert";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../redux/actions/userActions";
import {Backdrop} from "@material-ui/core";
import './Header.css';

export const UserOptions = ({user}) => {
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const alert = useAlert();
    const dispatch = useDispatch();
    const {cartItems} = useSelector(state => state?.cart)
    const options = [
        {icon: <ListAlt/>, name: "Orders", func: orders},
        {icon: <Person/>, name: 'Profile', func: account},
        {icon: <ShoppingCart style={{color: cartItems.length > 0 ? "tomato" : "unset"}}/>, name: `Cart (${cartItems.length})`, func: cart},
        {icon: <ExitToApp/>, name: 'Logout', func: logoutUser}
    ]

    if (user.role === ADMIN) {
        options.unshift({icon: <Dashboard/>, name: "Dashboard", func: dashboard})
    }

    function dashboard() {
        history.push('/dashboard');
    }

    function orders() {
        history.push('/orders');
    }

    function account() {
        history.push('/account');
    }

    function cart() {
        history.push('/cart');
    }

    function logoutUser() {
        dispatch(logout());
        alert.success('Logout Successful');
        history.push('/');
    }

    return (
        <>
            <Backdrop open={open} style={{zIndex: "10"}}/>
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                style={{zIndex: "11"}}
                open={open}
                direction="down"
                className="speedDial"
                icon={
                    <img
                        className="speedDialIcon"
                        src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                        alt="Profile"
                    />
                }
            >
                {options.map((item) => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                        tooltipOpen={window.innerWidth <= 600}
                    />
                ))}
            </SpeedDial>
        </>
    )
}

export default UserOptions;
