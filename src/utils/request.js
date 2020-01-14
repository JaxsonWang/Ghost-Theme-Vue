import axios from 'axios'
import {Message} from 'ant-design-vue'

const apiPrefix = '/ghost/api/v3/content'

const service = axios.create({
  baseURL: process.env.VUE_APP_CONTENT_API_URL + apiPrefix,
  withCredentials: false,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    if (config.method === 'get') {
      config.params = {
        key: process.env.VUE_APP_CONTENT_API_KEY,
        ...config.params
      }
    }
    config.headers['i-love-you'] = 'JaxsonWang'
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.log('err' + error)
    Message.error(error.message || 'Error', 5)
    return Promise.reject(error)
  }
)

export default service
