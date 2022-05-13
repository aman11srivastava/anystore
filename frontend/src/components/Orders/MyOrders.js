import React, {useEffect} from 'react';
import './MyOrders.css';
import MetaData from "../layout/MetaData";
import {useDispatch, useSelector} from "react-redux";
import {Loader} from "../layout/Loader/Loader";
import {DataGrid} from "@material-ui/data-grid";
import {Typography} from "@material-ui/core";
import {useAlert} from "react-alert";
import {clearErrors, getMyOrders} from "../../redux/actions/orderActions";
import {Link} from "react-router-dom";
import {Launch} from "@material-ui/icons";
import {DELIVERED} from "../../utils/utils";

export const MyOrders = () => {
    const {user} = useSelector(state => state?.user);
    const {loading, error, orders} = useSelector(state => state?.myOrders);
    const dispatch = useDispatch();
    const alert = useAlert();

    const columns = [
        {
            field: "id",
            headerName: "Order ID",
            minWidth: 300,
            flex: 0.5
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === DELIVERED ? "greenColor" : "redColor"
            }
        },
        {
            field: "itemsQty",
            headerName: "Items Quantity",
            type: "number",
            minWidth: 150,
            flex: 0.5,
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5
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
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                        <Launch/>
                    </Link>
                )
            }
        }

    ];
    const rows = [];

    orders && orders.forEach((item) => {
        rows.push({
            itemsQty: item.orderItems.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice
        })
    })

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getMyOrders());
    }, [dispatch, alert, error])

    return (
        <>
            <MetaData title={`${user?.name} - Orders`}/>
            {loading ? <Loader/> : (
                <>
                    <div className={"myOrdersPage"}>
                        <DataGrid columns={columns} rows={rows} pageSize={10} disableSelectionOnClick={true}
                                  className={"myOrdersTable"} autoHeight={true}/>
                        <Typography id={"myOrdersHeading"}>{user.name}'s Orders</Typography>
                    </div>
                </>
            )}
        </>
    )
}

export default MyOrders;
