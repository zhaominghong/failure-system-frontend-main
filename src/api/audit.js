import request from '@/utils/request'

export function getAuditList(params) {
  return request({
    url: '/audit/list',
    method: 'get',
    params
  })
}
export function getRecordList(params) {
  return request({
    url: '/audit/record/list',
    method: 'get',
    params
  })
}

export function createAudit(params) {
  return request({
    url: '/audit/add',
    method: 'post',
    data: params
  })
}

export function getAuditById(params) {
  return request({
    url: '/audit',
    method: 'get',
    params
  })
}

