import React from "react";
import "./Register.css";

const Register = () => {
  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h2>Register</h2>
        <input placeholder="Name" type="text" />
        <input placeholder="Email" type="email" />
        <input placeholder="Password" type="password" />

        <select>
          <option value="" disabled selected>Select Role</option>
          <option value="seeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>

        <button type="submit">Register</button>
      </div>
    </div>
  );
}

export default Register;