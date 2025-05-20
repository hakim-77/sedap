import Navbar from "../components/Guest/Navbar";
import { Outlet } from "react-router-dom";

export default function GuestLayout() {
    return (
        <div >
            <Navbar />
            <div id="main-content" className="flex-1 p-4">
            <Outlet />
            </div>
        </div>
    )
}