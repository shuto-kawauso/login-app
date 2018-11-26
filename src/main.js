import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store'
import firebase from 'firebase'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import 'element-ui/lib/theme-chalk/index.css'

// import Cognito from './aws/cognito' このcognitoファイルではクラスごとエクスポートしている。
// なのでこのあと、newしてVueインスタンスに詰めることでシングルトンにして、
// 各コンポーネントからはインスタンス変数として呼び出せるようになっている。
// 他のやり方が無いか模索しても良いかも

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
// Initialize Firebase
const config = {
  apiKey: 'AIzaSyAWG8d36JFOtRWfkEcDTA2gwWkD_EdPW0Y',
  authDomain: 'login-app-9644d.firebaseapp.com',
  databaseURL: 'https://login-app-9644d.firebaseio.com',
  projectId: 'login-app-9644d',
  storageBucket: 'login-app-9644d.appspot.com',
  messagingSenderId: '288214090031'
}
firebase.initializeApp(config)

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
// router.beforeEach((to, from, next) => {
//   store.commit('view/start')
//   next()
// })
// router.afterEach((to, from, next) => {
//   store.commit('view/end')
// })
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        next()
      } else {
        next({
          path: '/signin',
          query: { redirect: to.fullPath }
        })
      }
    })
  }
  next()
})

new Vue({
  router,
  store,
  // cognito,
  // ここに入れると、どのコンポーネントでもthis.$cognito.methodでcognitoファイルのなかを使える。
  // その意味は要検討。cognitoのオブジェクトは一つのほうが良いからかな？
  render: h => h(App)
}).$mount('#app')
