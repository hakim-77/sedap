import { BsFillPeopleFill } from "react-icons/bs"; 
import { RiListOrdered } from "react-icons/ri"; 
import { RxDashboard } from "react-icons/rx"; 
export default function ListMenu() {
    return (
        <div id="sidebar-menu" className="mt-10">
            <ul id="menu-list" className="space-y-3">
                <li id="menu-1" className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold">
                    {/* <div id="menu-1" className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold">Dashboard
                        </div> */}
                    <RxDashboard className="mr-4 text-xl" />
                    <span>Dashboard</span>
                </li>
                <li id="menu-2" className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold">
                    {/* <div id="menu-2" className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold">Orders</div> */}
                    <RiListOrdered className="mr-4 text-xl" />
                    <span>Orders</span>
                </li>
                <li id="menu-3" className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold">
                    {/* <div id="menu-3" className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold">Customers</div> */}
                    <BsFillPeopleFill className="mr-4 text-xl" />
                    <span>Customer</span>
                </li>
            </ul>
        </div>

    )
}