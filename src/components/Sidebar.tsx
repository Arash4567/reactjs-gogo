import { SidebarMenu } from "../models/interfaces"
import MenuItem from "./MenuItem"
import { BellIcon } from "./icons/BellIcon"

const menus: SidebarMenu[] = [
  {
    url: '/',
    name: 'Home',
    icon: <BellIcon />
  },
  {
    url: '/1',
    name: 'Home1',
    icon: <BellIcon />
  },
  {
    url: '/2',
    name: 'Home2',
    icon: <BellIcon />
  },
  {
    url: '/3',
    name: 'Home3',
    icon: <BellIcon />
  },
  {
    url: '/4',
    name: 'Home4',
    icon: <BellIcon />
  },
]

export default function Sidebar<ReactNode>() {
  return (
    <>
      <div className="fixed block h-screen bg-gray-900 text-white w-80">
        <div className="bg-gray-800 h-20 flex items-center justify-center">
          <img src="/images/logo.png" className="w-14" alt="#" />
          <h2 className="ml-3 text-2xl font-light whitespace-nowrap">
            IT-Forelead
          </h2>
        </div >
        <ul className="relative space-y-3 py-14">
          {
            menus.map(menu => (
              <MenuItem key={menu.name} menu={menu} />
            ))
          }
        </ul >
        <div v-if="!sidebarStatus" className="absolute bottom-0 w-full mb-3 text-sm text-center text-gray-400 dark:text-gray-400">
          Copyright &copy; 2023 <a href="https://t.me/trimuzsupport" className="hover:underline">IT-Forelead</a>. <br />
          All Rights Reserved.
        </div>
      </div >
    </>
  )
}