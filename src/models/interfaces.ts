import { ReactNode } from "react"

export interface User {
  phone: string,
  password: string
}

export interface UserInfo {
  firstname: string,
  lastname: string,
  role: 'admin' | 'super_admin'
}

export interface SidebarMenu {
  url: string,
  name: string,
  icon: React.ReactNode | null
}