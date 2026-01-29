import React from "react";
import { Grid } from "@mui/material";
import OrderCard from "./OrderCard";

const orderStatus = [
  { label: "On The Way", value: "on_the_way" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

const dummyOrders = [1, 2, 3, 4];

export default function Order() {
  return (
    <div className="px-5 lg:px-20">
      <Grid container spacing={2}>
        {/* LEFT FILTER */}
        <Grid item xs={3} className="sticky top-5">
          <h1 className="font-bold text-lg">Filter</h1>

          <div className="mt-4">
            <label className="text-sm text-gray-600">Order Status</label>

            <select className="border rounded px-3 py-2 w-full mt-2">
              {orderStatus.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </Grid>

        {/* RIGHT ORDERS */}
        <Grid item xs={9}>
          <div className="space-y-5">
            {dummyOrders.map((item, index) => (
              <OrderCard key={index} />
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
