import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import "../styles/UpdateProfilePage.scss"
import { Link, useParams } from 'react-router-dom';
import { API_URL } from '../utils/constants';

interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
}

const ProfileEditPage = () => {
  const [user, setUser] = useState<UserProfile|null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

const [formData, setFormData] = useState<UserProfile>({
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  dateOfBirth: "",
});
const [error, setError] = useState<string | null>(null);
const [success, setSuccess] = useState<string | null>(null);
const [submitting, setSubmitting] = useState<boolean>(false);

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

const { id } = useParams();

useEffect(() => {
  fetch(API_URL + "/users/" + id)
    .then((response) => response.json())
    .then((data) => {
      setUser(data);
      setFormData(data);
    })
    .catch(() => setErrorMessage("User not found"))
    .finally(() => setLoading(false));
}, []);

const handleSubmit = (e: FormEvent) => {
  e.preventDefault();

  // Reset messages
  setError(null);
  setSuccess(null);

  
  if (submitting) return;
  setErrorMessage("");

  // Basic validation
  if (!formData.firstName || !formData.lastName || !formData.phoneNumber) {
    setError("All fields except email must be filled.");
    return;
  }

  
  if (user) {
    setSubmitting(true);
    fetch(API_URL + `/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSuccess("Your profile has been updated successfully!");
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Failed to update profile");
      })
      .finally(() => setSubmitting(false));
  }
  // Simulate profile update API call
  // console.log("Profile updated:", formData);
  // setSuccess("Your profile has been updated successfully!");
};
  return (
    <div className='update-profile-page'>
      <div className="container">
      <div className="row col-md-8 offset-md-2">
        <div className="card">
          <div className="card-header text-center">
            <h2>
              <i className="fas fa-user-cog"></i> Edit Profile
            </h2>
          </div>
          {/* Feedback Messages */}
          {error && <div className="alert alert-danger"><i className="fas fa-exclamation-circle"></i> {error}</div>}
          {errorMessage && <div className="alert alert-danger"><i className="fas fa-exclamation-circle"></i> {errorMessage}</div>}
          {success && <div className="alert alert-success"><i className="fas fa-check-circle"></i> {success}</div>}
          
       {user == null ? <div>
        <div className="d-flex justify-content-center my-5">
        {loading ?  <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div> :  <div className="alert alert-danger">User not found</div>}
        </div>
       </div>:   <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* First Name */}
              <div className="form-group mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Last Name */}
              <div className="form-group mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  readOnly
                />
              </div>

              {/* Phone Number */}
              <div className="form-group mb-3">
                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Date of Birth */}
              <div className="form-group mb-3">
                <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>

              {/* Buttons */}
              <div className="form-group">
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  <i className="fas fa-save"></i>
                  {submitting ? "Updating..." : "Update Profile"}
                </button>
                <Link to="/users"
                  type="button"
                  className="btn btn-secondary ms-2"
                >
                  <i className="fas fa-times"></i> Cancel
                </Link>
              </div>
            </form>
          </div>}
        </div>
      </div>
    </div>
    </div>
  )
}

export default ProfileEditPage