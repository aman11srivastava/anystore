import React, {useEffect, useState} from 'react';
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import {AccountTree, AttachMoney, Description, Spellcheck, Storage} from "@material-ui/icons";
import {categories} from "../../utils/utils";
import {Button} from "@material-ui/core";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert";
import {clearErrors, updateProduct, getProductDetails} from "../../redux/actions/productAction";
import {UPDATE_PRODUCT_RESET} from "../../redux/constants/productConstants";

export const UpdateProduct = () => {
    const {id: productId} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const alert = useAlert();
    const [state, setState] = useState({
        name: '',
        price: 0,
        description: '',
        category: '',
        stock: 0,
    });
    const {error, product} = useSelector(state => state?.productDetails)
    const {loading, error: updateError, isUpdated} = useSelector(state => state?.product)
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [oldImages, setOldImages] = useState([]);

    useEffect(() => {
        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId));
        }
        else {
            setState({
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                category: product.category
            })
            setOldImages(product.images);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Product updated Successfully");
            history.push('/admin/products');
            dispatch({type: UPDATE_PRODUCT_RESET});
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
    }, [dispatch, error, alert, history, isUpdated, productId, product, updateError])

    function handleChange(e) {
        setState({...state, [e.target.name]: e.target.value});
    }

    function formSubmitHandler(e) {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", state.name);
        myForm.set("price", state.price);
        myForm.set("description", state.description);
        myForm.set("stock", state.stock);
        myForm.set("category", state.category);
        images.forEach(image => {
            myForm.append("images", image);
        })
        dispatch(updateProduct(productId, myForm));
    }

    function selectProductImagesHandler(e) {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);
        setOldImages([]);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2) {
                    setImagesPreview(old => [...old, reader.result]);
                    setImages(old => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        })
    }

    return (
        <>
            <MetaData title={"New Product"}/>
            <div className={"dashboard"}>
                <Sidebar/>
                <div className={"newProductContainer"}>
                    <form
                        onSubmit={formSubmitHandler}
                        className={"createProductForm"}
                        encType={"multipart/form-data"}
                    >
                        <h1>Create Product</h1>
                        <div>
                            <Spellcheck/>
                            <input type={"text"} placeholder={"Product Name"}
                                   required={true} value={state.name} onChange={handleChange} name={"name"}/>
                        </div>
                        <div>
                            <AttachMoney/>
                            <input type={"number"} placeholder={"Price"}
                                   required={true} value={state.price} onChange={handleChange} name={"price"}/>
                        </div>
                        <div>
                            <Description/>
                            <textarea placeholder={"Product Description"} value={state.description} cols={"30"}
                                      rows={"1"}
                                      onChange={handleChange} name={"description"}/>
                        </div>
                        <div>
                            <AccountTree/>
                            <select value={state.category} name={"category"} onChange={handleChange}>
                                <option value={""}>Choose Category</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <Storage/>
                            <input type={"number"} placeholder={"Stock"}
                                   required={true} value={state.stock} onChange={handleChange} name={"stock"}/>
                        </div>
                        <div id={"createProductFormFile"}>
                            <input onChange={selectProductImagesHandler} multiple={true}
                                   type={"file"} name={"avatar"} accept={"image/*"}
                            />
                        </div>

                        <div id={"createProductFormImage"}>
                            {oldImages &&  oldImages.map((image, index) => (
                                <img key={index} src={image.url} alt={"Old Product Preview"}/>
                            ))}
                        </div>


                        <div id={"createProductFormImage"}>
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt={"Product Preview"}/>
                            ))}
                        </div>
                        <Button id={"createProductBtn"} type={"submit"} disabled={loading}>
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateProduct;
