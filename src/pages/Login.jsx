import React, { useState } from "react";
import "./Login.css";
import { loginUser } from "../services/login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const loginData = await loginUser(email, password);

      localStorage.setItem("token", loginData.accessToken);
      localStorage.setItem("role", loginData.user.role);
      localStorage.setItem('userGmail', loginData.user.email);

      console.log("Login successful:", loginData);

      window.location.replace("/")
    } catch (error) {
      console.log("Login failed", error);
      alert("Invalid credentials. Please try again.");
    }
  };
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Login</h2>
        <form action="" onSubmit={handleSubmit}> 
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
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
