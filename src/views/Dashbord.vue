<template>
  <div>
    <h1>DashBord</h1>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Dashbord',
  methods: {
    signOut: async function () {
      firebase.auth().signOut().then(function () {
        // Sign-out successful.
        sessionStorage.removeItem('currentUser')
        console.log('sign out is success')
      }).catch(error => {
        // An error happened.
        console.error(error)
      })
    }
  }
}
</script>

<style scoped>

</style>
