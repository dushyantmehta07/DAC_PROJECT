import { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import ProductReviewCard from "./ProductReviewCard";
import { Box, Button, Grid, LinearProgress, Rating } from "@mui/material";
import HomeProductCard from "../../Home/HomeProductCard";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../../Redux/Customers/Product/Action";
import { addItemToCart } from "../../../../Redux/Customers/Cart/Action";
import { getAllReviews } from "../../../../Redux/Customers/Review/Action";
import { nightsuitsPage1 } from "../../../../Data/NightSuits/nightsuits";

const product = {
  name: "Basic Tee 6-Pack",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  sizes: [
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
  ],
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    "The 6-Pack includes two black, two white, and two heather gray Basic Tees.",
};

const reviews = { totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState();
  const [activeImage, setActiveImage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customersProduct } = useSelector((store) => store);
  const { productId } = useParams();
  const jwt = localStorage.getItem("jwt");

  const handleSetActiveImage = (image) => {
    setActiveImage(image);
  };

  const handleSubmit = () => {
    if (!selectedSize) return;

    const data = { productId, size: selectedSize.name };
    dispatch(addItemToCart({ data, jwt }));
    navigate("/cart");
  };

  useEffect(() => {
    const data = { productId: Number(productId), jwt };
    dispatch(findProductById(data));
    dispatch(getAllReviews(productId));
  }, [productId, dispatch, jwt]);

  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4">
            {(product.breadcrumbs || []).map((breadcrumb) => (
              <li key={breadcrumb.id} className="flex items-center">
                <span className="mr-2 text-sm font-medium text-gray-900">
                  {breadcrumb.name}
                </span>
              </li>
            ))}
          </ol>
        </nav>

        {/* Product Details */}
        <section className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 px-4 pt-10">

          {/* Image Gallery */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img
                src={activeImage?.src || customersProduct.product?.imageUrl}
                alt="product"
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="flex flex-wrap space-x-5 justify-center">
              {(product.images || []).map((image, index) => (
                <div
                  key={index}
                  onClick={() => handleSetActiveImage(image)}
                  className="cursor-pointer overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-1 mx-auto max-w-2xl px-4">

            <h1 className="text-lg font-semibold">
              {customersProduct.product?.brand}
            </h1>
            <p className="opacity-60">
              {customersProduct.product?.title}
            </p>

            {/* Price */}
            <div className="flex space-x-5 items-center mt-4">
              <p className="font-semibold">
                ₹{customersProduct.product?.discountedPrice}
              </p>
              <p className="opacity-50 line-through">
                ₹{customersProduct.product?.price}
              </p>
              <p className="text-green-600 font-semibold">
                {customersProduct.product?.discountPersent}% Off
              </p>
            </div>

            {/* Rating */}
            <div className="mt-4 flex items-center space-x-3">
              <Rating value={4.6} precision={0.5} readOnly />
              <p className="opacity-60 text-sm">
                {reviews.totalCount} reviews
              </p>
            </div>

            {/* Sizes */}
            <form className="mt-6" onSubmit={handleSubmit}>
              <RadioGroup value={selectedSize} onChange={setSelectedSize}>
                <div className="grid grid-cols-4 gap-4">
                  {(product.sizes || []).map((size) => (
                    <RadioGroup.Option
                      key={size.name}
                      value={size}
                      className="cursor-pointer border rounded-md py-2 text-center"
                    >
                      {size.name}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>

              <Button
                variant="contained"
                type="submit"
                sx={{ marginTop: "1.5rem" }}
              >
                Add To Cart
              </Button>
            </form>
          </div>
        </section>

        {/* Reviews */}
        <section className="p-5">
          <h1 className="font-semibold text-lg pb-4">
            Recent Reviews
          </h1>

          <Grid container spacing={5}>
            <Grid item xs={7}>
              {(customersProduct.product?.reviews || []).map((item, index) => (
                <ProductReviewCard key={index} item={item} />
              ))}
            </Grid>

            <Grid item xs={5}>
              <Rating value={4.6} precision={0.5} readOnly />

              <Box className="mt-4">
                <LinearProgress variant="determinate" value={40} />
              </Box>
            </Grid>
          </Grid>
        </section>

        {/* Similar Products */}
        <section className="pt-10">
          <h1 className="py-5 text-xl font-bold">
            Similar Products
          </h1>

          <div className="flex flex-wrap gap-5">
            {(nightsuitsPage1 || []).map((item, index) => (
              <HomeProductCard key={index} product={item} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
