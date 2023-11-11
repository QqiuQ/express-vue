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
          <el-form ref="ruleForm" :model="detailDelivery" :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="senderName">
              <el-input v-model="detailDelivery.senderName" placeholder="请填写寄件人姓名" style="width: 70%" />
            </el-form-item>
            <el-form-item label="电话" prop="senderPhone">
              <el-input v-model="detailDelivery.senderPhone" placeholder="请填写手机号码或固话" style="width: 70%" />
            </el-form-item>
            <el-form-item label="地区" prop="senderLocation">
              <el-cascader
                v-model="senderLocationPath"
                placeholder="请选择地区"
                size="medium"
                :options="options"
                @change="handleSenderChange"
              />
            </el-form-item>
            <el-form-item label="详细地址" prop="senderAddress">
              <el-input v-model="senderStreet" placeholder="请填写详细地址" style="width: 70%" />
            </el-form-item>
            <div style="display: flex; justify-content: center">
              <el-button type="primary" style="width: 50%;" @click="resetSender">重 置</el-button>
            </div>
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
          <el-form ref="ruleForm" :model="detailDelivery" :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="recipientName">
              <el-input v-model="detailDelivery.recipientName" placeholder="请填写收件人姓名" style="width: 70%" />
            </el-form-item>
            <el-form-item label="电话" prop="recipientPhone">
              <el-input v-model="detailDelivery.recipientPhone" placeholder="请填写手机号码或固话" style="width: 70%" />
            </el-form-item>
            <el-form-item label="地区" prop="receiverLocation">
              <el-cascader
                v-model="receiverLocationPath"
                placeholder="请选择地区"
                size="medium"
                :options="options"
                @change="handleReceiverChange"
              />
            </el-form-item>
            <el-form-item label="详细地址" prop="receiverStreet">
              <el-input v-model="receiverStreet" placeholder="请填写详细地址" style="width: 70%" />
            </el-form-item>
            <div style="display: flex; justify-content: center">
              <el-button type="primary" style="width: 50%;" @click="resetReceiver">重 置</el-button>
            </div>
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
import { order } from '@/api/delivery'

export default {

  name: 'UserSending',
  data() {
    return {
      buttonDisabled: true,
      prizeLock: -1,
      prize: '--  ',
      options: regionData,
      senderLocationPath: [],
      receiverLocationPath: [],
      senderStreet: '',
      receiverStreet: '',
      detailDelivery: {
        actualDeliveryTime: '',
        courierCode: '',
        courierName: '',
        courierPhone: '',
        createTime: '',
        description: '',
        estimatedDeliveryTime: '',
        expressCost: '',
        expressNumber: '',
        expressStatus: '',
        id: '',
        packageLength: '',
        packageWeight: '',
        recipientAddress: '',
        recipientName: '',
        recipientPhone: '',
        recipientSignature: '',
        remark: '',
        senderAddress: '',
        senderName: '',
        senderPhone: '',
        status: '',
        updateTime: ''
      },
      rules: {
        senderName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        senderPhone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        senderLocationPath: [
          { required: true, message: '请输入寄件地址' }
        ],
        recipientName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        recipientPhone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        receiverLocationPath: [
          { required: true, message: '请输入寄件地址' }
        ]
      }
    }
  },
  methods: {
    handleSenderChange() {
      let senderLoc = ''
      for (let i = 0; i < this.senderLocationPath.length; i++) {
        senderLoc += codeToText[this.senderLocationPath[i]]
      }
      console.log(senderLoc, this.senderLocationPath[0])
      this.detailDelivery.senderAddress = senderLoc
      this.prizeLock++
      if (this.prizeLock > 0) this.countPrize()
    },
    handleReceiverChange() {
      let receiverLoc = ''
      for (let i = 0; i < this.receiverLocationPath.length; i++) {
        receiverLoc += codeToText[this.receiverLocationPath[i]]
      }
      console.log(receiverLoc, this.receiverLocationPath[0])
      this.detailDelivery.recipientAddress = receiverLoc
      this.prizeLock++
      if (this.prizeLock > 0) this.countPrize()
    },
    countPrize() {
      this.prize = '好多'
      this.buttonDisabled = false
    },
    order() {
      this.detailDelivery.senderAddress += this.senderStreet
      this.detailDelivery.recipientAddress += this.receiverStreet
      order(this.detailDelivery)
      console.log(this.detailDelivery)
      this.$message.success('下单成功')
    },
    resetSender() {
      this.detailDelivery.senderName = ''
      this.detailDelivery.senderPhone = ''
      this.senderLocationPath = []
      this.senderStreet = ''
    },
    resetReceiver() {
      this.detailDelivery.recipientName = ''
      this.detailDelivery.recipientPhone = ''
      this.receiverLocationPath = []
      this.receiverStreet = ''
    }
  }
}
</script>

<style scoped>
</style>
