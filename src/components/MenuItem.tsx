import { useRef } from "react";
import { SidebarMenu } from "../models/interfaces"
import { HomeIcon } from "./icons/HomeIcon";

export default function MenuItem<ReactNode>(props: {
  menu: SidebarMenu
}) {
  const selectedPage = useRef(localStorage.getItem('currentPage') || '/')

  const changePage = (url: string): void => {
    localStorage.setItem('currentPage', url)
    selectedPage.current = url
    console.log(selectedPage.current);
    
  }

  return (
    <>
      {props.menu.url === selectedPage.current ?
        <li className="relative flex items-center h-10 w-full hover:bg-yellow-500/10 py-7 cursor-pointer transition-colors duration-300">
          <div className="-ml-1.5 w-3 h-10 rounded-xl bg-yellow-500"></div>
          <div className="px-10 flex items-center text-yellow-500 space-x-5">
            <div className="bg-yellow-500/10 rounded-xl p-1.5">
              <HomeIcon className="w-7 h-7" />
            </div>
            <p className="">{props.menu.name}</p>
          </div>
        </li>
        :
        <li onClick={() => changePage(props.menu.url)} className="relative flex items-center h-10 w-full hover:bg-yellow-500/10 py-7 cursor-pointer transition-colors duration-300">
          <div className="-ml-1.5 w-3 h-10 rounded-xl bg-gray-900"></div>
          <div className="px-10 flex items-center text-white space-x-5">
            <div className="p-1.5">
              <HomeIcon className="w-7 h-7" />
            </div>
            <p className="">{props.menu.name}</p>
          </div>
        </li>
      }
    </>
  )
}