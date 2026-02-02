// React hook for managing local component state
import { useState } from "react";

// Material UI components for typography and form layout
import { Typography } from "@mui/material";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

// Fragment allows grouping elements without adding extra nodes to the DOM
import { Fragment } from "react";

// External CSS file for styling the create product form
import "./CreateProductForm.css";

// Redux hook used to trigger actions
import { useDispatch } from "react-redux";

// Redux action responsible for sending product data to backend
import { createProduct } from "../../../Redux/Customers/Product/Action";

// Default size structure used when the form loads
// Helps in rendering size inputs dynamically
const initialSizes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
];

const CreateProductForm = () => {

  // Main state object holding all form field values
  // This will be sent to backend when form is submitted
  const [productData, setProductData] = useState({
    imageUrl: "",
    brand: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    discountPersent: "",
    size: initialSizes, // Array of size objects (S, M, L with quantities)
    quantity: "",
    topLavelCategory: "",
    secondLavelCategory: "",
    thirdLavelCategory: "",
    description: "",
  });

  // Redux dispatch function to call actions
  const dispatch = useDispatch();

  // JWT token required for authorized admin operations
  const jwt = localStorage.getItem("jwt");

  // Handles changes for all simple input fields
  // Prevents writing separate handlers for each input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handles updates for size-related fields (size name & size quantity)
  // Uses index to update the correct size object
  const handleSizeChange = (e, index) => {
    let { name, value } = e.target;

    // Map UI-specific field name to actual state property
    if (name === "size_quantity") name = "quantity";

    // Create a shallow copy of size array to avoid mutating state directly
    const sizes = [...productData.size];

    // Update the specific field for the selected size
    sizes[index][name] = value;

    // Update state with modified size data
    setProductData((prevState) => ({
      ...prevState,
      size: sizes,
    }));
  };

  // Called when admin submits the form
  // Sends product data to backend via Redux action
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload

    // Dispatch create product action with payload and token
    dispatch(createProduct({ data: productData, jwt }));

    // Log data for debugging and verification
    console.log(productData);
  };

  return (
    <Fragment className="createProductContainer ">
      {/* Heading for admin product creation page */}
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
        className="py-10 text-center "
      >
        Add New Product
      </Typography>

      {/* Form wrapper for product details */}
      <form
        onSubmit={handleSubmit}
        className="createProductContainer min-h-screen"
      >
        <Grid container spacing={2}>

          {/* Product image URL input */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleChange}
            />
          </Grid>

          {/* Brand name input */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Brand"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
            />
          </Grid>

          {/* Product title input */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={productData.title}
              onChange={handleChange}
            />
          </Grid>

          {/* Color selection input */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Color"
              name="color"
              value={productData.color}
              onChange={handleChange}
            />
          </Grid>

          {/* Overall product quantity */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
              type="number"
            />
          </Grid>

          {/* Original price before discount */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              type="number"
            />
          </Grid>

          {/* Discounted selling price */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Discounted Price"
              name="discountedPrice"
              value={productData.discountedPrice}
              onChange={handleChange}
              type="number"
            />
          </Grid>

          {/* Discount percentage calculation reference */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Discount Percentage"
              name="discountPersent"
              value={productData.discountPersent}
              onChange={handleChange}
              type="number"
            />
          </Grid>

          {/* Top-level category selection */}
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Top Level Category</InputLabel>
              <Select
                name="topLavelCategory"
                value={productData.topLavelCategory}
                onChange={handleChange}
                label="Top Level Category"
              >
                <MenuItem value="men">Men</MenuItem>
                <MenuItem value="women">Women</MenuItem>
                <MenuItem value="kids">Kids</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Second-level category selection */}
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Second Level Category</InputLabel>
              <Select
                name="secondLavelCategory"
                value={productData.secondLavelCategory}
                onChange={handleChange}
                label="Second Level Category"
              >
                <MenuItem value="clothing">Clothing</MenuItem>
                <MenuItem value="accessories">Accessories</MenuItem>
                <MenuItem value="brands">Brands</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Third-level category selection */}
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Third Level Category</InputLabel>
              <Select
                name="thirdLavelCategory"
                value={productData.thirdLavelCategory}
                onChange={handleChange}
                label="Third Level Category"
              >
                <MenuItem value="top">Tops</MenuItem>
                <MenuItem value="women_dress">Dresses</MenuItem>
                <MenuItem value="t-shirts">T-Shirts</MenuItem>
                <MenuItem value="saree">Saree</MenuItem>
                <MenuItem value="lengha_choli">Lengha Choli</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Product description textarea */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              name="description"
              rows={3}
              onChange={handleChange}
              value={productData.description}
            />
          </Grid>

          {/* Loop through sizes array to render dynamic size inputs */}
          {productData.size.map((size, index) => (
            <Grid container item spacing={3} key={index}>
              {/* Size name (S, M, L etc.) */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Size Name"
                  name="name"
                  value={size.name}
                  onChange={(event) => handleSizeChange(event, index)}
                  required
                  fullWidth
                />
              </Grid>

              {/* Quantity for the specific size */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Quantity"
                  name="size_quantity"
                  type="number"
                  onChange={(event) => handleSizeChange(event, index)}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
          ))}

          {/* Submit button to add product */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ p: 0.7 }}
              color="primary"
              size="large"
              type="submit"
            >
              Add New Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default CreateProductForm;
