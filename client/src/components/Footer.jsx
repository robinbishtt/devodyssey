import react from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaInstagram, FaLinkedin, FaDev } from "react-icons/fa";
import { FaXTwitter } from 'react-icons/fa6';

function Footer() {
    return (
        <>
            <div className="bg-[url(../../src/assets/blogs-bg.jpg)] bg-contain bg-clip-text font-bold text-transparent animate-textReverse uppercase text-lg">
                <span className="flex items-center justify-center w-full p-5 tracking-widest">
                    <a href="/write" className="hover:bg-black/20">
                        Leave Your Mark Here!
                    </a>
                </span>
            </div>
            <div className="w-full p-4 m-0 bg-blue-950/10">
                <div className="flex items-center justify-between">
                    <h2 className="ml-4 font-extrabold text-blue-900">DevOdyssey</h2>
                    <ul className="flex items-center gap-3 no-underline">
                        <li className="hover:scale-[1.1] hover:text-orange-300">
                            <a href="https://github.com/aaditya-dubey09">
                                <FaGithub />
                            </a>
                        </li>
                        <li className="hover:scale-[1.1] hover:text-orange-300">
                            <a href="https://instagram.com/cosmophile946">
                                <FaInstagram />
                            </a>
                        </li>

                        <li className="hover:scale-[1.1] hover:text-orange-300">
                            <a href="https://linkedin/in/aadityadubey">
                                <FaLinkedin />
                            </a>
                        </li>
                        <li className="hover:scale-[1.1] hover:text-orange-300">
                            <a href="https://x.com/itsaadi-09">
                                <FaXTwitter />
                            </a>
                        </li>
                        <li className="hover:scale-[1.1] hover:text-orange-300">
                            <a href="https://dev.to/aadityadubey">
                                <FaDev />
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

                    <div className="relative flex items-center justify-center mb-12">
                        <h3 className="absolute text-5xl opacity-25">Crafted By -</h3>
                        <h3 className="absolute font-sans text-2xl font-bold tracking-widest text-blue-900 transition-transform duration-1000 ease-in-out hover:animate-pulse">
                            Aaditya
                        </h3>
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
