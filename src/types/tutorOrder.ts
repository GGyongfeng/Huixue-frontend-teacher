/**
 * 家教订单数据类型
 */
export interface TutorOrder {
  id: number  // 订单ID
  tutor_code: string  // 订单编号
  student_gender?: string | null  // 学生性别
  teaching_type?: string | null  // 教学类型
  student_grade: string  // 学生年级
  subjects: string     // 科目
  subjects_desc?: string | null  // 科目描述
  teacher_type?: string | null  // 教师类型
  teacher_gender?: string | null  // 教师性别
  order_tags?: string | null  // 订单标签
  district: string     // 区
  city: string         // 市
  address: string      // 地址
  grade_score?: string | null  // 学生成绩
  student_level?: string | null  // 学生水平
  tutoring_time: string  // 教学时间
  salary: string  // 课时费用
  requirement_desc: string  // 具体要求
}
