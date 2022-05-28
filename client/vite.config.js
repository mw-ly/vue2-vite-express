import { defineConfig } from "vite"
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [ vue() ], // 解析vue文件
  resolve: {
    extensions: ['.vue', '.js', '.jsx', 'ts', '.tsx'] // 以下后缀结尾的文件都不需要写后缀名
  },
  server: {
    proxy: {
      // 选项写法
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})