import request from '@/middleware'
import type { TutorOrder } from '@/types/tutorOrder'
import type { PageParams, PageResponse } from '@/api'

// 定义查询参数接口
interface TutorsListParams extends PageParams {
  keyword?: string
  district?: string
  student_grade?: string
  student_gender?: string
  teacher_gender?: string
  teacher_type?: string
  subjects?: string | string[]
  teaching_type?: string
  city?: string
}

/**
 * 获取家教列表
 * 
 * @param params 查询参数
 * @returns Promise<PageResponse<TutorOrder>>
 * 
 * @example
 * // 基础查询
 * getTutorsList({ page: 1, pageSize: 20 })
 * 
 * // 关键词搜索
 * getTutorsList({ keyword: '数学老师', page: 1, pageSize: 20 })
 * 
 * // 条件筛选
 * getTutorsList({
 *   student_grade: '高一',
 *   subjects: ['数学', '物理'],
 *   district: '海淀区',
 *   page: 1,
 *   pageSize: 20
 * })
 */
export const getTutorsList = (params: Partial<TutorsListParams>) => {
  return request.get<PageResponse<TutorOrder>>({
    url: '/api/teacher/tutorslist',
    params
  })
}
