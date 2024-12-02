import React, { useState } from 'react';
import "../styles/ForgotPasswordPage.scss";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    //
  };
  return (
    <div className='forgot-password-page'>
       <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          {/* Error and Success Alerts */}
          {/* {messageError && (
            <div className="alert alert-danger">{messageError}</div>
          )}
          {messageSuccess && (
            <div className="alert alert-success">{messageSuccess}</div>
          )} */}

          {/* Login Form Card */}
          <div className="card">
            <div className="card-header d-flex align-items-center">
              <img
                src="https://www.shutterstock.com/image-vector/vector-car-parts-tire-isolated-600nw-1962329059.jpg"
                width="40"
                height="40"
                alt="Car Parts"
                className="me-2"
              />
              Forgot Password?
            </div>
            <div className="card-body">
              <form onSubmit={handleFormSubmit}>
                {/* Email Field */}
                <div className="form-group mb-4">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="form-group mb-4">
                  <button type="submit" className="btn btn-primary">
                    Submit
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

export default ForgotPasswordPage