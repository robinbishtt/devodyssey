import { FaUser, FaKey } from "react-icons/fa";
import { FaPenNib } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUserThunk } from "../../store/slice/authSlice/auth.thunk";

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.authReducer);
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        if (isAuthenticated) navigate("/");
    }, [isAuthenticated, navigate]);

    const handleInputChange = (e) => {
        setLoginData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await dispatch(loginUserThunk(loginData));
        if (response?.payload?.success) {
            navigate("/");
        }
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-white md:flex-row bg-gradient-to-br from-gray-900 to-gray-950">
            {/* Branding Column */}
            <div className="p-6 md:p-8 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none bg-gradient-to-br from-sky-700 via-blue-800 to-sky-900 w-[20rem] md:max-w-md md:w-xs shadow-lg flex flex-col justify-center gap-6 z-[10] mb-6 md:mb-0 md:h-[27rem]">
                <div className="flex flex-col items-start gap-1">
                    <FaPenNib className="mb-1 text-xl text-white md:text-3xl" />
                    <h2 className="text-xl font-bold md:text-3xl">DevOdyssey</h2>
                    <p className="text-xs italic md:text-sm text-slate-200">
                        Craft your own journey
                    </p>
                </div>
                <p className="text-[10px] md:text-xs text-sky-300">
                    Welcome back to DevOdyssey! Log in to your account and start your
                    blog-powered story again.
                </p>
            </div>

            {/* Form Column */}
            <form className="flex flex-col items-center gap-3 md:gap-4 p-3 md:p-8 rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none bg-white/5 backdrop-blur-xl shadow-lg z-[10] relative min-w-[20rem] md:max-w-[70rem]" onSubmit={handleLogin}>
                <h3 className="mb-2 text-xl font-semibold text-center text-white md:text-2xl">
                    Log In
                </h3>

                {/* Username */}
                <label className="md:max-w-[30rem] flex items-center w-full gap-3 p-2 text-xs rounded-full md:p-3 bg-gray-900/60 md:text-sm">
                    <FaUser className="text-sky-300" />
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        aria-label="Username"
                        onChange={handleInputChange}
                        required
                        className="text-white bg-transparent outline-none placeholder:text-slate-400"
                    />
                </label>

                {/* Password */}
                <label className="md:max-w-[30rem] flex items-center w-full gap-3 p-2 text-xs rounded-full md:p-3 bg-gray-900/60 md:text-sm">
                    <FaKey className="text-sky-300" />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        aria-label="Password"
                        onChange={handleInputChange}
                        required
                        className="text-white bg-transparent outline-none placeholder:text-slate-400"
                    />
                </label>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="md:w-[90px] w-[50px] md:px-4 md:py-2 px-2 py-1 text-xs md:text-sm font-medium transition-transform rounded-full bg-gradient-to-r from-blue-700 to-violet-700 hover:scale-105"
                >
                    Login
                </button>

                <p className="text-[10px] text-center mt-3 text-slate-300">
                    Don't have an account?{" "}
                    <a href="/Signup" className="text-violet-400 hover:underline">
                        Sign Up
                    </a>
                </p>
            </form>
        </div>
    );
}

export default Login;
