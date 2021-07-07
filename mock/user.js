import Mock, { Random } from 'mockjs'
const user = Mock.mock({
  id: Random.integer(),
  name: Random.cname(),
  photo: Random.image(),
  refresh_token: Random.string(180)
})
user.token = user.refresh_token
// 用户登录
Mock.mock('http://api-toutiao-web.itheima.net/mp/v1_0/authorizations', 'post', (option) => {
  user.mobile = JSON.parse(option.body).mobile
  return {
    data: {
      id: user.id,
      name: user.name,
      photo: user.photo,
      refresh_token: user.refresh_token,
      token: user.token
    },
    message: '登录成功'
  }
})

// 获取用户个人信息
Mock.mock('http://api-toutiao-web.itheima.net/mp/v1_0/user/profile', 'get', () => {
  return {
    data: {
      email: Random.email,
      id: user.id,
      intro: Random.string(20),
      mobile: user.mobile,
      name: user.name,
      photo: user.photo,
      refresh_token: user.refresh_token,
      token: user.token
    },
    message: '登录成功'
  }
})
