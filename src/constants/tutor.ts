// 从环境变量获取区域列表并处理成数组
const DISTRICTS = import.meta.env.VITE_DISTRICT?.split(',') || []

// 订单相关的常量配置
export const TUTOR_CONSTANTS = {
  STUDENT_GRADES: ['幼儿', '小学', '初一', '初二', '初三', '高一', '高二', '高三', '成人', '其他'],
  TEACHING_TYPES: ['一对一', '一对多'],
  DISTRICTS,
  TEACHER_TYPES: ['在职老师', '985学生', '无'],
  STUDENT_LEVELS: ['优秀', '较好', '中等', '不及格'],
  SUBJECTS: ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治', '国际课程', '其他']
} as const

// 添加类型定义
export interface RangeOption {
  label: string
  value: string[]
}

interface FilterOption {
  label: string
  type?: 'range'
  options: string[] | RangeOption[]
}

interface FilterSection {
  label: string
  children: {
    [key: string]: FilterOption
  }
}

interface TutorFilters {
  [key: string]: FilterSection
}

// 筛选条件配置
export const TUTOR_FILTERS: TutorFilters = {
  // 学生情况
  student: {
    label: '学生情况',
    children: {
      student_grade: {
        label: '年级',
        options: [...TUTOR_CONSTANTS.STUDENT_GRADES]
      },
      subjects: {
        label: '科目',
        options: [...TUTOR_CONSTANTS.SUBJECTS]
      },
      district: {
        label: '区域',
        options: [...TUTOR_CONSTANTS.DISTRICTS]
      }
      // student_level: {
      //   label: '学习水平',
      //   options: [...TUTOR_CONSTANTS.STUDENT_LEVELS]
      // }
    }
  },

  // // 教师要求
  // teacher: {
  //   label: '教师要求',
  //   children: {
  //     teacher_type: {
  //       label: '类型',
  //       options: [...TUTOR_CONSTANTS.TEACHER_TYPES]
  //     },
  //     teacher_gender: {
  //       label: '性别',
  //       options: ['男', '女']
  //     }
  //   }
  // },

  // 订单情况
  // order: {
  //   label: '订单情况',
  //   children: {
  //     order_tags: {
  //       label: '订单标签',
  //       options: ['专职单子', '好单子', '特殊单子', '加急单子']
  //     }
  //   }
  // }
}

// 标签类型
export const TAG_TYPES = {
  '专职单子': 'success',
  '好单子': 'warning',
  '特殊单子': 'danger',
  '加急单子': 'error'
} as const 