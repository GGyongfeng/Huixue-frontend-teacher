import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import type { App } from 'vue'

export default {
  install: (app: App) => {
    // 注册 Element Plus
    app.use(ElementPlus)
    
    // 注册所有图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    
    // 全局配置
    app.config.globalProperties.$ELEMENT = {
      // size: 'small',   // 组件默认尺寸
      zIndex: 3000,      // 弹窗初始 z-index
    }
  }
} 