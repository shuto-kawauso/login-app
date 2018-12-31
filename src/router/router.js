import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    },
    {
      path: '/dashbord',
      name: 'dashbord',
      component: () => import(/* webpackChunkName: "dashbord" */ '@/views/Dashbord.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/charts',
      name: 'charts',
      component: () => import(/* webpackChunkName: "charts" */ '@/views/MusicCharts.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: () => import(/* webpackChunkName: "mypage" */ '@/views/MyPage.vue'),
      meta: { requiresAuth: true }
    }
  ]
})
