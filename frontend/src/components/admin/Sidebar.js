import React from "react";
import './Sidebar.css';
import logo from '../../images/logo.png';
import {Link} from "react-router-dom";
import {Add, Dashboard, ExpandMore, ImportExport, ListAlt, People, PostAdd, RateReview} from "@material-ui/icons";
import {TreeItem, TreeView} from "@material-ui/lab";

export const Sidebar = () => {
    return (
        <>
            <div className={"sidebar"}>
                <Link to={"/"}>
                    <img src={logo} alt={"Anystore"}/>
                </Link>
                <Link to={"/admin/dashboard"}>
                    <Dashboard/> Dashboard
                </Link>
                <Link>
                    <TreeView defaultCollapseIcon={<ExpandMore/>} defaultExpandIcon={<ImportExport/>}>
                        <TreeItem nodeId="1" label="Products">
                            <Link to="/admin/products">
                                <TreeItem nodeId="2" label="All" icon={<PostAdd />} />
                            </Link>
                            <Link to="/admin/product">
                                <TreeItem nodeId="3" label="Create" icon={<Add />} />
                            </Link>
                        </TreeItem>
                    </TreeView>
                </Link>
                <Link to={"/admin/orders"}>
                    <p><ListAlt/>Orders</p>
                </Link>
                <Link to={"/admin/users"}>
                    <p><People/>Users</p>
                </Link>
                <Link to={"/admin/reviews"}>
                    <p><RateReview/>Reviews</p>
                </Link>
            </div>
        </>
    )
}

export default Sidebar;
