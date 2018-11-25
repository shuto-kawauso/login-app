<template>
  <div class="product-list">
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

export default {
  // beforeRouteEnter (to, from, next) {
  //   setTimeout(next, 1000)
  // },
  name: 'ProductList',
  computed: { // apiを呼ぶのでdataではなくcomputedを使う。
    list: () => products.fetch()
  }
}

</script>

<style scoped>

</style>
