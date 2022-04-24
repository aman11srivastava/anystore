import React, {useState} from "react";
import './Search.css'
import {useHistory} from "react-router-dom";
import MetaData from "../layout/MetaData";

export const Search = () => {
    const [keyword, setKeyword] = useState('');
    const history = useHistory();

    function searchSubmitHandler(e) {
        e.preventDefault();
        if (keyword.trim()){
            history.push(`/products/${keyword}`)
        } else {
            history.push('/products')
        }
    }

    return (
        <>
            <MetaData title={"Search a Product -- Ecommerce"}/>
            <form className={"searchBox"} onSubmit={searchSubmitHandler}>
                <input type={"text"} placeholder={"Search for a product..."} onChange={(e) => setKeyword(e.target.value)}/>
                <input type={"submit"} value={"Search"}/>
            </form>
        </>
    )
}

export default Search
