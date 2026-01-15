import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PostJob.css"; // Import the CSS file

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!title || !company)
      return alert("Please fill in the title and company");

    const newJob = {
      id: Date.now(),
      title,
      company,
      description,
    };

    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    jobs.push(newJob);
    localStorage.setItem("jobs", JSON.stringify(jobs));

    navigate("/jobs");
  };

  return (
    <div className="post-job-wrapper">
      <div className="post-job-card">
        <h2>Post a Job</h2>

        <input
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
        />

        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          type="text"
        />

        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={handleSubmit}>Publish Job</button>
      </div>
    </div>
  );
};

export default PostJob;
