import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllBlogsThunk } from "../store/slice/blogSlice/blogs.thunk";

function AllBlogs() {
  const dispatch = useDispatch();
    const { blogList, loading, error } = useSelector((state) => state.blogs);
    console.log("Blog list:");

  useEffect(() => {
    dispatch(getAllBlogsThunk());
  }, [dispatch]);

  return (
      <>
            {loading && <p>Loading blogs...</p>}
            {error && <p>Error: {error}</p>}
            <div className="flex items-center justify-center min-h-screen p-6">
                <div className="flex flex-col items-start justify-center w-auto gap-3 p-6 mt-20 rounded-3xl bg-sky-950/20">
          {Array.isArray(blogList) && blogList.length > 0 ? (
                  blogList.map(blog => (
                            <div
                                key={blog._id}
                                className="p-5 transition transition-transform duration-300 ease-in-out  border-l-2 bg-black border-blue-600 shadow-md hover:shadow-blue-500/30 rounded-xl hover:scale-[1.05]"
                            >
                                <h2 className="mb-2 font-bold">{blog.title}</h2>
                                <p className="text-xs text-white/60 md:min-w-[20rem] lg:min-w-[40rem] sm:min-w-[20rem]">{blog.content}</p>
                            </div>
                  ))
          ) : (
            <p>No blogs available</p>
          )}
                </div>
            </div>
        </>
    );
}

export default AllBlogs