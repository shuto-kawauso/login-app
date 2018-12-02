<template>
  <div>
    <h1>BillBoardCharts</h1>
    <div v-for="song in songs" :key="song.rank">
      {{song.rank}}
      {{song.title}}
      {{song.artist}}
      <div>
      <img v-bind:src='song.cover' alt="">
      </div>
    </div>
  </div>
</template>

<script>
import billboard from '@/api/billboard.js'
export default {
  name: 'BillBoardCharts',
  computed: {
    songs: function () {
      return billboard.getTop20()
    }
  }
}
</script>

<style scoped>

</style>
