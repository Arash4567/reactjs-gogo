import { ISidebarMenu } from "../models/sidebar.interface"
import MenuItem from "./MenuItem"
import { HomeIcon } from "./icons/HomeIcon"
import { CardIcon } from "./icons/CardIcon"
import { BrowserRouter, Link } from "react-router-dom"
import React from "react"

const menus: ISidebarMenu[] = [
  {
    url: '/',
    name: 'Home',
    icon: <HomeIcon className="w-7 h-7" />
  },
  {
    url: '/balance',
    name: 'Balance',
    icon: <CardIcon className="w-7 h-7" />
  },
]

const Sidebar = () => {
  return (
    <React.Fragment>
      <div className="fixed block h-screen bg-gray-900 text-white w-80">
        <div className="bg-gray-800 h-20 flex items-center justify-center">
          <img src="/images/logo.png" className="w-14" alt="#" />
          <h2 className="ml-3 text-2xl font-light whitespace-nowrap">
            IT-Forelead
          </h2>
        </div >
        <ul className="relative space-y-3 py-14">
          {
            menus.map(menu => {
              return (
                <MenuItem key={menu.name} menu={menu} />
              )
            })
          }
        </ul >
        <div className="absolute bottom-0 w-full mb-3 text-sm text-center text-gray-400 dark:text-gray-400">
          Copyright &copy; {new Date().getFullYear()} <a href="https://t.me/trimuzsupport" className="hover:underline">IT-Forelead</a>. <br />
          All Rights Reserved.
        </div>
      </div >
    </React.Fragment>
  )
}

export default Sidebar