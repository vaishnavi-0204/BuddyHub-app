import React, { useState } from "react";
import API from "../api/axios"; // Axios instance for API calls

const SignUp = () => {
  const [username, setUsername] = useState(""); // State for username
  const [password, setPassword] = useState(""); // State for password

  // Handle Sign Up
  const handleSignUp = async () => {
    try {
      const response = await API.post("/auth/register", { username, password }); // Post to the register API
      alert("Registration successful!"); // Alert on success
    } catch (err) {
      alert(
        "Error during registration: " +
          (err.response?.data?.message || err.message) // Error handling
      );
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>

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

      {/* Sign Up Button */}
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUp;
