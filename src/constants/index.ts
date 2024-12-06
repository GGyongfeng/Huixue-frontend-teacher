export enum STATUS {
  ACTIVE = 1,
  INACTIVE = 0
}

export enum USER_ROLE {
  ADMIN = 'admin',
  USER = 'user'
}

// 也可以使用 const enum 来优化性能
// const enum STATUS {
//   ACTIVE = 1,
//   INACTIVE = 0
// }

// 如果需要更复杂的常量定义
export interface ApiConfig {
  timeout: number
  baseURL: string
  withCredentials: boolean
}

export const API_CONFIG: ApiConfig = {
  timeout: 5000,
  baseURL: import.meta.env.VITE_APP_BASE_API,
  withCredentials: true
}

// 状态码常量
export const HTTP_STATUS = {
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
} as const

// 使用 type 确保类型安全
export type HttpStatus = typeof HTTP_STATUS[keyof typeof HTTP_STATUS] 