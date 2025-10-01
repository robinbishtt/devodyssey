const totalLikesAgg = await Post.aggregate([
  { $project: { likesCount: { $size: { $ifNull: ["$likes", []] } } } },
  { $group: { _id: null, total: { $sum: "$likesCount" } } }
]);
const totalLikes = totalLikesAgg[0]?.total || 0;
res.json({ topPosts, totalPosts, totalLikes });
