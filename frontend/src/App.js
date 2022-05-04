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
            </Switch>
            <Footer/>
        </Router>
    );
}

export default App;
