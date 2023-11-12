<template>
  <el-container style="height: 103%">
    <el-main>
      <el-row :gutter="20" type="flex" justify="center" align="middle">
        <el-col :span="11">
          <!--          send-->
          <el-card>
            <div slot="header" class="clearfix">
              <el-row>
                <el-col :span="14">
                  <i class="el-icon-position" style="font-size: x-large"/>
                  <span> <b> 寄件信息</b></span>
                </el-col>
                <el-col :span="4">
                  <el-button type="primary" @click="resetSender">重 置</el-button>

                </el-col>

                <el-col :span="6">
                  <el-button type="primary" plain @click="openSendAddressSelectDialog">我的地址</el-button>
                </el-col>

              </el-row>
            </div>
            <el-form ref="ruleForm" :model="detailDelivery" :rules="rules" label-width="100px" class="demo-ruleForm">
              <el-form-item label="姓名" prop="senderName">
                <el-input v-model="detailDelivery.senderName" placeholder="请填写寄件人姓名" style="width: 70%"/>
              </el-form-item>
              <el-form-item label="电话" prop="senderPhone">
                <el-input v-model="detailDelivery.senderPhone" placeholder="请填写手机号码或固话" style="width: 70%"/>
              </el-form-item>

              <el-form-item label="地区">
                <el-button @click="onShowMySenderAddressPressed" v-if="showMySenderAddress">
                  <template slot-scope="">
                    {{
                      this.prevSendAddress
                    }}
                  </template>
                </el-button>
                <el-cascader
                  v-model="senderLocationPath"
                  placeholder="请选择地区"
                  size="medium"
                  :options="options"
                  @change="handleSenderChange"
                  ref="senderAddressSelector"

                  v-else
                />

              </el-form-item>

              <el-form-item label="街道" prop="senderAddress">
                <el-input v-model="senderStreet" placeholder="请填写详细地址" style="width: 70%"/>
              </el-form-item>
              <!--              <el-form-item label="网点">-->
              <!--                <el-button @click="openNearStationDialog(true)">{{ this.selectSendStationLabel }}</el-button>-->
              <!--              </el-form-item>-->

            </el-form>

          </el-card>
        </el-col>
        <el-col :span="1">
          <i class="el-icon-d-arrow-right" style="font-size: xx-large"></i>
        </el-col>

        <el-col :span="11">
          <el-card>
            <div slot="header" class="clearfix">
              <el-row :gutter="10">
                <el-col :span="14">
                  <i class="el-icon-box" style="font-size: x-large"/>
                  <span> <b> 收件信息</b></span>
                </el-col>

                <el-col :span="4">
                  <el-button type="primary" @click="resetReceiver">重 置</el-button>
                </el-col>

                <el-col :span="6">
                  <el-button type="primary" plain @click="openReceiveAddressSelectDialog">我的地址</el-button>
                </el-col>


              </el-row>
            </div>

            <el-form ref="ruleForm" :model="detailDelivery" :rules="rules" label-width="100px" class="demo-ruleForm">
              <el-form-item label="姓名" prop="senderName">
                <el-input v-model="detailDelivery.recipientName" placeholder="请填写寄件人姓名" style="width: 70%"/>
              </el-form-item>
              <el-form-item label="电话" prop="senderPhone">
                <el-input v-model="detailDelivery.recipientPhone" placeholder="请填写手机号码或固话" style="width: 70%"/>
              </el-form-item>

              <el-form-item label="地区">
                <el-button @click="onShowMyReceiveAddressPressed" v-if="showMyReceiveAddress">
                  <template slot-scope="">
                    {{
                      this.prevReceiveAddress
                    }}
                  </template>
                </el-button>
                <el-cascader
                  v-model="receiverLocationPath"
                  placeholder="请选择地区"
                  size="medium"
                  :options="options"
                  @change="handleReceiverChange"
                  v-else
                />
              </el-form-item>
              <el-form-item label="街道" prop="senderAddress">
                <el-input v-model="receiverStreet" placeholder="请填写详细地址" style="width: 70%"/>
              </el-form-item>
              <!--              <el-form-item label="网点">-->
              <!--                <el-button @click="openNearStationDialog(false)">{{ this.selectReceiveStationLabel }}</el-button>-->
              <!--              </el-form-item>-->
            </el-form>

          </el-card>

        </el-col>

      </el-row>
    </el-main>

    <!--    寄出网点-->
    <el-dialog
      title="选择附近网点"
      :visible.sync="nearSendStationDialog"
      width="70%"
    >
      <el-table :data="stationList">
        <el-table-column type="selection" width="55" align="center"/>
        <el-table-column prop="stationName" label="网点名称" align="center"/>
        <el-table-column label="网点地址">
          <template slot-scope="scope">
            {{ scope.row.province + '/' + scope.row.city + '/' + scope.row.country + '/' + scope.row.street }}
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="联系方式"/>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button @click="selectStation(scope.row, true)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!--    收 网点-->
    <el-dialog
      title="选择附近网点"
      :visible.sync="nearReceiveStationDialog"
      width="70%"
    >
      <el-table :data="stationList">
        <el-table-column type="selection" width="55" align="center"/>
        <el-table-column prop="stationName" label="网点名称" align="center"/>
        <el-table-column label="网点地址">
          <template slot-scope="scope">
            {{ scope.row.province + '/' + scope.row.city + '/' + scope.row.country + '/' + scope.row.street }}
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="联系方式"/>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button @click="selectStation(scope.row, false)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!--    寄-我的地址-->
    <el-dialog
      title="我的地址"
      :visible.sync="addressSendSelectDialog"
      width="70%"
    >
      <el-table :data="addressList">
        <el-table-column prop="recipientName" label="收件人" align="center"/>
        <el-table-column prop="phone" label="联系方式" align="center"/>
        <el-table-column prop="province" label="省" align="center"/>
        <el-table-column prop="city" label="市" align="center"/>
        <el-table-column prop="country" label="区(县)" align="center"/>
        <el-table-column prop="street" label="详细地址" align="center"/>
        <el-table-column prop="postalCode" label="邮编" align="center"/>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button @click="selectSendAddress(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!--     收-我的地址-->
    <el-dialog
      title="我的地址"
      :visible.sync="addressReceiveSelectDialog"
      width="70%"
    >
      <el-table :data="addressList">
        <el-table-column prop="recipientName" label="收件人" align="center"/>
        <el-table-column prop="phone" label="联系方式" align="center"/>
        <el-table-column prop="province" label="省" align="center"/>
        <el-table-column prop="city" label="市" align="center"/>
        <el-table-column prop="country" label="区(县)" align="center"/>
        <el-table-column prop="street" label="详细地址" align="center"/>
        <el-table-column prop="postalCode" label="邮编" align="center"/>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button @click="selectReceiveAddress(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>


    <el-footer style="display: flex; align-items: center">
      <div style="flex: 10">
        <span style="font-weight: bolder; font-size: 25px">预估总价：</span>
        <span style="font-weight: bold; font-size: 23px; color: red">{{ prize }}元</span>
      </div>
      <div style="flex: 15"/>
      <div style="flex: 5; align-items: center">
        <el-button type="primary" style="float: right; width: 200px" :disabled="buttonDisabled" @click="order">
          下 单
        </el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import { codeToText, regionData } from 'element-china-area-data'
import { order } from '@/api/delivery'
import { queryStationByAddress } from '@/api/station'
import { queryAllAddress } from '@/api/adressBook'

export default {

  name: 'UserSending',
  data() {
    return {
      prevSendAddress: '',
      prevReceiveAddress: '',
      showMySenderAddress: false,
      showMyReceiveAddress: false,
      addressList: null,
      addressSendSelectDialog: false,
      addressReceiveSelectDialog: false,
      sendStation: null,
      receiveStation: null,
      selectSendStationLabel: '选择网点',
      selectReceiveStationLabel: '选择网点',
      stationList: null,
      nearSendStationDialog: false,
      nearReceiveStationDialog: false,
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
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        senderPhone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        // prevSendAddress: [
        //   { required: true, message: '请输入寄件地址' }
        // ],
        recipientName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
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
    onShowMyReceiveAddressPressed() {
      this.showMyReceiveAddress = false
    },
    onShowMySenderAddressPressed() {
      this.showMySenderAddress = false
    },
    setSenderInfo(address) {
      this.detailDelivery.senderName = address.recipientName
      this.detailDelivery.senderPhone = address.phone
      this.senderStreet = address.street
      this.prevSendAddress = address.province + '/' + address.city + '/' + address.country
      this.showMySenderAddress = true
    },
    setReceiveInfo(address) {
      this.detailDelivery.recipientName = address.recipientName
      this.detailDelivery.recipientPhone = address.phone
      this.receiverStreet = address.street
      this.prevReceiveAddress = address.province + '/' + address.city + '/' + address.country
      this.showMyReceiveAddress = true
    },
    selectSendAddress(address) {
      // 选择地址
      this.setSenderInfo(address)
      this.addressSendSelectDialog = false
      this.orderAvailable()
    },
    selectReceiveAddress(address) {
      // 选择地址
      this.setReceiveInfo(address)
      this.addressReceiveSelectDialog = false
      this.orderAvailable()
    },
    onQueryAddress() {
      queryAllAddress({ userId: this.$store.getters.accountId }).then(res => {
        this.addressList = res.data
      })
    },
    openSendAddressSelectDialog() {
      this.addressSendSelectDialog = true
      this.onQueryAddress()
    },
    openReceiveAddressSelectDialog() {
      this.addressReceiveSelectDialog = true
      this.onQueryAddress()
    },
    selectStation(row, isSender) {
      if (isSender) {
        this.selectSendStationLabel = row.stationName
        this.sendStation = row
        this.nearSendStationDialog = false
      } else {
        this.selectReceiveStationLabel = row.stationName
        this.receiveStation = row
        this.nearReceiveStationDialog = false
      }
      this.orderAvailable()
    },
    getReceiveAddress() {
      return this.prevReceiveAddress + '/' + this.receiverStreet
    },
    getSenderAddress() {
      return this.prevSendAddress + '/' + this.senderStreet
    },
    openNearStationDialog(isSender) {
      isSender ? this.nearSendStationDialog = true : this.nearReceiveStationDialog = true
      queryStationByAddress(isSender ? this.getSenderAddress() : this.getReceiveAddress()).then(res => {
        this.stationList = res.data
      })
    },
    handleSenderChange(val) {
      this.prevSendAddress = codeToText[val[0]] + '/' + codeToText[val[1]] + '/' + codeToText[val[2]]
      this.orderAvailable()
      // this.prizeLock++
      // if (this.prizeLock > 0) this.countPrize()
    },
    handleReceiverChange(val) {
      this.prevReceiveAddress = codeToText[val[0]] + '/' + codeToText[val[1]] + '/' + codeToText[val[2]]
      this.orderAvailable()

      // let receiverLoc = ''
      // for (let i = 0; i < this.receiverLocationPath.length; i++) {
      //   receiverLoc += codeToText[this.receiverLocationPath[i]]
      // }
      // console.log(receiverLoc, this.receiverLocationPath[0])
      // this.detailDelivery.recipientAddress = receiverLoc
      // this.prizeLock++
      // if (this.prizeLock > 0) this.countPrize()
    },
    countPrize() {
      this.prize = '好多'
      this.buttonDisabled = false
    },
    order() {
      this.detailDelivery.senderAddress = this.prevSendAddress + '/' + this.senderStreet
      this.detailDelivery.recipientAddress = this.prevReceiveAddress + '/' + this.receiverStreet
      order(this.detailDelivery).then(res => {
        this.$message.success('下单成功')
      })
    },
    resetSender() {
      this.detailDelivery.senderName = ''
      this.detailDelivery.senderPhone = ''
      this.detailDelivery.senderAddress = ''
      this.senderStreet = ''
      this.showMySenderAddress = false
      this.prevSendAddress = ''
      this.selectSendStationLabel = '选择网点'
      this.sendStation = null
      this.orderAvailable()
    },
    resetReceiver() {
      this.detailDelivery.recipientName = ''
      this.detailDelivery.recipientPhone = ''
      this.detailDelivery.recipientAddress = ''
      this.receiverStreet = ''
      this.showMyReceiveAddress = false
      this.prevReceiveAddress = ''
      this.selectReceiveStationLabel = '选择网点'
      this.receiveStation = null
      this.orderAvailable()
    },
    calPrice(p1, p2) {
      //计算两地价格
      if (p1 == p2) {
        // 省内
        this.prize = 8
      } else {
        this.prize = 12
      }
    },
    orderAvailable() {
      if (this.prevSendAddress != '' && this.prevReceiveAddress != ''
        && this.detailDelivery.senderName != '' && this.detailDelivery.senderPhone
        && this.detailDelivery.recipientName && this.detailDelivery.recipientPhone
      ) {
        this.buttonDisabled = false
        let p1 = this.prevSendAddress.substring(this.prevSendAddress.indexOf('/'))
        let p2 = this.prevReceiveAddress.substring(this.prevReceiveAddress.indexOf('/'))
        this.calPrice(p1, p2)
      } else {
        this.prize = '--'
        this.buttonDisabled = true
      }
    }
  }
}
</script>

<style scoped>
</style>
