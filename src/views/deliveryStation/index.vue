<template>
  <div>
    <el-container style="margin: 20px;">
      <el-form :inline="true" :model="queryList" label-width="68px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="queryList.username" placeholder="请输入用户名" clearable @input="SearchEvent"/>
        </el-form-item>
        <el-form-item label="工号" prop="code">
          <el-input v-model="queryList.code" placeholder="请输入工号" clearable @input="SearchEvent"/>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="queryList.name" placeholder="请输入姓名" clearable @input="SearchEvent"/>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="queryList.sex" clearable placeholder="请选择" @change="SearchEvent">
            <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>

        <el-form-item label="电话" prop="phone">
          <el-input v-model="queryList.phone" placeholder="电话" clearable @input="SearchEvent"/>
        </el-form-item>
        <el-form-item label="员工状态" prop="status">
          <el-select
            v-model="queryList.status"
            clearable
            placeholder="请选择"
            @change="SearchEvent"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="queryList.roleName" clearable placeholder="请选择" @change="SearchEvent">
            <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
          <!--          <el-input v-model="queryList.roleName" placeholder="角色" clearable @input="SearchEvent"/>-->
        </el-form-item>
        <!--        <el-form-item label="住址" prop="address">-->
        <!--          <el-input v-model="queryList.address" placeholder="住址" clearable @input="SearchEvent"/>-->
        <!--        </el-form-item>-->
        <el-form-item>
          <el-button size="mini" type="primary" @click="onOpenAddEmployeeDialog">添加员工</el-button>
          <el-button @click="toggleSelection()">取消选择</el-button>
          <!-- <el-button @click="deleteInfo()">批量删除</el-button> -->
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
      <ActivityWindow1 v-if="windowVisible_edit" ref="popWindow" :child-prop="parentData"/>
      <span slot="footer" class="dialog-footer">
          <el-button type="submit" @click="edit_station">提交</el-button>
          <el-button @click="windowVisible_edit = false">取消</el-button>
        </span>
    </el-dialog>

    <el-table ref="multipleTable" :data="view_station" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
      <el-table-column label="用户名" prop="username"/>
      <el-table-column label="工号" prop="code"/>
      <el-table-column label="姓名" prop="name"/>
      <el-table-column label="性别">
        <template slot-scope="scope">
          <el-tag :type="sexTagColor[scope.row.sex]" close-transition>{{ sexTag[scope.row.sex] }}</el-tag>
        </template>
      </el-table-column>
      <!--      <el-table-column label="性别" prop="sex">-->
      <!--        <template slot-scope="scope">-->
      <!--          <span v-if="scope.row.sex === 0">女</span>-->
      <!--          <span v-else-if="scope.row.sex === 1">男</span>-->
      <!--          <span v-else>未知</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column label="电话" prop="phone"/>
      <el-table-column label="角色">
        <template slot-scope="scope">
          <el-tag :type="roleTagColorDict[scope.row.roleName]" close-transition>{{
              roleDict[scope.row.roleName]
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="员工状态">
        <template slot-scope="scope">
          <el-tag
            :type="accountStatusTagColor[scope.row.status]"
            close-transition
          >{{ statusTag[scope.row.status] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button @click.native.prevent="onOpenDetailDrawer(scope.$index)" type="text" size="small">
                详情
            </el-button> -->
          <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">
            修改
          </el-button>
          <el-button type="text" size="small" @click="delete_one(scope.$index, scope.row)">
            撤销员工
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
    <el-footer>
      <el-pagination
        :page-size="pages.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="pages.totalData"
        @current-change="handleCurrentChange"
      />
    </el-footer>


    <el-dialog
      title="添加员工"
      :visible.sync="dialogVisible"
      width="80%"
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
              @change="filterEmployees"
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="queryEmployee.roleName" clearable placeholder="请选择" @change="filterEmployees">
              <el-option v-for="item in roleOptions2" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
            <!--          <el-input v-model="queryList.roleName" placeholder="角色" clearable @input="SearchEvent"/>-->
          </el-form-item>
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
        <el-table-column label="角色">
          <template slot-scope="scope">
            <el-tag :type="roleTagColorDict[scope.row.roleName]" close-transition>{{
                roleDict[scope.row.roleName]
              }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.native.prevent="addCurEmployee(scope.row)">
              添加
            </el-button>
          </template>
        </el-table-column>
      </el-table>


    </el-dialog>


  </div>
</template>

<script>

import ActivityWindow1 from './ActivityWindow1'
import {
  addStationCourier,
  addStationemployee,
  deleteoneStation,
  queryList,
  queryStation,
  availableEmployees
} from '@/api/deliveryStation'
import { addEmployee } from '@/api/employee'

export default {
  // import引入组件才能使用

  components: {

    ActivityWindow1
  },
  props: {},
  data() {
    return {
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
      queryEmployee: {
        name: '',
        code: '',
        phone: '',
        username: '',
        email: '',
        status: '',
        roleName: ''
      },
      employeeList: null,
      filterList: null,
      dialogVisible: false,
      roleOptions2: [
        { value: 'ROLE_DELIVERY_MAN', label: '快递员' },
        { value: 'ROLE_EMPLOYEE', label: '普通员工' }
      ],
      roleOptions: [
        { value: 'ROLE_STATION_ADMIN', label: '站点管理员' },
        { value: 'ROLE_DELIVERY_MAN', label: '快递员' },
        { value: 'ROLE_EMPLOYEE', label: '普通员工' }
      ],
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
      roleDict: {
        'ROLE_SUPER_ADMIN': '超级管理员',
        'ROLE_STATION_ADMIN': '站点管理员',
        'ROLE_DELIVERY_MAN': '快递员',
        'ROLE_EMPLOYEE': '普通员工'
      },
      roleTagColorDict: {
        'ROLE_SUPER_ADMIN': 'danger',
        'ROLE_STATION_ADMIN': 'success',
        'ROLE_DELIVERY_MAN': 'warning',
        'ROLE_EMPLOYEE': 'primary'
      },
      accountStatusOptions: [
        { value: 0, label: '正常' },
        { value: 1, label: '封禁' },
        { value: 2, label: '注销' }],
      statusOptions: [
        { value: 0, label: '在职' },
        { value: 1, label: '离职' },
        { value: 2, label: '休假' }
      ],
      sexOptions: [
        { value: 0, label: '女' },
        { value: 1, label: '男' },
        { value: 2, label: '未知' }
      ],
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
        id: '',
        name: '',
        sex: '',
        status: '',
        role: '',
        phone: '',
        createTime: '',
        username: '',
        code: ''
      },
      station: [],
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
    addCurEmployee(row) {
      addStationemployee(row.employeeId, this.station.id).then(res => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        //refresh
        this.onQueryAvailableEmployee()
        this.getList()
      })
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
      let role = ''
      if (this.queryEmployee.roleName != '') {
        role = this.queryEmployee.roleName
        this.filterList = this.filterList.filter(function(item) {
          return item.roleName == role
        })
      }

    },

    onQueryAvailableEmployee() {
      // 获取普通员工列表
      availableEmployees().then(res => {
        this.employeeList = res.data
        this.filterList = this.employeeList
      })
    },
    onOpenAddEmployeeDialog() {
      this.dialogVisible = true
      // show employees
      this.onQueryAvailableEmployee()
    },
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
    async delete_one(index, row) {
      console.log(row.roleName)
      if (row.roleName === 'ROLE_STATION_ADMIN') {
        this.$message({
          showClose: true,
          message: '您不能撤销管理员',
          type: 'warning'
        })
        return
      }
      try {
        await deleteoneStation(this.view_station[index].employeeId)
        console.log('deletewancheng')
        const response = await queryList(this.station.id)
        console.log('response.data', response.data)
        this.select_station = response.data
        this.total_station = response.data
        this.view_station = this.total_station.slice(0, this.pages.pageSize)
        this.pages.totalData = this.total_station.length
      } catch (error) {
        console.error(error)
      }
    },
    addInfo() {
      this.$prompt('请输入快递员id', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        return addStationemployee(value, this.station.id)
      }).then(() => {
        return queryList(this.station.id)
      }).then(response => {
        console.log(response.data)
        this.select_station = response.data
        this.total_station = response.data
        this.view_station = this.total_station.slice(0, this.pages.pageSize)
        this.pages.totalData = this.total_station.length
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    //   hasEmptyValues(obj) {
    //     for (const key in obj) {
    //       // eslint-disable-next-line no-prototype-builtins
    //       if (obj.hasOwnProperty(key)) {
    //         if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
    //           return true // 存在空值
    //         }
    //       }
    //     }
    //     return false // 不存在空值
    //   },
    //   add_station() {
    //     const childCom = this.$refs.popWindow
    //     const formData = childCom.fromData() // 调用子组件实例的方法获取表单信息
    //     const judge = this.hasEmptyValues(formData)
    //     if (judge) {
    //       alert('请填写完整表单数据！')
    //     } else {
    //       console.log('formdata', formData)
    //       addStation(formData).then(response => {
    //         this.windowVisible = false
    //         this.addOperate = false
    //         this.select_station = response.data
    //         this.total_station = response.data
    //         this.view_station = this.total_station.slice(0, this.pages.pageSize)
    //         this.pages.totalData = this.total_station.length
    //       })
    //     }
    //   },
    edit_station() {
      const childCom = this.$refs.popWindow
      const formData = childCom.fromData()
      console.log(formData)
      // editStation(formData).then(response => {
      //   console.log(response.data)
      //   this.windowVisible_edit = false
      //   this.addOperate_edit = false
      //   this.select_station = response.data
      //   this.total_station = response.data
      //   this.view_station = this.total_station.slice(0, this.pages.pageSize)
      //   this.pages.totalData = this.total_station.length
      // })
    },
    //   deleteInfo() {
    //     const list = []
    //     for (const obj in this.multipleSelection) {
    //       list.push(this.multipleSelection[obj].id)
    //     }
    //     deletemanyStation(list).then(response => {
    //       console.log(response.data)
    //       this.windowVisible_edit = false
    //       this.addOperate_edit = false
    //       this.select_station = response.data
    //       this.total_station = response.data
    //       this.view_station = this.total_station.slice(0, this.pages.pageSize)
    //       this.pages.totalData = this.total_station.length
    //     })
    //   },
    SearchEvent() {
      let phone = ''
      let createTime = ''
      let sex = ''
      let name = ''
      let status = '', role = ''
      let username = '', code = ''
      this.select_station = this.total_station

      if (this.queryList.username != '') {
        username = this.queryList.username
        this.select_station = this.select_station.filter(function(employee) {
          return employee.username && employee.username.includes(username)
        })
      }

      if (this.queryList.code != '') {
        code = this.queryList.code
        this.select_station = this.select_station.filter(function(employee) {
          return employee.code && employee.code.includes(code)
        })
      }

      if (this.queryList.name != '') {
        name = this.queryList.name
        this.select_station = this.select_station.filter(function(employee) {
          return employee.code && employee.code.includes(name)
        })
      }

      if (this.queryList.sex != '') {
        sex = this.queryList.sex
        this.select_station = this.select_station.filter(function(employee) {
          return employee.sex == sex
        })
      }
      if (this.queryList.status != '') {
        status = this.queryList.status
        this.select_station = this.select_station.filter(function(employee) {
          return employee.status == status
        })
      }
      if (this.queryList.phone != '') {
        phone = this.queryList.phone
        this.select_station = this.select_station.filter(function(employee) {
          return employee.phone && employee.phone.includes(phone)
        })
      }

      if (this.queryList.roleName != '') {
        role = this.queryList.roleName
        this.select_station = this.select_station.filter(function(select_station) {
          // console.log(select_station.roleName)
          return select_station.roleName == role
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
      // console.log(this.$store.getters.accountId)

      queryStation(this.$store.getters.accountId)
        .then(stationResponse => {
          this.station = stationResponse.data
          // console.log('station.id', this.station.id)
          return queryList(this.station.id) // 返回 Promise 对象
        })
        .then(listResponse => {
          console.log(listResponse.data)
          this.select_station = listResponse.data
          this.total_station = listResponse.data
          this.view_station = this.total_station.slice(0, this.pages.pageSize)
          this.pages.totalData = this.total_station.length
        })
        .catch(error => {
          // 处理错误
        })
    }

  }
}
</script>
