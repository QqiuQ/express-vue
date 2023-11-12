<template>
  <div class="app-container">
    <div class="filter-container">
    </div>
    <el-table :data="filterList" style="width: 100%" max-height="500">
      <el-table-column fixed prop="expressNumber" label="物流单号"/>
      <el-table-column fixed prop="recipientName" label="收件人"/>
      <el-table-column fixed prop="recipientPhone" label="手机号"/>
      <el-table-column fixed prop="recipientAddress" label="收件地址"/>

      <el-table-column fixed prop="senderName" label="寄件人"/>
      <el-table-column fixed prop="senderPhone" label="手机号"/>
      <el-table-column fixed prop="senderAddress" label="寄件地址"/>
      <el-table-column fixed prop="expressStatus" label="任务类型">
        <template slot-scope="scope">
          <el-tag :type="taskTypeColor[scope.row.expressStatus]" close-transition>
            {{ taskTypeDict[scope.row.expressStatus] }}
          </el-tag>
        </template>
        <!--        <el-tag> {{ this.taskTypeDict[this.filterTask.expressStatus] }}</el-tag>-->
      </el-table-column>


      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.native.prevent="acceptTask(scope.row)">
            接受
          </el-button>
        </template>
      </el-table-column>
    </el-table>


  </div>
</template>

<script>
import { acceptTask, queryTasks } from '@/api/courierTask'
import { employeeProfile } from '@/api/profile'
import MenuItem from '@/layout/components/Sidebar/Item'

export default {
  name: 'task',
  components: { MenuItem },
  data() {
    return {
      filterList: null,
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
      profile: null,
      taskTypeDict: {
        1: '待揽收',
        2: '待妥投'
      },
      taskTypeColor: {
        1: 'warning',
        2: 'primary'
      }
    }
  },
  methods: {
    acceptTask(row) {
      let status = 0  //待揽收
      if (row.expressStatus == 2) {
        status = 1  // 待妥投
      }
      let body = { courierId: this.profile.id, deliveryId: row.id, status: status }
      console.log(body)
      acceptTask(body).then(res => {
        this.$message.success('接受任务成功')
        this.onQueryTask()
      }).catch(e => {
        this.$message.error('接受任务失败')
      })
    },
    filterTask() {
      this.filterList = this.taskList
    },
    onQueryTask() {
      employeeProfile(this.$store.getters.accountId).then(res => {
        this.profile = res.data
        let region = this.profile.address
        region = region.substring(0, region.lastIndexOf('/'))
        return queryTasks(region)
      }).then(res => {
        this.taskList = res.data
        this.filterTask()
      })
    }
  },
  created() {
    this.onQueryTask()
  }
}
</script>

<style scoped>

</style>
