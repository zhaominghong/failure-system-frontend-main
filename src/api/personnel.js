import request from '@/utils/request'

export function getPersonnelList(params) {
  return request({
    url: '/personnel/list',
    method: 'get',
    params
  })
}

export function createPerson(params) {
  return request({
    url: '/personnel/add',
    method: 'post',
    params
  })
}
