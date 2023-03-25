import authHeader from '../utils/auth-header'
import AxiosService from './axios.service'

class UserService {
  async getUser() {
    return AxiosService.get("/user", {headers: authHeader()})
  }
}

export default new UserService()