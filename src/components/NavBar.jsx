import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

  const authorized = !!localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); 
  
  const isSeeker = authorized && userRole === "seeker";
  const isEmployer = authorized && userRole === "employer";

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.replace("/login");
  };

  return (
    <nav style={{ 
      display: "flex", 
      gap: "15px", 
      marginBottom: "20px", 
      padding: "10px", 
      borderBottom: "1px solid #ddd",
      alignItems: "center"
    }}>
      <Link to="/">Home</Link>

      {isSeeker && (
        <>
        <Link to="/jobs">All Jobs</Link>
         <Link to="/favorites">Favorites</Link>
        </>
          )
      }
      {isEmployer && (
        <>
          <Link to="/post-job">Post a Job</Link>
          <Link to="/company-jobs">My Company Jobs</Link>
        </>
      )}
      {!authorized ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <button 
          onClick={logOut} 
          style={{ 
            background: "none", 
            border: "none", 
            color: "blue", 
            cursor: "pointer", 
            textDecoration: "underline",
            fontSize: "inherit",
            padding: 0
          }}
        >
          Log out
        </button>
      )}
    </nav>
  );
}