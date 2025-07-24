import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { BiLogOut, BiUser } from 'react-icons/bi'
import { MdOutlineDashboard, MdAnalytics, MdSettings } from 'react-icons/md'
import { logoutUserThunk } from '../../store/slice/authSlice/auth.thunk'
import PageHeader from '../../components/PageHeader'

const DashboardSidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUserThunk())
            navigate("/Login");
    };

    return (
        <>
            <div className="flex items-center justify-center w-full px-3 py-10 sm:justify-start sm:w-[20%] bg-gray-950/50 h-auto sm:min-h-screen rounded-r-3xl shadow-lg">
                <nav className="flex flex-col items-center justify-center w-full gap-2 text-white">
                    <PageHeader className={`sm:text-[8px] md:text-xs lg:text-sm`} />
                    <Link
                        to="/dashboard/profile"
                        className="transition-all duration-200 shadow-sm rounded-xl focus:text-gray-700 focus:bg-gray-900/30 hover:scale-[0.98]"
                    >
                        <div className="flex items-center w-full gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-xl hover:bg-gray-950 hover:text-gray-300">
                            <BiUser size={18} /> Profile
                        </div>
                    </Link>
                    <Link
                        to="/dashboard/analytics"
                        className="transition-all duration-200 shadow-sm rounded-xl focus:text-gray-700 focus:bg-gray-900/30 hover:scale-[0.98]"
                    >
                        <div className="flex items-center w-full gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-xl hover:bg-gray-950 hover:text-gray-300">
                            <MdAnalytics size={18} /> Analytics
                        </div>
                    </Link>
                    <Link
                        to="/dashboard/myblogs"
                        className="transition-all duration-200 shadow-sm rounded-xl focus:text-gray-700 focus:bg-gray-900/30 hover:scale-[0.98]"
                    >
                        <div className="flex items-center w-full gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-xl hover:bg-gray-950 hover:text-gray-300">
                            <MdOutlineDashboard size={18} /> My Blogs
                        </div>
                    </Link>
                    <Link
                        to="/dashboard/settings"
                        className="transition-all duration-200 shadow-sm rounded-xl focus:text-gray-700 focus:bg-gray-900/50 hover:scale-[0.98]"
                    >
                        <div className="flex items-center w-full gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-xl hover:bg-gray-950 hover:text-gray-300">
                            <MdSettings size={18} /> Settings
                        </div>
                    </Link>
                <button type='button' className='flex items-center gap-1 px-2 py-1 text-sm text-white bg-red-600 border-0 rounded-full bottom-10 hover:bg-red-700 active:bg-red-800' onClick={handleLogout}>
                    <BiLogOut />Logout
                </button>
                </nav>
            </div>
        </>
    )
}

export default DashboardSidebar
