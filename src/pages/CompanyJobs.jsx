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
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async () => {
    // 1. Create the updated list
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
    }
  };

  const handleDeleteJob = async (id) => {
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
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p>{job.description}</p>

              <div className="company-button-group">
                <button
                  className="btn-edit"
                  onClick={() => handleEditClick(job)}
                >
                  Edit Job
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteJob(job.id)}
                >
                  Delete Job
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
              onChange={(e) =>
                setEditingJob({ ...editingJob, title: e.target.value })
              }
              placeholder="e.g. Senior Frontend Developer"
            />
          </div>

          <div className="form-group">
            <label>Company Name</label>
            <input
              value={editingJob.company}
              onChange={(e) =>
                setEditingJob({ ...editingJob, company: e.target.value })
              }
              placeholder="Company Name"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={editingJob.description}
              onChange={(e) =>
                setEditingJob({ ...editingJob, description: e.target.value })
              }
              placeholder="Job description..."
              rows="6"
            />
          </div>

          <div className="modal-actions">
            <button className="btn-save" onClick={handleSaveEdit}>
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CompanyJobs;