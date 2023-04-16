import { NavLink } from "react-router-dom";
import { ISidebarMenu } from "../models/sidebar.interface";

export default function MenuItem<ReactNode>({ menu }: {
  menu: ISidebarMenu
}) {
  return (
    <NavLink to={menu.url} className="relative flex items-center h-10 w-full hover:bg-yellow-500/10 py-7 cursor-pointer transition-colors duration-300">
      <div className="-ml-1.5 w-3 h-10 rounded-xl bg-gray-900"></div>
      <div className="px-10 flex items-center text-white space-x-5">
        <p className="p-1.5">
          {menu.icon}
        </p>
        <p className="">{menu.name}</p>
      </div>
    </NavLink>
  )
}