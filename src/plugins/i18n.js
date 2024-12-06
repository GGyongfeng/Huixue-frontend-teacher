import { createI18n } from 'vue-i18n'

// 导入语言包
const modules = import.meta.glob('../locales/*.json', { eager: true })

const messages = {}
for (const path in modules) {
  const name = path.replace('../locales/', '').replace('.json', '')
  messages[name] = modules[path].default
}

// i18n 配置
const i18n = createI18n({
  // 使用组合式API
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  // 默认语言
  locale: localStorage.getItem('language') || 'zh-CN',
  // 回退语言
  fallbackLocale: 'en',
  // 语言包
  messages,
  // 日期时间格式化选项
  datetimeFormats: {
    'zh-CN': {
      short: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      },
      long: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }
    },
    'en': {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
      }
    }
  },
  // 数字格式化选项
  numberFormats: {
    'zh-CN': {
      currency: {
        style: 'currency',
        currency: 'CNY'
      }
    },
    'en': {
      currency: {
        style: 'currency',
        currency: 'USD'
      }
    }
  }
})

export default i18n 