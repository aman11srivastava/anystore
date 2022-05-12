import React, {useState} from "react";
import './Shipping.css';
import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert";
import {Home, LocationCity, PinDrop, Phone, Public, TransferWithinAStation} from "@material-ui/icons";
import {State, Country} from "country-state-city";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import {saveShippingInfo} from "../../redux/actions/cartActions";
import {useHistory} from "react-router-dom";

export const Shipping = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {shippingInfo} = useSelector(state => state?.cart);
    const alert = useAlert();
    const [info, setInfo] = useState({
        address: shippingInfo?.address,
        city: shippingInfo?.city,
        pinCode: shippingInfo?.pinCode,
        phoneNo: shippingInfo?.phoneNo,
        country: shippingInfo?.country,
        state: shippingInfo?.state
    });

    function shippingSubmit(e) {
        e.preventDefault();
        if (info?.phoneNo.length !== 10) {
            alert.error("Phone number should be of 10 digits");
            return;
        } else {
            dispatch(saveShippingInfo(info));
            history.push('/order/confirm');
        }
    }

    function handleChange(e) {
        setInfo({...info, [e.target.name]: e.target.value})
    }

    return (
        <>
            <MetaData title={"Shipping Details"}/>
            <CheckoutSteps activeStep={0}/>
            <div className={"shippingContainer"}>
                <div className={"shippingBox"}>
                    <h2 className={"shippingHeading"}>Shipping Details</h2>
                    <form className={"shippingForm"} encType={"multipart/form-data"} onSubmit={shippingSubmit}>
                        <div>
                            <Home/>
                            <input type={"text"} placeholder={"Address"} required={true} value={info?.address}
                                   onChange={handleChange} name={"address"}/>
                        </div>
                        <div>
                            <LocationCity/>
                            <input type="text" placeholder="City" required value={info?.city}
                                   onChange={handleChange} name={"city"}/>
                        </div>

                        <div>
                            <PinDrop/>
                            <input type="number" placeholder="Pin Code" required value={info?.pinCode}
                                   onChange={handleChange} name={"pinCode"}/>
                        </div>

                        <div>
                            <Phone/>
                            <input type="number" placeholder="Phone Number" required value={info?.phoneNo}
                                   onChange={handleChange} size="10" name={"phoneNo"}/>
                        </div>

                        <div>
                            <Public/>
                            <select required value={info?.country} name={"country"} onChange={handleChange}>
                                <option value={""}>Country</option>
                                {Country.getAllCountries().map(item => (
                                    <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {info?.country && (
                            <div>
                                <TransferWithinAStation/>
                                <select required value={info?.state} onChange={handleChange} name={"state"}>
                                    <option value={""}>State</option>
                                    {State.getStatesOfCountry(info?.country).map(item => (
                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <input type={"submit"} value={"Continue"} className={"shippingBtn"} disabled={!info?.state}/>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Shipping;
