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
    <div style="height: 30px"/>
    <div>
      <el-input v-model="address" style="width: 90%" placeholder="街道" size="medium"/>
    </div>
    <div style="height: 30px"/>
    <el-button type="primary" style="width: 400px" @click="queryStation"> 查 询</el-button>
    <div style="height: 30px"/>
    <el-table v-if="this.tableSight === true" :data="tableData">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column prop="stationName" label="网点名称" align="center"/>
      <el-table-column label="网点地址">
        <template slot-scope="scope">
          {{ scope.row.province + '/' + scope.row.city + '/' + scope.row.country + '/' + scope.row.street }}
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="联系方式"/>
      <el-table-column label="操作" align="center" width="180"/>
    </el-table>
  </el-container>
</template>

<script>
import { codeToText, regionData } from 'element-china-area-data'
import { queryStationByAddress } from '@/api/station'

export default {
  name: 'LocationEnquiry',
  data() {
    return {
      locationCodes: [],
      tableSight: false,
      options: regionData,
      locationPath: [],
      address: '',
      tableData: []
    }
  },
  methods: {
    handleLocChange(val) {
      this.locationCodes = val
    },
    queryStation() {
      this.tableSight = true
      let queryAddress = codeToText[this.locationCodes[0]] + '/' + codeToText[this.locationCodes[1]] + '/' + codeToText[this.locationCodes[2]] + '/' + this.address
      // console.log(queryAddress)
      queryStationByAddress(queryAddress).then(res => {
        this.tableData = res.data
        this.$message.success('查询成功')
      })
    }
  }
}
</script>

<style scoped>

</style>
