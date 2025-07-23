import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteUserThunk, logoutUserThunk } from "../../../store/slice/authSlice/auth.thunk";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { MdWarning } from "react-icons/md";
import { FaInfo } from "react-icons/fa";
import { BiCode } from "react-icons/bi";
import { applyThemeClass, getStoredTheme } from "../../../components/utils/theme";

const SettingsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPopup, setShowPopup] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState("");

    // frontend-only settings
    const [fontSize, setFontSize] = useState("base");
    const [layout, setLayout] = useState("list");
    const [selectedTheme, setSelectedTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        const currentTheme = getStoredTheme();
        setSelectedTheme(currentTheme);
        applyThemeClass(currentTheme);
    }, []);

    // Apply theme and font size to body
    useEffect(() => {
        document.body.style.fontSize = fontSize === "base" ? "16px" : fontSize === "large" ? "18px" : "14px";
    }, [fontSize]);

    const handleThemeChange = (theme) => {
        setSelectedTheme(theme);
        localStorage.setItem("theme", theme);
        applyThemeClass(theme);
    }

    const handleDelete = () => {
        if (!passwordConfirm) return toast.error("Enter your password to confirm deletion");
        dispatch(deleteUserThunk(passwordConfirm)).then(() => {
            dispatch(logoutUserThunk())
            navigate("/Signup");
        });
    };

    return (
        <div className="flex flex-col items-center h-full mx-auto text-white">

                <h2 className="text-xl font-bold">Settings</h2>

                <div className="w-full mt-3 space-y-3 text-sm text-center text-white/70">
                    <div className="flex flex-col items-center gap-2 p-3 rounded-xl">
                        <span className="font-semibold text-blue-400">Personalization</span>
                    <div className="flex flex-col w-full gap-2">
                            <label className="flex items-center justify-between w-full mt-6 text-sm text-white/70">
                                Theme:
                                    <select
                                        value={selectedTheme}
                                        onChange={(e) => handleThemeChange(e.target.value)}
                                        className="px-3 py-1 text-xs text-white rounded-full bg-gray-950/80 focus:outline-none"
                                    >
                                        <option value="light">Light</option>
                                        <option value="dark"> Dark</option>
                                    </select>
                            </label>
                        <div className="flex flex-col w-full gap-2">
                            <label className="flex items-center justify-between w-full text-sm text-white/70">
                                    Font Size:
                                    <select value={fontSize} onChange={e => setFontSize(e.target.value)} className="p-1 text-xs text-white border-0 rounded-full outline-none bg-gray-950/80">
                                        <option value="small">Small</option>
                                        <option value="base">Base</option>
                                        <option value="large">Large</option>
                                    </select>
                                </label>
                                <label className="flex items-center justify-between">
                                    Blog Layout:
                                    <select value={layout} onChange={e => setLayout(e.target.value)} className="p-1 text-xs text-white border-0 rounded-full outline-none bg-gray-950/80">
                                        <option value="list">List</option>
                                        <option value="grid">Grid</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                        <p className="flex items-center justify-center gap-2 p-2 rounded-xl"><BiCode size={24} color="#007bff" />Source Code → <a href="https://github.com/aaditya-dubey09/devodyssey" className="text-white hover:text-blue-600" target="_blank">DevOdyssey</a></p>
                        <div className="p-2 rounded-xl">
                            <span className="flex items-center justify-center mb-3 font-semibold text-blue-400">
                                <FaInfo size={12} /> Pages Info</span>
                            <div className="flex flex-col gap-3 text-left text-justify break-words">
                                <p><span className="tracking-wider">Home </span>contains the hero section, featured blogs, testimonials, and featured blogs - which is selected based on likes and views.</p>
                                <p><span className="tracking-wider">Blogs page </span>has the list of all blogs, popular blogs and top creators. popular blogs and top creators are selected based on engagement such as likes, views and total blogs published.</p>
                                <p><span className="tracking-wider">Dashboard </span>is your personal space to manage all your blogs, analytics, settings and profile.</p>
                                <p><span className="tracking-wider">Write </span>page is where you publish your blogs from and share your journey.</p>
                            </div>
                        </div>
                        <p className="p-2 rounded-xl">About → DevOdyssey is an open source platform where developers share ideas.</p>
                    </div>

                    <div className="p-3 mt-5 text-sm bg-gradient-to-br from-black to-red-500/60 rounded-3xl">
                        <span className="flex items-center gap-2 font-bold"><MdWarning size={24} color="orange" />Warning:</span>
                        <p className="mt-2 text-white/70">Are you sure you want to delete your account? This action cannot be undone.</p>
                        <button onClick={() => setShowPopup(true)} className="px-4 py-2 mt-6 font-semibold text-white transition bg-red-600 rounded-full hover:bg-red-700 hover:scale-[1.02]">
                            Delete Account
                        </button>
                    </div>

                    {showPopup && (
                        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black/80">
                            <div className="p-6 bg-gray-950 rounded-xl shadow-lg w-[90%] max-w-sm">
                                <h3 className="mb-4 text-lg font-bold text-center">Confirm Password to Delete</h3>
                                <input
                                    type="password"
                                    value={passwordConfirm}
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                    placeholder="Enter password"
                                    className="w-full px-3 py-2 text-sm text-white rounded-full outline-none bg-gray-800/50 placeholder:text-white/60"
                                />
                                <div className="flex justify-between mt-4 text-sm">
                                    <button
                                        onClick={() => setShowPopup(false)}
                                        className="px-4 py-2 text-white transition rounded-full bg-gray-600/50 hover:bg-gray-700"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="px-4 py-2 text-white transition rounded-full bg-red-600/80 hover:bg-red-700/80"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
        </div> // Idea: adding triangles to the featured section and logo to navbar both made by code
    );
};

export default SettingsPage;
