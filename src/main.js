import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'

// import Cognito from './aws/cognito' このcognitoファイルではクラスごとエクスポートしている。
// なのでこのあと、newしてVueインスタンスに詰めることでシングルトンにして、
// 各コンポーネントからはインスタンス変数として呼び出せるようになっている。
// 他のやり方が無いか模索しても良いかも

Vue.config.productionTip = false

// locale.use(lang)

// Vue.use()

// Vue.mixin()

// const cognito = new Cognito()
// router.beforeEach((to, from, next)=> {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     cognito.isAuthenticated()
//       .then(session => {
//         next()
//       })
//       .catch(e => {
//         console.error(e)
//         next({
//           path: '/login',
//           query: {redirect: to.fullPath}
//         })
//       })
//   }
//   next()
// })

new Vue({
  router,
  store,
  // cognito,
  // ここに入れると、どのコンポーネントでもthis.$cognito.methodでcognitoファイルのなかを使える。
  // その意味は要検討。cognitoのオブジェクトは一つのほうが良いからかな？
  render: h => h(App)
}).$mount('#app')
