import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById} from "../services/jobsService";
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

  if (!job) return <p className="error-message">Job not found!</p>;

  return (
    <div className="job-details-container">
      <button className="back-button" onClick={() => navigate("/jobs")}>
        ← Back to Jobs
      </button>
      
      <div className="job-card">
        <h1 className="job-title">{job.title}</h1>
        <h3 className="company-name">{job.company}</h3>
        
        <div className="description-section">
          <h4>Job Description</h4>
          <p className="description-text">{job.description}</p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;