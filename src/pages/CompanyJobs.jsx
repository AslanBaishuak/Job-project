import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
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
    const savedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobList(savedJobs);
  }, []);

  const handleEditClick = (job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const handleSaveEdit = () => {
    const updatedJobs = jobList.map((job) =>
      job.id === editingJob.id ? editingJob : job
    );

    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    setJobList(updatedJobs);
    setIsModalOpen(false);
  };

  const DeleteJob = (id) => {
    const updatedJobs = jobList.filter((job) => job.id !== id);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    setJobList(updatedJobs);
  };

  return (
    <div className="company-jobs-container">
      <h2>My Company Jobs</h2>

      <div>
        {jobList.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888" }}>
            No jobs posted yet.
          </p>
        ) : (
          jobList.map((job) => (
            <div key={job.id} className="company-job-card">
              <h3>{job.title}</h3>
              <p>
                <strong>Company:</strong> {job.company}
              </p>
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
                  onClick={() => DeleteJob(job.id)}
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
          <input
            value={editingJob.title}
            onChange={(e) =>
              setEditingJob({ ...editingJob, title: e.target.value })
            }
            placeholder="Title"
          />
          <input
            value={editingJob.company}
            onChange={(e) =>
              setEditingJob({ ...editingJob, company: e.target.value })
            }
            placeholder="Company"
          />
          <textarea
            value={editingJob.description}
            onChange={(e) =>
              setEditingJob({ ...editingJob, description: e.target.value })
            }
            placeholder="Description"
            rows="5"
          />
          <button className="btn-save" onClick={handleSaveEdit}>
            Save Changes
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CompanyJobs;
