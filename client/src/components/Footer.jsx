import react from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from 'react-icons/fa6';

function Footer() {
    return (
        <>
            <div className="w-full p-4 m-0 bg-blue-950/10">
                <div className="flex items-center justify-between">
                    <h2 className="font-extrabold text-blue-900">DevOdyssey</h2>
                    <ul className="flex items-center gap-3 no-underline">
                        <li className="hover:scale-[1.1] hover:text-white">
                            <a href="https://github.com/aaditya-dubey09">
                                <FaGithub />
                            </a>
                        </li>
                        <li className="hover:scale-[1.1] hover:text-pink-600">
                            <a
                                href="https://instagram.com/cosmophile946">
                                <FaInstagram />
                            </a>
                        </li>

                        <li className="hover:scale-[1.1] hover:text-blue-600">
                            <a href="https://linkedin/in/aadityadubey">
                                <FaLinkedin />
                            </a>
                        </li>
                        <li className="hover:scale-[1.1] hover:text-black">
                            <a href="https://x.com/itsaadi-09">
                                <FaXTwitter />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col items-start justify-center w-full gap-3 p-4 mt-2 border-0">
                    <p className="text-sm font-semibold">Site Map</p>
                    <ul className="flex justify-center gap-2">
                        <li className="text-xs hover:underline">
                            <Link to="/Home">Home</Link>
                        </li>
                        <li className="text-xs hover:underline">
                            <Link to="/AllBlogs">Blogs</Link>
                        </li>
                        <li className="text-xs hover:underline">
                            <Link to="/Login">Login</Link>
                        </li>
                        <li className="text-xs hover:underline">
                            <Link to="/Signup">Signup</Link>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-[10px]">
                        All Rights Reserved &copy; 2025 DevOdyssey
                    </p>
                    <p className="text-[9px]">
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
