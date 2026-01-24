import React, { useState, useEffect } from "react";
import { getFavorite, removeFavorite } from "../services/favoritesService";
import "./Favorites.css";

const Favorites = () => {
  const [favoriteJobs, setFavoriteJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setIsLoading(true);
        const favorites = await getFavorite();
        setFavoriteJobs(favorites);
      } catch (err) {
        setError("Failed to load your favorite jobs.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const deleteFavorite = async (jobId) => {
    try {
      await removeFavorite(jobId); 
      setFavoriteJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    } catch (err) {
      alert("Could not remove the job. Please try again.");
    }
  };

  if (isLoading) return <div className="loader">Loading your favorites...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="favorites-container">
      <h2 className="favorites-title">Your Saved Jobs</h2>

      <div className="fav-jobs-grid">
        {favoriteJobs.length === 0 ? (
          <div className="empty-favorites">
            <p>You haven't saved any jobs yet.</p>
          </div>
        ) : (
          favoriteJobs.map((job) => (
            <div key={job.id} className="fav-job-card">
              <div className="fav-card-header">
                <span className="fav-type-tag">{job.jobType}</span>
                <button 
                  className="btn-remove-fav"
                  onClick={() => deleteFavorite(job.id)}
                  title="Remove from favorites"
                >
                  ✕
                </button>
              </div>

              <h3>{job.title}</h3>
              <p className="fav-company"><strong>{job.company}</strong></p>
              <p className="fav-location">📍 {job.location}</p>
              
              <div className="fav-footer">
                <span className="fav-salary">{job.salary}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;