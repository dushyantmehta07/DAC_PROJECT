package com.zosh.exception;

import java.net.http.HttpHeaders;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;

/**
 * GlobleException
 * ----------------
 * This class is a GLOBAL EXCEPTION HANDLER for the application.
 * It handles all exceptions thrown from controllers and services
 * and returns proper, meaningful error responses.
 */
@ControllerAdvice // Enables global exception handling across controllers
public class GlobleException {

	// Logger to log error details (useful for debugging & production monitoring)
	private static final Logger logger = LoggerFactory.getLogger(GlobleException.class);

	/**
	 * USER EXCEPTION HANDLER
	 * ---------------------
	 * Handles exceptions related to user operations
	 */
	@ExceptionHandler(UserException.class)
	public ResponseEntity<ErrorDetails> UserExceptionHandler(
			UserException ue,
			WebRequest req
	) {
		// Log the exception
		logger.error("UserException: {}", ue.getMessage());

		// Create custom error response
		ErrorDetails err = new ErrorDetails(
				ue.getMessage(),
				req.getDescription(false),
				LocalDateTime.now()
		);

		return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
	}

	/**
	 * PRODUCT EXCEPTION HANDLER
	 * ------------------------
	 * Handles exceptions related to product operations
	 */
	@ExceptionHandler(ProductException.class)
	public ResponseEntity<ErrorDetails> ProductExceptionHandler(
			ProductException ue,
			WebRequest req
	) {
		logger.error("ProductException: {}", ue.getMessage());

		ErrorDetails err = new ErrorDetails(
				ue.getMessage(),
				req.getDescription(false),
				LocalDateTime.now()
		);

		return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
	}

	/**
	 * CART ITEM EXCEPTION HANDLER
	 * --------------------------
	 * Handles cart-related exceptions
	 */
	@ExceptionHandler(CartItemException.class)
	public ResponseEntity<ErrorDetails> CartItemExceptionHandler(
			CartItemException ue,
			WebRequest req
	) {
		logger.error("CartItemException: {}", ue.getMessage());

		ErrorDetails err = new ErrorDetails(
				ue.getMessage(),
				req.getDescription(false),
				LocalDateTime.now()
		);

		return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
	}

	/**
	 * ORDER EXCEPTION HANDLER
	 * ----------------------
	 * Handles exceptions related to orders
	 */
	@ExceptionHandler(OrderException.class)
	public ResponseEntity<ErrorDetails> OrderExceptionHandler(
			OrderException ue,
			WebRequest req
	) {
		logger.error("OrderException: {}", ue.getMessage());

		ErrorDetails err = new ErrorDetails(
				ue.getMessage(),
				req.getDescription(false),
				LocalDateTime.now()
		);

		return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
	}

	/**
	 * VALIDATION EXCEPTION HANDLER
	 * ----------------------------
	 * Handles validation errors (e.g. @NotNull, @Size, etc.)
	 */
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorDetails> methodArgumentNotValidExceptionHandler(
			MethodArgumentNotValidException me
	) {
		logger.error("Validation error: {}", me.getMessage());

		// Extract first validation error message
		ErrorDetails err = new ErrorDetails(
				me.getBindingResult().getFieldError().getDefaultMessage(),
				"validation error",
				LocalDateTime.now()
		);

		return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
	}

	/**
	 * NO HANDLER FOUND EXCEPTION
	 * -------------------------
	 * Handles invalid or incorrect API endpoints (404 errors)
	 */
	@ExceptionHandler(NoHandlerFoundException.class)
	public ResponseEntity<Object> handleNoHandlerFoundException(
			NoHandlerFoundException ex,
			HttpHeaders headers,
			HttpStatus status,
			WebRequest request
	) {
		logger.error("NoHandlerFoundException: {}", ex.getMessage());

		Map<String, Object> body = new LinkedHashMap<>();
		body.put("message", "Endpoint not found");

		return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
	}

	/**
	 * GENERIC EXCEPTION HANDLER
	 * ------------------------
	 * Handles all other unexpected exceptions
	 */
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorDetails> otherExceptionHandler(
			Exception e,
			WebRequest req
	) {
		logger.error("Unexpected error: {}", e.getMessage(), e);

		ErrorDetails error = new ErrorDetails(
				e.getMessage(),
				req.getDescription(false),
				LocalDateTime.now()
		);

		return new ResponseEntity<>(error, HttpStatus.ACCEPTED);
	}
}
