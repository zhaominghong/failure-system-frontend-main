import request from '@/utils/request'

export function getPipelineList(params) {
  return request({
    url: '/pipeline/list',
    method: 'get',
    params
  })
}

export function createPipeline(params) {
  return request({
    url: '/pipeline/add',
    method: 'post',
    data: params
  })
}

export function getPipelineById(params) {
  return request({
    url: 'pipeline',
    method: 'get',
    params
  })
}
