// 存储在 localStorage 中的 token 的 key
const TokenKey: string = 'Admin-Token'

// 获取 token
export function getToken(): string | null {
  return localStorage.getItem(TokenKey)
}

// 设置 token
export function setToken(token: string): void {
  localStorage.setItem(TokenKey, token)
}

// 移除 token
export function removeToken(): void {
  localStorage.removeItem(TokenKey)
}

// 可选：添加更多身份验证相关的工具函数
export function hasToken(): boolean {
  return !!getToken()
}

// 可选：添加 token 过期检查
export function isTokenExpired(token: string): boolean {
  try {
    const tokenData = JSON.parse(atob(token.split('.')[1]))
    return tokenData.exp * 1000 < Date.now()
  } catch {
    return true
  }
}

// 可选：类型定义
export interface TokenData {
  exp: number
  iat: number
  userId: string
  role: string
}

// 可选：解析 token
export function parseToken(token: string): TokenData | null {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch {
    return null
  }
} 