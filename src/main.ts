// TypeScript版本
import { createApp } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import './assets/styles/main.scss'
// import vuetify from './plugins/vuetify'
import elementplus from './plugins/elementplus'

// 创建应用实例
const app = createApp(App)

// 注册插件
app.use(router)
   .use(pinia)
  //  .use(vuetify)
   .use(elementplus)
   .mount('#app')

// 全局错误处理
app.config.errorHandler = (
  err: unknown,
  instance: ComponentPublicInstance | null,
  info: string
): void => {
  if (err instanceof Error) {
    console.error('Global error:', err.message)
  } else {
    console.error('Global error:', err)
  }
  console.log('Error component:', instance)
  console.log('Error info:', info)
} 