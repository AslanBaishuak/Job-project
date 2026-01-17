import React, { useState } from "react";
import "./Register.css";
import { registerUser } from "../services/register";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(""); 

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      setError("Name is required.");
      return false;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (password.length < 5) {
      setError("Password must be at least 5 characters long.");
      return false;
    }
    if (!role) {
      setError("Please select a role.");
      return false;
    }

    setError(""); 
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (validateForm()) {
      try {
        const data = await registerUser(name, email, password, role);
        console.log("Registration successful:", data);
        alert("Account created successfully!");
      } catch (error) {
        console.error("Registration error:", error);
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h2>Register</h2>

        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select onChange={(e) => setRole(e.target.value)} value={role}>
            <option value="" disabled>
              Select Role
            </option>
            <option value="seeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;