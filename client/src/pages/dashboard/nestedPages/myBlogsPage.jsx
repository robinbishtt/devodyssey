import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BiLike, BiEdit } from 'react-icons/bi'
import { FaEye, FaRegComment } from 'react-icons/fa'
import { MdOutlineDelete } from 'react-icons/md'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const MyBlogsPage = () => {
    const navigate = useNavigate()
    const { blogList } = useSelector(state => state.blogs)
    const { user } = useSelector(state => state.authReducer)

    const userBlogs = blogList?.filter(blog => blog.author?.username === user?.username)

    return (
        <div className="max-w-4xl p-6 mx-auto mt-20 text-white">
            <h2 className="mb-6 text-xl font-bold text-center">My Blogs</h2>
            <div className="flex flex-col gap-4">
                {userBlogs.length > 0 ? userBlogs.map(blog => (
                    <div key={blog._id} className="p-5 transition-transform duration-300 ease-in-out border-l-2 border-blue-600 bg-black shadow-md hover:shadow-blue-500/30 rounded-xl hover:scale-[1.05]">
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
                        <div className="flex gap-4 mt-3">
                            <button onClick={() => navigate(`/dashboard/edit/${blog._id}`)} className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-500"><BiEdit />Edit</button>
                            <button className="flex items-center gap-1 text-xs text-red-400 hover:text-red-500"><MdOutlineDelete />Delete</button>
                        </div>
                    </div>
                )) : (
                    <p className="mt-10 text-center text-gray-400">You haven't published any blogs yet.</p>
                )}
            </div>
        </div>
    )
}

export default MyBlogsPage
