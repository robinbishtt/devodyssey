function Write() {

    return (
        <>
            <div className="flex flex-col justify-center min-h-screen gap-5 p-6">
                <h2 className="text-2xl font-extrabold text-center">Write Your Blog!</h2>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        className="p-3 outline-none rounded-3xl bg-gray-950/50"
                    />
                    <textarea
                        type="text"
                        name="title"
                        placeholder="Content"
                        className="p-3 outline-none rounded-3xl bg-gray-950/50"
                    ></textarea>
                    <input
                        type="text"
                        name="title"
                        placeholder="Tags (comma separated)"
                        className="p-3 outline-none rounded-3xl bg-gray-950/50"
                />
                <button
                    type="submit"
                    className="bg-blue-700 hover:bg-blue-800 active:bg-blue-900 rounded-3xl text-xs md:text-sm w-[80px] md:w-[100px] px-2 py-2 md:px-2 md:py-2">Publish</button>
                </div>
        </>
    );
}

export default Write;
