import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { updateBlogThunk } from "../store/slice/blogSlice/blogs.thunk";

function EditBlog() {
    const { blogId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { blogList } = useSelector(state => state.blogs);
    const existingBlog = blogList.find(blog => blog._id === blogId);

    const [blogData, setBlogData] = useState({
        title: "",
        content: "",
        tags: []
    });

    useEffect(() => {
        if (existingBlog) {
            setBlogData({
                title: existingBlog.title,
                content: existingBlog.content,
                tags: existingBlog.tags || []
            });
        }
    }, [existingBlog]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!blogData.title || !blogData.content) return;
        dispatch(updateBlogThunk({ id: blogId, updatedData: blogData })).then(() => {
            navigate("/dashboard/myblogs");
        });
    };

    const handleTagInput = (e) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            e.preventDefault();
            const newTag = e.target.value.trim();
            if (!blogData.tags.includes(newTag)) {
                setBlogData(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
            }
            e.target.value = "";
        }
    };

    const removeTag = (index) => {
        setBlogData(prev => ({
            ...prev,
            tags: prev.tags.filter((_, i) => i !== index)
        }));
    };

    if (!existingBlog) {
        return <p className="mt-20 text-center text-white">Blog not found or unavailable.</p>
    }

    return (
        <div className="max-w-4xl p-6 mx-auto mt-20 text-white">
            <h2 className="mb-6 text-xl font-bold text-center">Edit Your Blog</h2>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={blogData.title}
                    onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
                    className="px-4 py-2 text-sm text-white rounded-full outline-none bg-gray-950 placeholder:text-gray-500"
                    placeholder="Title"
                />
                <textarea
                    rows={6}
                    value={blogData.content}
                    onChange={(e) => setBlogData({ ...blogData, content: e.target.value })}
                    className="px-4 py-2 text-sm text-white outline-none bg-gray-950 rounded-3xl placeholder:text-gray-500"
                    placeholder="Content"
                />
                <div className="flex flex-wrap items-center gap-2 px-3 py-2 bg-gray-950 rounded-3xl">
                    {blogData.tags.map((tag, i) => (
                        <span key={i} className="flex items-center gap-1 px-3 py-1 text-xs text-white bg-gray-900 rounded-full">
                            #{tag}
                            <button onClick={() => removeTag(i)} className="text-red-600 hover:text-red-700">&times;</button>
                        </span>
                    ))}
                    <input
                        type="text"
                        onKeyDown={handleTagInput}
                        placeholder="Add tags (press Enter)..."
                        className="px-2 py-1 text-xs text-white bg-transparent outline-none placeholder:text-gray-400"
                    />
                </div>
                <button
                    type="submit"
                    className="px-6 py-2 mt-6 font-semibold text-white transition-all duration-200 bg-blue-700 rounded-full hover:bg-blue-800 hover:scale-[1.02]"
                >
                    Update Blog
                </button>
            </form>
        </div>
    );
}

export default EditBlog;
