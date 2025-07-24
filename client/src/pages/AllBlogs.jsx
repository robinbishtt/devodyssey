import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { getAllBlogsThunk } from "../store/slice/blogSlice/blogs.thunk";
import { viewBlogThunk } from "../store/slice/blogSlice/interactionSlice/interact.thunk";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BiLike } from "react-icons/bi";
import { FaEye, FaRegComment } from "react-icons/fa";
import ShareButton from "../components/ShareButton";
import dayjs from "dayjs";
import { CgSearch } from "react-icons/cg";
import PageHeader from "../components/PageHeader";

const AllBlogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogList, loading, error } = useSelector((state) => state.blogs);
  const [searchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState("");
  const [selectedTag, setSelectedTag] = useState(searchParams.get("tag") || "");

  useEffect(() => {
    dispatch(getAllBlogsThunk());
  }, [dispatch]);

  // Extract all unique tags from blogs
  const allTags = useMemo(() => {
    const tagsSet = new Set();
    blogList.forEach(blog => blog.tags?.forEach(tag => tagsSet.add(tag)));
    return Array.from(tagsSet).slice(0, 10); // Show top 10
  }, [blogList]);

  // Apply filters
  const filteredBlogs = useMemo(() => {
    const keyword = searchInput.trim().toLowerCase();
    return blogList.filter(blog => {
      const matchesTag = selectedTag ? blog.tags?.includes(selectedTag) : true;
      const matchesSearch =
        keyword &&
        (blog.title.toLowerCase().includes(keyword) || blog.content.toLowerCase().includes(keyword) ||
          blog.author?.username?.toLowerCase().includes(keyword));
      return matchesTag && (keyword ? matchesSearch : true);
    });
  }, [blogList, selectedTag, searchInput]);

  const blogs = blogList;
  const defaultAvatar = "https://api.dicebear.com/6.x/avataaars/svg?seed=" + blogs.author;

  // List/Grid layout from settings (localStorage)
  const [layout, setLayout] = useState(localStorage.getItem("layout") || "list");

  useEffect(() => {
    const handleStorage = () => setLayout(localStorage.getItem("layout") || "list");
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const popularBlogs = useMemo(() => {
    if (!blogList || blogList.length === 0) return [];
    return [...blogList]
      .sort((a, b) => {
        const aScore = (a.likes?.length || 0) + (a.views || 0);
        const bScore = (b.likes?.length || 0) + (b.views || 0);
        return bScore - aScore;
      })
      .slice(0, 5);
  }, [blogList]);

  const popularBlogList = popularBlogs;

  const topCreators = useMemo(() => {
    const authorStats = {};

    blogList.forEach(blog => {
      const id = blog.author;
      if (!authorStats[id]) {
        const referenceBlog = blogList.find(b => b.author === id);
        authorStats[id] = {
          username: referenceBlog?.author?.username || "unknown",
          avatar: referenceBlog?.author?.avatar || "",
          blogs: 0,
          likes: 0,
          views: 0,
        };
      }
      authorStats[id].blogs += 1;
      authorStats[id].likes += blog.likes?.length || 0;
      authorStats[id].views += blog.views || 0;
    });

    return Object.values(authorStats)
      .sort((a, b) => b.likes + b.views - (a.likes + a.views))
      .slice(0, 5);
  }, [blogList]);

  function handleBlogClick(blog) {
    dispatch(viewBlogThunk({ id: blog._id }));
    navigate(`/blogs/${encodeURIComponent(blog.title)}`);
  }

  function handleClickAuthor(blog) {
    navigate(`/author/${encodeURIComponent(blog.author?.username || "unknown")}`);
  }

  return (
    <>
      {error && <p>Error: {error}</p>}
      {loading && <p>Loading blogs...</p>}
      <div className="grid w-full grid-cols-1 gap-4 px-4 mx-auto mt-20 transition-all max-w-7xl lg:grid-cols-3 animate-fadeIn">
              <PageHeader className={`text-xs`} />
        <div className="col-span-2">
          <div className="mb-6">
            <div className="flex items-center w-full gap-2 px-4 py-2 mb-4 text-sm border-0 rounded-full bg-gray-950">
              <CgSearch size={20} color="gray" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search blogs..."
                className="w-full text-white bg-transparent rounded-full outline-none placeholder:text-white/40"
              />
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {allTags.map((tag, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 text-xs rounded-full ${selectedTag === tag ? "bg-blue-700 text-white" : "bg-gray-950 text-white/60"} hover:text-white/80 hover:bg-gray-900/60 shadow-md transition-all duration-200`}
                >
                  #{tag}
                </button>
              ))}
              {selectedTag && (
                <button
                  onClick={() => setSelectedTag("")}
                  className="px-3 py-1 text-xs text-white transition-all duration-200 bg-gray-800 bg-red-600 rounded-full shadow-md hover:bg-red-700 active:bg-red-800 active:text-white/70"
                >
                  Clear Filter
                </button>
              )}
            </div>
          </div>
          <div className={layout === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "flex flex-col gap-6"}>
            {Array.isArray(blogList) && filteredBlogs.length > 0 ? filteredBlogs.map(blog => {
              const defaultAvatar = "https://api.dicebear.com/6.x/avataaars/svg?seed=" + blog.author;
              const tags = blog?.tags || [];
              const words = blog?.content?.split(/\s+/).length || 0;
              const minutes = Math.ceil(words / 200);
              return (
                <>
                  <div
                    key={blog._id}
                    className="w-full p-3 transition transition-transform duration-300 ease-in-out border-l-2 border-blue-600 shadow-md rounded-xl hover:scale-[1.03] bg-black/30"
                  >
                    <div className="flex flex-col items-center justify-between gap-2 mb-4 text-xs sm:flex-row">
                      <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleClickAuthor(blog)}>
                        <img
                          src={blog.author?.avatar || defaultAvatar}
                          alt="Author profile"
                          className="w-4 h-4 border-l-2 rounded-full border-l-blue-600"
                        />
                        <p className="text-xs text-white">@{blog.author?.username || "unknown"}</p>
                        <p className="text-[10px] text-gray-400">{dayjs(blog.createdAt).fromNow()}</p>
                      </div>
                      <p className="text-[10px] text-gray-400">{minutes} mins read</p>
                    </div>
                    <div onClick={() => handleBlogClick(blog)}>
                      <hr className="mb-2 border-gray-700 " />
                      <h2 className="mb-2 font-bold text-white">{blog.title}</h2>
                      <p className="text-xs text-white/60 md:min-w-[20rem] lg:min-w-[40rem] sm:min-w-[20rem] line-clamp-4">{blog.content}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs text-white rounded-full cursor-pointer bg-gray-950 hover:text-white/70"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTag(tag);
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <p className="flex items-center gap-2 mt-2 mb-2 text-sm text-white cursor-pointer">
                        <span className="flex items-center gap-2 hover:text-white/70"><BiLike /> {blog.likes?.length}</span>
                        <span className="flex items-center gap-2 hover:text-white/70"><FaEye /> {blog.views}</span>
                        <span className="flex items-center gap-2 hover:text-white/70"><FaRegComment /> {blog.comments?.length}</span>
                        <ShareButton blog={blog} />
                      </p>
                    </div>
                  </div>
                </>
              );
            }) : <p>No blogs available</p>}
          </div>
        </div>
        {/* Sidebar: Popular Blogs & Top Creators */}
        <div className="col-span-1 space-y-8">
          <div className="flex flex-col flex-wrap items-center h-auto max-w-full gap-2 p-4 border-l-2 border-blue-600 shadow-md rounded-xl bg-black/30">
            <h3 className="mb-4 text-sm font-bold text-white">Popular Blogs</h3>
            {popularBlogList.length > 0 ? (
              popularBlogList.map((blog) => {
                const defaultAvatar = "https://api.dicebear.com/6.x/avataaars/svg?seed=" + blog.author;
                return (
                  <div key={blog._id} className="relative w-full p-3 mx-auto mb-2 overflow-hidden shadow-md drop-shadow-2xl rounded-xl bg-gray-950/50">
                    <div className="flex items-center gap-2 text-[10px] mb-2" onClick={() => handleClickAuthor(blog)}>
                      <img
                        src={blog.author?.avatar || defaultAvatar}
                        alt="Author profile"
                        className="w-4 h-4 border-l-2 rounded-full cursor-pointer border-l-blue-600"
                      />
                      <p className="text-white ">@{blog.author?.username || "unknown"}</p>
                    </div>
                    <div className="flex flex-col gap-2 text-white bg-transparent rounded-xl" onClick={() => handleBlogClick(blog)}>
                      <h3 className="text-lg font-bold">{blog.title}</h3>
                      <p className="text-sm text-white line-clamp-4">{blog.content}</p>
                      <p className="flex items-center gap-2 text-sm text-white/70">
                        <BiLike /> {blog.likes?.length}
                        <FaEye /> {blog.views}
                        <FaRegComment /> {blog.comments?.length}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : <p>Loading blogs...</p>}
          </div>
          <div className="sticky flex flex-col flex-wrap items-center w-full h-auto max-w-full gap-2 p-4 border-l-2 border-blue-600 shadow-md rounded-xl bg-black/30">
            <h3 className="mb-4 text-sm font-bold text-white">Top Creators</h3>
            {topCreators.map((creator, i) => (
              <div key={i} className="flex items-center w-full gap-3 p-2 mb-3 rounded-full bg-gray-950">
                <img src={creator.avatar || defaultAvatar} className="w-6 h-6 rounded-full" />
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-semibold text-white">@{creator.username}</p>
                  <p className="text-[10px] text-gray-400">{creator.blogs} blogs • {creator.likes} likes • {creator.views} views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AllBlogs;
