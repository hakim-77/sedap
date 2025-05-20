import { Outlet } from "react-router-dom";
import Header from '../components/Header.jsx'
import Sidebar from '../components/Sidebar.jsx'


export default function MainLayout() {
    return (
        <div id="layout-wrapper" className="flex flex-row flex-1">
            <Sidebar />
            <div id="main-content" className="flex-1 p-4">
                <Header />
                
                <Outlet/>
            </div>
        </div>
    )
}