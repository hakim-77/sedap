import { BiError } from "react-icons/bi"; 
import { BiErrorAlt } from "react-icons/bi"; 
import { CgUnavailable } from "react-icons/cg"; 
import { RiForbid2Line } from "react-icons/ri"; 
import { MdDashboard } from "react-icons/md";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { RiCustomerServiceFill } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";

export default function SidebarMenu() {
    const menuClass = ({ isActive }) =>
        `flex cursor-pointer items-center rounded-xl p-4  space-x-2
        ${isActive ? 
            "text-hijau bg-green-200 font-extrabold" : 
            "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
        }`
  return (
    <div id="sidebar-menu" className="mt-10">
                <ul id="menu-list" className="space-y-3">
                <li>
                    <NavLink
                        id="menu-1"
                        to="/"
                        className={menuClass}>
                        <MdDashboard className="mr-2 text-xl"/>
                            Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        id="menu-2"
                        to="/orders"
                        className={menuClass}>
                        <AiOutlineUnorderedList className="mr-2 text-xl"/>
                        Orders
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        id="menu-3"
                        to="/customers"
                        className={menuClass}>
                        <RiCustomerServiceFill className="mr-2 text-xl"/>
                        Customers
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        id="menu-4"
                        to="/user"
                        className={menuClass}>
                        <BiError className="mr-2 text-xl"/>
                        User
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        id="menu-5"
                        to="/400"
                        className={menuClass}>
                        <BiError className="mr-2 text-xl"/>
                        Error 400
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        id="menu-6"
                        to="/401"
                        className={menuClass}>
                        <BiError className="mr-2 text-xl"/>
                        Error 401
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        id="menu-7"
                        to="/guest"
                        className={menuClass}>
                        <BiError className="mr-2 text-xl"/>
                        Error 403
                    </NavLink>
                </li>
                </ul>
            </div>
  )
}