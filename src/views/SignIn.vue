<template>
  <div class="sign-in">
    <h2>Sign In</h2>
    <div class="input-form-wrapper">
      <input type="text" placeholder="e-Mail" v-model="mail"/>
    </div>
    <div class="input-form-wrapper">
      <input type="password" placeholder="Password" v-model="password"/>
    </div>
    <button @click="signIn">Sign In</button>
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
      await firebase.auth().signInWithEmailAndPassword(this.mail, this.password)
        .then(() => {
          console.log('login success!!')
          this.$router.push('/')
        })
        .catch(e => {
          console.error(e)
        })
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
