import axios from 'axios'

export function request (config) {
  const instance = axios.create({
    baseURL: 'http://api-toutiao-web.itheima.net',
    timeout: 5000
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
