import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../Redux/Customers/Cart/Action";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const CartItem = ({ item, showButton }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  // Handle both imageUrl and image properties from different data sources
  const productImage = item?.product?.imageUrl || item?.product?.image;
  
  // Safely access nested properties with fallbacks
  const productTitle = item?.product?.title || "Product";
  const productBrand = item?.product?.brand || "Unknown Brand";
  const productPrice = item?.product?.price || 0;
  const productDiscountedPrice = item?.product?.discountedPrice || 0;
  const productDiscountPersent = item?.product?.discountPersent || 0;
  const itemSize = item?.size || "Free Size";
  const itemQuantity = item?.quantity || 1;

  const handleRemoveItemFromCart = () => {
    const data = { cartItemId: item?.id, jwt };
    dispatch(removeCartItem(data));
  };
  
  const handleUpdateCartItem = (num) => {
    const data = {
      data: { quantity: itemQuantity + num },
      cartItemId: item?.id,
      jwt
    };
    dispatch(updateCartItem(data));
  };
  
  return (
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem] ">
          <img
            className="w-full h-full object-cover object-top"
            src={productImage}
            alt={productTitle}
          />
        </div>
        <div className="ml-5 space-y-1">
          <p className="font-semibold">{productTitle}</p>
          <p className="opacity-70">Size: {itemSize}, White</p>
          <p className="opacity-70 mt-2">Seller: {productBrand}</p>
          <div className="flex space-x-2 items-center pt-3">
            <p className="opacity-50 line-through">₹{productPrice}</p>
            <p className="font-semibold text-lg">
              ₹{productDiscountedPrice}
            </p>
            <p className="text-green-600 font-semibold">
              {productDiscountPersent}% off
            </p>
          </div>
        </div>
      </div>
     {showButton && <div className="lg:flex items-center lg:space-x-10 pt-4">
        <div className="flex items-center space-x-2 ">
          <IconButton
            onClick={() => handleUpdateCartItem(-1)}
            disabled={itemQuantity <= 1}
            color="primary"
            aria-label="decrease quantity"
          >
            <RemoveCircleOutlineIcon />
          </IconButton>

          <span className="py-1 px-7 border rounded-sm">{itemQuantity}</span>
          <IconButton
            onClick={() => handleUpdateCartItem(1)}
            color="primary"
            aria-label="increase quantity"
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
        <div className="flex text-sm lg:text-base mt-5 lg:mt-0">
          <Button onClick={handleRemoveItemFromCart} variant="text">
            Remove
          </Button>
        </div>
      </div>}
    </div>
  );
};

export default CartItem;
