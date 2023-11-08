<!--一个组件多用，添加/编辑弹窗-->
<template>
  <div class="mycontainer">
    <el-form ref="form" :model="form" label-width="80px">

      <el-form-item label="所在地区">
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
      </el-form-item>
      <el-form-item label="街道">
        <el-input v-model="form.street" required />
      </el-form-item>
      <el-form-item label="网点电话">
        <el-input v-model="form.phone" required />
      </el-form-item>
      <el-form-item label="网点名称">
        <el-input v-model="form.stationName" required />
      </el-form-item>
      <el-form-item label="负责人">
        <el-input v-model="form.stationManager" required />
      </el-form-item>
      <el-form-item label="负责电话">
        <el-input v-model="form.managerPhone" required />
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
        province: '',
        city: '',
        country: '',
        street: '',
        phone: '',
        stationName: '',
        stationManager: '',
        managerPhone: ''
      }
    }
  },
  created() {
    console.log('ActivityWindow')
    this._getJsonData()
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
    },
    changeProvince(val) {
      this.provinceList.forEach((province, index) => {
        debugger
        if (val.toString() === this.provinceList[index].value) {
          this.cityOptions = this.provinceList[index].children
          this.valueCity = ''
          this.originOptions = this.provinceList[index].children[0].children
          this.valueCity = ''
          this.valueOrigin = ''
          this.form.province = province.label
          // 如果选中省之后想市区默认选中
          // this.valueCity = this.provinceList[index].children[0].value
          // this.valueOrigin = this.provinceList[index].children[0].children[0].value
        }
      })
    },
    // 选择市
    changeCity(val) {
      this.cityList.forEach((city, index) => {
        if (val.toString() === this.cityList[index].value) {
          this.originOptions = this.cityList[index].children
          this.valueOrigin = ''
          this.form.city = city.label
          // 如果选中市之后默认区选中
          // this.valueOrigin = this.cityList[index].children[0].value
        }
      })
    },
    // 选择区
    changeOrigin(val) {
      this.valueOrigin = val
      this.originList.forEach((origin, index) => {
        if (val.toString() === this.originList[index].value) {
          this.form.country = origin.label
          // 如果选中市之后默认区选中
          // this.valueOrigin = this.cityList[index].children[0].value
        }
      })
    },
    // 初始化省市区数据
    _getJsonData() {
      console.log('res =======>' + this.jsonData)
      this.provinceList = []
      this.cityList = []
      this.originList = []
      this.jsonData.forEach((item) => {
        if (item.value.match(/0000$/)) {
          this.provinceList.push({
            value: item.value,
            label: item.name,
            children: []
          })
        } else if (item.value.match(/00$/)) {
          this.cityList.push({
            value: item.value,
            label: item.name,
            children: []
          })
        } else {
          this.originList.push({
            value: item.value,
            label: item.name
          })
        }
      })
      for (const index in this.provinceList) {
        for (const index1 in this.cityList) {
          if (this.provinceList[index].value.slice(0, 2) === this.cityList[index1].value.slice(0, 2)) {
            this.provinceList[index].children.push(this.cityList[index1])
          }
        }
      }
      for (const item1 in this.cityList) {
        for (const item2 in this.originList) {
          if (this.originList[item2].value.slice(0, 4) === this.cityList[item1].value.slice(0, 4)) {
            this.cityList[item1].children.push(this.originList[item2])
          }
        }
      }
    }
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
