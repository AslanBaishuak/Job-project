import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
  
    const foundJob = savedJobs.find((j) => String(j.id) === String(id));
    
    setJob(foundJob);
  }, [id]);

  if (!job) return <p>Job not found!</p>;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate("/jobs")}>← Back to Jobs</button>
      <hr />
      <h1>{job.title}</h1>
      <h3>Company: {job.company}</h3>
      <div style={{ marginTop: "20px", border: "1px solid #eee", padding: "15px" }}>
        <h4>Job Description</h4>
        <p>{job.description}</p>
      </div>
    </div>  
  );
};

export default JobDetails;