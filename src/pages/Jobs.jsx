import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const [jobList, setJobList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobList(savedJobs);
  }, []);

  const deleteJob = (id) => {
    const updatedJobs = jobList.filter((job) => job.id !== id);

    setJobList(updatedJobs);

    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  const favoriteJob = (id) => {
    const Favorites = jobList.find((job) => job.id === id);

    const favoriteJobs = JSON.parse(localStorage.getItem("favoriteJobs")) || [];
    if (!favoriteJobs.find(fav => fav.id === id)) {
        favoriteJobs.push(Favorites);
        localStorage.setItem("favoriteJobs", JSON.stringify(favoriteJobs));
    }
    navigate("/favorites");
  };

  const filteredJobs = jobList.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Available Jobs</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by job title or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      {filteredJobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        filteredJobs.map((job) => (
          <div
            key={job.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              margin: "10px 0",
              borderRadius: "8px",
            }}
          >
            <Link to={`/jobs/${job.id}`}>
              <h3 style={{ color: "blue", textDecoration: "underline" }}>
                {job.title}
              </h3>
            </Link>
            <p>
              <strong>Company:</strong> {job.company}
            </p>
            <p>{job.description}</p>

            <button
              onClick={() => deleteJob(job.id)}
              style={{
                backgroundColor: "#ff4d4d",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              Delete Job
            </button>
            <button
              onClick={() => favoriteJob(job.id)}
              style={{
                backgroundColor: "#eb57bf",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
                borderRadius: "4px",
                marginLeft: "10px",
              }}
            >
              Favorites
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Jobs;
