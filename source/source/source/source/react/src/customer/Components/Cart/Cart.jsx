import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../Redux/Customers/Cart/Action";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");

  const { cart } = useSelector((store) => store);
  const cartData = cart?.cart;   // ✅ actual cart object

  console.log("cart data ", cartData);

  useEffect(() => {
    if (jwt) {
      dispatch(getCart(jwt));
    }
  }, [dispatch, jwt]);

  return (
    <div>
      {cartData?.cartItems?.length > 0 ? (
        <div className="lg:grid grid-cols-3 lg:px-16 relative">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 lg:px-5 bg-white">
            <div className="space-y-3">
              {cartData.cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  showButton={true}
                />
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
            <div className="border p-5 bg-white shadow-lg rounded-md">
              <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
              <hr />

              <div className="space-y-3 font-semibold">
                <div className="flex justify-between pt-3 text-black">
                  <span>Price ({cartData?.totalItem || 0} item)</span>
                  <span>₹{cartData?.totalPrice || 0}</span>
                </div>

                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-green-700">
                    -₹{cartData?.discounte || 0}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-green-700">Free</span>
                </div>

                <hr />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span className="text-green-700">
                    ₹{cartData?.totalDiscountedPrice || 0}
                  </span>
                </div>
              </div>

              <Button
                onClick={() => navigate("/checkout?step=2")}
                variant="contained"
                sx={{ padding: ".8rem 2rem", marginTop: "2rem", width: "100%" }}
              >
                Check Out
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[85vh] flex justify-center items-center flex-col">
          <div className="text-center py-5">
            <h1 className="text-lg font-medium">
              Hey! It feels so light 😄
            </h1>
            <p className="text-gray-500 text-sm">
              There is nothing in your bag, let's add some items.
            </p>
          </div>

          <Button
            onClick={() => navigate("/")}
            variant="outlined"
            sx={{ py: "11px" }}
          >
            Add Item From Wishlist
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
