<template>
  <div>
    <el-container style="margin: 20px">
      <el-form :inline="true" :model=" queryList" label-width="68px">
        <el-form-item label="省" prop="province">
          <el-input v-model=" queryList.province" placeholder="请输入省" clearable @input="SearchEvent"/>
        </el-form-item>
        <el-form-item label="市" prop="city">
          <el-input v-model=" queryList.city" placeholder="请输入市" clearable @input="SearchEvent"/>
        </el-form-item>
        <el-form-item label="县" prop="country">
          <el-input v-model=" queryList.country" placeholder="请输入县" clearable @input="SearchEvent"/>
        </el-form-item>
        <el-form-item label="街道">
          <el-input v-model=" queryList.street" placeholder="街道" clearable @input="SearchEvent"/>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model=" queryList.phone" placeholder="电话" clearable @input="SearchEvent"/>
        </el-form-item>
        <el-form-item label="驿站名称">
          <el-input v-model=" queryList.station_name" placeholder="驿站名称" clearable @input="SearchEvent"/>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="addInfo()">增加网点</el-button>
          <el-button @click="toggleSelection()">取消选择</el-button>
          <el-button @click="deleteInfo()">批量删除</el-button>
        </el-form-item>
      </el-form>
    </el-container>
    <el-dialog :visible.sync="windowVisible" :append-to-body="true">
      <ActivityWindow v-if="windowVisible" ref="popWindow" :child-prop="parentData"/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add_station">提交</el-button>
        <el-button @click="windowVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="windowVisible_edit" :append-to-body="true">
      <ActivityWindow v-if="windowVisible_edit" ref="popWindow" :child-prop="parentData"/>
      <span slot="footer" class="dialog-footer">
        <el-button type="submit" @click="edit_station">提交</el-button>
        <el-button @click="windowVisible_edit = false">取消</el-button>
      </span>
    </el-dialog>
    <el-table ref="multipleTable" :data="view_station" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
      <el-table-column label="省" prop="province"/>
      <el-table-column label="市" prop="city"/>
      <el-table-column label="县" prop="country"/>
      <el-table-column label="街道" prop="street"/>
      <el-table-column label="电话" prop="phone"/>
      <el-table-column label="驿站名称" prop="stationName"/>
      <el-table-column label="管理员" prop="stationManager"/>
      <el-table-column label="管理员电话" prop="managerPhone"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click.native.prevent="onOpenAdminDrawer(scope.row)" type="text" size="small">
            管理员
          </el-button>
          <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.$row)">
            修改
          </el-button>
          <el-button type="text" size="small" @click="delete_one(scope.$index, scope.$row)">
            删除
          </el-button>
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

    <el-drawer title="网点管理员" :visible.sync="adminDrawerVisible" direction="ltr" size="90%"
               :before-close="handleAdminDrawerColse"
    >
      <div style="margin: 20px;">
        <el-row>
          <el-button primary @click="onOpenAddAdminDialog">新增</el-button>
        </el-row>

        <el-table :data="adminList" style="width: 100%" max-height="500">
          <el-table-column fixed prop="username" label="用户名"/>
          <el-table-column fixed prop="code" label="工号"/>
          <el-table-column fixed prop="name" label="姓名"/>
          <el-table-column fixed prop="sex" label="性别">
            <template slot-scope="scope">
              <el-tag :type="sexTagColor[scope.row.sex]" close-transition>{{ sexTag[scope.row.sex] }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column fixed prop="email" label="邮箱"/>
          <el-table-column fixed prop="phone" label="手机号"/>
          <el-table-column fixed prop="status" label="员工状态">
            <template slot-scope="scope">
              <el-tag
                :type="accountStatusTagColor[scope.row.status]"
                close-transition
              >{{ statusTag[scope.row.status] }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click.native.prevent="onOpenRemoveDialog(scope.row)">
                撤销
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-drawer>

    <el-dialog
      title="是否撤销该网点管理员"
      :visible.sync="removeDialogVisible"
      width="40%"
      :before-close="handleRemoveDialogClose"
    >
      <span slot="footer" class="dialog-footer">
    <el-button @click="removeDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="removeAdminConfirm">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="addAdminDialogVisible"
      width="80%"
      :before-close="handleAddAdminDialogClose"
    >

      <el-row>
        <el-form :inline="true" :model="queryEmployee" class="demo-form-inline">
          <el-form-item label="用户名">
            <el-input v-model="queryEmployee.username" placeholder="用户名" clearable @input="filterEmployees"/>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="queryEmployee.name" placeholder="姓名" clearable @input="filterEmployees"/>
          </el-form-item>
          <el-form-item label="工号">
            <el-input v-model="queryEmployee.code" placeholder="工号" clearable @input="filterEmployees"/>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="queryEmployee.email" placeholder="邮箱" clearable @input="filterEmployees"/>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="queryEmployee.phone" placeholder="手机号" clearable @input="filterEmployees"/>
          </el-form-item>
          <el-form-item label="员工状态">
            <el-select
              v-model="queryEmployee.status"
              clearable
              placeholder="请选择"
              @change="onStatusChanged"
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-checkbox v-model="queryEmployee.available" label="仅可用" border @change="filterEmployees"></el-checkbox>
        </el-form>
      </el-row>


      <el-table :data="filterList" style="width: 100%" max-height="500">
        <el-table-column fixed prop="username" label="用户名"/>
        <el-table-column fixed prop="code" label="工号"/>
        <el-table-column fixed prop="name" label="姓名"/>
        <el-table-column fixed prop="sex" label="性别">
          <template slot-scope="scope">
            <el-tag :type="sexTagColor[scope.row.sex]" close-transition>{{ sexTag[scope.row.sex] }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed prop="email" label="邮箱"/>
        <el-table-column fixed prop="phone" label="手机号"/>
        <el-table-column fixed prop="status" label="员工状态">
          <template slot-scope="scope">
            <el-tag
              :type="accountStatusTagColor[scope.row.status]"
              close-transition
            >{{ statusTag[scope.row.status] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.native.prevent="addCurAdmin(scope.row)">
              添加
            </el-button>
          </template>
        </el-table-column>
      </el-table>


    </el-dialog>


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
import ActivityWindow from './ActivityWindow'
import {
  queryList,
  addStation,
  editStation,
  deleteoneStation,
  deletemanyStation,
  queryAdmins,
  availableEmployees,
  unAvailableStationEmployee,
  addStationAdmin,
  removeStationAdmin
} from '@/api/station'

export default {
  // import引入组件才能使用

  components: {
    ActivityWindow
  },
  props: {},
  data() {
    return {
      removeEmpId: null,
      removeDialogVisible: false,
      statusOptions: [
        { value: 0, label: '在职' },
        { value: 1, label: '离职' },
        { value: 2, label: '休假' }
      ],
      unavailableIdSet: null,
      queryEmployee: {
        name: '',
        code: '',
        phone: '',
        username: '',
        email: '',
        status: '',
        available: ''
      },
      employeeList: null, //  普通员工
      filterList: null, // 过滤
      addAdminDialogVisible: false,
      stationId: null,
      accountStatusTag: {
        0: '正常',
        1: '封禁',
        2: '注销'
      },
      statusTag: {
        0: '在职',
        1: '离职',
        2: '休假'
      },
      accountStatusTagColor: {
        0: 'success',
        1: 'danger',
        2: 'info'
      },
      sexTag: {
        0: '女',
        1: '男',
        2: '未知'
      },
      sexTagColor: {
        0: 'danger',
        1: 'primary',
        2: 'info'
      },
      adminList: null,
      adminDrawerVisible: false,
//////////////////////////////////////
      windowVisible: false,
      addOperate: false,
      windowVisible_edit: false,
      addOperate_edit: false,
      total_station: [],
      select_station: [],
      view_station: [],
      username: '',
      pages: {
        totalData: 1,
        currentPage: 1,
        pageSize: 5
      },
      queryList: {
        street: '',
        id: '',
        province: '',
        city: '',
        country: '',
        phone: '',
        stationName: '',
        stationManager: '',
        managerPhone: ''
      },
      parentData: [],
      multipleSelection: [],
      test: {
        hhh: 'sdfsdfdsfa'
      }
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
    handleRemoveDialogClose() {
      this.removeDialogVisible = false
    },
    removeAdminConfirm() {
      console.log(this.removeEmpId)
      removeStationAdmin(this.removeEmpId).then(res => {
        this.$message({
          message: '撤销成功', type: 'success'
        })
        this.removeEmpId = null
        this.onQueryAdmins()
        this.removeDialogVisible = false
      })
    },
    onOpenRemoveDialog(row) {
      this.removeDialogVisible = true
      this.removeEmpId = row.employeeId
    },
    addCurAdmin(row) {
      console.log(row)
      addStationAdmin(this.stationId, row.id).then(res => {
        this.$message({
          message: '添加成功', type: 'success'
        })
        this.onQueryAvailableAdmins()
        this.onQueryAdmins()
      })
    },
    getUnavailableIds() {
      unAvailableStationEmployee(this.stationId).then(res => {
        let seList = res.data
        // console.log(seList)
        this.unavailableIdSet = new Set()
        for (let i = 0; i < seList.length; i++) {
          // console.log(seList[i].employeeId)
          this.unavailableIdSet.add(seList[i].employeeId)
        }
        // console.log(this.unavailableIdSet)
      })
    },
    onStatusChanged(val) {
      this.queryEmployee.status = val
      this.filterEmployees()
    },
    filterEmployees() {
      this.filterList = this.employeeList
      let username = '', code = '', email = '', phone = '', status = '', name = ''

      if (this.queryEmployee.username !== '') {
        username = this.queryEmployee.username
        this.filterList = this.filterList.filter(function(item) {
          return item.username && item.username.includes(username)
        })
      }

      if (this.queryEmployee.code !== '') {
        code = this.queryEmployee.code
        this.filterList = this.filterList.filter(function(item) {
          return item.code && item.code.includes(code)
        })
      }

      if (this.queryEmployee.email !== '') {
        email = this.queryEmployee.email
        this.filterList = this.filterList.filter(function(item) {
          return item.email && item.email.includes(email)
        })
      }

      if (this.queryEmployee.phone !== '') {
        phone = this.queryEmployee.phone
        this.filterList = this.filterList.filter(function(item) {
          return item.phone && item.phone.includes(phone)
        })
      }
      if (this.queryEmployee.name !== '') {
        name = this.queryEmployee.name
        this.filterList = this.filterList.filter(function(item) {
          return item.name && item.name.includes(name)
        })
      }

      if (this.queryEmployee.status !== '') {
        status = this.queryEmployee.status
        this.filterList = this.filterList.filter(function(item) {
          return item.status === status
        })
      }
      let unSet = new Set()
      // console.log(this.queryEmployee.available)
      // console.log(this.unavailableIdSet)
      if (this.queryEmployee.available) {
        //仅查看可用
        unSet = this.unavailableIdSet
        this.filterList = this.filterList.filter(function(item) {
          return !unSet.has(item.id)
        })
      }

    },
    handleAddAdminDialogClose() {
      this.addAdminDialogVisible = false
    },
    onQueryAvailableAdmins() {
      // 获取普通员工列表
      availableEmployees().then(res => {
        this.employeeList = res.data
        this.filterList = this.employeeList
      })
      // 获取不可用的Ids
      this.getUnavailableIds()
    },
    onOpenAddAdminDialog() {
      // 打开添加管理员窗口
      this.addAdminDialogVisible = true
      this.onQueryAvailableAdmins()
    },
    onQueryAdmins() {
      // 根据stationId查找管理员
      queryAdmins(this.stationId).then(res => {
        this.adminList = res.data
      })
    },
    handleAdminDrawerColse() {
      this.adminDrawerVisible = false
    },
    // 管理员列表
    onOpenAdminDrawer(row) {
      this.adminDrawerVisible = true
      this.stationId = row.id
      // console.log(row)
      this.onQueryAdmins()
    },
///////////////////////////////////////
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pages.currentPage = val
      const start = (this.pages.currentPage - 1) * this.pages.pageSize
      const end = start + this.pages.pageSize
      this.view_station = this.select_station.slice(start, end)
      this.pages.totalData = this.select_station.length
    },
    handleEdit(index, row) {
      this.windowVisible_edit = true
      this.addOperate_edit = true
      this.parentData = this.view_station[index]
    },
    delete_one(index, row) {
      deleteoneStation(this.view_station[index].id).then(response => {
        if (response.data === '删除失败') {
          alert('删除失败')
        } else {
          this.select_station = response.data
          this.total_station = response.data
          this.view_station = this.total_station.slice(0, this.pages.pageSize)
          this.pages.totalData = this.total_station.length
        }
      })
    },
    addInfo() {
      this.windowVisible = true
      this.addOperate = true
      this.parentData = null
    },
    hasEmptyValues(obj) {
      for (const key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key)) {
          if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
            return true // 存在空值
          }
        }
      }
      return false // 不存在空值
    },
    add_station() {
      const childCom = this.$refs.popWindow
      const formData = childCom.fromData() // 调用子组件实例的方法获取表单信息
      const judge = this.hasEmptyValues(formData)
      if (judge) {
        alert('请填写完整表单数据！')
      } else {
        console.log('formdata', formData)
        addStation(formData).then(response => {
          this.windowVisible = false
          this.addOperate = false
          this.select_station = response.data
          this.total_station = response.data
          this.view_station = this.total_station.slice(0, this.pages.pageSize)
          this.pages.totalData = this.total_station.length
        })
      }
    },
    edit_station() {
      const childCom = this.$refs.popWindow
      const formData = childCom.fromData()
      editStation(formData).then(response => {
        console.log(response.data)
        this.windowVisible_edit = false
        this.addOperate_edit = false
        this.select_station = response.data
        this.total_station = response.data
        this.view_station = this.total_station.slice(0, this.pages.pageSize)
        this.pages.totalData = this.total_station.length
      })
    },
    deleteInfo() {
      const list = []
      for (const obj in this.multipleSelection) {
        list.push(this.multipleSelection[obj].id)
      }
      deletemanyStation(list).then(response => {
        console.log(response.data)
        this.windowVisible_edit = false
        this.addOperate_edit = false
        this.select_station = response.data
        this.total_station = response.data
        this.view_station = this.total_station.slice(0, this.pages.pageSize)
        this.pages.totalData = this.total_station.length
      })
    },
    SearchEvent() {
      let phone = ''
      let street = ''
      let city = ''
      let province = ''
      let country = ''
      this.select_station = this.total_station
      // if(this. queryList.id != ""){
      //   id = this. queryList.id
      //   this.select_station = this.select_station.filter(function(select_station){
      //       return select_station.id == id
      //     })
      // }
      if (this.queryList.province !== '') {
        province = this.queryList.province
        this.select_station = this.select_station.filter(function(select_station) {
          return select_station.province.includes(province)
        })
      }
      if (this.queryList.city !== '') {
        city = this.queryList.city
        this.select_station = this.select_station.filter(function(select_station) {
          return select_station.city.includes(city)
        })
      }
      if (this.queryList.country !== '') {
        country = this.queryList.country
        this.select_station = this.select_station.filter(function(select_station) {
          return select_station.country.includes(country)
        })
      }
      if (this.queryList.phone !== '') {
        phone = this.queryList.phone
        this.select_station = this.select_station.filter(function(select_station) {
          return select_station.phone.includes(phone)
        })
      }
      if (this.queryList.street !== '') {
        street = this.queryList.street
        this.select_station = this.select_station.filter(function(select_station) {
          return select_station.street.includes(street)
        })
      }
      this.pages.totalData = this.select_station.length
      this.view_station = this.select_station.slice(0, 5)
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
        this.select_station = response.data
        this.total_station = response.data
        this.view_station = this.total_station.slice(0, this.pages.pageSize)
        this.pages.totalData = this.total_station.length
      })
    }

  }
}
</script>
