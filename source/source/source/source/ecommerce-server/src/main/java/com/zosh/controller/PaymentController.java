package com.zosh.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.zosh.exception.OrderException;
import com.zosh.exception.UserException;
import com.zosh.modal.Order;
import com.zosh.modal.User;
import com.zosh.repository.OrderRepository;
import com.zosh.response.ApiResponse;
import com.zosh.response.PaymentLinkResponse;
import com.zosh.service.OrderService;
import com.zosh.service.UserService;
import com.zosh.user.domain.OrderStatus;
import com.zosh.user.domain.PaymentStatus;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

/**
 * PaymentController
 * -----------------
 * This controller handles payment-related operations
 * using Razorpay payment gateway.
 */
@RestController // Marks this class as REST API controller
@RequestMapping("/api") // Base API path
public class PaymentController {

	/**
	 * Razorpay API credentials
	 * These values are injected from application.properties
	 */
	@Value("${razorpay.api.key}")
	private String apiKey;

	@Value("${razorpay.api.secret}")
	private String apiSecret;

	// Service and repository dependencies
	private OrderService orderService;
	private UserService userService;
	private OrderRepository orderRepository;

	/**
	 * Constructor-based dependency injection
	 */
	public PaymentController(
			OrderService orderService,
			UserService userService,
			OrderRepository orderRepository
	) {
		this.orderService = orderService;
		this.userService = userService;
		this.orderRepository = orderRepository;
	}

	/**
	 * CREATE PAYMENT LINK
	 * -------------------
	 * This API creates a Razorpay payment link for a given order.
	 * URL: /api/payments/{orderId}
	 */
	@PostMapping("/payments/{orderId}")
	public ResponseEntity<PaymentLinkResponse> createPaymentLink(
			@PathVariable Long orderId, // Order ID from URL
			@RequestHeader("Authorization") String jwt // JWT token
	) throws RazorpayException, UserException, OrderException {

		// Fetch order details
		Order order = orderService.findOrderById(orderId);

		try {
			// Initialize Razorpay client using API key and secret
			RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);

			/**
			 * Build payment link request JSON
			 */
			JSONObject paymentLinkRequest = new JSONObject();

			// Amount must be in paise (INR * 100)
			paymentLinkRequest.put("amount", order.getTotalPrice() * 100);
			paymentLinkRequest.put("currency", "INR");

			/**
			 * Customer details
			 */
			JSONObject customer = new JSONObject();
			customer.put("name", order.getUser().getFirstName() + " " + order.getUser().getLastName());
			customer.put("contact", order.getUser().getMobile());
			customer.put("email", order.getUser().getEmail());
			paymentLinkRequest.put("customer", customer);

			/**
			 * Notification settings (SMS & Email)
			 */
			JSONObject notify = new JSONObject();
			notify.put("sms", true);
			notify.put("email", true);
			paymentLinkRequest.put("notify", notify);

			// Enable payment reminders
			paymentLinkRequest.put("reminder_enable", true);

			/**
			 * Callback URL after successful payment
			 * Frontend will handle success page
			 */
			paymentLinkRequest.put(
					"callback_url",
					"http://localhost:4200/payment-success?order_id=" + orderId
			);
			paymentLinkRequest.put("callback_method", "get");

			/**
			 * Create payment link using Razorpay API
			 */
			PaymentLink payment = razorpay.paymentLink.create(paymentLinkRequest);

			// Extract payment link details
			String paymentLinkId = payment.get("id");
			String paymentLinkUrl = payment.get("short_url");

			// Send payment link details to frontend
			PaymentLinkResponse res =
					new PaymentLinkResponse(paymentLinkUrl, paymentLinkId);

			/**
			 * Fetch payment link details and store order_id in DB
			 */
			PaymentLink fetchedPayment =
					razorpay.paymentLink.fetch(paymentLinkId);

			order.setOrderId(fetchedPayment.get("order_id"));
			orderRepository.save(order);

			// Debug logs
			System.out.println("Payment link ID: " + paymentLinkId);
			System.out.println("Payment link URL: " + paymentLinkUrl);
			System.out.println("Order Id : " + fetchedPayment.get("order_id"));

			return new ResponseEntity<>(res, HttpStatus.ACCEPTED);

		} catch (RazorpayException e) {
			System.out.println("Error creating payment link: " + e.getMessage());
			throw new RazorpayException(e.getMessage());
		}
	}

	/**
	 * PAYMENT CALLBACK HANDLER
	 * ------------------------
	 * This API verifies payment status after redirection from Razorpay.
	 * URL: /api/payments
	 */
	@GetMapping("/payments")
	public ResponseEntity<ApiResponse> redirect(
			@RequestParam(name = "payment_id") String paymentId,
			@RequestParam("order_id") Long orderId
	) throws RazorpayException, OrderException {

		// Initialize Razorpay client
		RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);

		// Fetch order
		Order order = orderService.findOrderById(orderId);

		try {
			// Fetch payment details from Razorpay
			Payment payment = razorpay.payments.fetch(paymentId);

			System.out.println("payment details --- " + payment + payment.get("status"));

			/**
			 * If payment is successful (captured)
			 */
			if (payment.get("status").equals("captured")) {

				// Save payment details
				order.getPaymentDetails().setPaymentId(paymentId);
				order.getPaymentDetails().setStatus(PaymentStatus.COMPLETED);

				// Update order status
				order.setOrderStatus(OrderStatus.PLACED);

				orderRepository.save(order);
			}

			// Success response
			ApiResponse res = new ApiResponse("your order get placed", true);
			return new ResponseEntity<>(res, HttpStatus.OK);

		} catch (Exception e) {
			System.out.println("payment error occurred");

			// Redirect user to failure page
			new RedirectView("https://shopwithzosh.vercel.app/payment/failed");

			throw new RazorpayException(e.getMessage());
		}
	}
}
