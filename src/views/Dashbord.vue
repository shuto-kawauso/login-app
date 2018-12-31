<template>
  <div>
    <h1>DashBord</h1>
      <div class="favorite-list" v-if="favoriteList">
        <el-row>
          <el-col :span="8" v-for="(favorite, index) in favoriteList" :key="index">
            <el-card class='album-card' :body-style="{ padding: '10px', height: '400px' }">
              <a v-bind:href='favorite.albumPage' target="_blank"><img v-bind:src='favorite.image' class="image"></a>
              <div>
                {{favorite.name}} / <a v-bind:href='favorite.artist.artistPage' target="_blank">{{favorite.artist.name}}</a>
              </div>
              <div class="bottom clearfix">
                <span>Rank: {{ favorite.rank }}</span><button class="delete-button" @click="showDeleteDialog(favorite, index)">Delete</button>
              </div>
            </el-card>
          </el-col>
        </el-row>
    </div>
    <div v-else>
      <h2>お気に入りを探しに行きませんか？</h2>
      <router-link to="/charts" class="link-to-chart">Explore Chart!</router-link>
    </div>
    <el-dialog
      :visible.sync="isDeleteDialogShown"
      title="Delete"
      class="delete-dialog"
      width="420px"
    >
      <div class="delete-dialog-main-wrapper">
        <el-card class='album-card' :body-style="{ padding: '10px', height: '300px' }">
          <img v-bind:src='selectedItem.image' class="delete-dialog-image">
          <div class="deleted-item">
            {{selectedItem.name}} / {{selectedItem.artist.name}}<br>
            <span>Rank: {{ selectedItem.rank }}</span>
          </div>
          <div class="bottom clearfix">
            上記のアルバムをお気に入りリストから削除しますか？
            <div class="delete-confirmation-button">
              <el-button type="danger" @click="deleteItem">削除</el-button>
              <el-button @click="closeDeleteDialog">キャンセル</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Dashbord',
  created: async function () {
    const _this = this
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    await firebase.database().ref(`users/${this.currentUser.uid}`).on('value', function (snapshot) {
      _this.favoriteList = snapshot.val().albums // 取得した際の処理
    })
  },
  data: function () {
    return {
      currentUser: {},
      favoriteList: [],
      isDeleteDialogShown: false,
      selectedItem: {
        index: '',
        rank: '',
        name: '',
        image: '',
        albumPage: '',
        artist: {
          name: '',
          artistPage: ''
        }
      }
    }
  },
  methods: {
    showDeleteDialog (album, index) {
      this.setToBeDeletedItem(album, index)
      this.isDeleteDialogShown = true
    },
    closeDeleteDialog () {
      this.isDeleteDialogShown = false
    },
    setToBeDeletedItem (toBeDeletedAlbum, index) {
      this.selectedItem.index = index
      this.selectedItem.rank = toBeDeletedAlbum.rank
      this.selectedItem.name = toBeDeletedAlbum.name
      this.selectedItem.image = toBeDeletedAlbum.image
      this.selectedItem.albumPage = toBeDeletedAlbum.albumPage
      this.selectedItem.artist.name = toBeDeletedAlbum.artist.name
      this.selectedItem.artist.artistPage = toBeDeletedAlbum.artist.artistPage
    },
    resetToBeDeletedItem (toBeDeletedAlbum, index) {
      this.selectedItem.index = ''
      this.selectedItem.rank = ''
      this.selectedItem.name = ''
      this.selectedItem.image = ''
      this.selectedItem.albumPage = ''
      this.selectedItem.artist.name = ''
      this.selectedItem.artist.artistPage = ''
    },
    async deleteItem () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      try {
        // Arrayの場合、indexが乱数となり、整数の番号ではないがこれ（this.selectedItem.index）で特定できる。
        await firebase.database().ref(`users/${this.currentUser.uid}/albums/${this.selectedItem.index}`).remove()
        this.isDeleteDialogShown = false
        this.resetToBeDeletedItem()
        loading.close()
        this.$notify({
          title: 'Success',
          message: 'Selected album was removed!',
          type: 'success'
        })
      } catch (e) {
        loading.close()
        console.error(e)
        this.$notify({
          title: 'Warning',
          message: `Failed to removed.${e}`,
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style scoped>
  .album-card{
    position: relative;
  }
  .bottom {
    margin: 0 auto;
    line-height: 10px;
  }
  .image {
    display: inline-block;
  }
  .delete-dialog-image {
    width: 150px;
    height: 50%;
  }
  .deleted-item {
    padding-bottom: 20px;
  }
  .delete-confirmation-button {
    padding-top: 15px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .link-to-chart {
    font-size: 20px;
  }
</style>
