import request from '@/utils/request'

export function getTaskList(params) {
  return request({
    url: '/task/list',
    method: 'get',
    params
  })
}

export function createTask(params) {
  return request({
    url: '/task/add',
    method: 'post',
    params
  })
}
