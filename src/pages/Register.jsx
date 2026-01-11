import React from "react";

const Register = () => {
    return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" />
      <input placeholder="Email" />
      <input placeholder="Password" type="password" />

      <select>
        <option>Job Seeker</option>
        <option>Employer</option>
      </select>

      <button>Register</button>
    </div>
  );
}

export default Register;