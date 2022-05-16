import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {Link, useHistory} from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import {Delete, Edit} from "@material-ui/icons";
import {DELIVERED} from "../../utils/utils";
import {clearErrors, deleteOrder, getAllOrders} from "../../redux/actions/orderActions";
import {DELETE_ORDER_RESET} from "../../redux/constants/orderConstants";

const OrderList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();
    const { error, orders } = useSelector((state) => state?.allOrders);
    const { error: deleteError, isDeleted } = useSelector((state) => state?.updateDeleteOrder);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Order Deleted Successfully");
            history.push("/admin/orders");
            dispatch({ type: DELETE_ORDER_RESET });
        }

        dispatch(getAllOrders());
    }, [dispatch, alert, error, deleteError, history, isDeleted]);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === DELIVERED
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.4,
        },
        {
            field: "amount",
            headerName: "Amount",
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
                        <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                            <Edit />
                        </Link>

                        <Button onClick={() => deleteOrderHandler(params.getValue(params.id, "id"))}>
                            <Delete />
                        </Button>
                    </>
                );
            },
        },
    ];

    const rows = [];

    orders &&
    orders.forEach((item) => {
        rows.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            amount: item.totalPrice,
            status: item.orderStatus,
        });
    });

    return (
        <>
            <MetaData title={`All Orders - Admin`} />
            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">All Orders</h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight={true}
                    />
                </div>
            </div>
        </>
    );
};

export default OrderList;
