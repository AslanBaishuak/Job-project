import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../services/jobsService";
import "./JobDetails.css"; 

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobData = await getJobById(id);
        setJob(jobData);
      } catch (error) {
        console.error("Failed to fetch job details:", error);
      }
    };
    fetchJob();
  }, [id]);

  if (!job) return <div className="loading-container">Loading job details...</div>;

  return (
    <div className="job-details-container">
      <button className="back-button" onClick={() => navigate("/jobs")}>
        ← Back to Search
      </button>
      
      <div className="job-detail-card">
        <header className="detail-header">
          <div className="header-top">
            <span className="job-badge">{job.jobType}</span>
            {job.salary && <span className="salary-badge">{job.salary}</span>}
          </div>
          <h1 className="job-title">{job.title}</h1>
          <h3 className="company-name">{job.company}</h3>
          <p className="location-info">📍 {job.location}</p>
        </header>
        
        <div className="detail-body">
          <section className="description-section">
            <h4>About the Role</h4>
            <p className="description-text">{job.description}</p>
          </section>
          
          <div className="apply-section">
            <button className="btn-apply-now" onClick={() => alert("Application process started!")}>
              Apply for this Position
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;