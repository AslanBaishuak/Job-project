import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { getJobs, deleteJob, updateJob } from "../services/jobsService";
import "./CompanyJobs.css";

const CompanyJobs = () => {
  const [jobList, setJobList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingJob, setEditingJob] = useState({
    id: "",
    title: "",
    company: "",
    description: "",
    location: "",
    jobType: "Full-time",
    salary: "",
  });

  useEffect(() => {
    const fetchCompanyJobs = async () => {
      try {
        const jobs = await getJobs();
        setJobList(jobs);
      } catch (err) {
        console.error("Failed to fetch company jobs:", err);
      }
    };
    fetchCompanyJobs();
  }, []);

  const handleEditClick = (job) => {
    setEditingJob({ ...job });
    setIsModalOpen(true);
  };

  const handleSaveEdit = async () => {
    const updatedJobs = jobList.map((job) =>
      job.id === editingJob.id ? editingJob : job
    );

    try {
      await updateJob(editingJob); 
      setJobList(updatedJobs);
      localStorage.setItem("jobs", JSON.stringify(updatedJobs));
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to save job edits:", err);
      alert("Error saving changes.");
    }
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this posting?")) return;
    
    const updatedJobs = jobList.filter((job) => job.id !== id);
    try {
      await deleteJob(id);
      setJobList(updatedJobs);
      localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    } catch (err) {
      console.error("Failed to delete job:", err);
    }
  };

  return (
    <div className="company-jobs-container">
      <h2>My Company Jobs</h2>

      <div className="job-list">
        {jobList.length === 0 ? (
          <p className="no-jobs-text">No jobs posted yet.</p>
        ) : (
          jobList.map((job) => (
            <div key={job.id} className="company-job-card">
              <div className="card-header">
                <span className="job-tag">{job.jobType}</span>
                <span className="salary-text">{job.salary}</span>
              </div>
              
              <h3>{job.title}</h3>
              <p className="location-info">📍 {job.location || "No location set"}</p>
              <p className="description-snippet">{job.description}</p>

              <div className="company-button-group">
                <button className="btn-edit" onClick={() => handleEditClick(job)}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => handleDeleteJob(job.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Job Posting"
      >
        <div className="modal-form">
          <div className="form-group">
            <label>Job Title</label>
            <input
              value={editingJob.title}
              onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <input
                value={editingJob.location}
                onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Job Type</label>
              <select
                value={editingJob.jobType}
                onChange={(e) => setEditingJob({ ...editingJob, jobType: e.target.value })}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Salary Range</label>
            <input
              value={editingJob.salary}
              onChange={(e) => setEditingJob({ ...editingJob, salary: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={editingJob.description}
              onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })}
              rows="4"
            />
          </div>

          <div className="modal-actions">
            <button className="btn-save" onClick={handleSaveEdit}>
              Update Posting
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CompanyJobs;