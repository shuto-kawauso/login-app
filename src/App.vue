<template>
  <div id="app">
    <!--<SignUp/>-->
    <!--<div id="nav">-->
      <!--<router-link to="/" >About</router-link> |-->
      <!--<router-link to="/product" >Product List</router-link>-->
    <!--</div>-->
    <!--<LoadingOverlay/>-->
    <!--<transition name="view">-->
      <router-view/>
    <!--</transition>-->
  </div>
</template>

<script>
import LoadingOverlay from './components/LoadingOverlay'
import SignUp from './views/SignUp'
export default {
  components: {SignUp, LoadingOverlay }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
