import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { getJobs } from "../services/jobsService"; 
import { addFavorite } from "../services/favoritesService";
import "./Jobs.css";

const Jobs = () => {
  const [jobList, setJobList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const jobs = await getJobs();
        setJobList(jobs);
      } catch (err) {
        setError("Could not load jobs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const favoriteJob = async (job) => {
    try {
      await addFavorite(job);
      alert("Job added to favorites!");
    } catch (err) {
      alert("Failed to add job to favorites. Please try again.");
    }
  };

  const filteredJobs = useMemo(() => {
    return jobList.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, jobList]);

  if (isLoading) return <div className="loader">Loading jobs...</div>;
  if (error) return <div className="error-message">{error}</div>;

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
        <p className="no-jobs">No jobs found matching your search.</p>
      ) : (
        filteredJobs.map((job) => (
          <div key={job.id} className="job-card">
            <Link to={`/jobs/${job.id}`} className="job-link">
              <h3>{job.title}</h3>
            </Link>

            <p><strong>Company:</strong> {job.company}</p>
            <p>{job.description}</p>

            <div className="button-group">
              <button
                className="btn-favorite"
                onClick={() => favoriteJob(job)}
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