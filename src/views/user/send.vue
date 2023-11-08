<template>
  <el-container style="height: 103%">
    <el-main>
      <div style="display: flex; height: 350px; width: 100%">
        <div style="border: rgb(48,65,86) solid; flex: 10">
          <div>
            <i class="el-icon-position" style="margin: 10px 0 0 10px" />
            <span style="font-size: 16px"> 寄件人</span>
          </div>
          <div style="height: 40px" />
          <el-form ref="ruleForm" :model="senderForm" :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="senderForm.name" placeholder="请填写真实姓名" style="width: 70%" />
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model="senderForm.phone" placeholder="请填写手机号码或固话" style="width: 70%" />
            </el-form-item>
            <el-form-item label="地区" prop="region">
              <el-cascader
                v-model="senderForm.locationPath"
                placeholder="请选择地区"
                size="medium"
                :options="options"
                @change="handleSenderChange"
              />
            </el-form-item>
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="senderForm.address" placeholder="请填写详细地址" style="width: 70%" />
            </el-form-item>
          </el-form>
        </div>
        <div style="flex: 1; display: flex; justify-content: center; align-items: center">
          <i class="el-icon-right" />
        </div>
        <div style="border: rgb(48,65,86) solid;flex: 10">
          <div>
            <i class="el-icon-present" style="margin: 10px 0 0 10px" />
            <span style="font-size: 16px"> 收件人</span>
          </div>
          <div style="height: 40px" />
          <el-form ref="ruleForm" :model="receiverForm" :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="receiverForm.name" placeholder="请填写真实姓名" style="width: 70%" />
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model="receiverForm.phone" placeholder="请填写手机号码或固话" style="width: 70%" />
            </el-form-item>
            <el-form-item label="地区" prop="region">
              <el-cascader
                v-model="receiverForm.locationPath"
                placeholder="请选择地区"
                size="medium"
                :options="options"
                @change="handleReceiverChange"
              />
            </el-form-item>
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="receiverForm.address" placeholder="请填写详细地址" style="width: 70%" />
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-main>
    <el-footer style="display: flex; align-items: center">
      <div style="flex: 10">
        <span style="font-weight: bolder; font-size: 25px">预估总价：</span>
        <span style="font-weight: bold; font-size: 23px; color: red">{{ prize }}元</span>
      </div>
      <div style="flex: 15" />
      <div style="flex: 5; align-items: center">
        <el-button type="primary" style="float: right; width: 200px" :disabled="buttonDisabled" @click="order">
          下 单
        </el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import { regionData, codeToText } from 'element-china-area-data'

export default {

  name: 'UserSending',
  data() {
    return {
      buttonDisabled: true,
      prizeLock: -1,
      prize: '--  ',
      options: regionData,
      senderForm: {
        name: '',
        phone: '',
        locationPath: '',
        address: ''
      },
      receiverForm: {
        name: '',
        phone: '',
        locationPath: '',
        address: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        locationPath: [
          { required: true, message: '请输入寄件地址' }
        ],
        address: [
          { required: true, message: '请填写详细地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSenderChange() {
      let senderLoc = ''
      for (let i = 0; i < this.senderForm.locationPath.length; i++) {
        senderLoc += codeToText[this.senderForm.locationPath[i]]
      }
      console.log(senderLoc, this.senderForm.locationPath[0])
      this.prizeLock++
      if (this.prizeLock > 0) this.countPrize()
    },
    handleReceiverChange() {
      let receiverLoc = ''
      for (let i = 0; i < this.receiverForm.locationPath.length; i++) {
        receiverLoc += codeToText[this.receiverForm.locationPath[i]]
      }
      console.log(receiverLoc, this.receiverForm.locationPath[0])
      this.prizeLock++
      if (this.prizeLock > 0) this.countPrize()
    },
    countPrize() {
      const from = this.senderForm.locationPath[0] + this.senderForm.locationPath[1]
      const to = this.receiverForm.locationPath[0] + this.receiverForm.locationPath[1]
      this.prize = Math.abs(from - to) / 1000 + 10
      this.buttonDisabled = false
    },
    order() {
      this.$message.success('下单成功')
    }
  }
}
</script>

<style scoped>
</style>
