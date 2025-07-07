import { FaPen } from "react-icons/fa";
import { MdOutlineDelete } from 'react-icons/md';

function AllDashboard() {
    const blogs = [
        { title: "Python", content: "Spandilabro hegde kample zuschi", id: "1" },
        { title: "Java", content: "Hombre unn kutze unn micheal", id: "2" },
        { title: "JavaScript", content: "Monosante itaricog campe", id: "3" },
        { title: "C++", content: "Deler quento amretino labrino", id: "4" },
        { title: "C#", content: "Lorem ipsum dolor amit set contrel", id: "5" },
    ];

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen p-6">
                <div className="flex flex-col items-center p-6 mt-20">
                    <h2 className="font-extrabold text-center">Your Dashboard</h2>
                    <form action="" className="flex flex-col gap-5 mt-5 text-sm">
                        <legend className="flex items-center justify-center gap-2 font-sans text-sm font-bold">
                            <FaPen />Edit Profile</legend>
                                <label htmlFor="fullName">
                            Full Name -{" "}
                                    <input
                                        type="text"
                                        name="fullName"
                                        id="fullName"
                                        className="p-3 text-xs rounded-full outline-none bg-gray-950 text-slate-500"
                                        placeholder="enter name"
                                    />
                                </label>
                                <label htmlFor="username">
                            Username - {" "}
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        className="p-3 text-xs rounded-full outline-none bg-gray-950 text-slate-500"
                                        placeholder="enter username"
                                    />
                                </label>
                            </form>
                        <button className="p-2 mt-5 text-xs bg-blue-700 rounded-full group-hover:hidden w-[70px]">
                            Save
                        </button>
                </div>
                <div className="flex flex-col items-start justify-center w-auto gap-3 p-6 rounded-3xl bg-sky-950/20">
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <div
                                key={blogs.id}
                                className="p-5 transition transition-transform duration-300 ease-in-out  border-l-2 bg-black border-blue-600 shadow-md hover:shadow-blue-500/30 rounded-xl hover:scale-[1.05]"
                            >
                                <h2 className="mb-2 font-bold">{blog.title}</h2>
                                <p className="text-xs text-white/60 md:min-w-[20rem] lg:min-w-[40rem] sm:min-w-[20rem]">
                                    {blog.content}
                                </p>
                                <div className="flex justify-end gap-2 mt-3">
                                <button
                                    type="submit"
                                    className="p-3 px-2 py-1 rounded-full text-[10px] hover:bg-blue-500 active:bg-blue-600 text-white border-blue-600 border hover:border-0 flex justify-center gap-1 items-center"
                                >
                                    <FaPen />Edit</button>
                                <button
                                    type="submit"
                                    className="p-3 px-2 py-1 rounded-full text-[10px] hover:bg-red-500 active:bg-red-600 text-white border-red-600 border hover:border-0 flex justify-center gap-1 items-center"
                                >
                                    <MdOutlineDelete />Delete</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Loading data...</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default AllDashboard;
