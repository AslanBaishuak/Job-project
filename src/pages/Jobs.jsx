import React, { useEffect, useState, useMemo } from "react";
import { Link, Navigate } from "react-router-dom";
import { getJobs } from "../services/jobsService"; 
import { addFavorite } from "../services/favoritesService";
import "./Jobs.css";

const Jobs = () => {
  const [jobList, setJobList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterLocation, setFilterLocation] = useState("");
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
      alert("Failed to add job to favorites.");
    }
  };


  const filteredJobs = useMemo(() => {
    return jobList.filter((job) => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filterType === "All" || job.jobType === filterType;
      
      const matchesLocation = job.location.toLowerCase().includes(filterLocation.toLowerCase());

      return matchesSearch && matchesType && matchesLocation;
    });
  }, [searchTerm, filterType, filterLocation, jobList]);

  if (isLoading) return <div className="loader">Loading jobs...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="jobs-container">
      <h1>Available Jobs</h1>

      <div className="filter-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search title or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <input
          className="search-input"
          type="text"
          placeholder="Filter by location..."
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
        />

        <select 
          className="filter-select"
          value={filterType} 
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
      </div>

      <div className="results-count">
        Showing {filteredJobs.length} jobs
      </div>

      {filteredJobs.length === 0 ? (
        <p className="no-jobs">No jobs match your criteria.</p>
      ) : (
        <div className="job-grid">
          {filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-card-header">
                <span className="job-tag">{job.jobType}</span>
                {job.salary && <span className="salary-tag">{job.salary}</span>}
              </div>

              <Link to={`/jobs/${job.id}`} className="job-link">
                <h3>{job.title}</h3>
              </Link>

              <p className="company-name"><strong>{job.company}</strong></p>
              <p className="location-text">📍 {job.location}</p>
              
              <p className="description-preview">
                {job.description?.substring(0, 100)}...
              </p>

              <div className="button-group">
                <button className="btn-favorite" onClick={() => favoriteJob(job)}>
                  Add to Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;