import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearErrors, getAdminProducts} from "../../redux/actions/productAction";
import './ProductList.css';
import {useAlert} from "react-alert";
import {Link} from "react-router-dom";
import {Delete, Edit} from "@material-ui/icons";
import {Button} from "@material-ui/core";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import {DataGrid} from "@material-ui/data-grid";

export const ProductList = () => {
    const dispatch = useDispatch();
    const {products, error} = useSelector(state => state?.products);
    const alert = useAlert();

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getAdminProducts());
    }, [error, alert, dispatch])

    const columns = [
        {field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5},
        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
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
                        <Button>
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
