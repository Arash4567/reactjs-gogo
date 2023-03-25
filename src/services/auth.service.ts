import axios from 'axios'
import { User } from '../types/interfaces';

const API_URL = import.meta.env.VITE_BASE_URL;

class AuthService {
  async login(user: User) {
    const response = await axios
      .post(API_URL + '/auth/login', {
        phone: user.phone,
        password: user.password,
      })
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
      localStorage.setItem('token', JSON.stringify(response.data?.value))
    }
    return response.data
  }
  logout() {
    localStorage.removeItem('time')
    localStorage.removeItem('token')
    localStorage.removeItem('role')
  }
}

export default new AuthService()