<template>
  <el-button type="text" class="signout-label" @click="signout">SignOut</el-button>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'TheSubHeader',
  methods: {
    signout: function () {
      firebase.auth().signOut().then(() => {
        console.log('signout is success!')
        this.$router.push('/signup')
      })
    }
  }
}
</script>

<style scoped>

</style>
