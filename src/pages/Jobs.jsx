import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Jobs.css";

const Jobs = () => {
  const [jobList, setJobList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobList(savedJobs);
  }, []);


  const favoriteJob = (id) => {
    const Favorite = jobList.find((job) => job.id === id);
    const favoriteJobs = JSON.parse(localStorage.getItem("favoriteJobs")) || [];

    if (!favoriteJobs.find((fav) => fav.id === id)) {
      favoriteJobs.push(Favorite);
      localStorage.setItem("favoriteJobs", JSON.stringify(favoriteJobs));
    }
    navigate("/favorites");
  };

  const filteredJobs = jobList.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="jobs-container">
      <h1>Available Jobs</h1>

      <div className="search-section">
        <input
          className="search-input"
          type="text"
          placeholder="Search by job title or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredJobs.length === 0 ? (
        <p className="no-jobs">No jobs posted yet.</p>
      ) : (
        filteredJobs.map((job) => (
          <div key={job.id} className="job-card">
            <Link to={`/jobs/${job.id}`} className="job-link">
              <h3>{job.title}</h3>
            </Link>

            <p>
              <strong>Company:</strong> {job.company}
            </p>
            <p>{job.description}</p>

            <div className="button-group">
              <button
                className="btn-favorite"
                onClick={() => favoriteJob(job.id)}
              >
                Add to Favorites
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Jobs;
