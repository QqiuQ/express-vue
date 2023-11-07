<template>
  <div class="container">
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-card style="margin-top: 50px;">
          <el-row>
            <el-button class="el-icon-back" type="text">
              <a href="/login"> 返回用户登录</a>
            </el-button>
          </el-row>
          <div class="register-container">
            <el-row type="flex" justify="center">
              <h2>员工登录</h2>
            </el-row>
            <el-form :model="loginForm" ref="loginForm" label-width="100px">

              <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
              </el-form-item>

              <el-form-item>
                <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
                  @click.native.prevent="handleLogin">登录</el-button>
              </el-form-item>


            </el-form>
          </div>

        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {


    data() {
      return {
        loginForm: {
          username: 'bobby',
          password: '123456'
        },
        loading: false,
        showDialog: false,
        redirect: undefined,
        otherQuery: {}
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          const query = route.query
          if (query) {
            this.redirect = query.redirect
            this.otherQuery = this.getOtherQuery(query)
          }
        },
        immediate: true
      }
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('employee/login', this.loginForm)
              .then(() => {
                this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            console.log('账号或密码错误')
            return false
          }
        })
      },
    }
  }
</script>

<style>
  .register-container {
    margin: 10px;
  }
</style>