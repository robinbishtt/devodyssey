import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { getAllBlogsThunk } from "../store/slice/blogSlice/blogs.thunk";
import { viewBlogThunk } from "../store/slice/blogSlice/interactionSlice/interact.thunk";
import { useNavigate } from "react-router-dom";
import { BiLike } from "react-icons/bi";
import { FaEye, FaRegComment } from "react-icons/fa";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import backgroundImg from "../assets/background.jpg";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dayjs.extend(relativeTime);
  const { blogList, loading, error } = useSelector((state) => state.blogs);

  const [Paused, setPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(getAllBlogsThunk());
  }, [dispatch]);

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

  const blogs = popularBlogs;
  const blog = blogs[currentIndex] || {};
  const defaultAvatar = "https://api.dicebear.com/6.x/avataaars/svg?seed=" + blog.author;

  // get layout setting from localStorage
  const [layout, setLayout] = useState(localStorage.getItem("layout") || "list");
  useEffect(() => {
    const handleStorage = () => setLayout(localStorage.getItem("layout") || "list");
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    if (!Paused && blogs.length > 0) {
      const interval = setInterval(() => {
        const handleNext = () => {
          setCurrentIndex((prev) => (prev + 1) % blogs.length);
        };
        handleNext();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [Paused, currentIndex, blogs]);


  function handleBlogClick(blog) {
    dispatch(viewBlogThunk({ id: blog._id }));
    navigate(`/blogs/${encodeURIComponent(blog.title)}`);
  }

  function handleClickAuthor(blog) {
    navigate(`/author/${encodeURIComponent(blog.author?.username || "unknown")}`);
  }

  return (
    <>
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-[url(../../src/assets/background.jpg)] bg-center bg-cover relative">
        <div className="flex flex-col items-center justify-center w-full min-h-[60vh] text-white bg-black/60 z-10">
          <h1 className="flex gap-2 mb-2 text-4xl font-extrabold">
            Welcome to <span className="text-blue-500">DevOdyssey!</span>
          </h1>
          <p className="mb-4 text-lg text-white/80">A modern blogging platform for developers and creators.</p>
          <button
            className="px-6 py-2 mt-2 text-lg font-semibold text-white transition bg-blue-600 rounded-full hover:bg-blue-700 hover:scale-[1.04] shadow-lg"
            onClick={() => navigate('/Signup')}
          >
            Get Started
          </button>
          <div className="flex gap-8 mt-8 text-center">
            <div>
              <div className="text-2xl font-bold">{blogList.length}</div>
              <div className="text-xs text-white/60">Blogs</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{[...new Set(blogList.map(b => b.author?.username))].length}</div>
              <div className="text-xs text-white/60">Authors</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{blogList.reduce((acc, b) => acc + (b.views || 0), 0)}</div>
              <div className="text-xs text-white/60">Total Views</div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 to-transparent" />
      </div>

      {/* About Section */}
      <div className="p-5 text-white bg-black">
        <h3 className="mt-12 mb-5 text-2xl font-bold text-blue-400">What is DevOdyssey?</h3>
        <p className="max-w-3xl mx-auto text-justify text-white/80">
          DevOdyssey is a vibrant, open platform where developers and creators share their ideas, stories, and projects. Discover trending blogs, connect with authors, and grow your knowledge in a welcoming community.
        </p>

        <h3 className="mt-16 text-xl font-bold">About</h3>
        <div className="flex flex-col items-center justify-between max-w-4xl gap-5 mx-auto md:flex-row">
          <p className="flex-1 text-justify text-white/80">
            Whether you're a seasoned developer or just starting out, DevOdyssey provides the tools and audience to amplify your voice. Join us and start your journey today!
          </p>
          <img className="w-[30%] rounded-lg" src={backgroundImg} alt="about" />
        </div>

        {/* --- New: Partner Logos --- */}
        <div className="flex flex-wrap items-center justify-center gap-8 my-12">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" className="h-10" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/49/Redux.png" alt="Redux" className="h-10" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="Node.js" className="h-10" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" alt="Express" className="h-10" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/MongoDB_Logo.svg" alt="MongoDB" className="h-10" />
        </div>

        {/* --- New: Testimonials --- */}
        <h3 className="mt-16 mb-8 text-xl font-bold text-center text-blue-400">What our users say</h3>
        <div className="grid max-w-5xl grid-cols-1 gap-6 mx-auto mb-12 md:grid-cols-3">
          <div className="p-6 shadow-lg bg-gray-900/70 rounded-xl">
            <p className="mb-2 text-white/80">“DevOdyssey helped me connect with other devs and share my journey. The UI is clean and the community is awesome!”</p>
            <div className="flex items-center gap-2 mt-4">
              <img src="https://api.dicebear.com/6.x/avataaars/svg?seed=alice" className="w-8 h-8 rounded-full" alt="user" />
              <span className="text-xs text-white/60">Alice, Full Stack Dev</span>
            </div>
          </div>
          <div className="p-6 shadow-lg bg-gray-900/70 rounded-xl">
            <p className="mb-2 text-white/80">“I love the featured blogs and the ability to customize my reading experience. Highly recommended!”</p>
            <div className="flex items-center gap-2 mt-4">
              <img src="https://api.dicebear.com/6.x/avataaars/svg?seed=bob" className="w-8 h-8 rounded-full" alt="user" />
              <span className="text-xs text-white/60">Bob, Frontend Engineer</span>
            </div>
          </div>
          <div className="p-6 shadow-lg bg-gray-900/70 rounded-xl">
            <p className="mb-2 text-white/80">“A must-have platform for anyone who wants to learn, share, and grow in tech. The dark mode is a bonus!”</p>
            <div className="flex items-center gap-2 mt-4">
              <img src="https://api.dicebear.com/6.x/avataaars/svg?seed=carol" className="w-8 h-8 rounded-full" alt="user" />
              <span className="text-xs text-white/60">Carol, Student</span>
            </div>
          </div>
        </div>

        {/* --- Existing: Featured Blogs --- */}
        <h3 className="mt-16 mb-12 text-2xl font-bold text-center">Featured Blogs</h3>
        {loading && <p className="text-center text-white/70">Loading blogs...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}

        {/* Featured Blogs: grid or list based on layout */}
        {blogs.length > 0 && (
          <div
            className={`relative w-full mx-auto drop-shadow-2xl ${layout === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : ""}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {layout === "grid"
              ? blogs.map((b, idx) => (
                <div key={b._id || idx} className="flex flex-col gap-3 p-6 text-white rounded-xl bg-slate-900/50 hover:shadow-blue-500/30 hover:scale-[1.03] transition-transform cursor-pointer" onClick={() => handleBlogClick(b)}>
                  <div className="flex items-center gap-2 mb-2 text-xs" onClick={e => { e.stopPropagation(); handleClickAuthor(b); }}>
                    <img src={b.author?.avatar || defaultAvatar} alt="Author profile" className="w-6 h-6 border-l-2 rounded-full border-l-blue-600" />
                    <span>@{b.author?.username}</span>
                    <span>{dayjs(b.createdAt).fromNow()}</span>
                  </div>
                  <h3 className="text-lg font-bold">{b.title}</h3>
                  <p className="text-sm text-white/80 line-clamp-4">{b.content}</p>
                  <div className="flex items-center gap-4 mt-2 text-white/70">
                    <span className="flex items-center gap-1"><BiLike /> {b.likes?.length}</span>
                    <span className="flex items-center gap-1"><FaEye /> {b.views}</span>
                    <span className="flex items-center gap-1"><FaRegComment /> {b.comments?.length}</span>
                  </div>
                </div>
              ))
              : (
                <div className="flex flex-col gap-3 p-6 text-white rounded-xl bg-slate-900/50">
                  <div className="flex items-center gap-2 text-[10px]" onClick={() => handleClickAuthor(blog)}>
                    <img src={blog.author?.avatar || defaultAvatar} alt="Author profile" className="w-4 h-4 border-l-2 rounded-full border-l-blue-600" />
                    <p>@{blog.author?.username}</p>
                    <p>{dayjs(blog.createdAt).fromNow()}</p>
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
              )}
          </div>
        )}

        {/* Blog carousel dots (only for list layout) */}
        {layout === "list" && blogs.length > 0 && (
          <div
            className="flex justify-center gap-2 mt-4"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {blogs.map((blog, idx) => (
              <button
                key={blog._id || idx}
                onClick={() => setCurrentIndex(idx)}
                className={`focus:outline-none ${currentIndex === idx ? "scale-125" : "opacity-50"} transition-transform duration-300`}
                aria-label={`Go to blog ${idx + 1}`}
              >
                <svg
                  stroke="currentColor"
                  fill={currentIndex === idx ? "blue" : "gray"}
                  strokeWidth="0"
                  viewBox="0 0 256 256"
                  className="w-6 h-6 text-foreground"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="128" cy="128" r="28" />
                </svg>
              </button>
            ))}
          </div>
        )}

        {/* --- New: Newsletter Signup --- */}
        <div className="flex flex-col items-center max-w-xl p-8 mx-auto mt-20 mb-10 shadow-lg bg-gray-900/80 rounded-2xl">
          <h3 className="mb-2 text-xl font-bold text-blue-400">Stay in the loop!</h3>
          <p className="mb-4 text-center text-white/70">Subscribe to our newsletter for the latest blogs, platform updates, and more.</p>
          <form className="flex flex-col items-center w-full gap-3 md:flex-row md:gap-2">
            <input type="email" required placeholder="Your email address" className="w-full px-4 py-2 text-white bg-gray-800 rounded-full outline-none md:w-auto" />
            <button type="submit" className="px-6 py-2 font-semibold text-white transition bg-blue-600 rounded-full hover:bg-blue-700 hover:scale-[1.04] shadow-lg">Subscribe</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Home;
