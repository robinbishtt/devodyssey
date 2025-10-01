// models/User.js
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  passwordHash: String,
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  // optionally: notification settings
});

// models/Post.js
const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // ...
});

// routes/follow.js
router.post("/follow/:authorId", authMiddleware, async (req, res) => {
  const userId = req.user.id;  // from JWT
  const { authorId } = req.params;
  if (userId === authorId) return res.status(400).json({ msg: "Cannot follow yourself" });
  const user = await User.findById(userId);
  if (!user.following.includes(authorId)) {
    user.following.push(authorId);
    await user.save();
  }
  res.json({ success: true });
});

router.post("/unfollow/:authorId", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { authorId } = req.params;
  await User.findByIdAndUpdate(userId, {
    $pull: { following: authorId }
  });
  res.json({ success: true });
});
