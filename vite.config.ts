import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// @ts-ignore
import Components from 'unplugin-vue-components/vite'
// @ts-ignore
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ],
  resolve: {
    // 配置路径别名
    alias: {
      "@": resolve(__dirname, 'src'), // 路径别名
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8000,
    open: true,
    https: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // 不可以省略rewrite
      }
    }
  },
})
