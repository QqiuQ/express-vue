<template>
  <el-container style="padding: 50px; height: 84vh; display: flex; flex-direction: column">
    <el-row>
      <el-col :span="12">
        <el-checkbox-group v-model="statusGroup" @change="onStatusChange">
          <el-checkbox-button v-for="item in statusOptions" :label="item" :key="item">{{ item }}
          </el-checkbox-button>
        </el-checkbox-group>
      </el-col>

      <el-col :span="12">
        <el-input v-model="queryName" style="width: 500px" placeholder="查询相关信息"/>

      </el-col>


    </el-row>
    <div style="height: 40px"/>
    <el-table :data="tables">
      <el-table-column prop="expressNumber" label="快递单号" width="70" align="center"/>
      <el-table-column prop="senderName" label="寄件人"/>
      <el-table-column prop="senderPhone" label="手机号"/>
      <el-table-column prop="senderAddress" label="寄送地点"/>
      <el-table-column prop="recipientName" label="收件人"/>
      <el-table-column prop="recipientPhone" label="手机号"/>
      <el-table-column prop="recipientAddress" label="收件地点"/>
      <el-table-column prop="status" label="处理状态">
        <template slot-scope="scope">
          <el-tag :type="statusTagColor[scope.row.status]" close-transition>{{ statusTag[scope.row.status] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==0" @click.native.prevent="goShipping(scope.row)" type="text">
            运输
          </el-button>
          <el-button v-else-if="scope.row.status==1" type="text" @click="goStocking( scope.row)">
            入库
          </el-button>
          <el-button v-else type="text" @click="outOfStock(scope.row)">
            出库
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
              <el-input v-model="detailDelivery.courierName" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式">
              <el-input v-model="detailDelivery.courierPhone" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮费">
              <el-input v-model="detailDelivery.expressCost" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
import { getStationDeliveries } from '@/api/station'
import { queryStation } from '@/api/deliveryStation'
import { removeStock, shipping, stocking } from '@/api/stationDelivery'

export default {
  name: 'StationRelatedDelivery',
  data() {
    return {
      statusCodes: [],
      statusOptions: ['待运输', '待入库', '待取件'],
      statusGroup: [],
      statusValueDict: {
        '待运输': 0, '待入库': 1, '待取件': 2
      },
      station: [],
      admin: [],
      page: 1,
      pageSize: 5,
      tableData: '',
      totalItem: 0,
      queryName: '',
      visibleDetail: false,
      statusTag: {
        0: '待运输',
        1: '待入库',
        2: '待取件'
      },
      statusTagColor: {
        0: 'danger',
        1: 'info',
        2: 'primary'
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
        })
      }
      const codes = this.statusCodes
      if (codes.length > 0) {
        return this.tableData.filter(data => {
          console.log('object:' + Object.keys(data))
          return codes.indexOf(data.status) > -1
        })
      }
      return this.tableData.slice(start, start + this.pageSize)
    }
  },
  methods: {
    outOfStock(row) {
      removeStock(row.id).then(res => {
        this.$message.success('出库成功')
        this.queryAllDelivery()
      })
    },
    goStocking(row) {
      // 入库
      stocking(row.id).then(res => {
        this.$message.success('入库成功')
        this.queryAllDelivery()

      })
    },
    goShipping(row) {
      // 运输快递
      shipping(row.id).then(res => {
        this.$message.success('快递已开始运输')
        this.queryAllDelivery()

      })
    },
    onStatusChange(val) {
      let codes = []
      for (let i = 0; i < val.length; i++) {
        // console.log(val[i])
        codes.push(this.statusValueDict[val[i]])
      }
      this.statusCodes = codes
    },
    queryAllDelivery() {
      this.admin.id = this.$store.getters.accountId
      // get station id
      queryStation(this.admin.id).then(res => {
        this.station = res.data
        return getStationDeliveries(this.station.id)
      }).then(res => {
        this.tableData = res.data
        this.totalItem = this.tableData.length
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
  },
  created() {
    this.queryAllDelivery()
  }
}
</script>

<style scoped>

</style>
