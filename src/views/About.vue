<template>
  <div class="contents-wrapper">
    <h1 class="home-title">My Music Portfolio App</h1>
    <div>
      <el-button type="primary" class="home-sign-in-button" @click="openSignInDialog">SignIn</el-button>
      <el-button type="success" class="home-sign-up-button" @click="openSignUpDialog">SignUp</el-button>
    </div>
    <el-dialog
      :visible.sync="isSignInDialogShown"
      title="SignIn"
      class="sign-in-dialog"
      width="420px"
      >
      <div class="sign-in-dialog-main-wrapper">
        <div class="sign-in-google-button">
          <el-button type="primary" @click="signInAndSignUpWithGoogle">Sign in with Google <i class="fab fa-google"></i> </el-button>
        </div>
          <span>OR</span>
        <div class="sign-in-facebook-button">
          <el-button type="primary" @click="signInAndSignUpWithFacebook">Sign in with Facebook <i class="fab fa-facebook"></i> </el-button>
        </div>
        <div class="navigation-to-another-dialog">
          No Account? <el-button @click="openSignUpDialog">SignUp</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="isSignUpDialogShown"
      title="SignUp"
      class="sign-up-dialog"
      width="420px"
    >
      <div class="sign-up-dialog-main-wrapper">
        <div class="sign-up-google-button">
          <el-button type="primary" @click="signInAndSignUpWithGoogle">Sign up with Google <i class="fab fa-google"></i> </el-button>
        </div>
        <span>OR</span>
        <div class="sign-up-facebook-button">
          <el-button type="primary" @click="signInAndSignUpWithFacebook">Sign up with Facebook <i class="fab fa-facebook"></i> </el-button>
        </div>
        <div class="navigation-to-another-dialog">
          Already have an account? <el-button @click="openSignInDialog">SignIn</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'About',
  // login済みの場合はdashBordにリダイレクトする。
  beforeRouteEnter (to, from, next) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user && localStorage.getItem('currentUser')) {
        next({
          path: '/dashbord',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    })
  },
  beforeRouteLeave: async function (to, from, next) {
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    try {
      const toBeInsertedUser = JSON.parse(localStorage.getItem('currentUser'))
      await firebase.database().ref(`users/${toBeInsertedUser.uid}`).set({
        name: toBeInsertedUser.name,
        email: toBeInsertedUser.email,
        photoUrl: toBeInsertedUser.photoUrl,
        profile: '',
        albums: []
      })
      loading.close()
      next()
    } catch (e) {
      console.error(e)
      loading.close()
    }
  },
  data () {
    return {
      isSignInDialogShown: false,
      isSignUpDialogShown: false
    }
  },
  methods: {
    openSignUpDialog () {
      this.isSignInDialogShown = false
      this.isSignUpDialogShown = true
    },
    openSignInDialog () {
      this.isSignUpDialogShown = false
      this.isSignInDialogShown = true
    },
    signInAndSignUpWithGoogle: async function () {
      const provider = new firebase.auth.GoogleAuthProvider()
      await firebase.auth().signInWithPopup(provider).then(async function (result) {
        const user = result.user
        const currentUser = {}
        if (user != null) {
          currentUser.name = user.displayName
          currentUser.email = user.email
          currentUser.photoUrl = user.photoURL
          currentUser.uid = user.uid
          localStorage.setItem('currentUser', JSON.stringify(currentUser))
        }
      }).catch(function (error) {
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.email
        const credential = error.credential
        console.error('code', errorCode, 'message', errorMessage, 'mail', email, 'credential', credential)
      })
      this.$router.push('/dashbord')
    },
    signInAndSignUpWithFacebook: async function () {
      const provider = new firebase.auth.FacebookAuthProvider()
      await firebase.auth().signInWithPopup(provider).then(function (result) {
        const user = result.user
        const currentUser = {}
        if (user != null) {
          currentUser.name = user.displayName
          currentUser.email = user.email
          currentUser.photoUrl = user.photoURL
          currentUser.uid = user.uid
          localStorage.setItem('currentUser', JSON.stringify(currentUser))
        }
      }).catch(function (error) {
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.email
        const credential = error.credential
        console.error('code', errorCode, 'message', errorMessage, 'mail', email, 'credential', credential)
      })
      this.$router.push('/dashbord')
    }
  }
}
</script>

<style lang="scss">
  .contents-wrapper {
    height: 1000px;
  }
  .home-title {
    margin: 200px auto 100px auto;
    font-size: 100px;
  }
  .home-sign-up-button, .home-sign-in-button {
    height: 50px;
    margin-left: 50px !important;
    width: 200px;
    font-size: 25px;
  }
  .home-sign-in-button, .home-sign-up-button {
    height: 50px;
    width: 200px;
    font-size: 25px;
  }
  .sign-in-google-button, .sign-up-google-button {
    margin: 10px auto;
    & button {
      width: 300px;
      font-size: 22px;
    }
  }
  .sign-in-facebook-button, .sign-up-facebook-button {
    margin: 10px auto;
    & button {
      width: 300px;
      font-size: 22px;
    }
  }
  .el-dialog__title{
    font-size: 25px;
    font-family: Arial
  }
  .navigation-to-another-dialog {
    padding-top: 15px;
    font-size: 16px;
    & button {
      padding-top: 7px;
      height: 28px;
    }
  }
</style>
