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




@ControllerAdvice
public class GlobleException {
	
	private static final Logger logger = LoggerFactory.getLogger(GlobleException.class);
	
	@ExceptionHandler(UserException.class)
	public ResponseEntity<ErrorDetails> UserExceptionHandler(UserException ue, WebRequest req){
		logger.error("UserException: {}", ue.getMessage());
		ErrorDetails err= new ErrorDetails(ue.getMessage(),req.getDescription(false),LocalDateTime.now());
		
		return new ResponseEntity<ErrorDetails>(err,HttpStatus.BAD_REQUEST);
		
	}
	
	@ExceptionHandler(ProductException.class)
	public ResponseEntity<ErrorDetails> ProductExceptionHandler(ProductException ue, WebRequest req){
		logger.error("ProductException: {}", ue.getMessage());
		ErrorDetails err= new ErrorDetails(ue.getMessage(),req.getDescription(false),LocalDateTime.now());
		
		return new ResponseEntity<ErrorDetails>(err,HttpStatus.BAD_REQUEST);
		
	}
	
	@ExceptionHandler(CartItemException.class)
	public ResponseEntity<ErrorDetails> CartItemExceptionHandler(CartItemException ue, WebRequest req){
		logger.error("CartItemException: {}", ue.getMessage());
		ErrorDetails err= new ErrorDetails(ue.getMessage(),req.getDescription(false),LocalDateTime.now());
		
		return new ResponseEntity<ErrorDetails>(err,HttpStatus.BAD_REQUEST);
		
	}
	
	@ExceptionHandler(OrderException.class)
	public ResponseEntity<ErrorDetails> OrderExceptionHandler(OrderException ue, WebRequest req){
		logger.error("OrderException: {}", ue.getMessage());
		ErrorDetails err= new ErrorDetails(ue.getMessage(),req.getDescription(false),LocalDateTime.now());
		
		return new ResponseEntity<ErrorDetails>(err,HttpStatus.BAD_REQUEST);
		
	}
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorDetails> methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException me){
		logger.error("Validation error: {}", me.getMessage());
		ErrorDetails err=new ErrorDetails(me.getBindingResult().getFieldError().getDefaultMessage(),"validation error",LocalDateTime.now());
		return new ResponseEntity<ErrorDetails>(err,HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<Object> handleNoHandlerFoundException(NoHandlerFoundException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
		logger.error("NoHandlerFoundException: {}", ex.getMessage());
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("message", "Endpoint not found");

        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorDetails> otherExceptionHandler(Exception e, WebRequest req){
		logger.error("Unexpected error: {}", e.getMessage(), e);
		ErrorDetails error=new ErrorDetails(e.getMessage(),req.getDescription(false),LocalDateTime.now());
		
		return new ResponseEntity<ErrorDetails>(error,HttpStatus.ACCEPTED);
	}

}
