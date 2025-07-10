import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBlogsThunk } from "../store/slice/blogSlice/blogs.thunk";

function Home() {
  const dispatch = useDispatch();
  const { blogList, loading, error } = useSelector((state) => state.blogs);

  const [Paused, setPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const blogs = blogList || [];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? blogs.length - 1 : prev - 1));
  }; // Note: will use this handlePrev function while creating nav button controlls

  useEffect(() => {
    dispatch(getAllBlogsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (!Paused && blogs.length > 0) {
      const interval = setInterval(() => {
        const handleNext = () => {
          setCurrentIndex((prev) => (prev + 1) % blogs.length);
        };
        handleNext();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [Paused, currentIndex, blogs]);

  const blog = blogs[currentIndex] || {};

  return (
    <>
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-[url(../../src/assets/background.jpg)] bg-center bg-cover">
        <div className="flex flex-col items-center justify-center w-full min-h-screen text-white bg-black/60">
          <h1 className="flex gap-2 text-3xl font-bold">
            Welcome to
            <strong className="font-extrabold text-blue-900">DevOdyssey!</strong>
          </h1>
          <p className="text-lg text-white/70">A blogging platform for everyone</p>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-5 text-white bg-gradient-to-br from-black to-white">
        <h3 className="mt-12 mb-5 text-xl font-bold">What is DevOdyssey?</h3>
        <p className="text-justify text-white/80">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni eaque hic earum accusamus...
        </p>

        <h3 className="mt-16 text-xl font-bold">About</h3>
        <div className="flex items-center justify-between gap-5">
          <p className="text-justify text-white/80">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates placeat sapiente distinctio...
          </p>
          <img className="w-[30%] rounded-lg" src="../../src/assets/background.jpg" alt="author" />
        </div>

        {/* Featured Blogs Carousel */}
        <h3 className="mt-16 mb-12 text-xl font-bold text-center">Featured Blogs</h3>
        {loading && <p className="text-center text-white/70">Loading blogs...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}

        {blogs.length > 0 && (
          <div
            className="relative w-full max-w-2xl mx-auto overflow-hidden drop-shadow-2xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="p-6 text-white rounded-xl bg-slate-800">
              <h3 className="text-lg font-bold">{blog.title}</h3>
              <p className="text-sm">{blog.content}</p>
            </div>
          </div>
        )}

        {/* Selector Dots */}
        <div
          className="flex justify-center gap-2 mt-4"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {blogs.map((blog, idx) => (
            <button
              key={blog._id || idx}
              onClick={() => setCurrentIndex(idx)}
              className={`focus:outline-none ${
                currentIndex === idx ? "scale-125" : "opacity-50"
              } transition-transform duration-300`}
              aria-label={`Go to blog ${idx + 1}`}
            >
              <svg
                stroke="currentColor"
                fill={currentIndex === idx ? "blue" : "gray"}
                strokeWidth="0"
                viewBox="0 0 256 256"
                className="w-6 h-6 text-foreground"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="128" cy="128" r="28" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
