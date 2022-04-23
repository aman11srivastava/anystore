import './App.css';
import Header from "./components/layout/Header/Header";
import {BrowserRouter as Router, Route} from "react-router-dom";
import WebFont from 'webfontloader';
import {useEffect} from "react";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";

function App() {

    useEffect(() => {
        WebFont.load({
            google: {
                families: ["Roboto", "Droid Sans", "Chilanka"]
            }
        })
    }, [])

    return (
        <Router>
            <Header/>
            <Route exact={true} path={"/"} component={Home}/>
            <Route exact={true} path={"/product/:id"} component={ProductDetails}/>
            <Footer/>
        </Router>
    );
}

export default App;
