package com.zosh.response;

public class AuthResponse {

	private String token;
	private String message;
	private boolean status;

	public AuthResponse() {
		// TODO Auto-generated constructor stub
	}

	public AuthResponse(String token, String message, boolean status) {
		super();
		this.token = token;
		this.message = message;
		this.status = status;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public boolean getStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

}
