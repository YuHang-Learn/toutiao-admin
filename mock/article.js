import Mock from 'mockjs'
const channels = []
for (let i = 0; i < 30; i++) {
  channels.push(Mock.mock({
    id: Mock.Random.integer(10, 10000),
    name: Mock.Random.cname()
  }))
}
Mock.mock('http://api-toutiao-web.itheima.net/mp/v1_0/channels', 'get', {
  data: {
    channels
  },
  message: '获取频道列表成功'
})
