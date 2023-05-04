import request from '@/utils/request'

export function getPersonnelList(params) {
  return request({
    url: '/personnel/list',
    method: 'get',
    params
  })
}

export function createPersonnel(params) {
  return request({
    url: '/personnel/add',
    method: 'post',
    params
  })
}

export function deletePersonnel(params) {
  return request({
    url: '/personnel/delete',
    method: 'post',
    data: params
  })
}

export function batchDeletePersonnel(params) {
  return request({
    url: '/personnel/batchDelete',
    method: 'post',
    data: params
  })
}
