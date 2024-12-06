import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  
  return {
    plugins: [vue()],
    
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
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: true
    },
    
    base: env.VITE_BASE_URL
  }
}) 