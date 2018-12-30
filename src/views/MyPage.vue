<template>
  <div>
    <h1>MyPage</h1>
    <el-row>
      <el-col :span="24">
        <el-card class='user-card' :body-style="{ padding: '20px', height: '500px' }">
          <img v-bind:src='currentUser.photoUrl' alt="Shuto" class="user-photo">
          <p class="user-name">{{currentUser.name}}</p>
          <p class="user-email">{{currentUser.email}}</p>
          <p class="user-profile">{{currentUser.profile}}</p>
          <div style="padding: 1px;"></div>
          <el-button class="edit-button" type="info" icon="el-icon-edit" circle @click="openEditDialog"></el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="isEditDialogShown"
      title="一言を編集"
      class="edit-dialog"
      width="420px"
    >
      <div class="edit-dialog-main-wrapper">
        <el-input
          type="textarea"
          autosize
          placeholder="Please input"
          v-model="editedProfile"
          class="edit-form"
        >
        </el-input>
        <el-button type="primary" @click="editProfile()">編集する</el-button>
        <el-button @click="closeEditDialog">キャンセル</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'MyPage',
  created: async function () {
    const _this = this
    _this.currentUserId = JSON.parse(localStorage.getItem('currentUser')).uid
    await firebase.database().ref(`users/${_this.currentUserId}`).on('value', function (snapshot) {
      _this.currentUser = snapshot.val()
    })
  },
  data: function () {
    return {
      currentUserId: '',
      currentUser: {},
      editedProfile: '',
      isEditDialogShown: false
    }
  },
  methods: {
    openEditDialog () {
      this.editedProfile = ''
      this.isEditDialogShown = true
    },
    closeEditDialog () {
      this.editedProfile = ''
      this.isEditDialogShown = false
    },
    editProfile: async function () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      try {
        const updates = {}
        updates[`users/${this.currentUserId}/profile`] = this.editedProfile
        // updateの際は複数の項目を同時に更新できる
        await firebase.database().ref().update(updates)
        this.closeEditDialog()
        loading.close()
        this.$notify({
          title: 'Success',
          message: 'Edited your profile!',
          type: 'success'
        })
      } catch (e) {
        loading.close()
        console.error(e)
        this.$notify({
          title: 'Warning',
          message: `Failed to edit.${e}`,
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style scoped>
  .user-photo{
    width: 150px;
  }

  .user-name {
    color: grey;
    font-weight: bold;
    font-size: 36px;
    margin-bottom: 5px;
    margin-top: 10px;
  }
  .user-email{
    font-size: 18px;
    margin-top: 5px;
    margin-bottom: 25px;
  }
  .user-profile {
    font-size: 24px;
    display: inline-block;
    width: 400px;
    align-items: center;
  }
  .edit-button{
    margin-bottom: 10px;
  }
  .edit-form {
    margin-bottom: 15px;
  }
</style>
