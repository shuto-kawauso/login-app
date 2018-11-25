<template>
    <transition name="loading">
      <div class="loading" v-if="loading">
        Loading
      </div>
    </transition>
</template>

<script>
export default {
  name: 'LoadingOverlay',
  computed: {
    loading () { return this.$store.state.view.loading }
  }
}
</script>

<style scoped lang="scss">
  .loading {
    position: absolute;
  }
  .loading-enter-active {
    transition: all 0.25s;
  }
  .loading-leave-active {
    transition: all 0.25s ease 0.25s;
  }
</style>
