import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <Link to="/">Home</Link>
      <Link to="/jobs">All Jobs</Link>
      <Link to="/post-job">Post a Job</Link>
      <Link to="/favorites">Favorites</Link>
      <Link to="/company-jobs">Company Jobs</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      
    </nav>
  );
}