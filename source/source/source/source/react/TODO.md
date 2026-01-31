# Fix Routing Issues - TODO

## Issues Identified:
1. HomeProductCard.jsx: All products navigate to `/men/clothing/mens_kurta` regardless of actual category
2. ProductCard.jsx: Uses hardcoded fallback ID of 2 when no product ID exists

## Plan:
1. Update HomeProductCard.jsx to navigate based on product's actual category
2. Update ProductCard.jsx to use actual product.id without hardcoded fallback
3. Update Homepage.jsx to add proper category information to all products
4. Update Product.jsx to display the correct products based on category URL

## Progress:
- [x] Analyze code and identify issues
- [x] Create plan
- [x] Fix HomeProductCard.jsx navigation
- [x] Fix ProductCard.jsx product ID handling
- [x] Fix Homepage.jsx to add category data to products
- [x] Fix Product.jsx to show correct products for each category
- [x] Fix ProductCard.jsx to handle both image and imageUrl properties
- [x] Add IDs to all products so they can navigate to product details
- [x] Test the fixes - App compiles successfully!

