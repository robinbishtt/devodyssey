import { Outlet } from "react-router-dom";
import RouteLoader from "../RouteLoader";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
    return (
        <div className="min-h-screen p-0 m-0 bg-black">
            <Navbar />
            <RouteLoader />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
