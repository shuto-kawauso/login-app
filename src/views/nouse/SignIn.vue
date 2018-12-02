<template>
  <div class="sign-in">
    <h2>Sign In</h2>
    <div class="input-form-wrapper">
      <el-input type="text" placeholder="e-Mail" v-model="mail"/>
    </div>
    <div class="input-form-wrapper">
      <el-input type="password" placeholder="Password" v-model="password"/>
    </div>
    <el-button @click="signIn">Sign In<i class="fab fa-google"></i></el-button>
    <p>You don't have an account?
      <router-link to="/signUp">Sign Up!</router-link>
    </p>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'SignIn',
  data () {
    return {
      mail: undefined,
      password: undefined
    }
  },
  methods: {
    signIn: async function () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken
        // The signed-in user info.
        const user = result.user
        // ...
        console.log('login success', token, user)
      })
      // .catch(error) {
      // Handle Errors here.
      // const errorCode = error.code
      // const errorMessage = error.message
      // // The email of the user's account used.
      // const email = error.email
      // // The firebase.auth.AuthCredential type that was used.
      // const credential = error.credential
      // console.error('error')
      // ...
      // })
      // const loading = this.$loading({
      //   lock: true,
      //   text: 'Loading',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // })
      // await firebase.auth().signInWithEmailAndPassword(this.mail, this.password)
      //   .then(() => {
      //     console.log('login success!!')
      //     loading.close()
      // this.$router.push('/')
      // })
      // .catch(e => {
      //   loading.close()
      //   console.error(e)
      // })
    }
  }
}
</script>

<style>
  .input-form-wrapper {
    margin: 20px auto;
    width: 320px;
  }
</style>
