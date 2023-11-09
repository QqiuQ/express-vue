<template>
  <div>
    <el-container>
      <el-form :inline="true" :model=" queryList" label-width="100px">
        <el-form-item label="物流单号" prop="express_number">
          <el-input v-model=" queryList.express_number" placeholder="物流单号" clearable @input="SearchEvent" />
        </el-form-item>
        <el-form-item label="寄件人姓名" prop="sender_name">
          <el-input v-model=" queryList.sender_name" placeholder="寄件人姓名" clearable @input="SearchEvent" />
        </el-form-item>
        <el-form-item label="寄件地址" prop="sender_address">
          <el-input v-model=" queryList.sender_address" placeholder="寄件地址" clearable @input="SearchEvent" />
        </el-form-item>
        <el-form-item label="收件人姓名">
          <el-input v-model=" queryList.recipient_name" placeholder="收件人姓名" clearable @input="SearchEvent" />
        </el-form-item>
        <el-form-item label="收件地址">
          <el-input v-model=" queryList.recipient_address" placeholder="收件地址" clearable @input="SearchEvent" />
        </el-form-item>
        <el-form-item label="快递员编号">
          <el-input v-model=" queryList.courier_code" placeholder="快递员编号" clearable @input="SearchEvent" />
        </el-form-item>
        <!-- <el-form-item>
          <el-button size="mini" type="primary" @click="addInfo()">增加网点</el-button>
          <el-button @click="toggleSelection()">取消选择</el-button>
          <el-button @click="deleteInfo()">批量删除</el-button>
        </el-form-item> -->
      </el-form>
    </el-container>
    <el-dialog :visible.sync="windowVisible" :append-to-body="true">
      <ActivityWindow v-if="windowVisible" ref="popWindow" :child-prop="parentData" />
    </el-dialog>
    <el-dialog :visible.sync="windowVisible_edit" :append-to-body="true">
      <ActivityWindow1 v-if="windowVisible_edit" ref="popWindow" :child-prop="parentData" />
      <span slot="footer" class="dialog-footer">
        <el-button type="submit" @click="edit_order">提交</el-button>
        <el-button @click="windowVisible_edit = false">取消</el-button>
      </span>
    </el-dialog>
    <el-table ref="multipleTable" :data="view_order" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column label="物流单号" prop="expressNumber" />
      <el-table-column label="寄件人姓名" prop="senderName" />
      <el-table-column label="寄件地址" prop="senderAddress" />
      <el-table-column label="收件人姓名" prop="recipientName" />
      <el-table-column label="收货地址" prop="recipientAddress" />
      <el-table-column label="快递员编号" prop="courierCode" />
      <!-- <el-table-column label="管理员" prop="stationManager" />
      <el-table-column label="管理员电话" prop="managerrecipient_address" /> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.native.prevent="onOpenDetailDrawer(scope.$index)">
            详情
          </el-button>
          <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.$row)">
            修改
          </el-button>
          <!-- <el-button type="text" size="small" @click="delete_one(scope.$index, scope.$row)">
            删除
          </el-button> -->
        </template>
      <!-- <template v-slot="scope">
          <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.$row)">Edit</el-button>
          <el-button
          size="small"
          type="danger"
          @click="delete_one(scope.$index, scope.$row)">Delete</el-button>

      </template> -->
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
  </div>
</template>

<script>
import axios from 'axios'
import ActivityWindow from './ActivityWindow'
import ActivityWindow1 from './ActivityWindow1'
import { queryList, editOrder } from '@/api/manageOrder'
export default {
  // import引入组件才能使用station_name

  components: {
    ActivityWindow,
    ActivityWindow1
  },
  props: {},
  data() {
    return {
      windowVisible: false,
      addOperate: false,
      windowVisible_edit: false,
      addOperate_edit: false,
      total_order: [],
      select_order: [],
      view_order: [],
      username: '',
      pages: {
        totalData: 1,
        currentPage: 1,
        pageSize: 5
      },
      queryList: {
        recipient_name: '',
        id: '',
        express_number: '',
        sender_name: '',
        sender_address: '',
        recipient_address: '',
        stationName: '',
        stationManager: '',
        managerrecipient_address: '',
        courier_code: ''
      },
      parentData: [],
      multipleSelection: []
    }
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {
  },
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() {
    this.getList()
  },
  // 方法集合
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pages.currentPage = val
      const start = (this.pages.currentPage - 1) * this.pages.pageSize
      const end = start + this.pages.pageSize
      this.view_order = this.select_order.slice(start, end)
      this.pages.totalData = this.select_order.length
    },
    handleEdit(index, row) {
      this.windowVisible_edit = true
      this.addOperate_edit = true
      this.parentData = this.view_order[index]
    },

    edit_order() {
      const childCom = this.$refs.popWindow
      const formData = childCom.fromData()
      editOrder(formData).then(response => {
        console.log(response.data)
        this.windowVisible_edit = false
        this.addOperate_edit = false
        this.select_order = response.data
        this.total_order = response.data
        this.view_order = this.total_order.slice(0, this.pages.pageSize)
        this.pages.totalData = this.total_order.length
      })
    },
    onOpenDetailDrawer(index) {
      this.windowVisible = true
      this.addOperate = true
      this.parentData = this.view_order[index]
    },
    SearchEvent() {
      let recipient_address = ''; let recipient_name = ''; let sender_name = ''; let express_number = ''; let sender_address = ''; let courier_code = ''
      this.select_order = this.total_order
      if (this.queryList.courier_code != '') {
        courier_code = this.queryList.courier_code
        this.select_order = this.select_order.filter(function(select_order) {
          return select_order.courierCode.includes(courier_code)
        })
      }
      if (this.queryList.express_number != '') {
        express_number = this.queryList.express_number
        this.select_order = this.select_order.filter(function(select_order) {
          return select_order.expressNumber.includes(express_number)
        })
      }
      if (this.queryList.sender_name != '') {
        sender_name = this.queryList.sender_name
        this.select_order = this.select_order.filter(function(select_order) {
          return select_order.senderName.includes(sender_name)
        })
      }
      if (this.queryList.sender_address != '') {
        sender_address = this.queryList.sender_address
        this.select_order = this.select_order.filter(function(select_order) {
          return select_order.senderAddress.includes(sender_address)
        })
      }
      if (this.queryList.recipient_address != '') {
        recipient_address = this.queryList.recipient_address
        this.select_order = this.select_order.filter(function(select_order) {
          return select_order.recipientAddress.includes(recipient_address)
        })
      }
      if (this.queryList.recipient_name != '') {
        recipient_name = this.queryList.recipient_name
        this.select_order = this.select_order.filter(function(select_order) {
          return select_order.recipientName.includes(recipient_name)
        })
      }

      // console.log(this.total_order)
      this.pages.totalData = this.select_order.length
      this.view_order = this.select_order.slice(0, this.pages.pageSize)
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    getList() {
      console.log('getList')
      queryList().then(response => {
        console.log(response.data)
        this.select_order = response.data
        this.total_order = response.data
        this.view_order = this.total_order.slice(0, this.pages.pageSize)
        this.pages.totalData = this.total_order.length
      })
    }

  }
}
</script>
