import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RouteLoader from "../RouteLoader";

export default function Layout() {
    const location = useLocation();
    const hideLayout =
        location.pathname === "/Login" || location.pathname === "/login" || location.pathname === "/Signup" || location.pathname === "/signup";

    // Set theme class on root div for Tailwind
    // const themeClass = theme === "dark" ? "dark" : theme === "light" ? "light" : "";

    return (
        <div className={`min-h-screen`}>
            {!hideLayout && <Navbar />}
            <RouteLoader />
            <main>
                <Outlet />
            </main>
            {!hideLayout && <Footer />}
        </div>
    );
}