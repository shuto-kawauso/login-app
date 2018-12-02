<template>
  <div class="global-header">
    <el-row>
      <router-link to="/"><img class="global-header-icon" src="@/assets/logo.png"/></router-link>
      <transition>
        <div
          v-if="currentUser && $route.path !== '/'"
          class="username-box">
          <div class="user">
            <i class="fas fa-user"></i>
          </div>
          <div class="username">
            {{currentUser.name}}
          </div>
        </div>
      </transition>
    </el-row>
    <el-button type="primary" class="signout-label" @click="signout">SignOut</el-button>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'TheGlobalHeader',
  computed: {
    currentUser: function () {
      return sessionStorage.getItem('currentUser') ? JSON.parse(sessionStorage.getItem('currentUser')) : null
    }
  },
  methods: {
    signout: function () {
      firebase.auth().signOut().then(() => {
        console.log('signout is success!')
        sessionStorage.removeItem('currentUser')
        this.$router.push('/')
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../style/colors';
  .global-header {
    background-color: $HEADER_BACKGROUND;
    height: 6.5vh;
  }
  .global-header-icon {
    float: left;
    padding-left: 20px;
    padding-top: 10px;
    height: 50px;
    width: 50px;
  }
.username-box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 6.5vh;
}
.user {
  color: #0c0e13;
  font-size: 18px;
  padding-right: 5px;
}
.username {
  color: #0c0e13;
  font-size: 18px;
  margin-right: 30px;
}
</style>
