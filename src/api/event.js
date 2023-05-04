import request from '@/utils/request'

export function getEventList(params) {
  return request({
    url: '/event/list',
    method: 'get',
    params
  })
}

export function createEvent(params) {
  return request({
    url: '/event/add',
    method: 'post',
    data: params
  })
}

export function getEventById(params) {
  return request({
    url: '/event',
    method: 'get',
    params
  })
}

export function deleteEvent(params) {
  return request({
    url: '/event/delete',
    method: 'post',
    data: params
  })
}
