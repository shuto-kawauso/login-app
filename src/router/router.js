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
      component: () => import(/* webpackChunkName: "charts" */ '@/views/BillBoardCharts.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: () => import(/* webpackChunkName: "mypage" */ '@/views/MyPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/albums/:id',
      name: 'albums',
      component: () => import(/* webpackChunkName: "specifiedAlbum" */ '@/views/SpecifiedAlbum.vue'),
      meta: { requiresAuth: true }
    }
    //
    // ,{
    //   path: '/product',
    //   name: 'productList',
    //   component: () => import(/* webpackChunckName: "productList" */ '@/views/ProductList.vue'),
    //   meta: { requiresAuth: true }
    // },
    // {
    //   path: '/product/:id(\\d+)', // (\\d+) is regex means number only
    //   name: 'product',
    //   component: () => import(/* webpackChunckName: "product" */ '@/views/Product.vue'),
    //   meta: { requiresAuth: true },
    //   // route.paramsをコンポーネントの中で直接受け取ってしまうのは非推奨。密結合になってしまいUTしづらい。よってpropsとして渡してあげる。
    //   children: [
    //     {
    //       name: 'product-home',
    //       path: '', // 階層化したばあいは先頭に/（ルート）が来ないように注意。ルートを入れてしまうと絶対パスになってしまう。
    //       component: () => import(/* webpackChunckName: "product-home" */ '@/views/Product/Home.vue'),
    //       meta: { requiresAuth: true },
    //       props: route => ({ id: Number(route.params.id) }) // URLだとStringになってしまうIDを数値に型変換
    //     },
    //     {
    //       name: 'product-review',
    //       path: 'review',
    //       component: () => import(/* webpackChunckName: "product-review" */ '@/views/Product/Review.vue'),
    //       meta: { requiresAuth: true },
    //       props: route => ({ id: Number(route.params.id) }) // URLだとStringになってしまうIDを数値に型変換
    //     },
    //     {
    //       name: 'product-review-detail',
    //       path: 'review/:rid(\\d+)',
    //       component: () => import(/* webpackChunckName: "product-review-detail" */ '@/views/Product/ReviewDetail.vue'),
    //       meta: { requiresAuth: true },
    //       props: route => ({ id: Number(route.params.id), rid: Number(route.params.rid) }) // URLだとStringになってしまうIDを数値に型変換
    //     }
    //   ]
    // }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
