import axios from 'axios'
import JSONbig from 'json-bigint'
export function request (config) {
  const instance = axios.create({
    baseURL: 'http://api-toutiao-web.itheima.net',
    timeout: 5000,
    transformResponse: [function (data) {
      try {
        return JSONbig.parse(data)
      } catch (err) {
        return data
      }
    }]
  })
  instance.interceptors.request.use(config => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  }, err => {
    console.log(err)
  }
  )
  return instance(config)
}
