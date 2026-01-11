import React from "react";
import { Link } from "react-router-dom";

const Jobs = () => {
  return (
    <div>
      <h2>Jobs</h2>

      <input placeholder="Search job..." />

      <div>
        <h3>Frontend Developer</h3>
        <p>Google</p>
        <Link to="/jobs/1">View</Link>
      </div>
    </div>
  );
}

export default Jobs;