<template>
  <el-container style="padding: 50px; height: 84vh; display: flex; flex-direction: column">
    <div>
      <el-input v-model="queryName" style="width: 400px; margin: 0 5px 0 100px" placeholder="输入查询信息" />
      <el-button type="primary" @click="resetInput">重 置</el-button>
      <el-button type="primary" style="float: right" @click="addAddress">添 加 地 址</el-button>
    </div>
    <div style="height: 40px" />
    <el-table :data="tables" max-height="500">
      <el-table-column prop="recipientName" label="联系人" align="center" style="display: flex; flex-direction: column;" />
      <el-table-column prop="province" label="省份" />
      <el-table-column prop="city" label="城市" />
      <el-table-column prop="country" label="地区" />
      <el-table-column prop="phone" label="联系方式" />
      <el-table-column label="操作" align="center" width="180">
        <template v-slot="scope">
          <el-button type="text" size="small" @click="onOpenDetailDrawer(scope.row)">
            详情
          </el-button>
          <el-button type="text" size="small" @click.native.prevent="onOpenDeleteDialog(scope.row)">
            删除
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

    <!--    增-->
    <el-dialog
      title="添加地址"
      :visible.sync="addShow"
      width="30%"
      center
    >
      <el-form :model="addBody" :rules="addAddressRules">
        <el-form-item>
          <el-input v-model="addBody.recipientName" prefix-icon="el-icon-user" size="medium" placeholder="收件人" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="addBody.phone" prefix-icon="el-icon-user" size="medium" placeholder="联系方式" />
        </el-form-item>
        <el-form-item>
          <el-cascader
            v-model="locationPath"
            placeholder="请选择地区"
            size="large"
            style="width: 100%"
            :options="options"
            @change="handleLocPathChange"
          />
        </el-form-item>
        <el-form-item>
          <el-input v-model="addBody.street" prefix-icon="el-icon-user" size="medium" placeholder="详细地址" />
        </el-form-item><el-form-item>
          <el-input v-model="addBody.postalCode" prefix-icon="el-icon-user" size="medium" placeholder="邮编" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addShow = false">取 消</el-button>
        <el-button type="primary" @click="onAddAddress">确 定</el-button>
      </span>
    </el-dialog>

    <!--    改+查-->
    <el-dialog title="详细信息" :visible.sync="editDrawerVisible">
      <el-form v-model="detailForm" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="收件人">
              <el-input v-model="editAddr.recipientName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式">
              <el-input v-model="editAddr.phone" />
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="省份">
              <el-input v-model="editAddr.province" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="城市">
              <el-input v-model="editAddr.city" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="地区">
              <el-input v-model="editAddr.country" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="街道">
              <el-input v-model="editAddr.street" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="备注">
              <el-input v-model="editAddr.detail" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮编">
              <el-input v-model="editAddr.postalCode" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="创建时间">
              <el-input v-model="editAddr.createTime" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最后更新时间">
              <el-input v-model="editAddr.updateTime" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-button type="primary" style="width: 100%" @click="onSubmitEdit">提交修改</el-button>
        </el-row>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
import { addAddress, deleteAddById, editAddress, queryAllAddress } from '@/api/adressBook'
import { codeToText, regionData } from 'element-china-area-data'

export default {
  inject: ['reload'],
  name: 'AddressBooks',
  data() {
    return {
      totalItem: 10,
      pageList: '',
      queryList: '',
      addressBook: '', // 总体表格
      page: 1, // 页码
      pageSize: 5, // 页面大小
      deleteId: '', // 删除id
      detailForm: {}, //  详细信息表
      options: regionData, //  地图选项
      locationPath: [], // 地址区域
      addShow: false, // 新增界面
      editDrawerVisible: false, // 编辑界面
      queryName: '', // 查找线索
      queryBody: {
        id: null,
        userId: null,
        recipientName: null,
        phone: null,
        province: null,
        city: null,
        country: null,
        street: null,
        detail: null,
        postalCode: null,
        createTime: null,
        updateTime: null
      },
      addBody: {
        id: null,
        userId: null,
        recipientName: null,
        phone: null,
        province: null,
        city: null,
        country: null,
        street: null,
        detail: null,
        postalCode: null,
        createTime: null,
        updateTime: null
      },
      editAddr: {
        recipientName: '',
        phone: '',
        province: '',
        city: '',
        country: '',
        street: '',
        detail: '',
        postalCode: '',
        createTime: '',
        updateTime: ''
      },
      addAddressRules: {
        recipientName: [{ required: true, message: '请输入收件人', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入联系方式', trigger: 'blur' }]
      }
    }
  },
  computed: {
    tables() {
      const input = this.queryName
      const start = (this.page - 1) * this.pageSize
      if (input) {
        // console.log("input输入的搜索内容：" + this.input)
        return this.addressBook.filter(data => {
          console.log('object:' + Object.keys(data))
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(input) > -1
          })
        }).slice(start, start + this.pageSize)
      }
      return this.addressBook.slice(start, start + this.pageSize)
    }
  },
  created() {
    this.queryAllAddress()
  },
  methods: {
    onAddAddress() {
      this.addBody.userId = this.$store.getters.accountId
      addAddress(this.addBody)
      this.addShow = false
      this.queryAllAddress()
      this.$message.success('添加成功')
      this.reload()
    },
    onOpenDeleteDialog(index) {
      this.deleteId = JSON.parse((JSON.stringify(index))).id
      deleteAddById(this.deleteId)
      this.queryAllAddress()
      this.$message.success('删除成功')
      this.reload()
    },
    onSubmitEdit() {
      this.getTimes()
      editAddress(this.editAddr)
      this.$message.success('修改成功')
      this.queryAllAddress()
      this.reload()
    },
    onOpenDetailDrawer(row) {
      this.editAddr = JSON.parse(JSON.stringify(row)) // 给form对象赋值  注意要深拷贝数据
      this.editDrawerVisible = true
    },
    getTimes() {
      const year = new Date().getFullYear() // 获取当前时间的年份
      let month = new Date().getMonth() + 1 // 获取当前时间的月份
      let day = new Date().getDate() // 获取当前时间的天数
      let hours = new Date().getHours() // 获取当前时间的小时
      let minutes = new Date().getMinutes() // 获取当前时间的分数
      let seconds = new Date().getSeconds() // 获取当前时间的秒数
      // 当小于 10 的是时候，在前面加 0
      if (hours < 10) {
        hours = '0' + hours
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      if (seconds < 10) {
        seconds = '0' + seconds
      }
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      // 拼接格式化当前时间
      this.editAddr.updateTime = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds
    },
    queryAllAddress() {
      this.queryBody.userId = this.$store.getters.accountId
      queryAllAddress(this.queryBody).then(res => {
        this.addressBook = res.data
        this.totalItem = this.addressBook.length
      })
    },
    addAddress() {
      this.addShow = true
    },
    handleLocPathChange() {
      this.addBody.province = codeToText[this.locationPath[0]]
      this.addBody.city = codeToText[this.locationPath[1]]
      this.addBody.country = codeToText[this.locationPath[2]]
      const add = this.addBody.province + this.addBody.city + this.addBody.country
      console.log(add)
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.page = val
    },
    resetInput() {
      this.queryName = ''
    }
  }
}
</script>

<style scoped>

</style>
