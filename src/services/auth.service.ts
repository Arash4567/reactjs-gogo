import axios from 'axios'
import { User } from '../models/user.interface';

class AuthService {
  async login(user: User) {
    const response = await axios
      .post('/auth/login', {
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