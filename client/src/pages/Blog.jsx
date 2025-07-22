import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllBlogsThunk, getSingleBlogThunk } from '../store/slice/blogSlice/blogs.thunk';
import { likeBlogThunk, addCommentThunk, deleteCommentThunk } from '../store/slice/blogSlice/interactionSlice/interact.thunk';
import dayjs from 'dayjs';
import { FaArrowUp } from 'react-icons/fa';
import { BiLike } from 'react-icons/bi';
import { FaEye, FaRegComment } from 'react-icons/fa';
import { MdOutlineDelete } from "react-icons/md";
import ShareButton from '../components/ShareButton';

const Blog = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { blogTitle } = useParams();
    const decodedTitle = decodeURIComponent(blogTitle);

    const { blogList, loading, error } = useSelector((state) => state.blogs);
    const { user } = useSelector((state) => state.authReducer);

    const blog = blogList.find(b => b.title === decodedTitle);
    const defaultAvatar = `https://api.dicebear.com/6.x/avataaars/svg?seed=${blog?.author?._id}`;
    const tags = blog?.tags || [];
    const words = blog?.content?.split(/\s+/).length || 0;
    const minutes = Math.ceil(words / 200);

    useEffect(() => {
        if (blogList.length === 0) {
            dispatch(getAllBlogsThunk());
        }
    }, [dispatch, blogList.length]);

    const [commentText, setCommentText] = useState("");

    const handleLike = () => {
        if (blog?._id) {
            dispatch(likeBlogThunk({ id: blog._id })).then(() => {
                dispatch(getSingleBlogThunk({ id: blog._id }));
            });
        }
    };

    const handleAddComment = () => {
        if (!commentText.trim() || !blog?._id) return;
        dispatch(addCommentThunk({ id: blog._id, text: commentText })).then(() => {
            dispatch(getSingleBlogThunk({ id: blog._id }));
        });
        setCommentText("");
    };

    const handleDeleteComment = (commentId) => {
        if (blog?._id) {
            dispatch(deleteCommentThunk({ blogId: blog._id, commentId }));
        }
    };

    const handleClickAuthor = () => {
        if (blog.author?.username) {
            navigate(`/author/${encodeURIComponent(blog.author.username)}`);
        }
    };

    if (loading) return <p className="mt-20 text-center text-white/70">Loading blog...</p>;
    if (error) return <p className="mt-20 text-center text-red-400">{error}</p>;
    if (!blog) return <p className="mt-20 text-center text-white">Blog not found</p>;

    return (
        <div className="max-w-4xl p-6 mx-auto mt-20 text-white">
            <h2 className="mb-8 text-2xl font-bold text-center">{blog.title}</h2>

            <div className="flex flex-col items-center justify-between gap-2 mb-4 text-xs sm:flex-row">
                <div className="flex items-center gap-2 cursor-pointer" onClick={handleClickAuthor}>
                    <img
                        src={blog.author?.avatar || defaultAvatar}
                        alt="Author profile"
                        className="w-6 h-6 border-l-2 rounded-full border-l-blue-600"
                    />
                    <p>@{blog.author?.username || "unknown"}</p>
                    <p className="text-xs text-gray-400">{dayjs(blog.createdAt).fromNow()}</p>
                </div>
                <p className="text-xs text-gray-400">{minutes} mins read</p>
            </div>

            <hr className="mb-6 border-gray-700" />

            <p className="mb-6 text-base leading-relaxed text-white/90">{blog.content}</p>

            <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="px-3 py-1 text-xs rounded-full cursor-pointer bg-gray-950 hover:text-white/70"
                        onClick={() => navigate(`/all-blogs?tag=${encodeURIComponent(tag)}`)}
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            <hr className="mb-6 border-gray-700" />

            <div className="flex items-center gap-4 mb-6 text-sm text-white/80">
                <button onClick={handleLike} className="flex items-center gap-2 hover:text-white">
                    <BiLike /> {blog.likes?.length}
                </button>
                <span className="flex items-center gap-2">
                    <FaEye /> {blog.views}
                </span>
                <span className="flex items-center gap-2">
                    <FaRegComment /> {blog.comments?.length}
                </span>
                <ShareButton blog={blog} />
            </div>

            <div className="p-6 mt-6 bg-gray-900 rounded-3xl">
                <h3 className="mb-4 text-sm font-bold text-blue-400">Comments</h3>
                {blog.comments?.length > 0 ? blog.comments.map((comment) => (
                    <div key={comment._id} className="mb-4">
                        <p className="text-xs text-gray-500">{dayjs(comment.createdAt).fromNow()}</p>
                        <h4 className="text-xs font-semibold text-blue-400">Commented by: {comment.commentedBy}</h4>
                        <div className="flex items-center justify-between mt-1">
                            <p className="text-sm text-gray-300">{comment.text}</p>
                            {user?._id === blog.author?._id && (
                                <button
                                    onClick={() => handleDeleteComment(comment._id)}
                                    className="p-1 text-xs text-white bg-red-600 rounded-full hover:bg-red-700"
                                >
                                    <MdOutlineDelete />
                                </button>
                            )}
                        </div>
                    </div>
                )) : <p className="text-sm text-gray-400">No comments yet on this blog.</p>}

                <div className="flex items-center justify-between w-full px-3 py-2 mt-4 rounded-full bg-gray-950/50">
                    <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="w-full text-xs text-white bg-transparent border-none outline-none placeholder:text-gray-400"
                        placeholder="Add a comment..."
                    />
                    <button
                        onClick={handleAddComment}
                        className="p-2 transition-all duration-200 bg-black rounded-full hover:scale-110 hover:rotate-45"
                    >
                        <FaArrowUp color="blue" size={12} />
                    </button>
                </div>
            </div>

            <h3 className="mt-12 mb-4 text-sm font-bold text-blue-400">Recommended Blogs</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {blogList
                    .filter(b => b._id !== blog._id)
                    .slice(0, 4)
                    .map(b => (
                        <div
                            key={b._id}
                            onClick={() => navigate(`/blogs/${encodeURIComponent(b.title)}`)}
                            className="p-4 bg-black border-l-2 border-l-blue-600 rounded-xl hover:scale-[1.02] transition cursor-pointer"
                        >
                            <h4 className="mb-2 text-sm font-semibold text-white">{b.title}</h4>
                            <p className="text-xs text-white/60 line-clamp-2">{b.content}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Blog;
