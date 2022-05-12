import React from "react";
import {Step, StepLabel, Stepper, Typography} from "@material-ui/core";
import {AccountBalance, LibraryAddCheck, LocalShipping} from "@material-ui/icons";
import './CheckoutSteps.css';

export const CheckoutSteps = ({activeStep}) => {
    const steps = [
        {label: <Typography>Shipping Details</Typography>, icon: <LocalShipping/>},
        {label: <Typography>Confirm Order</Typography>, icon: <LibraryAddCheck/>},
        {label: <Typography>Payment</Typography>, icon: <AccountBalance/>},
    ];

    const stepStyle = {
        boxSizing: "border-box"
    }

    return (
        <>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyle}>
                {steps.map((step, index) => (
                    <Step key={index} active={activeStep === index} completed={activeStep >= index}>
                        <StepLabel style={{color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)"}} icon={step.icon}>{step.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </>
    )
}

export default CheckoutSteps;
