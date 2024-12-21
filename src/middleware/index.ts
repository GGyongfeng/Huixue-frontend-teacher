import axios, { AxiosHeaders } from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { getErrorMessage } from './errorCode'

// 创建请求实例
const axiosInstance: AxiosInstance = axios.create({
  timeout: 15000, // 请求超时时间(毫秒)
  baseURL: import.meta.env.VITE_BASE_API_URL, // 直接使用 API 服务器地址
  withCredentials: false, // 异步请求携带cookie:false
  transformRequest: [(data) => JSON.stringify(data)], // 请求数据转换为 JSON 字符串
  validateStatus: (status) => status >= 200 && status < 300, // 只接受 2xx 的状态码
  headers: {
    get: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    post: { 'Content-Type': 'application/json;charset=utf-8' }
  },
  transformResponse: [
    (data) => {
      // 响应数据转换
      try {
        return typeof data === 'string' && data.startsWith('{') ? JSON.parse(data) : data
      } catch {
        return data // 解析失败时返回原数据
      }
    }
  ]
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('===== 请求拦截器 =====')
    console.log('url:', config.url)
    console.log('method:', config.method)
    console.log('params:', config.params)
    console.log('data:', config.data)

    // 添加 x-city header
    if (!config.headers) {
      config.headers = new AxiosHeaders()
    }
    
    // 从环境变量获取城市代码，默认为 tj
    const city = import.meta.env.VITE_CITY
    config.headers.set('x-city', city)

    return config
  },
  (error) => {
    console.error('请求拦截器错误:', error)
    ElMessage.error('请求配置错误')
    return Promise.reject(error)
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('===== 响应拦截器 =====')
    console.log('原始响应:', response)

    const responseData = response.data
    console.log('状态码:', responseData.code)
    console.log('消息:', responseData.message)
    console.log('数据:', responseData.data)
    console.log('===========================')

    // 处理业务错误
    if (responseData.code !== 200) {
      const errorMsg = getErrorMessage(responseData.code, responseData.message)
      ElMessage.error(errorMsg)
      return Promise.reject(new Error(errorMsg))
    }

    return responseData
  },
  (error) => {
    // 处理 HTTP 错误
    const status = error.response?.status
    const errorMsg = error.response?.data?.message

    console.error('响应拦截器错误:', {
      状态码: status,
      消息: errorMsg,
      详细: error
    })

    // 使用 errorCode.ts 中的错误处理
    if (status) {
      ElMessage.error(getErrorMessage(status, errorMsg))
    } else if (error.message.includes('timeout')) {
      ElMessage.error(getErrorMessage(408, '请求超时'))
    } else {
      ElMessage.error(getErrorMessage(500, '网络错误'))
    }

    return Promise.reject(error)
  }
)

// 请求方法
async function request<T = any>(config: AxiosRequestConfig): Promise<T> {
  try {
    const response = await axiosInstance.request<T>(config)
    return response.data
  } catch (e) {
    return Promise.reject(e)
  }
}

// API 方法集合
const api = {
  get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return request<T>({ ...config, method: 'GET' })
  },
  post<T = any>(config: AxiosRequestConfig): Promise<T> {
    return request<T>({ ...config, method: 'POST' })
  },
  put<T = any>(config: AxiosRequestConfig): Promise<T> {
    return request<T>({ ...config, method: 'PUT' })
  },
  delete<T = any>(config: AxiosRequestConfig): Promise<T> {
    return request<T>({ ...config, method: 'DELETE' })
  }
}

export default api
