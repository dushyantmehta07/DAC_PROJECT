import React from "react";
import OrderTracker from "./OrderTracker";
import { Grid } from "@mui/material";

export default function OrderDetails() {
  return (
    <div className="px-5 lg:px-20">
      <h1 className="font-bold text-xl py-7">Delivery Address</h1>

      {/* Tracker */}
      <OrderTracker activeStep={3} />

      {/* Order Items */}
      <Grid container className="shadow-xl rounded-2xl border p-5 mt-10">
        <Grid item xs={12}>
          <div className="flex gap-5">
            <img
              className="w-20 h-20 object-cover"
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
              alt="product"
            />
            <div className="space-y-1">
              <p className="font-semibold">Smart Watch</p>
              <p className="text-xs opacity-50">Color: Black</p>
              <p className="text-xs opacity-50">Seller: Amazon</p>
              <p className="font-semibold">₹2999</p>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
