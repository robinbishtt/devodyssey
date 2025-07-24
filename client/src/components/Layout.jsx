import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RouteLoader from "../RouteLoader";
import MetaManager from "./utils/metaManager";

export default function Layout() {
    const location = useLocation();
    const hideLayout =
        location.pathname === "/Login" || location.pathname === "/login" || location.pathname === "/Signup" || location.pathname === "/signup";

    return (
        <div className='min-h-screen'>
            <MetaManager />
            {!hideLayout && <Navbar />}
            <RouteLoader />
            <main>
                <Outlet />
            </main>
            {!hideLayout && <Footer />}
        </div>
    );
}