import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand" onClick={closeMenu}>
        JobPortal
      </Link>

      <div
        className={`menu-icon ${isMenuOpen ? "open" : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        {isSeeker && (
          <>
            <Link to="/jobs" className="nav-item" onClick={closeMenu}>
              Find Jobs
            </Link>
            <Link to="/favorites" className="nav-item" onClick={closeMenu}>
              Favorites
            </Link>
          </>
        )}

        {isEmployer && (
          <>
            <Link to="/post-job" className="nav-item" onClick={closeMenu}>
              Post a Job
            </Link>
            <Link to="/company-jobs" className="nav-item" onClick={closeMenu}>
              My Jobs
            </Link>
            <Link
              to="/employer-applications"
              className="nav-item"
              onClick={closeMenu}
            >
              Applications
            </Link>
          </>
        )}

        {!authorized ? (
          <>
            <Link to="/login" className="nav-btn login" onClick={closeMenu}>
              Login
            </Link>
            <Link
              to="/register"
              className="nav-btn register"
              onClick={closeMenu}
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={() => {
              logOut();
              closeMenu();
            }}
            className="nav-btn logout"
          >
            Log out
          </button>
        )}
      </div>
    </nav>
  );
}
