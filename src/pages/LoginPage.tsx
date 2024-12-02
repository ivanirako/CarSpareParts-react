import React, { useState } from 'react'
import "../styles/LoginPage.scss"
import { API_URL } from '../utils/constants';
import { useSearchParams } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [params] = useSearchParams();
  const logout = params.get("logout");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!username || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(API_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      } else {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/dashboard";
      }

      // Handle successful login (e.g., redirect to dashboard)
    } catch (error:any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className='login-page'>
   <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          {/* Error and Logout Alerts */}
          {error && <div className="alert alert-danger">{error}</div>}
          {logout && (
            <div className="alert alert-success">You have successfully logged out</div>
          )}

          {/* Login Form Card */}
          <div className="card">
            <div className="card-header d-flex align-items-center">
              <img
                src="https://www.shutterstock.com/image-vector/vector-car-parts-tire-isolated-600nw-1962329059.jpg"
                className="logo-img me-2"
                alt="AutoParts Hub"
              />
              <span>AutoParts Hub Login</span>
            </div>
            <div className="card-body">
              <form onSubmit={handleFormSubmit}>
                {/* Email Field */}
                <div className="form-group mb-4 position-relative">
                  <span className="input-group-text">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    placeholder="Enter email address"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="form-group mb-4 position-relative">
                  <span className="input-group-text">
                    <i className="fas fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="form-group mb-4">
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <i className="fas fa-spinner fa-spin me-2"></i>
                    ) : (
                      <i className="fas fa-sign-in-alt me-2"></i>
                    )}
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </div>

                <div className="text-center">
                  <span>Not registered yet?</span>
                  <a href="/register" className="register-link">
                    Create an account
                  </a>
                </div>
                <div className="mt-3">
                  <a href="/forgot-password" className="forgot-password-link">
                    Forgot password?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default LoginPage