<template>
<div>
  <h1>Reviews of {{detail.name}}</h1>
  <div class="review-content" v-for="review in detail.reviews" :key="review.rid">
    <router-link :to="`/product/${id}/review/${review.rid}`">
    <div class="review-title">Title: {{review.title}}
      <span v-for="number in review.star" :key="number">
        <i class="fas fa-star"></i>
      </span>
    </div>
    </router-link>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Review',
  computed: mapGetters('product', ['detail']),
  props: { id: Number },
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
