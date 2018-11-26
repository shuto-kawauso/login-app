<template>
  <div class="global-header">
    <span class="global-header-label">My Login App</span>
  </div>
</template>

<script>
export default {
  name: 'TheGlobalHeader'
}
</script>

<style scoped lang="scss">
@import '../style/colors';
  .global-header {
    background-color: $HEADER_BACKGROUND;
    height: 6.5vh;
  }
  .global-header-label {
    color: $HEADER_LABEL;
    font-weight: bold;
    line-height: 6.5vh;
  }
</style>
