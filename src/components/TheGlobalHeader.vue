<template>
  <div class="global-header">
    <transition>
      <el-row>
        <router-link to="/"><img class="global-header-icon" src="@/assets/logo.png"/></router-link>
          <el-dropdown
            trigger="click"
            v-if="currentUser && $route.path !== '/'"
            class="username-box"
          >
            <span class="el-dropdown-link">
              <i class="fas fa-user"></i> {{currentUser.name}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link tag='li' to="/dashbord">Dashbord</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link tag='li' to="/charts">Chart</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link tag='li' to="/mypage">MyPage</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="signOut">SignOut</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </el-row>
    </transition>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'TheGlobalHeader',
  data () {
    return {
      currentUser: undefined
    }
  },
  watch: {
    '$route': function () {
      this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : undefined
    }
  },
  methods: {
    signOut: function () {
      firebase.auth().signOut().then(() => {
        console.log('signOut is success!')
        localStorage.removeItem('currentUser')
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
    padding-top: 5px;
    height: 50px;
    width: 50px;
  }
  .username-box {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 6.5vh;
    font-size: 18px;
    padding-right: 15px;
  }
  .v-enter-active {
    transition: opacity 1.5s;
  }
  .v-leave-active {
    transition: opacity 0.5s;
  }
  .v-enter, .v-leave-to {
    opacity: 0;
  }
</style>
