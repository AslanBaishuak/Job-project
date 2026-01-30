import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../services/jobsService";
import { applyToJob, getApplications } from "../services/appliedJobs";
import Modal from "../components/Modal";
import "./JobDetails.css";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [cvText, setCvText] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

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

  const handleApplyClick = async () => {
    const currentUserGmail = localStorage.getItem("userGmail");
    if (!currentUserGmail) {
      alert("Please log in to apply");
      return;
    }

    try {
      const res = await getApplications();
      const alreadyApplied = res.find(
        (app) => app.jobId === job.id && app.userGmail === currentUserGmail
      );

      if (alreadyApplied) {
        alert("You have already applied for this job.");
        return;
      }

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error checking applications", error);
    }
  };

  const submitApplication = async () => {
    if (!cvText.trim() || !fullName.trim() || !phone.trim()) {
      alert("Please fill in all fields (Name, Phone, and CV) before submitting.");
      return;
    }

    setIsApplying(true);
    const currentUserGmail = localStorage.getItem("userGmail");

    const applicationData = {
      userGmail: currentUserGmail,
      fullName: fullName,
      phone: phone,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      location: job.location,
      status: "pending",
      appliedAt: new Date().toISOString(),
      cv: cvText,
    };

    try {
      await applyToJob(applicationData);
      alert("Success! Your application has been recorded.");
      setIsModalOpen(false);
      setCvText("");
      setFullName("");
      setPhone("");
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
              onClick={handleApplyClick}
              disabled={isApplying}
            >
              {isApplying ? "Submitting..." : "Apply for this Position"}
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Apply for ${job.title}`}
      >
        <div className="modal-form">
          <p className="modal-description">
            Please provide your details below to complete your application.
          </p>

          <input
            type="text"
            className="form-input"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="tel"
            className="form-input"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <textarea
            className="form-textarea"
            value={cvText}
            onChange={(e) => setCvText(e.target.value)}
            placeholder="Paste your CV or cover letter here..."
          />

          <div className="modal-actions">
            <button
              className="btn-modal btn-cancel"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="btn-modal btn-submit"
              onClick={submitApplication}
              disabled={isApplying}
            >
              {isApplying ? "Sending..." : "Submit Application"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default JobDetails;