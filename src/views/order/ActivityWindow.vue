<!--一个组件多用，添加/编辑弹窗-->
<template>
  <div class="mycontainer">
    <el-form ref="form" :model="form" label-width="80px">

      <!-- <el-form-item label="所在地区">
        <el-select
          v-model="form.province"
          placeholder="请选择省"
          style="width:120px"
          required
          @change="changeProvince"
        >
          <el-option
            v-for="item in provinceList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="form.city"
          placeholder="请选择市"
          style="width:120px"
          required
          @change="changeCity"
        >
          <el-option
            v-for="item in cityOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="form.country"
          placeholder="请选择区"
          style="width:120px"
          required
          @change="changeOrigin"
        >
          <el-option
            v-for="item in originOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item> -->
      <div style="display:flex;justify-content: space-between;">
        <el-form-item label="物流单号">
          <el-input v-model="form.expressNumber" readonly required />
        </el-form-item>
        <el-form-item label="订单时间" label-width="100px">
          <el-input v-model="form.createOrder" readonly />
        </el-form-item>
      </div>
      <div style="display:flex;justify-content: space-between;">
        <el-form-item label="寄件人">
          <el-input v-model="form.senderName" readonly required />
        </el-form-item>
        <el-form-item label="寄件人号码" label-width="100px">
          <el-input v-model="form.senderPhone" readonly />
        </el-form-item>
      </div>

      <div style="display:flex;justify-content: space-between;">
        <el-form-item label="收件人">
          <el-input v-model="form.recipientName" readonly />
        </el-form-item>
        <el-form-item label="收件人电话" label-width="100px">
          <el-input v-model="form.recipientPhone" readonly />
        </el-form-item>
      </div>
      <div style="display:flex;justify-content: space-between;">
        <el-form-item label="快递员编号" label-width="90px">
          <el-input v-model="form.courierCode" readonly />
        </el-form-item>
        <el-form-item label="快递员姓名" label-width="100px">
          <el-input v-model="form.courierName" readonly />
        </el-form-item>
      </div>
      <div style="display:flex;justify-content: space-between;">
        <el-form-item label="快递状态">
          <el-input v-model="form.status" readonly />
        </el-form-item>
        <el-form-item label="运费">
          <el-input v-model="form.expressCost" readonly />
        </el-form-item>
      </div>
      <el-form-item label="寄件地址">
        <el-input v-model="form.senderAddress" readonly />
      </el-form-item>
      <el-form-item label="收件地址">
        <el-input v-model="form.recipientAddress" readonly />
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
import { data } from '@/assets/js/china_address.js'

export default {
  name: '',
  components: {},
  props: ['childProp'],
  data() {
    return {
      select_data: {
        province: '',
        city: '',
        country: ''
      },
      jsonData: data,
      provinceList: [], // 省列表
      cityList: [], // 市列表
      originList: [], // 区列表
      cityOptions: [], // 市下拉框数据
      originOptions: [], // 区下拉框数据
      form: {
        expressNumber: '',
        senderName: '',
        senderPhone: '',
        senderAddress: '',
        recipientName: '',
        recipientPhone: '',
        recipientAddress: '',
        expressCost: '',
        courierCode: '',
        courierName: '',
        createOrder: '',
        status: ''
      }
    }
  },
  created() {
    console.log('ActivityWindow')
    // this._getJsonData()
    if (this.childProp != null) {
      if (this.childProp.length != 0) {
        this.form = this.childProp
      } else {
        console.log('1111')
      }
    }
  },
  methods: {
    fromData() {
      return this.form
    }
    // changeProvince(val) {
    //   this.provinceList.forEach((province, index) => {
    //     debugger
    //     if (val.toString() === this.provinceList[index].value) {
    //       this.cityOptions = this.provinceList[index].children
    //       this.valueCity = ''
    //       this.originOptions = this.provinceList[index].children[0].children
    //       this.valueCity = ''
    //       this.valueOrigin = ''
    //       this.form.province = province.label
    //       // 如果选中省之后想市区默认选中
    //       // this.valueCity = this.provinceList[index].children[0].value
    //       // this.valueOrigin = this.provinceList[index].children[0].children[0].value
    //     }
    //   })
    // },
    // // 选择市
    // changeCity(val) {
    //   this.cityList.forEach((city, index) => {
    //     if (val.toString() === this.cityList[index].value) {
    //       this.originOptions = this.cityList[index].children
    //       this.valueOrigin = ''
    //       this.form.city = city.label
    //       // 如果选中市之后默认区选中
    //       // this.valueOrigin = this.cityList[index].children[0].value
    //     }
    //   })
    // },
    // // 选择区
    // changeOrigin(val) {
    //   this.valueOrigin = val
    //   this.originList.forEach((origin, index) => {
    //     if (val.toString() === this.originList[index].value) {
    //       this.form.country = origin.label
    //       // 如果选中市之后默认区选中
    //       // this.valueOrigin = this.cityList[index].children[0].value
    //     }
    //   })
    // },
    // 初始化省市区数据
    // _getJsonData() {
    //   console.log('res =======>' + this.jsonData)
    //   this.provinceList = []
    //   this.cityList = []
    //   this.originList = []
    //   this.jsonData.forEach((item) => {
    //     if (item.value.match(/0000$/)) {
    //       this.provinceList.push({
    //         value: item.value,
    //         label: item.name,
    //         children: []
    //       })
    //     } else if (item.value.match(/00$/)) {
    //       this.cityList.push({
    //         value: item.value,
    //         label: item.name,
    //         children: []
    //       })
    //     } else {
    //       this.originList.push({
    //         value: item.value,
    //         label: item.name
    //       })
    //     }
    //   })
    //   for (const index in this.provinceList) {
    //     for (const index1 in this.cityList) {
    //       if (this.provinceList[index].value.slice(0, 2) === this.cityList[index1].value.slice(0, 2)) {
    //         this.provinceList[index].children.push(this.cityList[index1])
    //       }
    //     }
    //   }
    //   for (const item1 in this.cityList) {
    //     for (const item2 in this.originList) {
    //       if (this.originList[item2].value.slice(0, 4) === this.cityList[item1].value.slice(0, 4)) {
    //         this.cityList[item1].children.push(this.originList[item2])
    //       }
    //     }
    //   }
    // }
  }

}
</script>
<style>
    .mycontainer {
        display: flex;
        flex-direction: column;
        justify-content: space-around
    }
</style>
