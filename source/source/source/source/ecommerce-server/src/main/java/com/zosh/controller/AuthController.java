package com.zosh.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zosh.config.JwtTokenProvider;
import com.zosh.exception.ProductException;
import com.zosh.exception.UserException;
import com.zosh.modal.Cart;
import com.zosh.modal.User;
import com.zosh.repository.UserRepository;
import com.zosh.request.AddItemRequest;
import com.zosh.request.LoginRequest;
import com.zosh.response.AuthResponse;
import com.zosh.service.CartService;
import com.zosh.service.CustomUserDetails;
import com.zosh.user.domain.UserRole;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;
	private JwtTokenProvider jwtTokenProvider;
	private CustomUserDetails customUserDetails;
	private CartService cartService;
	
	public AuthController(UserRepository userRepository,PasswordEncoder passwordEncoder,JwtTokenProvider jwtTokenProvider,CustomUserDetails customUserDetails,CartService cartService) {
		this.userRepository=userRepository;
		this.passwordEncoder=passwordEncoder;
		this.jwtTokenProvider=jwtTokenProvider;
		this.customUserDetails=customUserDetails;
		this.cartService=cartService;
	}
	
	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandler(@Valid @RequestBody User user) throws UserException{
		
		  	String email = user.getEmail();
	        String password = user.getPassword();
	        String firstName=user.getFirstName();
	        String lastName=user.getLastName();
	        String role=user.getRole();
	        
	        User isEmailExist=userRepository.findByEmail(email);

	        // Check if user with the given email already exists
	        if (isEmailExist!=null) {
	        	
	            throw new UserException("Email Is Already Used With Another Account");
	        }

	        // Create new user
			User createdUser= new User();
			createdUser.setEmail(email);
			createdUser.setFirstName(firstName);
			createdUser.setLastName(lastName);
	        createdUser.setPassword(passwordEncoder.encode(password));
	        createdUser.setRole(role);
	        
	        User savedUser= userRepository.save(createdUser);
	        
	        cartService.createCart(savedUser);
	        
	        // Add demo products to cart for presentation
	        populateDemoCart(savedUser.getId());

	        Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
	        SecurityContextHolder.getContext().setAuthentication(authentication);
	        
	        String token = jwtTokenProvider.generateToken(authentication.getName());

	        AuthResponse authResponse= new AuthResponse(token, "Signup successful", true);
			
	        return new ResponseEntity<AuthResponse>(authResponse,HttpStatus.OK);
		
	}
	
	@PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        
        System.out.println(username +" ----- "+password);
        
        Authentication authentication = authenticate(username, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        // Get user from email and populate demo cart
        User user = userRepository.findByEmail(username);
        if (user != null) {
            populateDemoCart(user.getId());
        }
        
        String token = jwtTokenProvider.generateToken(authentication.getName());
        AuthResponse authResponse= new AuthResponse();
		
		authResponse.setStatus(true);
		authResponse.setToken(token);
		authResponse.setMessage("Signin successful");
		
        return new ResponseEntity<AuthResponse>(authResponse,HttpStatus.OK);
    }
	
	/**
	 * Populates cart with demo products for presentation purposes
	 * These products are hardcoded for demonstration to teacher
	 */
	private void populateDemoCart(Long userId) {
		try {
			// Demo products for cart - using valid product IDs from database
			List<AddItemRequest> demoItems = new ArrayList<>();
			
			// Product 4: Men Printed Pure Cotton Straight Kurta - Size M, Qty 1
			AddItemRequest item1 = new AddItemRequest();
			item1.setProductId(4L);
			item1.setSize("M");
			item1.setQuantity(1);
			demoItems.add(item1);
			
			// Product 5: Men Embroidered Jacquard Straight Kurta - Size L, Qty 1
			AddItemRequest item2 = new AddItemRequest();
			item2.setProductId(5L);
			item2.setSize("L");
			item2.setQuantity(1);
			demoItems.add(item2);
			
			// Product 437: Running Shoes - Size 8, Qty 1
			AddItemRequest item3 = new AddItemRequest();
			item3.setProductId(437L);
			item3.setSize("8");
			item3.setQuantity(1);
			demoItems.add(item3);
			
			// Add each item to cart
			for (AddItemRequest req : demoItems) {
				try {
					cartService.addCartItem(userId, req);
					System.out.println("Added demo product " + req.getProductId() + " to cart for user " + userId);
				} catch (ProductException e) {
					System.out.println("Could not add product " + req.getProductId() + ": " + e.getMessage());
				}
			}
			
		} catch (Exception e) {
			System.out.println("Error populating demo cart: " + e.getMessage());
		}
	}
	
	private Authentication authenticate(String username, String password) {
        UserDetails userDetails = customUserDetails.loadUserByUsername(username);
        
        System.out.println("sign in userDetails - "+userDetails);
        
        if (userDetails == null) {
        	System.out.println("sign in userDetails - null " + userDetails);
            throw new BadCredentialsException("Invalid username or password");
        }
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
        	System.out.println("sign in userDetails - password not match " + userDetails);
            throw new BadCredentialsException("Invalid username or password");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
