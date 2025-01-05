const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Search Users
router.get("/search", async (req, res) => {
  const { query } = req.query; // Get search query from request
  try {
    const users = await User.find({
      username: { $regex: query, $options: "i" }, // Case-insensitive search
    }).select("-password"); // Exclude password from results
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send Friend Request
router.post("/request", async (req, res) => {
  const { userId, friendId } = req.body;
  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!friend) return res.status(404).json({ message: "User not found" });

    if (!friend.friendRequests.includes(userId)) {
      friend.friendRequests.push(userId);
      await friend.save();
    }
    res.status(200).json({ message: "Friend request sent" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Accept Friend Request
router.post("/accept", async (req, res) => {
  const { userId, friendId } = req.body;
  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!friend) return res.status(404).json({ message: "User not found" });

    if (!user.friendRequests.includes(friendId)) {
      return res
        .status(400)
        .json({ message: "No friend request from this user" });
    }

    // Add each other as friends
    user.friends.push(friendId);
    friend.friends.push(userId);

    // Remove friend request
    user.friendRequests = user.friendRequests.filter(
      (id) => id.toString() !== friendId
    );

    await user.save();
    await friend.save();

    res.status(200).json({ message: "Friend request accepted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reject Friend Request
router.post("/reject", async (req, res) => {
  const { userId, friendId } = req.body;
  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Remove friend request
    user.friendRequests = user.friendRequests.filter(
      (id) => id.toString() !== friendId
    );

    await user.save();
    res.status(200).json({ message: "Friend request rejected" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
