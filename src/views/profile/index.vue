<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <el-card style="margin-bottom:20px;">
            <div slot="header" class="clearfix">
              <span>个人简介</span>
            </div>

            <div class="account-profile">
              <div class="box-center">
                <pan-thumb :image="account.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
                  <div>Hello</div>
                  <span>{{ account.username }}</span>
                </pan-thumb>
              </div>
              <div class="box-center">
                <div class="account-name text-center" v-if="isEmployee">{{ account.name }}</div>
                <div class="account-name text-center" v-else>{{ account.nickname }}</div>
                <div class="account-role text-center text-muted">
                  <el-tag :type="roleColorDict[this.$store.getters.roles[0]]">{{
                      roleDict[this.$store.getters.roles[0]]
                    }}
                  </el-tag>
                </div>
              </div>
            </div>
            <el-divider></el-divider>
            <div>
              <h3>联系方式</h3>
              <el-row style="margin: 15px">
                <div class="el-icon-message"> {{ account.email }}</div>
              </el-row>
              <el-row style="margin: 15px">
                <div class="el-icon-mobile-phone"> {{ account.phone }}</div>
              </el-row>

              <el-divider></el-divider>
              <el-row>
                <div class="el-icon-time"> {{ account.lastLoginTime }}</div>
              </el-row>
            </div>
          </el-card>
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <div slot="header" class="clearfix">
              <span>个人信息</span>
            </div>
            <el-form v-model="formData">
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="用户名">
                    <el-input v-model.trim="formData.username" :disabled="true"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12" v-if="isEmployee">
                  <el-form-item label="工号">
                    <el-input v-model.trim="formData.code" :disabled="true"/>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col :span="9" v-if="isEmployee">
                  <el-form-item label="姓名">
                    <el-input v-model.trim="account.name" :disabled="!editable"/>
                  </el-form-item>
                </el-col>
                <el-col :span="9" v-else>
                  <el-form-item label="昵称">
                    <el-input v-model.trim="account.nickname" :disabled="!editable"/>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="性别">
                    <el-select v-model="account.sex" clearable placeholder="请选择" @change="onSexChanged"
                               :disabled="!editable"
                    >
                      <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="9" v-if="isEmployee">
                  <el-form-item label="入职日期">
                    <el-input v-model.trim="formData.hireDate" :disabled="true"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-else>
                  <el-form-item label="生日">
                    <el-input v-model.trim="formData.birthday" :disabled="!editable"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="邮箱">
                    <el-input v-model.trim="formData.email" :disabled="!editable"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="手机号">
                    <el-input v-model.trim="formData.phone" :disabled="!editable"/>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item label="片区" v-if="isEmployee">
                <el-cascader
                  placeholder="请选择地区"
                  size="medium"
                  :options="placeOptions"
                  @change="handleRegionChange"
                  :disabled="!editable"
                  v-if="showCascadePlace"
                />
                <el-button v-if="!showCascadePlace" @click="showCascadePlace=true" :disabled="!editable">
                  <template slot-scope="">
                    {{ this.region }}
                  </template>
                </el-button>

              </el-form-item>
              <el-form-item label="街道" v-if="isEmployee">
                <el-input v-model.trim="street" label="街道" :disabled="!editable"/>
              </el-form-item>

              <el-row :gutter="10">
                <el-col :span="12" v-if="isEmployee">
                  <el-form-item label="员工状态">
                    <el-input v-model.trim="formData.status" :disabled="!editable"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="账户状态">
                    <el-input v-model.trim="formData.accountStatus" :disabled="!editable"/>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="创建时间">
                    <el-input v-model.trim="formData.createTime" :disabled="true"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="更新时间">
                    <el-input v-model.trim="formData.updateTime" :disabled="true"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="上次登录时间">
                    <el-input v-model.trim="formData.lastLoginTime" :disabled="true"/>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item>
                <el-button type="danger" @click="openChangePasswordDialog">修改密码</el-button>
                <el-button type="primary" @click="submitChangeInfo">{{ editLabel[this.editable] }}</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { codeToText, regionData } from 'element-china-area-data'
import { employeeProfile, employeeProfileUpdate, userProfile, userProfileUpdate } from '@/api/profile'
import UserCard from './components/UserCard'
import Activity from './components/Activity'
import Timeline from './components/Timeline'
import Account from './components/Account'

export default {
  name: 'Profile',
  components: { UserCard, Activity, Timeline, Account },
  data() {
    return {
      showCascadePlace: false, // 是否显示级联
      sexOptions: [
        { value: 0, label: '女' },
        { value: 1, label: '男' },
        { value: 2, label: '未知' }
      ],
      region: '',
      street: '',
      placeOptions: regionData,
      formData: null,
      editable: false,
      user: {},
      activeTab: 'activity',
      account: {},
      accountType: null,
      roleDict: {
        'ROLE_SUPER_ADMIN': '超级管理员',
        'ROLE_STATION_ADMIN': '站点管理员',
        'ROLE_DELIVERY_MAN': '快递员',
        'ROLE_EMPLOYEE': '普通员工'
      },
      roleColorDict: {
        'ROLE_SUPER_ADMIN': 'danger',
        'ROLE_STATION_ADMIN': 'warning',
        'ROLE_DELIVERY_MAN': 'success',
        'ROLE_EMPLOYEE': 'primary'
      },
      editLabel: {
        true: '保存',
        false: '修改'
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.getUser()
    this.getProfile()
  },
  methods: {
    onSexChanged(val) {
      this.account.sex = val
    },
    handleRegionChange(val) {
      this.region = codeToText[val[0]] + '/' + codeToText[val[1]] + '/' + codeToText[val[2]]
    },
    onChangeSave(data) {
      if (this.isEmployee()) {
        data.address = this.region + '/' + this.street
        return employeeProfileUpdate(data)
      } else {
        return userProfileUpdate(data)
      }
    },
    submitChangeInfo() {
      if (this.editable) {
        // 可修改，才能保存
        // this.formData = JSON.parse(JSON.stringify(this.account))
        this.onChangeSave(this.formData).then(res => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.getProfile()
        })
      }
      this.editable = !this.editable
    },
    getProfile() {
      if (this.$store.getters.accountType === 'EMPLOYEE') {
        employeeProfile(this.$store.getters.accountId).then(res => {
          this.account = res.data
          this.formData = JSON.parse(JSON.stringify(this.account))
          let start = this.formData.address.lastIndexOf('/')
          this.street = this.formData.address.substring(start + 1)
          this.region = this.formData.address.substring(0, start)
          if (this.region == null || this.region == undefined || this.region == '') {
            this.showCascadePlace = true
          } else {
            this.showCascadePlace = false
          }
          console.log('region:' + this.region)
        })
      } else {
        userProfile(this.$store.getters.accountId).then(res => {
          this.account = res.data
          this.formData = JSON.parse(JSON.stringify(this.account))
        })
      }
      console.log(this.account)
    },
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(' | '),
        email: 'admin@test.com',
        avatar: this.avatar
      }
    },
    isEmployee() {
      return this.$store.getters.accountType === 'EMPLOYEE'
    }
  }
}
</script>
