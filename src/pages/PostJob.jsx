import React from "react";

const PostJob = () => {
    return (
    <div>
      <h2>Post a Job</h2>
      <input placeholder="Job Title" />
      <input placeholder="Company" />
      <textarea placeholder="Description" />
      <button>Publish Job</button>
    </div>
  );
}

export default PostJob;