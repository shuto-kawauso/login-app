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
      if (user) {
        next({
          path: '/dashbord',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    })
  },
  data () {
    return {
      username: '',
      mail: '',
      password: '',
      isSignInDialogShown: false,
      isSignUpDialogShown: false,
      validationLastChangeOfSignInForm: true,
      signInForm: {
        mail: '',
        password: ''
      },
      signUpForm: {
        mail: '',
        password: ''
      },
      signInFormRules: {
        mail: { pattern: '^[0-9A-Za-z@]+$', message: 'すべて半角英数字で入力してください。', trigger: 'change' },
        password: { pattern: '^[0-9A-Za-z]{6,20}$', message: '全て半角数字(6文字以上20文字以内)で入力してください。', trigger: 'change' }
      }
    }
  },
  watch: {
    isSignUpDialogShown: function () {
      if (this.isSignUpDialogShown === false) {
        this.signUpForm = {
          password: '',
          mail: ''
        }
      }
    },
    isSignInDialogShown: function () {
      if (this.isSignInDialogShown === false) {
        this.signInForm = {
          password: '',
          mail: ''
        }
      }
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
      console.log('signIn Or signUp with google!')
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then(function (result) {
        // The signed-in user info.
        const user = result.user
        const currentUser = {}
        if (user != null) {
          currentUser.name = user.displayName
          currentUser.email = user.email
          currentUser.photoUrl = user.photoURL
          currentUser.uid = user.uid
          // The user's ID, unique to the Firebase project. Do NOT use
          // this value to authenticate with your backend server, if
          // you have one. Use User.getToken() instead.
          localStorage.setItem('currentUser', JSON.stringify(currentUser))
        }
        // Todo:ここで明示的にリダイレクトして上げる必要あり？？
        // console.log('user', user)
      }).catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.email
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential
        console.error('code', errorCode, 'message', errorMessage, 'mail', email, 'credential', credential)
      })
    },
    signInAndSignUpWithFacebook: async function () {
      console.log('signIn Or signUp with facebook!')
      // 成功したらdashbordに飛ばす。
      const provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithPopup(provider).then(function (result) {
        // The signed-in user info.
        const user = result.user
        console.log('user', user)
      }).catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.email
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential
        console.error('code', errorCode, 'message', errorMessage, 'mail', email, 'credential', credential)
      })
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
