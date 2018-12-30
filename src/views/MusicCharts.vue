<template>
  <div>
    <h1>MusicChart</h1>
    <h2>Top10</h2>
    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="(track, index) in top10" :key="index">
        <div>
          <a v-bind:href='track.artist.url' target="_blank"><img v-bind:src='track.image[3]["#text"]'></a>
        </div>
        <div>
          <h4>Rank: {{index + 1}}</h4>
        <span>{{ track.name }} / <a v-bind:href='track.artist.url' target="_blank">{{track.artist.name}}</a></span>
          <button class="add-button" @click="addFavorite(track, index)"> Add Favorite</button>
        </div>
      </el-carousel-item>
    </el-carousel>
    <h2>Top 10~50</h2>
    <el-row>
      <el-col :span="4" v-for="(track, index) in tracks" :key="index">
        <el-card class='album-card' :body-style="{ padding: '5px', height: '340px' }">
          <a v-bind:href='track.artist.url' target="_blank"><img v-bind:src='track.image[3]["#text"]' class="image"></a>
          <div>
            {{track.name}} / <a v-bind:href='track.artist.url' target="_blank">{{track.artist.name}}</a>
          </div>
            <div class="bottom clearfix">
              <span>Rank: {{ index + 1 }}</span><button class="add-button" @click="addFavorite(track, index)"> Add Favorite</button>
            </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import billboard from '@/api/billboard.js'
import firebase from 'firebase'

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
  },
  methods: {
    addFavorite: async function (track, index) {
      // loadingMask
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      try {
        // UserIdを取得
        const currentUser = JSON.parse(localStorage.getItem('currentUser'))
        await firebase.database().ref(`users/${currentUser.uid}/albums`).push({
          rank: index + 1,
          name: track.name,
          albumPage: track.url,
          artist: {
            name: track.artist.name,
            artistPage: track.artist.url
          },
          image: track.image[3]['#text']
        })
        loading.close()
        // 結果を通知する
        this.$notify({
          title: 'Success',
          message: 'Selected song was added to Your Favorite List!',
          type: 'success'
        })
      } catch (e) {
        loading.close()
        console.error(e)
        this.$notify({
          title: 'Warning',
          message: `Failed to add.${e}`,
          type: 'warning'
        })
      }
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
  .album-card{
    position: relative;
  }
  .bottom {
    margin: 0 auto;
    /*position: absolute;*/
    /*bottom: 5px;*/
    line-height: 10px;
  }
  .add-button {
    margin-left: 10px;
    margin-top: 10px;
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
