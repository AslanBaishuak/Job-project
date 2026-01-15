import React, { useState, useEffect } from "react";
import "./Favorites.css"; 

const Favorites = () => {
  const [favoriteJobs, setFavoriteJobs] = useState([]);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("favoriteJobs")) || [];
    setFavoriteJobs(savedJobs);
  }, []);

  const deleteFavorite = (id) => {
    const updatedFavorites = favoriteJobs.filter((job) => job.id !== id);
    
    setFavoriteJobs(updatedFavorites);
  
    localStorage.setItem("favoriteJobs", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites-container">
      <h2 className="favorites-title">Favorite Jobs</h2>

      <div className="jobs-list">
        {favoriteJobs.length === 0 ? (
          <p className="no-favorites">No favorite jobs added yet.</p>
        ) : (
          favoriteJobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p className="company-name">
                Company: {job.company}
              </p>
              <p className="job-description">{job.description}</p>
              <button
                className="delete-btn"
                onClick={() => deleteFavorite(job.id)}
              >
                Remove from Favorites
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;
