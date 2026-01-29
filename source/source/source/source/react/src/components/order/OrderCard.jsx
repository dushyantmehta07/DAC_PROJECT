import React from "react";
import { Grid } from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";
import { useNavigate } from "react-router-dom";

export default function OrderCard() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/account/order/1")}
      className="p-5 shadow-lg rounded-2xl border cursor-pointer hover:shadow-2xl transition"
    >
      <Grid container alignItems="center" justifyContent="space-between">
        {/* PRODUCT */}
        <Grid item xs={6} className="flex gap-5">
          <img
            className="w-20 h-20 object-cover object-top"
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            alt="product"
          />

          <div className="space-y-1">
            <p className="font-semibold">Smart Watch</p>
            <p className="text-xs opacity-50 font-semibold">Color: Black</p>
            <p className="text-xs opacity-50 font-semibold">Seller: Amazon</p>
          </div>
        </Grid>

        {/* PRICE */}
        <Grid item xs={2}>
          <p className="font-semibold">₹2999</p>
        </Grid>

        {/* STATUS */}
        <Grid item xs={4}>
          <div className="flex items-center">
            <AdjustIcon
              sx={{ width: 20, height: 20 }}
              className="text-green-600 mr-2"
            />
            <div>
              <p>Delivered on March 3</p>
              <p className="text-xs text-gray-500">
                Your item has been delivered
              </p>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
