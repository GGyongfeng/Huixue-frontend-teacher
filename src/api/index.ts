import request from '@/middleware'

// 通用的 API 类型定义
export interface BaseResponse<T = any> {
  code: number
  data: T
  message: string
}

// 通用的分页参数接口
export interface PageParams {
  page: number
  pageSize: number
  [key: string]: any
}

// 通用的分页响应接口
export interface PageResponse<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

// 通用的请求方法
export const createAPI = {
  get<T = any>(url: string, params?: any): Promise<BaseResponse<T>> {
    return request.get<BaseResponse<T>>({
      url,
      method: 'get',
      params
    })
  },

  post<T = any>(url: string, data?: any): Promise<BaseResponse<T>> {
    return request.post<BaseResponse<T>>({
      url,
      method: 'post',
      data
    })
  },

  put<T = any>(url: string, data?: any): Promise<BaseResponse<T>> {
    return request.put<BaseResponse<T>>({
      url,
      method: 'put',
      data
    })
  },

  delete<T = any>(url: string, data?: any): Promise<BaseResponse<T>> {
    return request.delete<BaseResponse<T>>({
      url,
      method: 'delete',
      data
    })
  }
} 