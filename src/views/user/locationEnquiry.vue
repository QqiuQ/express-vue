<template>
  <div>
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
    <el-table v-if="this.tableSight === true" :data="view_Data">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column prop="stationName" label="网点名称" align="center" />
      <el-table-column prop="street" label="网点地址" />
      <el-table-column prop="phone" label="联系方式" />
      <el-table-column prop="stationManager" label="管理员" />
      <el-table-column prop="managerPhone" label="管理员电话" />
      <!-- <el-table-column label="操作" align="center" width="180" /> -->
    </el-table>
    
  </el-container>
  <el-footer>
      <el-pagination
        :page-size="pages.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="pages.totalData"
        @current-change="handleCurrentChange"
      />
    </el-footer>
  </div>
</template>

<script>
import { regionData, codeToText } from 'element-china-area-data'
import { queryList } from '@/api/locationEnquiry'
export default {
  name: 'LocationEnquiry',
  data() {
    return {
      tableSight: false,
      options: regionData,
      locationPath: [],
      address: '',
      pages: {
        totalData: 0,
        currentPage: 1,
        pageSize: 5
      },
      tableData: [],
      view_Data:[],
      addresses : {
        province:'',
        city:'',
        country:''
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pages.currentPage = val
      const start = (this.pages.currentPage - 1) * this.pages.pageSize
      const end = start + this.pages.pageSize
      this.view_Data = this.tableData.slice(start, end)
      console.log("view_Data",this.view_Data)
      this.pages.totalData = this.tableData.length
    },
    handleLocChange() {
      
      console.log(this.locationPath[2])
    },
    handleAddChange() {
      console.log(this.address)
    },
    query() {
      this.tableSight = true
      this.addresses.province = codeToText[this.locationPath[0]]
      this.addresses.city = codeToText[this.locationPath[1]]
      this.addresses.country = codeToText[this.locationPath[2]]
      console.log(this.addresses)
      queryList(this.addresses).then(response => {
        this.tableData = response.data
        this.view_Data = this.tableData.slice(0, this.pages.pageSize)
      console.log("view_Data",this.view_Data)
      this.pages.totalData = this.tableData.length
      })
      this.$message.success('查询成功')
    }
  }
}
</script>

<style scoped>

</style>
