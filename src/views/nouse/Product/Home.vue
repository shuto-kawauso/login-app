<template>
<div>
  <h1>Product Home</h1>
  <h2>{{detail.name}}</h2>
  <h3>{{detail.price}}</h3>
  <h3>{{detail.content}}</h3>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  props: { id: Number }, // route.pramsではなくpropsとして受け取る。
  computed: mapGetters('product', ['detail']),
  watch: {
    id: {
      handler () {
        this.$store.dispatch('product/load', this.id) // namespaced : trueにしてあるのでファイル名を先頭に書いて上げる必要がある。
      },
      immediate: true
    }
  },
  beforeDestroy () {
    this.$store.dispatch('product/destroy')
  }
}
</script>

<style scoped>

</style>
