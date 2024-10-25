const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { id } = req.user;
  const { podcastId } = req.body;

  if (!podcastId) {
    return res.status(400).json({ message: "Podcast ID is required" })
  }

  try {
    const user = await User.findById(id);

    if (user.favorites.includes(podcastId)) {
      return res.status(400).json({ message: "Podcast already favorited" });
    }

    user.favorites.push(podcastId);
    await user.save();

    res.status(200).json({ message: "Podcast favorited successfully" });
  }
  catch(error) {
    res.status(500).json({ message: error.message });
  }
}
  )

module.exports = router;