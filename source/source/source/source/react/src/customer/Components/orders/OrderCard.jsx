import { Box, Grid } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AdjustIcon from "@mui/icons-material/Adjust";
import React from "react";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

const OrderCard = ({ item, order }) => {
  const navigate = useNavigate();
  console.log("items ", item, order, order?.orderStatus);

  return (
    <Box className="p-5 shadow-lg hover:shadow-2xl border">
      <Grid spacing={2} container sx={{ justifyContent: "space-between" }}>
        {/* PRODUCT */}
        <Grid item xs={6}>
          <div
            onClick={() => navigate(`/account/order/${order?.id}`)}
            className="flex cursor-pointer"
          >
            <img
              className="w-[5rem] h-[5rem] object-cover object-top"
              src={item?.product?.imageUrl}
              alt=""
            />
            <div className="ml-5">
              <p className="mb-2">{item?.product?.title}</p>
              <p className="opacity-50 text-xs font-semibold space-x-5">
                <span>Size: {item?.size}</span>
              </p>
            </div>
          </div>
        </Grid>

        {/* PRICE */}
        <Grid item xs={2}>
          <p>₹{item?.price}</p>
        </Grid>

        {/* STATUS */}
        <Grid item xs={4}>
          <p className="space-y-2 font-semibold flex items-center">
            {order?.orderStatus === "DELIVERED" ? (
              <>
                <FiberManualRecordIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 p-0 mr-2 text-sm"
                />
                <span>Delivered</span>
              </>
            ) : (
              <>
                <AdjustIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 p-0 mr-2 text-sm"
                />
                <span>Expected Delivery</span>
              </>
            )}
          </p>

          <p className="text-xs">Your item status updated</p>

          {order?.orderStatus === "DELIVERED" && (
            <div
              onClick={() => navigate(`/account/rate/${item?.product?.id}`)}
              className="flex items-center text-blue-600 cursor-pointer mt-2"
            >
              <StarIcon sx={{ fontSize: "2rem" }} className="px-2" />
              <span>Rate & Review Product</span>
            </div>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderCard;
