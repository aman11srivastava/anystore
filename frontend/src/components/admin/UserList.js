import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearErrors} from "../../redux/actions/productAction";
import './ProductList.css';
import {useAlert} from "react-alert";
import {Link, useHistory} from "react-router-dom";
import {Delete, Edit} from "@material-ui/icons";
import {Button} from "@material-ui/core";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import {DataGrid} from "@material-ui/data-grid";
import {deleteUser, getAllUsers} from "../../redux/actions/userActions";
import {DELETE_USER_RESET} from "../../redux/constants/userConstants";

export const UserList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {users, error} = useSelector(state => state?.allUsers);
    const {error: deleteError, isDeleted, message} = useSelector(state => state?.profile);
    const alert = useAlert();

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }
        if (isDeleted) {
            alert.success(message);
            history.push('/admin/users');
            dispatch({type: DELETE_USER_RESET});
        }
        dispatch(getAllUsers());
    }, [error, alert, dispatch, isDeleted, deleteError, history, message])

    function deleteUserHandler(id) {
        dispatch(deleteUser(id))
    }

    const columns = [
        {field: "id", headerName: "User ID", minWidth: 180, flex: 0.8},
        {
            field: "email",
            headerName: "Email",
            minWidth: 180,
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.5,
        },

        {
            field: "role",
            headerName: "Role",
            minWidth: 100,
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "admin" ? "greenColor": "redColor"
            }
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
                        <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                            <Edit/>
                        </Link>
                        <Button onClick={() => deleteUserHandler(params.getValue(params.id, "id"))}>
                            <Delete/>
                        </Button>
                    </>
                )
            }
        }
    ];

    const rows = [];

    users && users.forEach(item => (
        rows.push({
            id: item._id,
            role: item.role,
            email: item.email,
            name: item.name
        })
    ));

    return (
        <>
            <MetaData title={"All Users - Admin"}/>
            <div className={"dashboard"}>
                <Sidebar/>
                <div className={"productListContainer"}>
                    <h1 id={"productListHeading"}>All Users</h1>
                    <DataGrid columns={columns} rows={rows} pageSize={10} disableSelectionOnClick={true}
                              className={"productListTable"} autoHeight={true}/>
                </div>
            </div>
        </>
    )
}

export default UserList;
