import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearErrors, deleteProduct, getAdminProducts} from "../../redux/actions/productAction";
import './ProductList.css';
import {useAlert} from "react-alert";
import {Link, useHistory} from "react-router-dom";
import {Delete, Edit} from "@material-ui/icons";
import {Button} from "@material-ui/core";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import {DataGrid} from "@material-ui/data-grid";
import {DELETE_PRODUCT_RESET} from "../../redux/constants/productConstants";

export const ProductList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {products, error} = useSelector(state => state?.products);
    const {error: productError, isDeleted} = useSelector(state => state?.product);
    const alert = useAlert();

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (productError) {
            alert.error(productError);
            dispatch(clearErrors())
        }
        if (isDeleted) {
            alert.success("Product Deleted Successfully");
            history.push('/admin/dashboard');
            dispatch({type: DELETE_PRODUCT_RESET});
        }
        dispatch(getAdminProducts());
    }, [error, alert, dispatch, isDeleted, productError, history])

    function deleteProductHandler(id) {
        dispatch(deleteProduct(id))
    }

    const columns = [
        {field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5},
        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
            renderCell: (params) => (
                <>
                    <Link className={"admin-product-name"} to={`/product/${params.getValue(params.id, "id")}`}>
                        {params.getValue(params.id, "name")}
                    </Link>
                </>
            )
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                            <Edit/>
                        </Link>
                        <Button onClick={() => deleteProductHandler(params.getValue(params.id, "id"))}>
                            <Delete/>
                        </Button>
                    </>
                )
            }
        }
    ];

    const rows = [];

    products && products.forEach(item => (
        rows.push({
            id: item._id,
            stock: item.stock,
            price: item.price,
            name: item.name
        })
    ));

    return (
        <>
            <MetaData title={"All Products - Admin"}/>
            <div className={"dashboard"}>
                <Sidebar/>
                <div className={"productListContainer"}>
                    <h1 id={"productListHeading"}>All Products</h1>
                    <DataGrid columns={columns} rows={rows} pageSize={10} disableSelectionOnClick={true}
                              className={"productListTable"} autoHeight={true}/>
                </div>
            </div>
        </>
    )
}

export default ProductList;
