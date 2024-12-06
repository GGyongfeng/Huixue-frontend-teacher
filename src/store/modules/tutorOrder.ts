/**
 * 家教订单数据类型
 */
export interface TutorType {
  id?: number                 // 订单ID
  tutor_code: string         // 订单编号
  student_gender: '男' | '女'  // 学生性别
  teaching_type: '一对一' | '一对多'  // 教学类型
  student_grade: '幼儿' | '小学' | '初一' | '初二' | '初三' | '高一' | '高二' | '高三' | '其他'  // 学生年级
  subjects: string[]         // 补习科目（可多选）
  teacher_type?: '在职老师' | '985学生' | '无'  // 教师类型要求
  teacher_gender?: '男' | '女' | '无'  // 教师性别要求
  order_tags?: string[]      // 订单标签（可多选）
  district: '南开区' | '和平区' | '河西区' | '河东区' | '河北区' | '红桥区' | '津南区' | '滨海新区'  // 区域
  city: string              // 城市
  address: string           // 详细地址
  grade_score?: string      // 成绩情况
  student_level?: '优秀' | '较好' | '中等' | '不及格'  // 学生水平
  tutoring_time: string     // 辅导时间
  salary: string           // 课时费
  requirement_desc?: string // 具体要求
  is_visible?: boolean     // 是否可见
  status?: '已成交' | '未成交'  // 订单状态
  created_at?: string      // 创建时间
  created_by?: number      // 创建人ID
  updated_at?: string      // 更新时间
  updated_by?: number      // 更新人ID
  is_deleted?: boolean     // 是否删除
  deleted_by?: number      // 删除人ID
  deleted_at?: string      // 删除时间
  order_count?: number     // 订单数量
  deal_time?: string       // 成交时间
  deal_teacher_id?: number // 成交教师ID
  deal_staff_id?: number   // 成交员工ID
  created_by_name?: string    // 创建人姓名
  updated_by_name?: string    // 更新人姓名
  deleted_by_name?: string    // 删除人姓名
  deal_teacher_name?: string  // 成交教师姓名
  deal_staff_name?: string    // 成交员工姓名
}

/**
 * 查询参数类型
 * 与后端 req.query 保持一致
 */
export interface tutorQueryParams {
  page?: number            // 页码，默认1
  pageSize?: number        // 每页条数，默认20
  keyword?: string         // 关键词搜索
  filters?: Record<string, string[]>  // 所有筛选条件都使用字符串数组
}
