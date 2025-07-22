import React from 'react'
import { useSelector } from 'react-redux'
import { BiLike } from 'react-icons/bi'
import { FaEye, FaRegComment } from 'react-icons/fa'
import dayjs from 'dayjs'

const AnalyticsPage = () => {
    const { blogList } = useSelector(state => state.blogs);
    const { user } = useSelector(state => state.authReducer);
    const blog = blogList.find(b => b.author?.username === user?.username);

    const userBlogs = blogList?.filter(blog => blog.author?.username === user?.username)

    const totalViews = userBlogs?.reduce((acc, blog) => acc + (blog.views || 0), 0)
    const totalLikes = userBlogs?.reduce((acc, blog) => acc + (blog.likes?.length || 0), 0)
    const totalComments = userBlogs?.reduce((acc, blog) => acc + (blog.comments?.length || 0), 0);

    return (
        <div className="max-w-4xl p-6 mx-auto mt-20 text-white">
            <h2 className="mb-6 text-xl font-bold text-center">Your Analytics</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex flex-col items-center justify-center p-4 bg-gray-950 rounded-xl">
                    <BiLike size={28} />
                    <p className="mt-2 text-lg font-bold text-blue-400">{totalLikes}</p>
                    <p className="text-sm text-gray-400">Total Likes</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-gray-950 rounded-xl">
                    <FaEye size={28} />
                    <p className="mt-2 text-lg font-bold text-blue-400">{totalViews}</p>
                    <p className="text-sm text-gray-400">Total Views</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-gray-950 rounded-xl">
                    <FaRegComment size={28} />
                    <p className="mt-2 text-lg font-bold text-blue-400">{totalComments}</p>
                    <p className="text-sm text-gray-400">Total Comments</p>
                </div>
            </div>
            <p className="mt-6 text-sm text-center text-white/60">
                Tip: Use descriptive titles, tags, and engaging openings to boost your visibility and interaction.
            </p>
            <div className="p-6 mt-6 bg-gray-950/50 rounded-3xl">
                <h3 className="mb-4 text-sm font-bold text-blue-400">All Comments</h3>
                {blog.comments?.length > 0 ? blog.comments.map((comment) => (
                    <div key={comment._id} className="mb-4">
                        <p className="text-xs text-gray-500">{dayjs(comment.createdAt).fromNow()}</p>
                        <h4 className="text-xs font-semibold text-blue-400">Commented by: {comment.commentedBy}</h4>
                        <div className="flex items-center justify-between mt-1">
                            <p className="text-sm text-gray-300">{comment.text}</p>
                        </div>
                    </div>
                )) : <p className="text-sm text-gray-400">No comments yet on this blog.</p>}
            </div>
        </div>
    )
}

export default AnalyticsPage
