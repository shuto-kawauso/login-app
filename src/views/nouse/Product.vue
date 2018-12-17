<template>
  <div class="product">
    <TheSubHeader/>
    <nav class="nav">
      <router-link to="/" >About</router-link> |
      <router-link to="/product" >Product List</router-link>
    </nav>
    <nav class="nav">
      <router-link :to="{name: 'product-home'}">Product Home</router-link> |
      <!--階層化されている場合はnameで指定したほうが楽。パスの場合は絶対パスで指定する必要が出てくる-->
      <router-link :to="{name: 'product-review'}">Review List</router-link>
    </nav>
    <transition name="view">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import TheSubHeader from '@/components/TheSubHeader.vue'
export default {
  components: { TheSubHeader },
  name: 'Product',
  beforeDestroy () {
    this.$store.dispatch('product/destroy')
  }
}
</script>

<style lang="scss" scoped>
a {
   font-weight: bold;
   color: #2c3e50;
   &.router-link-exact-active {
    color: #42b983;
   }
}

</style>
