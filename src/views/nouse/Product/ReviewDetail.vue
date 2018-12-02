<template>
<div>
  <h1>Review Details</h1>
  <div class="review-detail">Title: {{review.title}}</div>
  <div class="review-detail">Star: {{review.star}}</div>
  <div class="review-detail">Detail: {{review.detail}}</div>
  <div class="review-reviewer">By: {{review.reviewer}}</div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ReviewDetail',
  computed: mapGetters('product', ['review']),
  props: { id: Number, rid: Number },
  watch: {
    id: {
      handler () {
        this.$store.dispatch('product/loadReview', { id: this.id, rid: this.rid }) // action,mutationには第二引数までしか渡せないのでオブジェクトにする。
      },
      immediate: true
    },
    rid: {
      handler () {
        this.$store.dispatch('product/loadReview', { id: this.id, rid: this.rid }) // action,mutationには第二引数までしか渡せないのでオブジェクトにする。
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
