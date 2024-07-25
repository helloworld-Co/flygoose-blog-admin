// import { fileURLToPath, URL } from 'node:url'
import path, { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [AntDesignVueResolver()]
    })
  ],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
      // '#': fileURLToPath(new URL('./src/types', import.meta.url)),
      '@': resolve(__dirname, './src'),
      '#': resolve(__dirname, './src/types')
    }
    // extensions: ['.vue']
    // extensions:
    //   ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  server: {
    // proxy: {
    //   '/api': {
    //     target: 'https://test-blog.helloworld.net/api/admin/',
    //     changeOrigin: true
    //     // rewrite: (path) => path.replace(/^\/api/, '')
    //   },
    //   '/static': {
    //     target: 'http://192.168.168.10:29091',
    //     changeOrigin: true
    //   }
    // },
    // hmr: true
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve('src/assets/css/base.less')}";`
        },
        javascriptEnabled: true
      }
    }
  }
})
