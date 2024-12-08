import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../api/authApi";
import "./style.scss";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false); // State for "Keep me logged in"
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for button
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }

    // eslint-disable-next-line
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      await login(email, password, dispatch);
      navigate("/");
    } catch (err) {
      toast.error("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url('/assets/images/auth-bg.jpg')` }}
    >
      <div className="login-card">
        <div className="login-form">
          <div className="form-content">
            <div className="form-header">
              <h4 className="form-subtitle">Welcome Back</h4>
              <h1 className="form-title">Login with Email or Username</h1>
            </div>
            <div className="form-body">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address or username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email or username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <div className="password-input-container">
                    <Form.Control
                      type={passwordVisible ? "text" : "password"} // Toggle input type
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div
                      className="password-toggle-icon"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                </Form.Group>

                <Form.Group className="d-flex justify-content-between align-items-center mb-4">
                  <Form.Check
                    type="checkbox"
                    label="Keep me logged in"
                    checked={keepLoggedIn}
                    onChange={(e) => setKeepLoggedIn(e.target.checked)}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  className="submit-button w-100"
                  disabled={loading}
                >
                  <span>{loading ? "Logging in..." : "Login"}</span>
                  <FaArrowRight />
                </Button>
              </Form>
            </div>
          </div>
        </div>

        {/* Right section - Image */}
        <div
          className="login-image"
          style={{
            backgroundImage: `url('/assets/images/login.png')`, // Correct path
          }}
        ></div>
      </div>
    </div>
  );
};

export default Login;
