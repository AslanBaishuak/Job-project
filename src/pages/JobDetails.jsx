import React from "react";
import { useParams } from "react-router-dom";

const JobDetails = () => {
    const { id } = useParams();

  return (
    <div>
      <h2>Job Details #{id}</h2>
      <p>Company: Google</p>
      <p>Description: Job description here</p>

      <button>Add to Favorites</button>
    </div>
  );
}

export default JobDetails