import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import firebase from 'firebase'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import 'element-ui/lib/theme-chalk/index.css'
import AsyncComputed from 'vue-async-computed'

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
Vue.use(AsyncComputed)

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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user && localStorage.getItem('currentUser')) {
        next()
      } else {
        next({
          path: '/',
          query: { redirect: to.fullPath }
        })
      }
    })
  }
  next()
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
