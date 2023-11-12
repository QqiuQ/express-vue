<template>
  <div>

    <el-container>
      <el-form :inline="true" :model=" queryList" label-width="68px">
        <el-form-item label="寄件地址">
          <el-input v-model=" queryList.senderAddress" placeholder="请输入寄件地址" clearable @input="SearchEvent"/>
        </el-form-item>
        <el-form-item label="收件地址">
          <el-input v-model=" queryList.recipientAddress" placeholder="请输入收件地址" clearable @input="SearchEvent"/>
        </el-form-item>
      </el-form>

    </el-container>
    <el-table ref="multipleTable" :data="view_Data" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
      <el-table-column label="物流单号" prop="expressNumber"/>
      <el-table-column label="寄件人姓名" prop="senderName"/>
      <el-table-column label="寄件地址" prop="senderAddress"/>
      <el-table-column label="收件人姓名" prop="recipientName"/>
      <el-table-column label="收货地址" prop="recipientAddress"/>
      <el-table-column label="快递员" prop="courierName"/>
      <el-table-column label="快递状态" prop="expressStatus"/>
      <!-- <el-table-column label="管理员电话" prop="managerrecipient_address" /> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.native.prevent="onOpenDetailDrawer(scope.row)">
            投递到
          </el-button>
        </template>

      </el-table-column>
    </el-table>
    <el-footer>
      <el-pagination
        :page-size="pages.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="pages.totalData"
        @current-change="handleCurrentChange"
      />
    </el-footer>


    <el-dialog
      title="选择附近网点"
      :visible.sync="stationDialogVisible"
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
            <el-button @click="dispatchToStation(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>


  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'
import { collectTasks, confirmCollectTask, confirmDispatchTask } from '@/api/courierTask'
import { employeeProfile } from '@/api/profile'
import { queryStationByAddress } from '@/api/station'

export default {
  name: 'collect',
  data() {
    return {
      deliveryId: null,
      stationList: null,
      stationDialogVisible: false,
      employee: {
        id: '',
        name: ''
      },
      status: 1,
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
      select_Data: [],
      view_Data: [],
      queryList: {
        senderAddress: '',
        recipientAddress: ''
      }
    }
  },
  methods: {
    dispatchToStation(row) {
      // row.id ==> stationId
      let stationId = row.id
      this.$confirm('投递到该网点？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // confirm
        confirmCollectTask(this.deliveryId, stationId).then(res => {
          this.$message.success('快递已投递')
          this.stationDialogVisible = false
          this.query()
        }).catch(() => {

        })
      }).catch(() => {
        // cancel
      })
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pages.currentPage = val
      const start = (this.pages.currentPage - 1) * this.pages.pageSize
      const end = start + this.pages.pageSize
      this.view_Data = this.select_Data.slice(start, end)
      console.log('view_Data', this.view_Data)
      this.pages.totalData = this.select_Data.length
    },
    handleLocChange() {

      console.log(this.locationPath[2])
    },
    handleAddChange() {
      console.log(this.address)
    },
    async onOpenDetailDrawer(row) {
      this.stationDialogVisible = true
      this.deliveryId = row.id
      employeeProfile(this.employee.id).then(res => {
        let region = res.data.address
        // region = region.substring(region.lastIndexOf('/'))
        return queryStationByAddress(region)
      }).then(res => {
        this.stationList = res.data
      })
    },
    query() {
      console.log(this.$store.getters.accountId)
      this.employee.id = this.$store.getters.accountId
      collectTasks(this.employee.id).then(res => {
        this.tableData = res.data
        this.select_Data = this.tableData
        this.view_Data = this.select_Data.slice(0, this.pages.pageSize)
        this.pages.totalData = this.tableData.length
        console.log(this.view_Data)
      })
      // expresser(this.$store.getters.accountId).then(response => {
      //     // this.tableData = response.data
      //     // this.view_Data = this.tableData.slice(0, this.pages.pageSize)
      //     this.employee.name = response.data.username
      //     // this.pages.totalData = this.tableData.length
      // })
      // queryList(this.status).then(response => {
      //     this.tableData = response.data
      //     this.select_Data = this.tableData
      //     this.view_Data = this.select_Data.slice(0, this.pages.pageSize)
      //     console.log("order_data",this.view_Data)
      //     this.pages.totalData = this.tableData.length
      // })
    },
    SearchEvent() {
      let senderAddress = ''
      let recipientAddress = ''
      this.select_Data = this.tableData
      if (this.queryList.senderAddress !== '') {
        senderAddress = this.queryList.senderAddress
        this.select_Data = this.select_Data.filter(function(select_Data) {
          return select_Data.senderAddress.includes(senderAddress) && select_Data.senderAddress
        })
      }
      if (this.queryList.recipientAddress !== '') {
        recipientAddress = this.queryList.recipientAddress
        this.select_Data = this.select_Data.filter(function(select_Data) {
          return select_Data.recipientAddress.includes(recipientAddress) && select_Data.recipientAddress
        })
      }
      this.pages.totalData = this.select_Data.length
      this.view_Data = this.select_Data.slice(0, 5)
    }
  },
  created() {
    this.query()
  }
}
</script>

<style scoped>

</style>
