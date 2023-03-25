import axios from 'axios'
import refreshToken from "../utils/refresh-token";

const API_URL = import.meta.env.VITE_BASE_URL;

class AxiosService {

    async post(url:string, data:any, config: object) {
        const response = await axios.post(API_URL + url, data, config)
        refreshToken(response)
        return response.data
    }

    async put(url:string, data:any, config: object) {
        const response = await axios.put(API_URL + url, data, config)
        refreshToken(response)
        return response.data
    }

    async get(url:string, config: object) {
        const response = await axios.get(API_URL + url, config)
        refreshToken(response)
        return response.data
    }
}

export default new AxiosService()