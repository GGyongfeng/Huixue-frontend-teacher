import request from '@/middleware'

export interface TutorNotice {
  title: string
  description: string
}

/**
 * 获取家教通知信息
 * 
 * @returns Promise<TutorNotice>
 * 
 * @example
 * // 获取通知
 * getTutorNotice()
 */
export const getTutorNotice = () => {
  return request.get<TutorNotice>({
    url: '/api/teacher/tutornotice'
  })
} 