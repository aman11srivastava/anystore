import React from "react";
import {useSelector} from "react-redux";
import {Redirect, Route} from "react-router-dom";

export const ProtectedRoute = ({component: Component, ...rest}) => {
    const {isAuthenticated, loading} = useSelector(state => state?.user);
    return (
        <>
            {!loading && (
                <Route {...rest} render={(props) => {
                    if (!isAuthenticated) {
                        return <Redirect to={"/login"}/>;
                    }
                    return <Component {...props}/>
                }}/>
            )}
        </>
    )
}

export default ProtectedRoute;
