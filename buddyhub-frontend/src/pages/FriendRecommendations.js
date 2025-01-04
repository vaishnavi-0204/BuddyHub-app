import React, { useEffect, useState } from "react";
import axios from "../api/axios"; // Axios instance for API calls

const FriendRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]); // Initialize as an empty array

  // Fetch friend recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get("/api/recommendation"); // Adjust the endpoint as needed
        setRecommendations(response.data);
      } catch (err) {
        console.error("Error fetching recommendations:", err.message);
        alert("Error fetching recommendations: " + err.message);
      }
    };
    fetchRecommendations();
  }, []);

  // Handle sending a friend request
  const handleAddFriend = async (friendId) => {
    try {
      await axios.post("/api/friend/request", {
        userId: localStorage.getItem("userId"), // Assuming userId is stored in localStorage
        friendId,
      });
      alert("Friend request sent!");
    } catch (err) {
      console.error("Error sending friend request:", err.message);
      alert("Error sending friend request: " + err.message);
    }
  };

  return (
    <>
      <h2>Friend Recommendations</h2>
      <ul>
        {/* Check if recommendations is an array and has elements */}
        {Array.isArray(recommendations) && recommendations.length > 0 ? (
          recommendations.map((user) => (
            <li key={user._id}>
              {user.username}{" "}
              <button onClick={() => handleAddFriend(user._id)}>
                Add Friend
              </button>
            </li>
          ))
        ) : (
          <p>No recommendations available.</p>
        )}
      </ul>
    </>
  );
};

export default FriendRecommendations;
