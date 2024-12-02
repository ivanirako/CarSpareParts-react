import React, { useState } from 'react'
import useAuthRedirect from '../utils/useAuthRedirect';
import "../styles/DashboardPage.scss";
import { API_URL, logout } from '../utils/constants';

const DashboardPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileUpload = (event: any) => {
    event.preventDefault();
    if (selectedFile) {
                      if (uploading) return;

                      const formData: any = new FormData();
                      const profilePicture = event.target.profilePicture.files[0];
                      if (!profilePicture) return;
                      formData.append("profilePicture", profilePicture);
                      formData.append("userId", user!.id);

                      setUploading(true);

                      fetch(API_URL + "/uploadProfilePicture", {
                        method: "POST",
                        body: formData,
                      })
                        .then((res) => res.json())
                        .then((data) => {
                          if (data.success) {
                            // Get user from localStorage and update profilePic
                            const localUSer = localStorage.getItem("user");
                            if (!localUSer) {
                              window.location.reload();
                              return;
                            }

                            const user = JSON.parse(localUSer);
                            user.profilePicture = data.profilePicture;
                            localStorage.setItem("user", JSON.stringify(user));

                            //
                            alert("Profile picture uploaded successfully");
                            window.location.reload();
                          } else {
                            alert("Failed to upload profile picture");
                          }
                        })
                        .catch((err) => {
                          console.error(err);
                          alert("Failed to upload profile picture");
                        })
                        .finally(() => {
                          setUploading(false);
                        });
    }
  };
  const { user } = useAuthRedirect(true);

  const [uploading, setUploading] = useState(false);

  if (!user) return null;
  return (
    <div className='dashboard-page'>
    <div className="dashboard-container">
    {/* Sidebar */}
    <div className="sidebar">
      <div className="brand">
        <i className="fas fa-cogs"></i>
        <h1 className="brand-name">Car Parts</h1>
      </div>

      <ul className="menu-list">
        <li className="menu-item active">
          <a href="/" className="text-white text-decoration-none d-flex align-items-center gap-3">
            <i className="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </a>
        </li>
        {user.roles[0].name === "ROLE_ADMIN" && (
          <li className="menu-item">
            <a href="/users" className="text-white text-decoration-none d-flex align-items-center gap-3">
              <i className="fas fa-users-cog"></i>
              <span>Manage Users</span>
            </a>
          </li>
        )}
        <li className="menu-item">
          <a href="/inventory" className="text-white text-decoration-none d-flex align-items-center gap-3">
            <i className="fas fa-box-open"></i>
            <span>Inventory</span>
          </a>
        </li>
        <li className="menu-item">
          <a href="/orders" className="text-white text-decoration-none d-flex align-items-center gap-3">
            <i className="fas fa-shopping-cart"></i>
            <span>Orders</span>
          </a>
        </li>
        <li className="menu-item">
          <a href="/analytics" className="text-white text-decoration-none d-flex align-items-center gap-3">
            <i className="fas fa-chart-line"></i>
            <span>Analytics</span>
          </a>
        </li>
        <li className="menu-item">
          <a href="#" className="text-white text-decoration-none d-flex align-items-center gap-3" onClick={logout}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </a>
        </li>
      </ul>

      <div className="language-selector mt-auto">
        <button className="language-btn" id="languageDropdown">
          <i className="fas fa-globe"></i>
          <span>English</span> {/* Adjust dynamically based on language */}
        </button>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="?lang=en">
              English
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="?lang=rw">
              Kinyarwanda
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="?lang=fr">
              Français
            </a>
          </li>
        </ul>
      </div>
    </div>

    {/* Main Content */}
    <div className="main-content">
      <div className="top-bar">
        <h2 className="user-welcome">Welcome to Your Dashboard</h2>
        <div className="user-actions">
          <span className="me-3">
            {user.firstName} {user.lastName}
          </span>
          <a href="/logout" className="btn btn-outline-danger" onClick={logout}>
            <i className="fas fa-sign-out-alt"></i>
          </a>
        </div>
      </div>

      <div className="user-card">
        <div className="profile-section">
          <div className="profile-image">
            {user.profilePicture && (
              <a href={API_URL+`/download-profile?fileName=${user.profilePicture.replace(/\\/g, '/')}`}>
                <img
                  src={API_URL+`/download-profile?fileName=${user.profilePicture.replace(/\\/g, '/')}`}
                  alt="Profile"
                />
              </a>
            )}
          </div>

          <div className="profile-details">
            <div className="info-item">
              <i className="fas fa-id-card"></i>
              <span>
                {user.firstName} {user.lastName}
              </span>
            </div>
            <div className="info-item">
              <i className="fas fa-envelope"></i>
              <span>{user.email}</span>
            </div>
            <div className="info-item">
              <i className="fas fa-user-tag"></i>
              <span>{user.roles[0].name}</span>
            </div>

            <div className="upload-section">
              <h5>Update Profile Picture</h5>
              <form
                onSubmit={handleFileUpload}
                method="post"
                encType="multipart/form-data"
                className="mt-3"
              >
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="file"
                    id="profilePicture"
                    name="profilePicture"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                {uploading ? "Uploading..." : "Upload"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* {messageSuccess && (
          <div className="alert alert-success">
            <p className="mb-0">{messageSuccess}</p>
          </div>
        )}
        {messageError && (
          <div className="alert alert-danger">
            <p className="mb-0">{messageError}</p>
          </div>
        )} */}
      </div>
    </div>
  </div>
  </div>

  )
}

export default DashboardPage