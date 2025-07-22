import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllBlogsThunk } from '../store/slice/blogSlice/blogs.thunk'
import { viewBlogThunk } from '../store/slice/blogSlice/interactionSlice/interact.thunk'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import ShareButton from '../components/ShareButton'

const AuthorPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { username } = useParams()
    const { blogList } = useSelector(state => state.blogs)

    useEffect(() => {
        if (blogList.length === 0) {
            dispatch(getAllBlogsThunk())
        }
    }, [dispatch, blogList.length])

    // Find all blogs by this author
    const blogsByAuthor = useMemo(
        () => blogList.filter(blog => blog.author && blog.author.username === username),
        [blogList, username]
    );

    // Find the most complete author info from all blogs by this author
    const authorInfo = useMemo(() => {
        // Get all author objects for this username
        const allAuthors = blogList
            .filter(blog => blog.author && blog.author.username === username)
            .map(blog => blog.author)
            .filter(Boolean);
        // Merge all available info
        if (allAuthors.length > 0) {
            // Prefer the most complete author object
            const merged = allAuthors.reduce((acc, curr) => {
                return {
                    _id: acc._id || curr._id,
                    username: acc.username || curr.username,
                    fullName: acc.fullName || curr.fullName,
                    avatar: acc.avatar || curr.avatar,
                };
            }, {});
            // Fallbacks for missing fields
            return {
                _id: merged._id || undefined,
                username: merged.username || username,
                fullName: merged.fullName || merged.username || username,
                avatar: merged.avatar || `https://api.dicebear.com/6.x/avataaars/svg?seed=${username}`,
            };
        }
        // If nothing found, fallback
        return {
            username,
            fullName: username,
            avatar: `https://api.dicebear.com/6.x/avataaars/svg?seed=${username}`
        };
    }, [blogList, username]);

    const defaultAvatar = `https://api.dicebear.com/6.x/avataaars/svg?seed=${username}`
    const totalViews = blogsByAuthor.reduce((acc, blog) => acc + (blog.views || 0), 0)
    const totalLikes = blogsByAuthor.reduce((acc, blog) => acc + (blog.likes?.length || 0), 0)

    const handleBlogClick = (blog) => {
        dispatch(viewBlogThunk({ id: blog._id }))
        navigate(`/blogs/${blog._id}`)
    }

    // Recommended users: top 3 other authors with most blogs
    const recommendedAuthors = useMemo(() => {
        const authorCounts = {};
        blogList.forEach(blog => {
            if (blog.author && blog.author.username !== username) {
                const uname = blog.author.username;
                if (!authorCounts[uname]) authorCounts[uname] = { ...blog.author, count: 0 };
                authorCounts[uname].count++;
            }
        });
        return Object.values(authorCounts)
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [blogList, username]);

    // Recommended blogs: top 3 blogs not by this author, by views
    const recommendedBlogs = useMemo(() => {
        return blogList
            .filter(blog => blog.author && blog.author.username !== username)
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, 3);
    }, [blogList, username]);

    // Show loading if blogs are still loading and no author info
    if (!blogList) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white">
                Loading author data...
            </div>
        )
    }
    return (
        <div className="max-w-4xl p-6 mx-auto mt-20 text-white">
            <div className="flex flex-col items-center gap-4 p-6 shadow-lg bg-gray-950/30 rounded-3xl">
                <img src={authorInfo.avatar || defaultAvatar} alt="Author Avatar" className="w-24 h-24 border-l-4 rounded-full border-l-blue-600" />
                <h2 className="text-xl font-bold">{authorInfo.fullName}</h2>
                <p className="text-sm text-gray-400">@{authorInfo.username}</p>
                <div className="flex gap-6 mt-2 text-sm text-center text-white/80">
                    <p>{blogsByAuthor.length} blogs</p>
                    <p>{totalViews} views</p>
                    <p>{totalLikes} likes</p>
                </div>
            </div>

            <h3 className="mt-12 mb-4 text-sm font-bold text-blue-400">Blogs by @{authorInfo.username}</h3>
            <div className="flex flex-col gap-4">
                {blogsByAuthor.length > 0 ? (
                    blogsByAuthor.map(blog => (
                        <div
                            key={blog._id}
                            onClick={() => handleBlogClick(blog)}
                            className="p-5 transition-transform duration-300 ease-in-out border-l-2 border-blue-600 bg-black shadow-md hover:shadow-blue-500/30 rounded-xl hover:scale-[1.05] cursor-pointer"
                        >
                            <div className="flex items-center gap-2 mb-2 text-xs text-white/60">
                                {dayjs(blog.createdAt).fromNow()}
                                <ShareButton blog={blog} />
                            </div>
                            <h2 className="mb-1 font-bold">{blog.title}</h2>
                            <p className="text-xs text-white/70 line-clamp-3">{blog.content}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {blog.tags?.map((tag, i) => (
                                    <span
                                        key={i}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            navigate(`/AllBlogs?tag=${encodeURIComponent(tag)}`)
                                        }}
                                        className="px-2 py-1 text-xs bg-gray-900 rounded-full cursor-pointer hover:text-white/50"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-400">No blogs yet from this author.</p>
                )}
            </div>

            {/* Recommended users */}
            <h3 className="mt-12 mb-4 text-sm font-bold text-blue-400">Recommended Users</h3>
            <div className="flex flex-wrap gap-4 mb-8">
                {recommendedAuthors.map(user => (
                    <div key={user.username} className="flex flex-col items-center w-40 p-4 transition cursor-pointer bg-gray-950/60 rounded-xl hover:scale-105 hover:shadow-md hover:shadow-blue-500/30" onClick={() => navigate(`/author/${encodeURIComponent(user.username)}`)}>
                        <img src={user.avatar || `https://api.dicebear.com/6.x/avataaars/svg?seed=${user.username}`} alt={user.username} className="w-12 h-12 mb-2 rounded-full" />
                        <span className="font-semibold">{user.fullName || user.username}</span>
                        <span className="text-xs text-gray-400">@{user.username}</span>
                        <span className="mt-1 text-xs text-blue-400">{user.count} blogs</span>
                    </div>
                ))}
            </div>

            {/* Recommended blogs */}
            <h3 className="mt-12 mb-4 text-sm font-bold text-blue-400">Recommended Blogs</h3>
            <div className="flex flex-col gap-4 mb-8">
                {recommendedBlogs.map(blog => (
                    <div key={blog._id} className="p-4 transition cursor-pointer bg-gray-950/60 rounded-xl hover:scale-105 hover:shadow-md hover:shadow-blue-500/30" onClick={() => handleBlogClick(blog)}>
                        <div className="flex items-center gap-2 mb-2">
                            <img src={blog.author?.avatar || `https://api.dicebear.com/6.x/avataaars/svg?seed=${blog.author?.username}`} alt={blog.author?.username} className="w-4 h-4 border-l-2 rounded-full border-l-blue-600" />
                            <span className="text-[10px] text-gray-400">@{blog.author?.username}</span>
                            <span className="text-[10px] text-white/60">{dayjs(blog.createdAt).fromNow()}</span>
                        </div>
                        <hr className='mb-2 border-gray-700' />
                        <div className="font-bold">{blog.title}</div>
                        <div className="text-xs text-white/70 line-clamp-2">{blog.content}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AuthorPage
