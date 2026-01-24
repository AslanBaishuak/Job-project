import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../services/jobsService";
import { applyToJob , getApplications} from "../services/appliedJobs";
import "./JobDetails.css";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [isApplying, setIsApplying] = useState(false);

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

  const handleApply = async () => {
    const currentUserGmail = localStorage.getItem("userGmail");

    if (!currentUserGmail) {
        alert("Please log in to apply");
        return;
    }

    setIsApplying(true);

    const applicationData = {
      userGmail: currentUserGmail,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      location: job.location, 
      status: "pending",
      appliedAt: new Date().toISOString(),
    };

    try {
      const res = await getApplications();
      const data = res.filter((job) => job.jobId === applicationData.jobId && job.userGmail === applicationData.userGmail);
      console.log(data);
      if (data.length !== 0 ) {
        alert("you already applied");
        return;
      }
      await applyToJob(applicationData);
      alert("Success! Your application has been recorded.");
    } catch (error) {
      console.error(error);
      alert("Submission failed.");
    } finally {
      setIsApplying(false);
    }
  };

  if (!job)
    return <div className="loading-container">Loading job details...</div>;

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
            <button
              className="btn-apply-now"
              onClick={handleApply}
              disabled={isApplying}
            >
              {isApplying ? "Submitting..." : "Apply for this Position"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
