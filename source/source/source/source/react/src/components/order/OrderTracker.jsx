import React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";

const steps = ["Placed", "Order Confirmed", "Shipped", "Delivered"];

export default function OrderTracker({ activeStep }) {
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
