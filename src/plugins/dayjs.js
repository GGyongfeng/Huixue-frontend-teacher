import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 导入中文语言包
import relativeTime from 'dayjs/plugin/relativeTime' // 相对时间插件
import calendar from 'dayjs/plugin/calendar' // 日历插件
import duration from 'dayjs/plugin/duration' // 时间段插件
import customParseFormat from 'dayjs/plugin/customParseFormat' // 自定义解析格式插件
import isBetween from 'dayjs/plugin/isBetween' // 时间范围判断插件
import weekOfYear from 'dayjs/plugin/weekOfYear' // 年度周数插件

// 扩展插件
dayjs.extend(relativeTime)
dayjs.extend(calendar)
dayjs.extend(duration)
dayjs.extend(customParseFormat)
dayjs.extend(isBetween)
dayjs.extend(weekOfYear)

// 设置默认语言
dayjs.locale('zh-cn')

// 自定义格式化方法
const formatDate = {
  // 完整日期时间：2024-01-01 12:00:00
  full: (date) => dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
  
  // 仅日期：2024-01-01
  date: (date) => dayjs(date).format('YYYY-MM-DD'),
  
  // 仅时间：12:00:00
  time: (date) => dayjs(date).format('HH:mm:ss'),
  
  // 相对时间：例如"3小时前"
  relative: (date) => dayjs(date).fromNow(),
  
  // 自定义格式
  custom: (date, format) => dayjs(date).format(format),
  
  // 日历时间：例如"今天 12:00"
  calendar: (date) => dayjs(date).calendar(),
  
  // 时间戳（毫秒）
  timestamp: (date) => dayjs(date).valueOf()
}

// 工具方法
const dateUtils = {
  // 获取当前时间
  now: () => dayjs(),
  
  // 判断是否为工作日
  isWeekday: (date) => {
    const day = dayjs(date).day()
    return day !== 0 && day !== 6
  },
  
  // 获取两个日期之间的天数
  daysBetween: (date1, date2) => dayjs(date2).diff(date1, 'day'),
  
  // 添加时间
  add: (date, number, unit) => dayjs(date).add(number, unit),
  
  // 减少时间
  subtract: (date, number, unit) => dayjs(date).subtract(number, unit),
  
  // 获取本周开始时间
  startOfWeek: (date) => dayjs(date).startOf('week'),
  
  // 获取本周结束时间
  endOfWeek: (date) => dayjs(date).endOf('week')
}

export {
  dayjs as default,
  formatDate,
  dateUtils
} 