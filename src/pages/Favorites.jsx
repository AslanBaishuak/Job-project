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
      
      alert("Removed from favorites");
    } catch (err) {
      alert("Could not remove the job. Please try again.");
    }
  };

  if (isLoading) return <div className="loader">Loading favorites...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="favorites-container">
      <h2 className="favorites-title">Your Favorite Jobs</h2>

      <div className="jobs-list">
        {favoriteJobs.length === 0 ? (
          <p className="no-favorites">You haven't saved any jobs yet.</p>
        ) : (
          favoriteJobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p className="company-name"><strong>Company:</strong> {job.company}</p>
              <p className="job-description">{job.description}</p>
              
              <button
                className="delete-btn"
                onClick={() => deleteFavorite(job.id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;