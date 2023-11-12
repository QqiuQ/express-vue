<template>
  <div class="container">
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-card style="margin-top: 50px;">
          <el-row>
            <el-button type="text">
              <a href="/login"> 已有账号？登录</a>
            </el-button>
          </el-row>
          <el-form class="container" :model="userForm" :rules="rules" label-width="100px">
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="userForm.nickname" placeholder="请输入昵称"/>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userForm.username" placeholder="请输入用户名"/>
            </el-form-item>

            <el-form-item label="性别" prop="sex">
              <el-select v-model="userForm.sex" @change="sexChanged">
                <el-option
                  v-for="item in sexOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="生日">
              <el-form-item prop="birthday">
                <el-date-picker v-model="userForm.birthday" type="date" placeholder="选择日期"/>
              </el-form-item>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="userForm.email" placeholder="请输入邮箱"/>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="userForm.phone" placeholder="请输入手机号"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="userForm.password" placeholder="请输入密码" show-password/>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPwd">
              <el-input v-model="userForm.confirmPwd" placeholder="请再次输入密码" show-password/>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm">注册</el-button>
            </el-form-item>

          </el-form>

        </el-card>

      </el-col>

    </el-row>

  </div>
</template>

<script>
import { register } from '@/api/user2'

export default {

  data() {
    // 验证第二次密码
    const validatePwd2 = async(rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.userForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      sexOptions: [
        { label: '未知', value: 0 },
        { label: '男', value: 1 },
        { label: '女', value: 2 }
      ],

      userForm: {
        nickname: '',
        username: '',
        password: '',
        confirmPwd: '',
        birthday: '',
        sex: 0,
        phone: '',
        email: ''
      },

      rules: {
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, message: '用户名长度至少 3 位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度至少 6 位', trigger: 'blur' }
        ],
        confirmPwd: [
          { required: true, menubar: '再次输入密码', trigger: 'blur' },
          { validator: validatePwd2 }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      console.log("register")
      register(this.userForm).then(res => {
        this.$message.success('注册成功,返回登录')
        this.$router.push('/login')
      })
    },
    resetForm() {
      this.userForm.resetFields()
    },
    sexChanged(val) {
      this.userForm.sex = val
    }
  }
}
</script>

<style>
.register-container {
  margin: 10px;
}
</style>
