import React from "react";

const Favorites = () => {
  const DeleteFavorite = (id) => {
    const favoriteJobs = JSON.parse(localStorage.getItem("favoriteJobs")) || [];
    const updatedFavorites = favoriteJobs.filter((job) => job.id !== id);
    localStorage.setItem("favoriteJobs", JSON.stringify(updatedFavorites));
    window.location.reload();
  };
  return (
    <div>
      <h2>Favorite Jobs</h2>

      <div>
        {JSON.parse(localStorage.getItem("favoriteJobs"))?.length === 0 ? (
          <p>No favorite jobs added yet.</p>
        ) : (
          JSON.parse(localStorage.getItem("favoriteJobs"))?.map((job) => (
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
                onClick={() => DeleteFavorite(job.id)}
                style={{
                  backgroundColor: "#ff4d4d",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
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
