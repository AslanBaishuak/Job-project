import React from "react";
import "./Login.css"; 

const Login = () => {
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Login</h2>
        <input placeholder="Email" type="email" />
        <input placeholder="Password" type="password" />
        <button type="submit">Login</button>
      </div>
    </div>
  );
};

export default Login;