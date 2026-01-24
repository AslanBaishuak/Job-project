import { Link, useNavigate } from "react-router-dom";
import "../App.css"; 

export default function Navbar() {
  const authorized = !!localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  const isSeeker = authorized && userRole === "seeker";
  const isEmployer = authorized && userRole === "employer";

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userGmail");
    window.location.replace("/login");
  };

  return (
    <nav className="navbar">
      {/* Left side: Brand Logo */}
      <Link to="/" className="nav-brand">
        JobPortal
      </Link>

      {/* Right side: Navigation Links & Buttons */}
      <div className="nav-links">
        {isSeeker && (
          <>
            <Link to="/jobs" className="nav-item">Find Jobs</Link>
            <Link to="/favorites" className="nav-item">Favorites</Link>
          </>
        )}

        {isEmployer && (
          <>
            <Link to="/post-job" className="nav-item">Post a Job</Link>
            <Link to="/company-jobs" className="nav-item">My Jobs</Link>
            <Link to="/employer-applications" className="nav-item">Applications</Link>
          </>
        )}

        {!authorized ? (
          <>
            <Link to="/login" className="nav-btn login">Login</Link>
            <Link to="/register" className="nav-btn register">Register</Link>
          </>
        ) : (
          <button onClick={logOut} className="nav-btn logout">
            Log out
          </button>
        )}
      </div>
    </nav>
  );
}