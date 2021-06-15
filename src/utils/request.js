import axios from 'axios'

export function request (config) {
  const instance = axios.create({
    baseURL: 'http://api-toutiao-web.itheima.net',
    timeout: 5000
  })

  return instance(config)
}
