const Mock = require('mockjs')

const events = Mock.mock({
  'items|10': [
    {
      id: '@id',
      title: '@sentence(10, 20)',
      'status|1': ['0', '1', '2', '3'],
      author: '@name',
      create_time: '@datetime',
      update_time: '@datetime',
      cpId: '@guid', // 地点编码
      province: '@province', // 省份
      city: '@city', // 城市
      district: '@county', // 区县
      'lng|40-42.6': 40.08605,
      'lat|114-118.6': 116.479604
    }
  ]
})
const personnels = Mock.mock({
  'items|10': [
    {
      id: '@id',
      name: '@cname',
      'identity|1': ['1', '2'],
      identityNo: '@id',
      telePhoneNo: /1[3859]\d{9}/,
      email: '@email',
      actor: '@url'
    }
  ]
})
const tasks = Mock.mock({
  'items|10': [
    {
      id: '@id',
      event_id: '@id',
      title: '@ctitle',
      description: '@csentence',
      address: '@city(true)',
      executor: '@name',
      'grade|1': ['1', '2', '3', '4'],
      estimateTime: '@time'
    }
  ]
})

module.exports = [
  {
    url: '/event/list',
    type: 'get',
    response: config => {
      const items = events.items
      return {
        code: 200,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/personnel/list',
    type: 'get',
    response: config => {
      const items = personnels.items
      return {
        code: 200,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/task/list',
    type: 'get',
    response: config => {
      const items = tasks.items
      return {
        code: 200,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
