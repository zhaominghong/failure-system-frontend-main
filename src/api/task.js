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
    data: params
  })
}
export function deleteTask(params) {
  return request({
    url: '/task/delete',
    method: 'post',
    data: params
  })
}

export function batchDeleteTask(params) {
  return request({
    url: '/task/batchDelete',
    method: 'post',
    data: params
  })
}
