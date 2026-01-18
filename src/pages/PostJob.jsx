import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../services/jobsService";
import "./PostJob.css"; 

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!title || !company) {
      return alert("Please fill in the title and company");
    }

    const newJob = {
      id: Date.now(),
      title,
      company,
      description,
    };

    try {
      setIsSubmitting(true);
      
      await createJob(newJob); 
      
      navigate("/jobs"); 
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
        <h2>Post a Job</h2>

        <input
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          required
        />

        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          type="text"
          required
        />

        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Publishing..." : "Publish Job"}
        </button>
      </form>
    </div>
  );
};

export default PostJob;