import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg';
import { FaPenNib } from 'react-icons/fa';
import { BiHome, BiSolidHome } from 'react-icons/bi';

function Navbar() {

    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector((state) => state.authReducer);

    function handleClickProfile() {
        navigate('/userProfile');
    }

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50 bg-transparent" id='navbar'>
                <div className="flex items-center justify-between p-4 mx-5 my-3 border-2 rounded-full border-white/10 backdrop-blur-3xl bg-black/40">
                    <h2 className="flex items-center gap-1 font-extrabold text-transparent bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text">
                        <FaPenNib size={14} className="mb-1 text-blue-600" />DevOdyssey</h2>
                    <ul className="flex items-center gap-3 text-white no-underline">
                        <li className="p-1 text-xs cursor-pointer hover:bg-black/30 focus:bg-black/30 focus:text-gray-700 hover:text-gray-700 rounded-3xl">
                            <Link to="/Home"><BiSolidHome size={15} /></Link>
                        </li>
                        <li className="px-2 py-1 text-xs cursor-pointer hover:bg-black/30 hover:text-blue-700 rounded-3xl">
                            <Link to="/AllBlogs" id='blogsBtn'>Blogs</Link>
                        </li>
                        <li className="px-2 py-1 text-xs cursor-pointer hover:bg-black/30 hover:text-blue-700 rounded-3xl">
                            <Link to="/Dashboard" id='dashboardBtn'>Dashboard</Link>
                        </li>
                        <li className="px-2 py-1 text-xs cursor-pointer hover:bg-black/30 hover:text-blue-700 rounded-3xl">
                            <Link to="/Write" id='writeBtn'>Write</Link>
                        </li>
                        {isAuthenticated ?
                            <div
                                className="flex items-center gap-2 text-[10px]"
                                onClick={() => handleClickProfile()}
                            >
                                {user ? (
                                    <img
                                        src={user.avatar}
                                        alt="Author profile"
                                        className="w-4 h-4 border-l-2 rounded-full cursor-pointer border-l-blue-600"
                                    />
                                ) : (
                                    <CgProfile className="w-4 h-4 border-l-2 rounded-full cursor-pointer border-l-blue-600" />
                                )}
                            </div> :
                            <ul className="flex items-center gap-3 text-white no-underline">
                                <li className="px-2 py-1 text-xs hover:bg-black/30 hover:text-blue-700 rounded-3xl">
                                    <Link to="/Login">Login</Link>
                                </li>
                                <li className="px-2 py-1 text-xs hover:bg-black/30 hover:text-blue-700 rounded-3xl">
                                    <Link to="/Signup">Signup</Link>
                                </li>
                            </ul>}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Navbar