import UserIcon from "../assets/User_icon.webp";
import Email from "../assets/email_icon.webp";
import Password from "../assets/password_icon.webp";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser, loginUser, forgotPassword } from "../api/auth";
import "./Login.css";

function Login() {
  const [action, setAction] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [resetError, setResetError] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (action === "Signup" && !name) {
      setError("Please enter your name.");
      return;
    }

    setLoading(true);
    try {
      let data;
      if (action === "Signup") {
        data = await signupUser({ name, email, password });
      } else {
        data = await loginUser({ email, password });
      }
      // Save JWT token to localStorage
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/home");
    } catch (err) {
      const detail = err?.response?.data?.detail;
      setError(detail || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async () => {
    setResetError("");
    if (!resetEmail) {
      setResetError("Please enter your email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetEmail)) {
      setResetError("Please enter a valid email address.");
      return;
    }
    setResetLoading(true);
    try {
      await forgotPassword(resetEmail);
      setResetSent(true);
    } catch {
      setResetError("Something went wrong. Please try again.");
    } finally {
      setResetLoading(false);
    }
  };

  if (forgotMode) {
    return (
      <div className="container">
        <div className="login-wrapper">
          <div className="login-header">
            <h1>{resetSent ? "Check Your Email" : "Reset Password"}</h1>
            <p>{resetSent ? `A reset link was sent to ${resetEmail}` : "We'll send you a reset link"}</p>
          </div>
          <div className="radius">
            {!resetSent ? (
              <div className="inputs">
                <div className="input-row">
                  <img src={Email} alt="email" />
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                  />
                </div>
                {resetError && <div className="error-msg">⚠ {resetError}</div>}
              </div>
            ) : (
              <div className="reset-success">
                <div className="reset-success-icon">✉</div>
                <p>Didn't receive it? Check your spam folder or try again.</p>
              </div>
            )}
            {!resetSent && (
              <button className="submit-main" onClick={handleForgotSubmit} disabled={resetLoading}>
                {resetLoading ? "Sending…" : "Send Reset Link"}
              </button>
            )}
            <button
              className="back-link"
              onClick={() => { setForgotMode(false); setResetSent(false); setResetEmail(""); setResetError(""); }}
            >
              ← Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="login-wrapper">
        <div className="login-header">
          <h1>{action === "Login" ? "Welcome Back" : "Create Account"}</h1>
          <p>{action === "Login" ? "Sign in to continue" : "Join us today — it's free"}</p>
        </div>

        {/* Toggle tabs */}
        <div className="login-tabs">
          <button
            className={`tab-btn ${action === "Login" ? "tab-active" : ""}`}
            onClick={() => { setAction("Login"); setError(""); }}
          >
            Login
          </button>
          <button
            className={`tab-btn ${action === "Signup" ? "tab-active" : ""}`}
            onClick={() => { setAction("Signup"); setError(""); }}
          >
            Sign Up
          </button>
        </div>

        <div className="radius">
          <div className="inputs">
            {action === "Signup" && (
              <div className="input-row">
                <img src={UserIcon} alt="user" />
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div className="input-row">
              <img src={Email} alt="email" />
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-row">
              <img src={Password} alt="password" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Error message */}
            {error && <div className="error-msg">⚠ {error}</div>}

            {/* Forgot Password link — only visible on Login tab */}
            {action === "Login" && (
              <button className="forgot-link" onClick={() => { setForgotMode(true); setError(""); }}>
                Forgot Password?
              </button>
            )}
          </div>

          <button
            className={`submit-main ${loading ? "loading" : ""}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <span className="btn-spinner" /> : action === "Login" ? "Sign In" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
