<template>
  <el-container style="padding: 50px; height: 84vh; display: flex; flex-direction: column">
    <div>
      <el-input v-model="queryName" style="width: 200px" placeholder="查询相关信息" />
      <el-button type="info" @click="reset">重置</el-button>
    </div>
    <div style="height: 40px" />
    <el-table :data="tables">
      <el-table-column prop="id" label="快递单号" width="70" align="center" />
      <el-table-column prop="senderName" label="寄件人" />
      <el-table-column prop="recipientName" label="收件人" />
      <el-table-column prop="senderAddress" label="寄送地点" />
      <el-table-column prop="recipientAddress" label="收件地点" />
      <el-table-column prop="status" label="订单状态">
        <template slot-scope="scope">
          <el-tag :type="statusTagColor[scope.row.status]" close-transition>{{ statusTag[scope.row.status] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template v-slot="scope">
          <el-button type="text" size="small" @click="onCancelOrder(scope.row)">
            取消订单
          </el-button>
          <el-button type="text" size="small" @click="onDetailDelivery(scope.row)">
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-footer style="margin-top: 40px;">
      <el-row type="flex" justify="center" align="middle">
        <el-pagination
          :current-page="page"
          :page-sizes="[5, 10, 20, 30, 40, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalItem"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </el-footer>

    <el-dialog title="详细信息" :visible.sync="visibleDetail">
      <el-form v-model="detailDelivery">
        <el-row>
          <el-col :span="12">
            <el-form-item label="快递小哥">
              <el-input v-model="detailDelivery.courierName" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式">
              <el-input v-model="detailDelivery.courierPhone" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮费">
              <el-input v-model="detailDelivery.expressCost" disabled />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
import { getDelivery, querySend, sendCancel } from '@/api/delivery'
import { queryUser } from '@/api/user2'

export default {
  name: 'Sent',
  data() {
    return {
      totalItem: 0,
      visibleDetail: false,
      queryName: '',
      page: 1,
      pageSize: 5,
      id: '',
      sender: '',
      tableData: [],
      statusTag: {
        0: '已取消',
        1: '已完成',
        2: '进行中'
      },
      statusTagColor: {
        0: 'danger',
        1: 'primary',
        2: 'info'
      },
      expressStatusTag: {
        0: '异常',
        1: '揽收中',
        2: '运输中',
        3: '派送中',
        4: '已签收'
      },
      expressStatusTagColor: {
        0: 'info',
        1: 'info',
        2: 'info',
        3: 'info',
        4: 'info'
      },
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
      }
    }
  },
  computed: {
    tables() {
      const input = this.queryName
      const start = (this.page - 1) * this.pageSize
      if (input) {
        // console.log("input输入的搜索内容：" + this.input)
        return this.tableData.filter(data => {
          console.log('object:' + Object.keys(data))
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(input) > -1
          })
        }).slice(start, start + this.pageSize)
      }
      return this.tableData.slice(start, start + this.pageSize)
    }
  },
  created() {
    this.queryMySent()
  },
  methods: {
    queryMySent() {
      queryUser(this.$store.getters.accountId).then(res => {
        this.myPhone = res.data.phone
        querySend(this.myPhone).then(res => {
          this.tableData = res.data
          this.totalItem = this.tableData.length
        })
      })
    },
    onCancelOrder(idx) {
      if (idx.expressStatus !== 1) {
        this.$message.error('快递已经送走了，不可以取消噢！')
      } else {
        sendCancel(idx.id)
        idx.expressStatus = 0
        idx.status = 0
        this.$message.success('取消成功')
      }
    },
    onDetailDelivery(idx) {
      getDelivery(idx.id).then(res => {
        this.detailDelivery = res.data
        this.visibleDetail = true
        console.log(res.data)
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.page = val
    },
    reset() {
      this.queryName = ''
    }
  }
}
</script>

<style scoped>

</style>
