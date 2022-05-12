import './App.css';
import Header from "./components/layout/Header/Header";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import WebFont from 'webfontloader';
import {useEffect} from "react";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginSignUp from "./components/User/LoginSignUp";
import {useDispatch, useSelector} from "react-redux";
import {loadUser} from "./redux/actions/userActions";
import UserOptions from "./components/layout/Header/UserOptions";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";

function App() {
    const dispatch = useDispatch();
    const {isAuthenticated, user} = useSelector(state => state?.user);
    useEffect(() => {
        WebFont.load({
            google: {
                families: ["Roboto", "Droid Sans", "Chilanka"]
            }
        })
        dispatch(loadUser())
    }, [dispatch])

    return (
        <Router>
            <Header/>
            {isAuthenticated && <UserOptions user={user}/> }
            <Switch>
                <Route exact={true} path={"/"} component={Home}/>
                <Route exact={true} path={"/product/:id"} component={ProductDetails}/>
                <Route exact={true} path={"/products"} component={Products}/>
                <Route path={"/products/:keyword"} component={Products}/>
                <Route exact={true} path={"/search"} component={Search}/>
                <Route exact={true} path={"/login"} component={LoginSignUp}/>
                <ProtectedRoute exact={true} path={"/account"} component={Profile}/>
                <ProtectedRoute exact={true} path={"/me/update"} component={UpdateProfile}/>
                <ProtectedRoute exact={true} path={"/password/update"} component={UpdatePassword}/>
                <Route exact={true} path={"/password/forgot"} component={ForgotPassword}/>
                <Route exact={true} path={"/password/reset/:token"} component={ResetPassword}/>
                <Route exact={true} path={"/cart"} component={Cart}/>
                <ProtectedRoute exact={true} path={"/shipping"} component={Shipping}/>
                <ProtectedRoute exact={true} path={"/order/confirm"} component={ConfirmOrder}/>
            </Switch>
            <Footer/>
        </Router>
    );
}

export default App;
