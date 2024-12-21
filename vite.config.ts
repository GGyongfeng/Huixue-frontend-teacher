import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  
  console.log('------------vite.config.ts--------------')
  console.log('构建信息:')
  console.log('当前模式:', mode)
  console.log('当前工作目录:', process.cwd())
  console.log('环境变量:')
  console.log('- VITE_SPA_URL:', env.VITE_SPA_URL)
  console.log('- VITE_APP_TITLE:', env.VITE_APP_TITLE)
  console.log('- VITE_CITY:', env.VITE_CITY)
  console.log('- VITE_BASE_API_URL:', env.VITE_BASE_API_URL)
  
  const cityDir = env.VITE_SPA_URL.replace(/^\/|\/$/g, '')
  const outDir = `dist/${cityDir}`
  
  console.log('构建输出:')
  console.log('- 输出目录将是:', outDir)
  console.log('- 完整输出路径:', resolve(process.cwd(), outDir))
  console.log('----------------------------------------')
  
  return {
    plugins: [
      vue(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: env.VITE_APP_TITLE
          }
        }
      })
    ],
    
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      },
      extensions: ['.vue', '.ts', '.js']
    },
    
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `@use "@/assets/styles/variables" as *;`
        }
      }
    },
    
    server: {
      port: 3000,
      host: true,
      proxy: {
        '/api': {
          target: env.VITE_BASE_API_URL,
          changeOrigin: true,
        }
      }
    },
    
    build: {
      outDir,
      assetsDir: 'assets',
      sourcemap: true,
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[ext]',
          chunkFileNames: 'assets/[name].js',
          entryFileNames: 'assets/[name].js',
        }
      }
    },
    
    base: env.VITE_SPA_URL
  }
}) 