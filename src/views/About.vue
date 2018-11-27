<template>
  <div class="about">
    <TheSubHeader/>
    <div>
    <router-link to="/" >About</router-link> |
    <router-link to="/product" >Product List</router-link>
    </div>
    <h1>This is an about page</h1>
    <div>
      <el-button @click="openSignInDialog">SignIn</el-button>
      <el-button @click="openSignUpDialog">SignUp</el-button>
    </div>
    <el-dialog
      :visible.sync="isSignInDialogShown"
      title="SignIn"
      class="sign-in-dialog"
      width="640px">
      <div class="sign-in-dialog-main-wrapper">
        <div class="sign-in-form-wrapper">
          <el-form
            ref="signInForm"
            :rules="signInFormRules"
            :model="signInForm"
            label-position="left"
            label-width="180px"
            class="clearfix vertical-fit"
            @submit.native.prevent="signIn">
            <el-form-item
              label="ユーザー名"
              prop="mail">
              <el-input
                v-model="signInForm.mail"
                placeholder="e-mail"
                size="small"
                @input="validateSignInForm"/>
            </el-form-item>
            <el-form-item
              label="Password"
              prop="password">
              <el-input
                v-model="signInForm.password"
                type="password"
                placeholder="Password"
                size="small"
                maxlength="20"
                @input="validateSignInForm"/>
            </el-form-item>
            <el-row>
              <el-form-item class="buttons-item">
                <el-button
                  :disabled="isSignInBtnDisabled"
                  type="primary"
                  size="small"
                  class="font-bold"
                  native-type="submit">
                  Login
                </el-button>
                <el-button
                  type="plain"
                  size="small"
                  class="font-bold"
                  @click="closeSignInDialog">
                  Close
                </el-button>
              </el-form-item>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TheSubHeader from '@/components/TheSubHeader.vue'
export default {
  name: 'About',
  components: {
    TheSubHeader
  },
  data () {
    return  {
      username: '',
      mail: '',
      password: '',
      isSignInDialogShown: false,
      isSignUpDialogShown: false,
      validationLastChangeOfSignInForm: true,
      signInForm: {
        mail: '',
        password: ''
      },
      signUpForm: {
        mail: '',
        password: ''
      },
      signInFormRules: {
        mail: {pattern: '^[0-9A-Za-z@]+$', message: 'すべて半角英数字で入力してください。', trigger: 'change'},
        password: {pattern: '^[0-9A-Za-z]{6,20}$', message: '全て半角数字(6文字以上20文字以内)で入力してください。', trigger: 'change'}
      }
    }
  },
  computed: {
    isSignInBtnDisabled: function () {
      return !(this.signInForm.mail && this.signInForm.password && this.validationLastChangeOfSignInForm)
    }
  },
  watch: {
    isSignUpDialogShown: function () {
      if (this.isSignUpDialogShown === false) {
        this.signUpForm = {
          password: '',
          mail: ''
        }
      }
    },
    isSignInDialogShown: function () {
      if (this.isSignInDialogShown === false) {
        this.signInForm = {
          password: '',
          mail: ''
        }
      }
    }
  },
  methods: {
    openSignUpDialog(){
      this.isSignUpDialogShown = true
    },
    closeSignUpDialog(){
      this.isSignUpDialogShown = false
    },
    openSignInDialog(){
      this.isSignInDialogShown = true
    },
    closeSignInDialog(){
      this.isSignInDialogShown = false
    },
    validateSignInForm() {
      this.$refs.signInForm.validate((valid) => {
        this.validationLastChangeOfSignInForm = valid
      })
    },
    signIn: async function() {

    },
    signUp: async function() {

    }
  }

}
</script>
