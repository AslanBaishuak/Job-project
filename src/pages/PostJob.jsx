import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../services/jobsService";
import "./PostJob.css"; 

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [salary, setSalary] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!title || !company || !location) {
      return alert("Please fill in the required fields (Title, Company, Location)");
    }

    const newJob = {
      id: Date.now(),
      title,
      company,
      description,
      location,
      jobType,
      salary,
      postedAt: new Date().toISOString(),
    };

    try {
      setIsSubmitting(true);
      await createJob(newJob); 
      navigate("/company-jobs"); 
    } catch (error) {
      console.error("Failed to create job:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="post-job-wrapper">
      <form className="post-job-card" onSubmit={handleSubmit}>
        <h2>Post a New Job</h2>

        <input
          placeholder="Job Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          required
        />

        <input
          placeholder="Company *"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          type="text"
          required
        />

        <input
          placeholder="Location (e.g. New York, Remote) *"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          required
        />

        <div className="form-row">
          <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Freelance">Freelance</option>
          </select>

          <input
            placeholder="Salary Range (optional)"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            type="text"
          />
        </div>

        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="5"
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Publishing..." : "Publish Job"}
        </button>
      </form>
    </div>
  );
};

export default PostJob;