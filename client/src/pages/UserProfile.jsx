import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BiLike } from 'react-icons/bi'
import { FaEye, FaRegComment } from 'react-icons/fa'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const UserProfile = () => {
    const navigate = useNavigate()
    const { blogList } = useSelector(state => state.blogs)
    const { user } = useSelector(state => state.authReducer)

    const userBlogs = blogList?.filter(blog => blog.author?.username === user?.username);
    const totalViews = userBlogs?.reduce((acc, blog) => acc + (blog.views || 0), 0)
    const totalLikes = userBlogs?.reduce((acc, blog) => acc + (blog.likes?.length || 0), 0)
    const totalComments = userBlogs?.reduce((acc, blog) => acc + (blog.comments?.length || 0), 0)

    const avatar = user?.avatar || `https://api.dicebear.com/6.x/avataaars/svg?seed=${user?.username || "unknown"}`

    function handleBlogClick(blog) {
        navigate(`/blogs/${encodeURIComponent(blog.title)}`);
    }

    if (!user) {
        return (
            <div className="max-w-2xl p-6 mx-auto mt-20 text-center text-white">
                <h2 className="mb-4 text-xl font-bold">No user profile found</h2>
                <p className="mb-4 text-gray-400">Please log in to view or edit your profile.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl p-6 mx-auto mt-20 text-white">
            <div className="max-w-2xl p-6 mx-auto text-white">
                <div className="flex flex-col items-center gap-2 p-6 shadow-lg bg-gray-950/30 rounded-3xl">
                    <img src={avatar} alt="Avatar" className="w-24 h-24 mb-4 border-l-4 rounded-full border-l-blue-600" />
                    <h2 className="text-xl font-bold">{user.fullName}</h2>
                    <p className="text-sm text-gray-400">@{user.username}</p>
                </div>
            </div>
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
            <h2 className="mb-6 text-xl font-bold text-center">My Blogs</h2>
            <div className="flex flex-col gap-4">
                {userBlogs.length > 0 ? userBlogs.map(blog => (
                    <div key={blog._id} className="p-5 transition-transform duration-300 ease-in-out border-l-2 border-blue-600 bg-black shadow-md hover:shadow-blue-500/30 rounded-xl hover:scale-[1.05]"
                        onClick={() => handleBlogClick(blog)}>
                        <div className="flex items-center justify-between mb-2 text-xs text-white/70">
                            <p>{dayjs(blog.createdAt).fromNow()}</p>
                            <div className="flex gap-2">
                                <span className="flex items-center gap-1"><BiLike size={14} />{blog.likes?.length}</span>
                                <span className="flex items-center gap-1"><FaEye size={14} />{blog.views}</span>
                                <span className="flex items-center gap-1"><FaRegComment size={14} />{blog.comments?.length}</span>
                            </div>
                        </div>
                        <h2 className="mb-2 font-bold">{blog.title}</h2>
                        <p className="text-xs text-white/60 line-clamp-3">{blog.content}</p>
                    </div>
                )) : (
                    <p className="mt-10 text-center text-gray-400">You haven't published any blogs yet.</p>
                )}
            </div>
        </div>
    )
}

export default UserProfile;
