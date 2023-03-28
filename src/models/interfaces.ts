export interface User {
  phone: string,
  password: string
}

export interface UserInfo {
  firstname: string,
  lastname: string,
  role: 'admin' | 'super_admin'
}