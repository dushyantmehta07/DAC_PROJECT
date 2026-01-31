import React from 'react';
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { title, brand, imageUrl, image, price ,discountedPrice,color,discountPersent, id, _id} = product;
  const navigate = useNavigate();

  // Handle both image and imageUrl properties from different data sources
  const productImage = imageUrl || image;

  // console.log("product",product)

  const handleNavigate=()=>{
    // Navigate to the product's detail page using its ID
    // Use id first, then _id, then fallback to title-based slug
    const productId = id || _id;
    if (productId) {
      // Convert to string if it's a number
      const idString = String(productId);
      navigate(`/product/${idString}`)
    } else if (title) {
      // Fallback: create a URL-friendly slug from the title
      const titleSlug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      navigate(`/product/${titleSlug}`)
    } else {
      // Last resort: use the first 20 characters of the image URL
      const imageSlug = (imageUrl || image || '').substring(0, 20).replace(/[^a-z0-9]/g, '');
      navigate(`/product/${imageSlug || 'product'}`)
    }
  }

  return (
   <div onClick={handleNavigate} className='productCard w-[15rem] border m-3 transition-all cursor-pointer '>
    <div className='h-[20rem]'>
        <img className='h-full w-full object-cover object-left-top' src={productImage} alt={title || "Product"} />
    </div>
    <div className='textPart bg-white p-3 '>
        <div>
        <p  className='font-bold opacity-60'>{brand}</p>
            <p className=''>{title}</p>
        
        <p className='font-semibold opacity-50'>{color}</p>
        </div>
        
        <div className='flex space-x-2 items-center'>
            <p className='font-semibold'>₹{discountedPrice}</p>
            <p className='opacity-50 line-through'>₹{price}</p>
            <p className='text-green-600 font-semibold'>{discountPersent}% off</p>
        </div>
        
    </div>
   </div>
  );
};

export default ProductCard;
