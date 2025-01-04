import React, { useState } from "react";
import API from "../api/axios"; // Axios instance for API calls

const Login = () => {
  const [username, setUsername] = useState(""); // State for username
  const [password, setPassword] = useState(""); // State for password

  // Handle Login
  const handleLogin = async () => {
    try {
      const response = await API.post("/auth/login", { username, password }); // Post to the login API
      alert("Login successful!"); // Alert on success
      localStorage.setItem("token", response.data.token); // Save token for authenticated requests
    } catch (err) {
      alert(
        "Error during login: " + (err.response?.data?.message || err.message) // Error handling
      );
    }
  };

  return (
    <div>
      <h2>Login</h2>

      {/* Username Input */}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)} // Set username value
      />

      {/* Password Input */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Set password value
      />

      {/* Login Button */}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
