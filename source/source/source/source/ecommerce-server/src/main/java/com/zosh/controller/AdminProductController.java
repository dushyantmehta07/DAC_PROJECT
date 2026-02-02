package com.zosh.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zosh.exception.ProductException;
import com.zosh.modal.Product;
import com.zosh.request.CreateProductRequest;
import com.zosh.response.ApiResponse;
import com.zosh.service.ProductService;

/**
 * AdminProductController
 * ----------------------
 * This controller handles all ADMIN-related product operations
 * such as creating, updating, deleting, and viewing products.
 */
@RestController // Marks this class as a REST controller
@RequestMapping("/api/admin/products") // Base URL for admin product APIs
public class AdminProductController {

	// Service layer dependency for product-related business logic
	private ProductService productService;

	/**
	 * Constructor-based dependency injection
	 * Spring automatically injects ProductService
	 */
	public AdminProductController(ProductService productService) {
		this.productService = productService;
	}

	/**
	 * CREATE SINGLE PRODUCT
	 * ---------------------
	 * This API allows admin to add a new product.
	 * URL: /api/admin/products/
	 */
	@PostMapping("/")
	public ResponseEntity<Product> createProductHandler(
			@RequestBody CreateProductRequest req // Request body containing product details
	) throws ProductException{

		// Create product using service layer
		Product createdProduct = productService.createProduct(req);

		// Return created product
		return new ResponseEntity<>(createdProduct, HttpStatus.ACCEPTED);
	}

	/**
	 * DELETE PRODUCT
	 * --------------
	 * This API deletes a product by product ID.
	 * URL: /api/admin/products/{productId}/delete
	 */
	@DeleteMapping("/{productId}/delete")
	public ResponseEntity<ApiResponse> deleteProductHandler(
			@PathVariable Long productId // Product ID from URL
	) throws ProductException{

		// Debug logs
		System.out.println("delete product controller .... ");

		// Delete product using service layer
		String msg = productService.deleteProduct(productId);

		System.out.println("delete product controller .... msg " + msg);

		// Custom API response
		ApiResponse res = new ApiResponse(msg, true);

		return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
	}

	/**
	 * GET ALL PRODUCTS
	 * ----------------
	 * This API fetches all products for admin dashboard.
	 * URL: /api/admin/products/all
	 */
	@GetMapping("/all")
	public ResponseEntity<List<Product>> findAllProduct(){

		// Fetch all products from database
		List<Product> products = productService.getAllProducts();

		return new ResponseEntity<>(products, HttpStatus.OK);
	}

	/**
	 * GET RECENTLY ADDED PRODUCTS
	 * ---------------------------
	 * This API returns recently added products (used in dashboard).
	 * URL: /api/admin/products/recent
	 */
	@GetMapping("/recent")
	public ResponseEntity<List<Product>> recentlyAddedProduct(){

		// Fetch recently added products
		List<Product> products = productService.recentlyAddedProduct();

		return new ResponseEntity<>(products, HttpStatus.OK);
	}

	/**
	 * UPDATE PRODUCT
	 * --------------
	 * This API updates an existing product.
	 * URL: /api/admin/products/{productId}/update
	 */
	@PutMapping("/{productId}/update")
	public ResponseEntity<Product> updateProductHandler(
			@RequestBody Product req, // Updated product data
			@PathVariable Long productId // Product ID from URL
	) throws ProductException{

		// Update product using service layer
		Product updatedProduct = productService.updateProduct(productId, req);

		return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
	}

	/**
	 * CREATE MULTIPLE PRODUCTS (BULK UPLOAD)
	 * --------------------------------------
	 * This API allows admin to add multiple products at once.
	 * URL: /api/admin/products/creates
	 */
	@PostMapping("/creates")
	public ResponseEntity<ApiResponse> createMultipleProduct(
			@RequestBody CreateProductRequest[] reqs // Array of product requests
	) throws ProductException{

		// Loop through request array and create products one by one
		for (CreateProductRequest product : reqs) {
			productService.createProduct(product);
		}

		// Success response
		ApiResponse res = new ApiResponse("products created successfully", true);

		return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
	}
}
