<template>
  <div class="product-list">
    <TheSubHeader/>
    <div id="nav">
      <router-link to="/" >About</router-link> |
      <router-link to="/product" >Product List</router-link>
    </div>
    <h1>Product List</h1>
    <ul>
      <li v-for="{id, name} in list" :key="id">
        <router-link :to="`/product/${id}`">{{ name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import products from '../api/products'
import TheSubHeader from '@/components/TheSubHeader.vue'
export default {
  beforeRouteLeave (to, from, next) {
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    setTimeout(() => {
      loading.close()
      next()
    }, 500)
    // setTimeout(next, 1000)
  },
  name: 'ProductList',
  components: {
    TheSubHeader
  },
  computed: { // apiを呼ぶのでdataではなくcomputedを使う。
    list: () => products.fetch()
  }
}

</script>

<style scoped>

</style>
