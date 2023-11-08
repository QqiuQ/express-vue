<template>
  <el-container style="height: 84vh; padding: 50px; display: flex; flex-direction: column">
    <div>
      <el-cascader
        v-model="locationPath"
        style="width: 90%"
        placeholder="请选择寄收件地区"
        size="medium"
        :options="options"
        filterable
        @change="handleLocChange"
      />
    </div>
    <div style="height: 30px" />
    <div>
      <el-input v-model="address" style="width: 90%" placeholder="请填写详细地址" size="medium" @change="handleAddChange" />
    </div>
    <div style="height: 30px" />
    <el-button type="primary" style="width: 400px" @click="query"> 查 询 </el-button>
    <div style="height: 30px" />
    <el-table v-if="this.tableSight === true" :data="tableData">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column prop="stationName" label="网点名称" align="center" />
      <el-table-column prop="stationAddress" label="网点地址" />
      <el-table-column prop="stationPhone" label="联系方式" />
      <el-table-column label="操作" align="center" width="180" />
    </el-table>
  </el-container>
</template>

<script>
import { regionData } from 'element-china-area-data'

export default {
  name: 'LocationEnquiry',
  data() {
    return {
      tableSight: false,
      options: regionData,
      locationPath: [],
      address: '',
      tableData: []
    }
  },
  methods: {
    handleLocChange() {
      console.log(this.locationPath[2])
    },
    handleAddChange() {
      console.log(this.address)
    },
    query() {
      this.tableSight = true
      this.$message.success('查询成功')
    }
  }
}
</script>

<style scoped>

</style>
