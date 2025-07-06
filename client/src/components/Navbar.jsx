import react from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50 bg-transparent">
                <div className="mx-5 my-3 border-2 border-white/30 backdrop-blur-3xl bg-black/40 rounded-full p-4 flex justify-between items-center">
                    <h2 className='text-blue-900 font-extrabold'>DevOdyssey</h2>
                    <ul className="no-underline text-white flex items-center gap-3">
                        <li className="text-xs hover:bg-gray-400/30 rounded-3xl px-2 py-1">
                            <Link to="/Home">Home</Link>
                        </li>
                        <li className="text-xs hover:bg-gray-400/30 rounded-3xl px-2 py-1">
                            <Link to="/AllBlogs">Blogs</Link>
                        </li>
                        <li className="text-xs hover:bg-gray-400/30 rounded-3xl px-2 py-1">
                            <Link to="/Login">Login</Link>
                        </li>
                        <li className="text-xs hover:bg-gray-400/30 rounded-3xl px-2 py-1">
                            <Link to="/Signup">Signup</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Navbar