import React, { useState } from 'react'
import "../styles/ResetPasswordPage.scss"

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error and success states
    setError(null);
    setSuccess(null);

    // Validation
    if (!password || !confirmPassword) {
      setError("Both password fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Simulate API call to reset the password
    // console.log("Resetting password for email:", email);
    console.log("New password:", password);

    // Simulate success response
    setSuccess("Your password has been successfully reset!");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className='reset-password-page'>
      <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          {/* Error and Success Alerts */}
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          {/* Reset Password Card */}
          <div className="card">
            <div className="card-header">
              <img
                src="https://www.shutterstock.com/image-vector/vector-car-parts-tire-isolated-600nw-1962329059.jpg"
                width="40"
                height="40"
                alt="rpl"
              />
              Reset Your Password
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Password Field */}
                <div className="form-group mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
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

                {/* Confirm Password Field */}
                <div className="form-group mb-4">
                  <label htmlFor="confirmPassword" className="form-label">
                    Re-Enter Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Re-Enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="form-group mb-4">
                  <button type="submit" className="btn btn-primary">
                    Reset Password
                  </button>
                </div>
                <div className="mt-3">
                  <a href="/login">Login</a>
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

export default ResetPasswordPage