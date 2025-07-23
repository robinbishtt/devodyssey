import { Link } from "react-router-dom";
import { FaGithub, FaInstagram, FaLinkedin, FaDev } from "react-icons/fa";
import { FaXTwitter } from 'react-icons/fa6';
import { IoIosHelpCircleOutline } from "react-icons/io";
import { devOdysseyTour } from "../components/utils/driverTour";

function Footer() {
    return (
        <>
            <div className="bg-[url(../../src/assets/blogs-bg.jpg)] bg-contain bg-clip-text font-bold text-transparent uppercase text-lg">
                <span className="flex items-center justify-center w-full p-5 text-sm tracking-widest md:text-lg">
                    <Link to="/Write" className="hover:bg-black/20">
                        Leave Your Mark Here!
                    </Link>
                </span>
            </div>
            <div className="w-full p-4 m-0 bg-blue-950/10">
                <div className="flex items-center justify-between">
                    <h2 className="ml-4 font-extrabold text-blue-900">DevOdyssey</h2>
                    <div className="flex items-center justify-end gap-2">
                    <ul className="flex items-center gap-3 text-white no-underline">
                        <li className="hover:scale-[1.1] hover:text-blue-600 hover:rotate-12 text-xs md:text-sm">
                            <Link to="https://github.com/aaditya-dubey09">
                                <FaGithub />
                            </Link>
                        </li>
                        <li className="hover:scale-[1.1] hover:text-blue-600 hover:rotate-12 text-xs md:text-sm">
                            <Link to="https://instagram.com/cosmophile946">
                                <FaInstagram />
                            </Link>
                        </li>

                        <li className="hover:scale-[1.1] hover:text-blue-600 hover:rotate-12 text-xs md:text-sm">
                            <Link to="https://linkedin/in/aadityadubey">
                                <FaLinkedin />
                            </Link>
                        </li>
                        <li className="hover:scale-[1.1] hover:text-blue-600 hover:rotate-12 text-xs md:text-sm">
                            <Link to="https://x.com/itsaadi-09">
                                <FaXTwitter />
                            </Link>
                        </li>
                        <li className="hover:scale-[1.1] hover:text-blue-600 hover:rotate-12 text-xs md:text-sm">
                            <Link to="https://dev.to/aadityadubey">
                                <FaDev />
                            </Link>
                        </li>
                    </ul>
                    <button onClick={() => devOdysseyTour().drive()} className="flex items-center gap-1 p-1 text-[10px] text-white   rounded-full hover:bg-blue-800 bg-blue-700 md:text-xs">
                        Guide Me<IoIosHelpCircleOutline size={15} color="#e0e0e0" />
                    </button>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-center w-full gap-3 p-4 mt-1 text-white border-0">
                        <p className="text-xs font-semibold md:text-sm">Quick Links</p>
                        <ul className="flex justify-center gap-2">
                        <li className="md:text-xs text-[10px] hover:text-white/30">
                                <Link to="/Home">Home</Link>
                            </li>
                        <li className="md:text-xs text-[10px] hover:text-white/30">
                                <Link to="/AllBlogs">Blogs</Link>
                            </li>
                        <li className="md:text-xs text-[10px] hover:text-white/30">
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="md:text-xs text-[10px] hover:text-white/30">
                                <Link to="/write">Write</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="relative flex items-center justify-center mb-5 md:mb-12">
                        <h3 className="absolute text-3xl text-white md:text-5xl opacity-10">Crafted By -</h3>
                        <h3 className="absolute font-sans text-lg font-extrabold tracking-widest text-blue-900 transition-transform duration-1000 ease-in-out md:text-2xl hover:animate-pulse">
                            Aaditya
                        </h3>
                    </div>
                <div className="flex flex-col items-center justify-center gap-2 text-white">
                    <p className="md:text-[10px] text-[7px]">
                        All Rights Reserved &copy; 2025 DevOdyssey
                    </p>
                    <p className="md:text-[9px] text-[6px]">
                        <Link to="#" className="hover:text-sky-700">
                            Privacy Policy
                        </Link>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        <Link to="#" className="hover:text-sky-700">
                            Terms of Service
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Footer;
