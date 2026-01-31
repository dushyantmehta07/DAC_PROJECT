package com.zosh.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zosh.exception.ProductException;
import com.zosh.exception.UserException;
import com.zosh.modal.Cart;
import com.zosh.modal.User;
import com.zosh.request.AddItemRequest;
import com.zosh.service.CartService;
import com.zosh.service.UserService;

@RestController
@RequestMapping("/api/cart")
public class CartController {
	
	private static final Logger logger = LoggerFactory.getLogger(CartController.class);
	
	private CartService cartService;
	private UserService userService;
	
	public CartController(CartService cartService,UserService userService) {
		this.cartService=cartService;
		this.userService=userService;
	}
	
	@GetMapping("/")
	public ResponseEntity<Cart> findUserCartHandler(@RequestHeader("Authorization") String jwt) throws UserException{
		
		logger.info("GET /api/cart/ - Fetching user cart");
		User user=userService.findUserProfileByJwt(jwt);
		logger.debug("User found: {}", user.getId());
		
		Cart cart=cartService.findUserCart(user.getId());
		
		if (cart == null) {
			logger.info("Cart not found for user: {}, creating new cart", user.getId());
			cart = cartService.createCart(user);
		}
		
		logger.info("Returning cart with {} items for user: {}", cart.getCartItems().size(), user.getId());
		
		return new ResponseEntity<Cart>(cart,HttpStatus.OK);
	}
	
	@PostMapping("/create")
	public ResponseEntity<Cart> createCartHandler(@RequestHeader("Authorization") String jwt) throws UserException{
		
		logger.info("POST /api/cart/create - Creating user cart");
		User user=userService.findUserProfileByJwt(jwt);
		logger.debug("User found: {}", user.getId());
		
		Cart existingCart = cartService.findUserCart(user.getId());
		if (existingCart != null) {
			logger.info("Cart already exists for user: {}", user.getId());
			return new ResponseEntity<>(existingCart, HttpStatus.OK);
		}
		
		Cart cart = cartService.createCart(user);
		logger.info("Created new cart for user: {}", user.getId());
		
		return new ResponseEntity<>(cart, HttpStatus.CREATED);
	}
	
	@PutMapping("/add")
	public ResponseEntity<Cart> addItemToCart(@RequestBody AddItemRequest req, 
			@RequestHeader("Authorization") String jwt) throws UserException, ProductException{
		
		logger.info("PUT /api/cart/add - Adding item to cart");
		User user=userService.findUserProfileByJwt(jwt);
		logger.debug("User found: {}, adding product: {}", user.getId(), req.getProductId());
		
		cartService.addCartItem(user.getId(), req);
		
		// Return the updated cart instead of just the cart item
		Cart updatedCart = cartService.findUserCart(user.getId());
		
		if (updatedCart == null) {
			logger.warn("Cart is null after adding item, creating new cart");
			updatedCart = cartService.createCart(user);
		}
		
		logger.info("Cart updated, returning cart with {} items", updatedCart.getCartItems().size());
		
		return new ResponseEntity<>(updatedCart, HttpStatus.ACCEPTED);
		
	}
	

}
