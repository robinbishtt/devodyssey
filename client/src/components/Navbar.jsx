import react from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50 bg-transparent">
                <div className="flex items-center justify-between p-4 mx-5 my-3 border-2 rounded-full border-white/30 backdrop-blur-3xl bg-black/40">
                    <h2 className="font-extrabold text-blue-900">DevOdyssey</h2>
                    <ul className="flex items-center gap-3 text-white no-underline">
                        <li className="px-2 py-1 text-xs hover:bg-gray-400/30 rounded-3xl">
                            <Link to="/Home">Home</Link>
                        </li>
                        <li className="px-2 py-1 text-xs hover:bg-gray-400/30 rounded-3xl">
                            <Link to="/AllBlogs">Blogs</Link>
                        </li>
                        <li className="px-2 py-1 text-xs hover:bg-gray-400/30 rounded-3xl">
                            <Link to="/Dashboard">Dashboard</Link>
                        </li>
                        <li className="px-2 py-1 text-xs hover:bg-gray-400/30 rounded-3xl">
                            <Link to="/Write">Write</Link>
                        </li>
                        <li className="px-2 py-1 text-xs hover:bg-gray-400/30 rounded-3xl">
                            <Link to="/Login">Login</Link>
                        </li>
                        <li className="px-2 py-1 text-xs hover:bg-gray-400/30 rounded-3xl">
                            <Link to="/Signup">Signup</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Navbar