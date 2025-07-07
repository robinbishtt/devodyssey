import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RouteLoader from "../RouteLoader";

export default function Layout() {
    const location = useLocation();
    const hideLayout =
        location.pathname === "/Login" || location.pathname === "/Signup";

    return (
        <div className="min-h-screen text-white bg-black">
            {!hideLayout && <Navbar />}
            <RouteLoader />
            <main>
                <Outlet />
            </main>
            {!hideLayout && <Footer />}
        </div>
    );
}