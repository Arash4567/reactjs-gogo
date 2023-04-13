import React, { useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { ISidebarMenu } from "../models/sidebar.interface";

export default function MenuItem<ReactNode>({ menu }: {
  menu: ISidebarMenu
}) {
  const [selectedPage, setSelectedPage] = useState<string>(localStorage.getItem('currentPage') || '/')

  const changePage = (url: string): void => {
    // localStorage.setItem('currentPage', url)
    setSelectedPage(url)
  }
  return (
    <React.Fragment>
      {menu.url === selectedPage ?
        <li className="relative flex items-center h-10 w-full hover:bg-yellow-500/10 py-7 cursor-pointer transition-colors duration-300">
          <div className="-ml-1.5 w-3 h-10 rounded-xl bg-yellow-500"></div>
          <div className="px-10 flex items-center text-yellow-500 space-x-5">
            <div className="bg-yellow-500/10 rounded-xl p-1.5">
              {menu.icon}
            </div>
            <p className="">{menu.name}</p>
          </div>
        </li>
        :
        <Link to={menu.url} onClick={() => changePage(menu.url)} className="relative flex items-center h-10 w-full hover:bg-yellow-500/10 py-7 cursor-pointer transition-colors duration-300">
          <div className="-ml-1.5 w-3 h-10 rounded-xl bg-gray-900"></div>
          <div className="px-10 flex items-center text-white space-x-5">
            <div className="p-1.5">
              {menu.icon}
            </div>
            <p className="">{menu.name}</p>
          </div>
        </Link>
      }
    </React.Fragment>
  )
}