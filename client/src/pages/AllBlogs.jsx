function AllBlogs() {

    const blogs = [
        { title: "Python", content: "Spandilabro hegde kample zuschi", id: "1" },
        { title: "Java", content: "Hombre unn kutze unn micheal", id: "2" },
        { title: "JavaScript", content: "Monosante itaricog campe", id: "3" },
        { title: "C++", content: "Deler quento amretino labrino", id: "4" },
        { title: "C#", content: "Lorem ipsum dolor amit set contrel", id: "5" },
    ];

    return (
        <>
            <div className="flex items-center justify-center min-h-screen p-6">
                <div className="flex flex-col items-start justify-center w-auto gap-3 p-6 mt-20 rounded-3xl bg-sky-950/20">
                    {blogs.length > 0 ? (
                        blogs.map((blogs) => (
                            <div
                                key={blogs.id}
                                className="p-5 transition transition-transform duration-300 ease-in-out  border-l-2 bg-black border-blue-600 shadow-md hover:shadow-blue-500/30 rounded-xl hover:scale-[1.05]"
                            >
                                <h2 className="mb-2 font-bold">{blogs.title}</h2>
                                <p className="text-xs text-white/60 md:min-w-[20rem] lg:min-w-[40rem] sm:min-w-[20rem]">{blogs.content}</p>
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

export default AllBlogs