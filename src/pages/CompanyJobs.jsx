import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";

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
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const updatedJobs = jobs.filter((job) => job.id !== id);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    window.location.reload();
  };
  return (
    <div>
      <h2>My Company Jobs</h2>

      <div>
        {JSON.parse(localStorage.getItem("jobs"))?.map((job) => (
          <div
            key={job.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              margin: "10px 0",
              borderRadius: "8px",
            }}
          >
            <h3>{job.title}</h3>
            <p>
              <strong>Company:</strong> {job.company}
            </p>
            <p>{job.description}</p>
            <button
              onClick={() => handleEditClick(job)}
              style={{ marginRight: "10px" }}
            >
              Edit
            </button>
            <button
              onClick={() => DeleteJob(job.id)}
              style={{
                backgroundColor: "#ff4d4d",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              Delete a job
            </button>
          </div>
        )) || <p>No jobs posted by your company yet.</p>}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Job Posting"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
          <button
            onClick={handleSaveEdit}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Save Changes
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CompanyJobs;
