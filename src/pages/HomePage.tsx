import React, { useState } from 'react'
import "../styles/HomePage.scss"

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    console.log("User is searching for:", event.target.value);
  };

  const handleSearchClick = () => {
    alert(`Searching for: ${searchTerm}`);
    // Add your search logic here
  };
  return (
    <div className='home-page'>
    <nav className="navbar navbar-expand-lg navbar-dark">
     <div className="container-fluid">
       <a className="navbar-brand" href="/">
         <i className="fas fa-cogs"></i> CAR SPARE PARTS
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
             <a className="nav-link" href="/register">
               <i className="fas fa-user-plus"></i> Register
             </a>
           </li>
           <li className="nav-item">
             <a className="nav-link" href="/login">
               <i className="fas fa-sign-in-alt"></i> Login
             </a>
           </li>
         </ul>
       </div>
       <ul className="navbar-nav">
         <li className="nav-item dropdown">
           <a
             className="nav-link dropdown-toggle"
             href="#"
             id="languageDropdown"
             role="button"
             data-bs-toggle="dropdown"
             aria-expanded="false"
           >
             English
           </a>
           <ul
             className="dropdown-menu dropdown-menu-end"
             aria-labelledby="languageDropdown"
           >
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
         </li>
       </ul>
     </div>
   </nav>
   <div className="container mt-5">
     <div className="row">
       <div className="col-md-8 offset-md-2 text-center">
         <div className="card p-4">
           <h1 className="mb-4">Welcome to Car Spare Parts</h1>
           <p className="lead">
             Find the best quality spare parts for your vehicle.
           </p>
           <div className="mt-5">
             <a href="/register" className="btn btn-primary btn-lg me-3">
               <i className="fas fa-user-plus"></i> Register
             </a>
             <a href="/login" className="btn btn-secondary btn-lg">
               <i className="fas fa-sign-in-alt"></i> Login
             </a>
           </div>
           <div className="mt-5">
             <div className="input-icon">
               <i className="fas fa-search"></i>
               <input
                 type="text"
                 id="search-input"
                 placeholder="Search Spare Parts"
                 value={searchTerm}
                 onChange={handleSearchInputChange}
                 className="form-control"
               />
             </div>
             <button
               className="btn btn-primary mt-2"
               id="search-button"
               onClick={handleSearchClick}
             >
               <i className="fas fa-search"></i> Search
             </button>
           </div>
         </div>
       </div>
     </div>
   </div>
   <footer>
     <p>© 2024 Car Spare Parts. All Rights Reserved.</p>
   </footer>
 </div>
  )
}

export default HomePage