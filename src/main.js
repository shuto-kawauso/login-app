import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import firebase from 'firebase'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import 'element-ui/lib/theme-chalk/index.css'
import AsyncComputed from 'vue-async-computed'
import processEnv from '../processEnv'

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
Vue.use(AsyncComputed)

// Initialize Firebase

const config = {
  apiKey: processEnv.API_KEY,
  authDomain: processEnv.AUTH_DOMAIN,
  databaseURL: processEnv.DATABASE_URL,
  projectId: processEnv.PROJECT_ID,
  storageBucket: processEnv.STORAGE_BUCKET,
  messagingSenderId: processEnv.MESSAGING_SENDER_ID
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
