<template>
  <div class="about">
    <TheSubHeader/>
    <div>
    <router-link to="/" >About</router-link> |
    <router-link to="/product" >Product List</router-link>
    </div>
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import TheSubHeader from '@/components/TheSubHeader.vue'
export default {
  name: 'About',
  components: {
    TheSubHeader
  }

}
</script>
