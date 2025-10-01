// controllers/analyticsController.js
const Post = require("../models/Post");

exports.getDashboardStats = async (req, res) => {
  const topPosts = await Post.find({ published: true })
    .sort({ views: -1, likes: -1 }).limit(5);
  const totalPosts = await Post.countDocuments();
  const totalLikes = await Post.aggregate([{ $project: { likesCount: { $size: "$likes" } } }, { $group: { _id: null, total: { $sum: "$likesCount" } } }]);
  
  res.json({ topPosts, totalPosts, totalLikes: totalLikes[0]?.total || 0 });
};
