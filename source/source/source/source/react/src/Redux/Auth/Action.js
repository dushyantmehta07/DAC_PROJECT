import axios from 'axios';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
  GET_ALL_CUSTOMERS_REQUEST,
  GET_ALL_CUSTOMERS_SUCCESS,
  GET_ALL_CUSTOMERS_FAILURE
} from './ActionTypes';
import { API_BASE_URL } from '../../config/api';

// Register action creators
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload:user });
const registerFailure = error => ({ type: REGISTER_FAILURE, payload: error });

export const register = userData => async dispatch => {
  dispatch(registerRequest());
  try {
    const response=await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    const user = response.data;
    console.log("register response :- ", user);

    // ✅ Safely extract token from any backend format
    const jwt =
      user.token ||
      user.jwt ||
      user.accessToken ||
      user;

    if (jwt) {
      localStorage.setItem("jwt", jwt);
      console.log("Saved JWT (register):", jwt);
    } else {
      console.warn("JWT not found in response!");
    }

    dispatch(registerSuccess(user));
  } catch (error) {
    console.log("error ",error)
    dispatch(registerFailure(error.message));
  }
};

// Login action creators
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = user => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = error => ({ type: LOGIN_FAILURE, payload: error });

export const login = userData => async dispatch => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const user = response.data;
    console.log("login response :- ", user);

    // ✅ Safely extract token from any backend format
    const jwt =
      user.token ||
      user.jwt ||
      user.accessToken ||
      user;

    if (jwt) {
      localStorage.setItem("jwt", jwt);
      console.log("Saved JWT:", localStorage.getItem("jwt"));
    } else {
      console.warn("JWT not found in response!");
    }

    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};



//  get user from token
export const getAllCustomers = (token) => {
  return async (dispatch) => {
    console.log("jwt - ",token)
    dispatch({ type: GET_ALL_CUSTOMERS_REQUEST });
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/users`,{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      });
      const users = response.data;
      dispatch({ type: GET_ALL_CUSTOMERS_SUCCESS, payload: users });
      console.log("All Customers",users)
    } catch (error) {
      const errorMessage = error.message;
      console.log(error)
      dispatch({ type: GET_ALL_CUSTOMERS_FAILURE, payload: errorMessage });
    }
  };
};

export const getUser = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/profile`,{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      });
      const user = response.data;
      dispatch({ type: GET_USER_SUCCESS, payload: user });
      console.log("req User ",user)
    } catch (error) {
      const errorMessage = error.message;
      dispatch({ type: GET_USER_FAILURE, payload: errorMessage });
    }
  };
};

export const logout = (token) => {
    return async (dispatch) => {
      dispatch({ type: LOGOUT });
      localStorage.clear();
    };
  };
