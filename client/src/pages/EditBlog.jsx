import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { createBlogThunk } from "../store/slice/blogSlice/blogs.thunk";

function EditBlog() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [blogData, setBlogData] = useState({
        title: "",
        content: "",
        tags: []
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!blogData.title || !blogData.content) return;
        dispatch(createBlogThunk(blogData)).then(() => {
            setBlogData({ title: "", content: "", tags: [] });
            navigate("/dashboard/myblogs");
        });
    };

    const handleTagInput = (e) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            e.preventDefault();
            if (!blogData.tags.includes(e.target.value.trim())) {
                setBlogData(prev => ({
                    ...prev,
                    tags: [...prev.tags, e.target.value.trim()]
                }));
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

    return (
        <div className="max-w-4xl p-6 mx-auto mt-20 text-white">
            <h2 className="mb-6 text-xl font-bold text-center">Edit Your Blog</h2>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={blogData.title}
                    onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
                    className="px-4 py-2 text-sm text-white bg-gray-900 rounded-full outline-none placeholder:text-gray-500"
                />
                <textarea
                    placeholder="Content"
                    rows={6}
                    value={blogData.content}
                    onChange={(e) => setBlogData({ ...blogData, content: e.target.value })}
                    className="px-4 py-2 text-sm text-white bg-gray-900 outline-none rounded-xl placeholder:text-gray-500"
                />
                <div className="flex flex-wrap items-center gap-2 px-3 py-2 bg-gray-900 rounded-xl">
                    {blogData.tags.map((tag, i) => (
                        <span key={i} className="flex items-center gap-1 px-3 py-1 text-xs text-white bg-gray-800 rounded-full">
                            #{tag}
                            <button onClick={() => removeTag(i)} className="text-red-400 hover:text-red-600">x</button>
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
                    className="px-6 py-2 mt-6 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-700 hover:scale-[1.02]"
                >
                    Publish Blog
                </button>
            </form>
        </div>
    );
}

export default EditBlog;
