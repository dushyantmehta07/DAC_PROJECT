import React from "react";

import { useNavigate } from "react-router-dom";

const HomeProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    // Check if product has proper category data
    if (product.topLavelCategory && product.secondLavelCategory && product.thirdLavelCategory) {
      // Navigate to category page for products with category data
      const categoryPath = `/${product.topLavelCategory}/${product.secondLavelCategory}/${product.thirdLavelCategory}`;
      navigate(categoryPath);
    } else {
      // For products without category data (shoes, sarees), use title as product identifier
      const productId = product.id || product.title?.toLowerCase().replace(/\s+/g, '-').substring(0, 30);
      navigate(`/product/${productId}`);
    }
  };

  return (
    <div
      onClick={handleProductClick}
      className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3"
    >
      <div className="h-[13rem] w-[10rem]">
        <img
          className="object-cover object-top w-full h-full"
          src={product?.image || product?.imageUrl}
          alt={product?.title}
        />
      </div>

      <div className="p-4 ">
        <h3 className="text-lg font-medium text-gray-900">
          {product?.brand || product?.title}
        </h3>
        <p className="mt-2 text-sm text-gray-500">{product?.title}</p>
      </div>
    </div>
  );
};

export default HomeProductCard;
