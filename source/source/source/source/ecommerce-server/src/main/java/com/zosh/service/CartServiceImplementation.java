package com.zosh.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zosh.exception.ProductException;
import com.zosh.modal.Cart;
import com.zosh.modal.CartItem;
import com.zosh.modal.Product;
import com.zosh.modal.User;
import com.zosh.repository.CartRepository;
import com.zosh.request.AddItemRequest;

@Service
public class CartServiceImplementation implements CartService{
	
	private static final Logger logger = LoggerFactory.getLogger(CartServiceImplementation.class);
	
	private CartRepository cartRepository;
	private CartItemService cartItemService;
	private ProductService productService;
	
	
	public CartServiceImplementation(CartRepository cartRepository,CartItemService cartItemService,
			ProductService productService) {
		this.cartRepository=cartRepository;
		this.productService=productService;
		this.cartItemService=cartItemService;
	}

	@Override
	public Cart createCart(User user) {
		
		Cart cart = new Cart();
		cart.setUser(user);
		//cart.setTotalItems(0);
		cart.setTotalPrice(0);
		cart.setTotalDiscountedPrice(0);
		Cart createdCart=cartRepository.save(cart);
		logger.info("Created new cart for user: {}", user.getId());
		return createdCart;
	}
	
	public Cart findUserCart(Long userId) {
		logger.debug("Finding cart for user: {}", userId);
		Cart cart =	cartRepository.findByUserId(userId);
		
		// If cart doesn't exist, return null (caller should handle)
		if (cart == null) {
			logger.info("Cart not found for user: {}", userId);
			return null;
		}
		
		int totalPrice=0;
		int totalDiscountedPrice=0;
		int totalItem=0;
		for(CartItem cartsItem : cart.getCartItems()) {
			totalPrice+=cartsItem.getPrice();
			totalDiscountedPrice+=cartsItem.getDiscountedPrice();
			totalItem+=cartsItem.getQuantity();
		}
		
		cart.setTotalPrice(totalPrice);
		cart.setTotalItem(cart.getCartItems().size());
		cart.setTotalDiscountedPrice(totalDiscountedPrice);
		cart.setDiscounte(totalPrice-totalDiscountedPrice);
		cart.setTotalItem(totalItem);
		
		Cart savedCart = cartRepository.save(cart);
		logger.debug("Returning cart with {} items for user: {}", cart.getCartItems().size(), userId);
		
		return savedCart;
		
	}

	@Override
	@Transactional
	public CartItem addCartItem(Long userId, AddItemRequest req) throws ProductException {
		logger.info("Adding item to cart - userId: {}, productId: {}, size: {}, quantity: {}", 
				userId, req.getProductId(), req.getSize(), req.getQuantity());
		
		Cart cart=cartRepository.findByUserId(userId);
		
		// If cart doesn't exist, create one
		if (cart == null) {
			logger.info("Cart not found for user: {}, creating new cart", userId);
			User user = new User();
			user.setId(userId);
			cart = createCart(user);
		}
		
		logger.debug("Cart found/created: {}", cart.getId());
		
		Product product;
		try {
			product = productService.findProductById(req.getProductId());
			logger.debug("Product found: {}", product.getId());
		} catch (ProductException e) {
			logger.error("Product not found with id: {}", req.getProductId());
			throw new ProductException("Product not found with id: " + req.getProductId());
		}
		
		CartItem isPresent=cartItemService.isCartItemExist(cart, product, req.getSize(),userId);
		
		if(isPresent == null) {
			logger.debug("Creating new cart item for product: {}", product.getId());
			
			CartItem cartItem = new CartItem();
			cartItem.setProduct(product);
			cartItem.setCart(cart);
			cartItem.setQuantity(req.getQuantity());
			cartItem.setUserId(userId);
			
			
			int price=req.getQuantity()*product.getDiscountedPrice();
			cartItem.setPrice(price);
			cartItem.setSize(req.getSize());
			
			CartItem createdCartItem=cartItemService.createCartItem(cartItem);
			logger.info("Created cart item: {}", createdCartItem.getId());
			
			cart.getCartItems().add(createdCartItem);
			
			// Save the cart after adding the item
			cartRepository.save(cart);
			logger.info("Saved cart with {} items", cart.getCartItems().size());
			
			return createdCartItem;
		}
		
		logger.debug("Cart item already exists, returning existing item: {}", isPresent.getId());
		return isPresent;
	}

}
