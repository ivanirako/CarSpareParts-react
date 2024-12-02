import React, { useState } from "react";
import "../styles/RegisterPage.scss";
import { API_URL } from "../utils/constants";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: string;
}

const RegisterPage = () => {
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
  });

  const [errors, setErrors] = useState<Partial<User>>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const validateForm = () => {
    const newErrors: Partial<User> = {};
    if (!user.firstName) newErrors.firstName = "First name is required.";
    if (!user.lastName) newErrors.lastName = "Last name is required.";
    if (!user.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(user.email))
      newErrors.email = "Enter a valid email.";
    if (!user.password) newErrors.password = "Password is required.";
    else if (user.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (!user.phoneNumber) newErrors.phoneNumber = "Phone number is required.";
    else if (!/^\d+$/.test(user.phoneNumber))
      newErrors.phoneNumber = "Enter a valid phone number.";
    if (!user.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

      fetch(API_URL + "/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          window.scrollTo({top:0,behavior:"smooth"});
          if (data.success) {
            setSuccessMessage("You have successfully registered!");
            setUser({
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              phoneNumber: "",
              dateOfBirth: "",
            });
          } else {
            setErrorMessage(data.message);
          }
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage("Failed to register");
        })
        .finally(() => setIsLoading(false));
      
    }
  };
  return (
    <div className='register-page'>
      <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="https://www.shutterstock.com/image-vector/vector-car-parts-tire-isolated-600nw-1962329059.jpg"
              width="40"
              height="40"
              alt=" "
            />
            &nbsp;AutoParts Hub
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <br />
      <br />
      <br />

      <div className="row col-md-8 offset-md-2">
        <div className="card">
          <div className="card-header">
            <h2 className="text-center">Registration</h2>
          </div>
          {successMessage && (
            <div className="alert alert-info">{successMessage}</div>
          )}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* First Name */}
              <div className="form-group mb-3">
                <label className="form-label">First Name</label>
                <input
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter first name"
                  value={user.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <p className="text-danger">{errors.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div className="form-group mb-3">
                <label className="form-label">Last Name</label>
                <input
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter last name"
                  value={user.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <p className="text-danger">{errors.lastName}</p>
                )}
              </div>

              {/* Email */}
              <div className="form-group mb-3">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter email address"
                  value={user.email}
                  onChange={handleChange}
                  type="email"
                />
                {errors.email && <p className="text-danger">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="form-group mb-3">
                <label className="form-label">Password</label>
                <input
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  value={user.password}
                  onChange={handleChange}
                  type="password"
                />
                {errors.password && (
                  <p className="text-danger">{errors.password}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="form-group mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  className="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter phone number"
                  value={user.phoneNumber}
                  onChange={handleChange}
                />
                {errors.phoneNumber && (
                  <p className="text-danger">{errors.phoneNumber}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div className="form-group mb-3">
                <label className="form-label">Date of Birth</label>
                <input
                  className="form-control"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  placeholder="Enter date of birth"
                  value={user.dateOfBirth}
                  onChange={handleChange}
                  type="date"
                />
                {errors.dateOfBirth && (
                  <p className="text-danger">{errors.dateOfBirth}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="form-group">
                <button className="btn btn-primary" type="submit" disabled={isLoading}>
                  {isLoading ? (
                      <i className="fas fa-spinner fa-spin me-2"></i>
                    ) : (
                      <i className="fas fa-sign-up-alt me-2"></i>
                    )}
                    {isLoading ? "Registering..." : "Register"}
                </button>
                <span>
                  {" "}
                  Already registered? <a href="/login">Login here</a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default RegisterPage