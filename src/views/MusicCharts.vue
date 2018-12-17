<template>
  <div>
    <h1>MusicCharts</h1>
    <h2>Top10</h2>
    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="(track, index) in top10" :key="index">
        <div>
          <a v-bind:href='track.artist.url' target="_blank"><img v-bind:src='track.image[3]["#text"]'></a>
        </div>
        <div>
          <h4>Rank: {{index + 1}}</h4>
        <span>{{ track.name }} / <a v-bind:href='track.artist.url' target="_blank">{{track.artist.name}}</a></span>
          <button class="add-button"> Add Favorite</button>
        </div>
      </el-carousel-item>
    </el-carousel>
    <h2>Top 10~50</h2>
    <el-row>
      <el-col :span="4" v-for="(track, index) in tracks" :key="index">
        <el-card :body-style="{ padding: '0px', height: '330px' }">
          <a v-bind:href='track.artist.url' target="_blank"><img v-bind:src='track.image[3]["#text"]' class="image"></a>
          <div style="padding: 16px;" >
            <span>{{track.name}}</span> / <a v-bind:href='track.artist.url' target="_blank">{{track.artist.name}}</a>
            <div class="bottom clearfix">
              <span>Rank: {{ index + 1 }}</span><button class="add-button"> Add Favorite</button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import billboard from '@/api/billboard.js'

export default {
  name: 'MusicCharts',
  asyncComputed: {
    async top10 () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const top10 = await billboard.getTop10()
      loading.close()
      return top10
    },
    async tracks () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const tracks = await billboard.fetch()
      loading.close()
      return tracks
    }
  }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .bottom {
    margin-top: 10px;
    line-height: 10px;
  }
  .add-button {
    margin-left: 10px;
  }
  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
