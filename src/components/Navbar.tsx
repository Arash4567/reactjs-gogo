import Switcher from "./Switcher";
import { ArrowDownIcon } from "./icons/ArrowDownIcon";
import { EarthIcon } from "./icons/EarthIcon";
import { HelpIcon } from "./icons/HelpIcon";

export default function Navbar<ReactNode>() {

  return (
    <>
      <div className="z-10 px-14 flex items-center justify-between h-16 py-4 text-black bg-white sticky-top dark:bg-gray-800 dark:text-gray-300 md:h-20">
        <div className="flex items-center justify-between space-x-10">
          <div className="flex items-center justify-between rounded-xl bg-gray-100 p-2 px-4 space-x-2 cursor-pointer hover:bg-gray-200">
            <EarthIcon className="w-5 h-5 text-gray-500"/> 
            <h1>English</h1>
            <ArrowDownIcon className="w-6 h-6"/>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-gray-100 p-2 px-4 space-x-2 cursor-pointer hover:bg-gray-200">
            <HelpIcon className="w-5 h-5"/> 
            <h1>English</h1>
            <ArrowDownIcon className="w-6 h-6"/>
          </div>
        </div>
        <div className="flex items-center space-x-5">
          <Switcher />
          <div className="flex items-center justify-between space-x-5">
            <div className="text-sm">
              <h1 className="font-bold">Tester User</h1>
              <h1 className="text-gray-500">Super Admin</h1>
            </div>
            <div className="flex items-center space-x-2">
              <img className="w-10 block h-10 rounded-full shadow" src="/images/avatar.jpg" alt="Rounded avatar" />
              <ArrowDownIcon className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}