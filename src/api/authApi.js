import {
  loginSuccess,
  loginFailure,
  logout as logoutAction,
} from "../store/reducers/authReducer"; // import necessary actions
import apiClient from "../api/index";

export const login = async (email, password, dispatch) => {
  try {
    const response = await apiClient.post("/auth/login", {
      email,
      password,
    });

    const token = response.data.token;

    if (token) {
      localStorage.setItem("token", token);
      dispatch(loginSuccess(response.data));
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    dispatch(loginFailure(error.response?.data?.message || "Login failed"));
    throw error;
  }
};

export const logout = (dispatch) => {
  dispatch(logoutAction());
};
