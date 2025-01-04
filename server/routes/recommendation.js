const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Route to get friend recommendations for a user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch the user and populate their friends
    const user = await User.findById(userId).populate('friends');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract the user's friends
    const userFriends = user.friends.map(friend => friend._id.toString());

    // Find all users except the current user
    const allUsers = await User.find({ _id: { $ne: userId } });

    const recommendations = [];

    // Loop through all users to calculate mutual friends and common interests
    for (const potentialFriend of allUsers) {
      const potentialFriendId = potentialFriend._id.toString();

      // Skip if the user is already a friend
      if (userFriends.includes(potentialFriendId)) {
        continue;
      }

      // Calculate mutual friends
      const mutualFriends = potentialFriend.friends.filter(friendId =>
        userFriends.includes(friendId.toString())
      );

      // Optional: Calculate common interests (if interests are part of the schema)
      const commonInterests = user.interests
        ? potentialFriend.interests.filter(interest =>
            user.interests.includes(interest)
          )
        : [];

      // Add to recommendations if there are mutual friends or common interests
      if (mutualFriends.length > 0 || commonInterests.length > 0) {
        recommendations.push({
          userId: potentialFriendId,
          username: potentialFriend.username,
          mutualFriends: mutualFriends.length,
          commonInterests: commonInterests,
        });
      }
    }

    // Sort recommendations by the number of mutual friends (descending)
    recommendations.sort((a, b) => b.mutualFriends - a.mutualFriends);

    // Return the recommendations
    res.status(200).json(recommendations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
