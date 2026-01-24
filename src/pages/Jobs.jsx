import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { getJobs } from "../services/jobsService";
import { getApplications } from "../services/appliedJobs";
import { addFavorite } from "../services/favoritesService";
import "./Jobs.css";

const Jobs = () => {
  const [jobList, setJobList] = useState([]);
  const [userApplications, setUserApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterLocation, setFilterLocation] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [jobsData, appsData] = await Promise.all([
          getJobs(),
          getApplications(),
        ]);

        setJobList(jobsData);
        setUserApplications(appsData);
      } catch (err) {
        setError("Could not load jobs or application data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
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
      const matchesLocation = job.location
        .toLowerCase()
        .includes(filterLocation.toLowerCase());

      return matchesSearch && matchesType && matchesLocation;
    });
  }, [searchTerm, filterType, filterLocation, jobList]);

  const getApplicationStatus = (jobId) => {
    const application = userApplications.find((app) => app.jobId === jobId);
    return application ? application.status || "Pending" : null;
  };

  if (isLoading) return <div className="loader">Loading jobs...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="jobs-container">
      <h1>Available Jobs</h1>

      {/* Filter inputs */}
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

      <div className="results-count">Showing {filteredJobs.length} jobs</div>

      {filteredJobs.length === 0 ? (
        <p className="no-jobs">No jobs match your criteria.</p>
      ) : (
        <div className="job-grid">
          {filteredJobs.map((job) => {
            const appStatus = getApplicationStatus(job.id);

            // Determine CSS class based on status
            let statusClass = "status-pending";
            if (appStatus === "Accepted") statusClass = "status-accepted";
            if (appStatus === "Rejected") statusClass = "status-rejected";

            return (
              <div key={job.id} className="job-card">
                <div className="job-card-header">
                  <span className="job-tag">{job.jobType}</span>
                  {job.salary && (
                    <span className="salary-tag">{job.salary}</span>
                  )}
                </div>

                <Link to={`/jobs/${job.id}`} className="job-link">
                  <h3>{job.title}</h3>
                </Link>

                <p className="company-name">
                  <strong>{job.company}</strong>
                </p>
                <p className="location-text">📍 {job.location}</p>

                <p className="description-preview">
                  {job.description?.substring(0, 100)}...
                </p>

                {/* Status Badge using clean CSS classes */}
                {appStatus && (
                  <div
                    className="status-badge"
                    style={{
                      /* ... keep your existing styles ... */
                      backgroundColor:
                        appStatus === "Accepted"
                          ? "#d1fae5"
                          : appStatus === "Rejected"
                            ? "#fee2e2"
                            : "#fef3c7",
                      color:
                        appStatus === "Accepted"
                          ? "#065f46"
                          : appStatus === "Rejected"
                            ? "#991b1b"
                            : "#92400e",
                      borderColor:
                        appStatus === "Accepted"
                          ? "#34d399"
                          : appStatus === "Rejected"
                            ? "#f87171"
                            : "#fbbf24",
                    }}
                  >
                    {appStatus === "Accepted" && "🎉 Accepted"}
                    {appStatus === "Rejected" && "❌ Rejected"}
                    {/* Fix: Display the actual status text if it's not Accepted/Rejected/Pending */}
                    {appStatus !== "Accepted" &&
                      appStatus !== "Rejected" &&
                      `⏳ ${appStatus === "Pending" ? "Application Sent" : appStatus}`}
                  </div>
                )}

                <div className="button-group">
                  <button
                    className="btn-favorite"
                    onClick={() => favoriteJob(job)}
                  >
                    <span>♥</span> Add to Favorites
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Jobs;
