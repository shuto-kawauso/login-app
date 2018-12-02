<template>
  <div class="sign-up">
    <h2>Sign Up</h2>
    <div class="input-form-wrapper">
      <el-input type="text" placeholder="e-Mail" v-model="mail"/>
    </div>
    <div class="input-form-wrapper">
      <el-input type="password" placeholder="Password" v-model="password"/>
    </div>
    <el-button @click="signUp">Sign Up</el-button>
    <p>Do you have an account?
      <router-link to="/signIn">Sign in!</router-link>
    </p>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'SignUp',
  data () {
    return {
      mail: undefined,
      password: undefined
    }
  },
  methods: {
    signUp: async function () {
      await firebase.auth().createUserWithEmailAndPassword(this.mail, this.password)
        .then(() => {
          this.mail = undefined
          this.password = undefined
          console.log('login success!!')
        })
        .catch(e => {
          console.error(e)
        })
    }
  }
}
</script>

<style scoped>
.input-form-wrapper {
  margin: 20px auto;
  width: 320px;
}
</style>
