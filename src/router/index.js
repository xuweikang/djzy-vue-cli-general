import Vue from 'vue'
import Router from 'vue-router'

// const index = r => require.ensure([], () => r(require('@/modules/debug/debug')), 'main')   路由懒加载
import debug from '@/modules/debug/debug'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    // { path: '/', redirect: '/debug', meta: { title: "大家健康" } },
    { path: '/', component: debug, meta: { title: "大家调试" } },
  ]
})
