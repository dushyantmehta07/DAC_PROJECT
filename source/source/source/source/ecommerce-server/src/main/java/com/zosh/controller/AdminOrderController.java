package com.zosh.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zosh.exception.OrderException;
import com.zosh.modal.Order;
import com.zosh.response.ApiResponse;
import com.zosh.service.OrderService;

/**
 * AdminOrderController
 * ---------------------
 * This controller handles all ADMIN-level operations related to orders.
 * Only admin users can access these APIs.
 */
@RestController // Marks this class as a REST controller
@RequestMapping("/api/admin/orders") // Base URL for admin order APIs
public class AdminOrderController {

	// Service layer dependency to handle business logic
	private OrderService orderService;

	/**
	 * Constructor-based dependency injection
	 * Spring automatically injects OrderService here
	 */
	public AdminOrderController(OrderService orderService) {
		this.orderService = orderService;
	}

	/**
	 * GET ALL ORDERS
	 * --------------
	 * This API is used by admin to fetch all orders from the system.
	 * URL: /api/admin/orders/
	 */
	@GetMapping("/")
	public ResponseEntity<List<Order>> getAllOrdersHandler(){

		// Fetch all orders using service layer
		List<Order> orders = orderService.getAllOrders();

		// Return orders list with HTTP status ACCEPTED (202)
		return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
	}

	/**
	 * CONFIRM ORDER
	 * -------------
	 * This API confirms an order (Admin action).
	 * URL: /api/admin/orders/{orderId}/confirmed
	 */
	@PutMapping("/{orderId}/confirmed")
	public ResponseEntity<Order> ConfirmedOrderHandler(
			@PathVariable Long orderId, // Order ID from URL
			@RequestHeader("Authorization") String jwt // JWT token for security
	) throws OrderException{

		// Confirm the order using service layer
		Order order = orderService.confirmedOrder(orderId);

		// Return updated order
		return new ResponseEntity<>(order, HttpStatus.ACCEPTED);
	}

	/**
	 * SHIP ORDER
	 * ----------
	 * This API marks an order as shipped.
	 * URL: /api/admin/orders/{orderId}/ship
	 */
	@PutMapping("/{orderId}/ship")
	public ResponseEntity<Order> shippedOrderHandler(
			@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt
	) throws OrderException{

		// Update order status to SHIPPED
		Order order = orderService.shippedOrder(orderId);

		return new ResponseEntity<>(order, HttpStatus.ACCEPTED);
	}

	/**
	 * DELIVER ORDER
	 * -------------
	 * This API marks an order as delivered.
	 * URL: /api/admin/orders/{orderId}/deliver
	 */
	@PutMapping("/{orderId}/deliver")
	public ResponseEntity<Order> deliveredOrderHandler(
			@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt
	) throws OrderException{

		// Update order status to DELIVERED
		Order order = orderService.deliveredOrder(orderId);

		return new ResponseEntity<>(order, HttpStatus.ACCEPTED);
	}

	/**
	 * CANCEL ORDER
	 * ------------
	 * This API cancels an order.
	 * URL: /api/admin/orders/{orderId}/cancel
	 */
	@PutMapping("/{orderId}/cancel")
	public ResponseEntity<Order> canceledOrderHandler(
			@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt
	) throws OrderException{

		// Cancel the order
		Order order = orderService.cancledOrder(orderId);

		return new ResponseEntity<>(order, HttpStatus.ACCEPTED);
	}

	/**
	 * DELETE ORDER
	 * ------------
	 * This API permanently deletes an order from the system.
	 * URL: /api/admin/orders/{orderId}/delete
	 */
	@DeleteMapping("/{orderId}/delete")
	public ResponseEntity<ApiResponse> deleteOrderHandler(
			@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt
	) throws OrderException{

		// Delete order using service layer
		orderService.deleteOrder(orderId);

		// Create custom API response
		ApiResponse res = new ApiResponse("Order Deleted Successfully", true);

		// Console log for debugging
		System.out.println("delete method working....");

		return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
	}
}
