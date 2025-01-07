// import React, { useEffect, useState } from "react";
// import API from "../api/axios"; // Import the Axios instance for API calls

// const HomePage = () => {
//   const [friends, setFriends] = useState([]); // State to store friends data
//   const [searchQuery, setSearchQuery] = useState(""); // State to store search query
//   const [searchResults, setSearchResults] = useState([]); // State to store search results

//   // Fetch friends list when component mounts
//   useEffect(() => {
//     const fetchFriends = async () => {
//       try {
//         const response = await API.get("/friend"); // Replace with your friends endpoint
//         setFriends(response.data); // Set the friends data
//       } catch (err) {
//         alert("Error fetching friends: " + err.message); // Handle error
//       }
//     };
//     fetchFriends();
//   }, []); // Empty dependency array means this effect runs only once when the component mounts

//   // Handle search query submission
//   const handleSearch = async () => {
//     try {
//       const response = await API.get(`/friend/search?query=${searchQuery}`); // Replace with your search endpoint
//       setSearchResults(response.data); // Set the search results
//     } catch (err) {
//       alert("Error during search: " + err.message); // Handle error
//     }
//   };

//   return (
//     <div>
//       <h2>Home Page</h2>
//       {/* Search Input */}
//       <input
//         type="text"
//         placeholder="Search Users"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)} // Update search query state on input change
//       />
//       <button onClick={handleSearch}>Search</button>{" "}
//       {/* Search button to trigger search */}
//       {/* Friends List */}
//       <h3>Friends</h3>
//       <ul>
//         {friends.length > 0 ? (
//           friends.map((friend) => (
//             <li key={friend._id}>{friend.username}</li> // Display friends list
//           ))
//         ) : (
//           <p>No friends found.</p> // Show a message if no friends are found
//         )}
//       </ul>
//       {/* Search Results */}
//       <h3>Search Results</h3>
//       <ul>
//         {searchResults.length > 0 ? (
//           searchResults.map((user) => (
//             <li key={user._id}>
//               {user.username} <button>Add Friend</button>{" "}
//               {/* Button to add friend */}
//             </li>
//           ))
//         ) : (
//           <p>No search results found.</p> // Show a message if no search results are found
//         )}
//       </ul>
//     </div>
//   );
// };

// export default HomePage;
