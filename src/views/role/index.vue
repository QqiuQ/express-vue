<template>
  <div class="app-container">
    <el-table :data="roleList" style="width: 100%" max-height="500">
      <el-table-column fixed prop="name" label="角色CODE"/>
      <el-table-column fixed prop="name" label="角色名称">
        <template slot-scope="scope">
          <el-tag :type="roleTagColorDict[scope.row.name]" close-transition>{{ roleDict[scope.row.name] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed prop="createTime" label="创建时间"/>

      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.native.prevent="onOpenEmployeeDrawer(scope.row)">
            员工列表
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <!-- detail drawer -->
    <el-drawer title="角色所含员工" :visible.sync="employeeDialogVisible" direction="ltr" size="90%"
               :before-close="handleEmployeeDialogColse"
    >
      <div style="margin: 20px;">
        <el-row>
          <el-form :inline="true" :model="queryEmployee" class="demo-form-inline">
            <el-row>
              <el-form-item label="用户名">
                <el-input v-model="queryEmployee.username" placeholder="用户名" clearable @input="filterEmployeeList"/>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="queryEmployee.name" placeholder="姓名" clearable @input="filterEmployeeList"/>
              </el-form-item>
              <el-form-item label="手机号">
                <el-input v-model="queryEmployee.phone" placeholder="手机号" clearable @input="filterEmployeeList"/>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="queryEmployee.email" placeholder="邮箱" clearable @input="filterEmployeeList"/>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="工号">
                <el-input v-model="queryEmployee.code" placeholder="工号" clearable @input="filterEmployeeList"/>
              </el-form-item>
              <el-form-item label="账户状态">
                <el-select
                  v-model="queryEmployee.accountStatus"
                  clearable
                  placeholder="请选择"
                  @change="onAccountStatusChanged"
                >
                  <el-option
                    v-for="item in accountStatusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
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
            </el-row>


          </el-form>
        </el-row>
        <el-table :data="filterList" style="width: 100%" max-height="500">
          <el-table-column fixed prop="username" label="用户名"/>
          <el-table-column fixed prop="name" label="姓名"/>
          <el-table-column fixed prop="code" label="工号"/>
          <el-table-column fixed prop="phone" label="手机号">
            <!--            <template slot-scope="scope">-->
            <!--              {{ scope.row.phone || queryEmployee.phone}}-->
            <!--            </template>-->
          </el-table-column>
          <el-table-column fixed prop="email" label="邮箱"/>
          <el-table-column fixed prop="status" label="员工状态">
            <template slot-scope="scope">
              <el-tag
                :type="accountStatusTagColor[scope.row.status]"
                close-transition
              >{{ statusTag[scope.row.status] }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column fixed prop="accountStatus" label="账户状态">
            <template slot-scope="scope">
              <el-tag
                :type="accountStatusTagColor[scope.row.accountStatus]"
                close-transition
              >{{ accountStatusTag[scope.row.accountStatus] }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column fixed prop="roleName" label="角色">
            <template slot-scope="scope">
              <el-tag :type="roleTagColorDict[scope.row.roleName]" close-transition>{{
                  roleDict[scope.row.roleName]
                }}
              </el-tag>
            </template>
          </el-table-column>


          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click.native.prevent="onOpenRoleChangeDialog(scope.row)">
                变更角色
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-drawer>

    <el-dialog
      title="变更角色"
      :visible.sync="roleChangeDialogVisible"
      width="25%"
      :before-close="handleRoleChangeClose"
    >
      <span>
          <el-tag :type="roleTagColorDict[this.curRoleCode]" close-transition>{{ roleDict[this.curRoleCode] }}</el-tag>
        <i class="el-icon-right"/>
      </span>
      <el-select v-model="newRoleId" clearable placeholder="请选择" @change="onRoleChange">
        <el-option v-for="role in roleList" :key="role.id" :label="roleDict[role.name]" :value="role.id"/>
      </el-select>
      <span slot="footer" class="dialog-footer">
    <el-button @click="roleChangeDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleRoleChangeConfirm">确 定</el-button>
  </span>
    </el-dialog>

  </div>

</template>
<script>
import { changeEmployeeRole, getAllRoles, queryEmployeeByRoleId } from '@/api/role2'

export default {

  data() {

    return {
      filterList: null,
      accountStatusOptions: [
        { value: 0, label: '正常' },
        { value: 1, label: '封禁' },
        { value: 2, label: '注销' }],
      statusOptions: [
        { value: 0, label: '在职' },
        { value: 1, label: '离职' },
        { value: 2, label: '休假' }
      ],
      queryEmployee: {
        name: '',
        code: '',
        phone: '',
        username: '',
        email: '',
        accountStatus: '',
        lastLoginTime: '',
        status: ''
      },
      openRoleId: null,
      curEmpId: null,
      curRoleId: null,
      newRoleId: null,
      newRoleCode: null,
      roleList: null,
      employeeList: null,
      employeeDialogVisible: false,
      roleChangeDialogVisible: false,
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
      accountStatusTagColor: {
        0: 'success',
        1: 'danger',
        2: 'info'
      },
      accountStatusTag: {
        0: '正常',
        1: '封禁',
        2: '注销'
      },
      statusTag: {
        0: '在职',
        1: '离职',
        2: '休假'
      }
    }
  },
  created() {
    this.onQuery()
  },
  methods: {
    resetQuery() {
      this.queryEmployee.username = ''
      this.queryEmployee.name = ''
      this.queryEmployee.code = ''
      this.queryEmployee.email = ''
      this.queryEmployee.phone = ''
      this.queryEmployee.accountStatus = ''
      this.queryEmployee.status = ''
    },
    filterEmployeeList() {
      let username = '', name = '', phone = '', email = '', code = '', accountStatus = '', status = ''
      console.log('start filter')
      this.filterList = this.employeeList
      if (this.queryEmployee.username !== '') {
        username = this.queryEmployee.username
        this.filterList = this.filterList.filter(function(employee) {
          return employee.username && employee.username.includes(username)
        })
      }

      if (this.queryEmployee.name !== '') {
        name = this.queryEmployee.name
        this.filterList = this.filterList.filter(function(employee) {
          return employee.name && employee.name.includes(name)
        })
      }

      if (this.queryEmployee.phone !== '') {
        phone = this.queryEmployee.phone
        this.filterList = this.filterList.filter(function(employee) {
          return employee.phone && employee.phone.includes(phone)
        })
      }

      if (this.queryEmployee.email !== '') {
        email = this.queryEmployee.email
        this.filterList = this.filterList.filter(function(employee) {
          return employee.email && employee.email.includes(email)
        })
      }

      if (this.queryEmployee.code !== '') {
        code = this.queryEmployee.code
        this.filterList = this.filterList.filter(function(employee) {
          return employee.code && employee.code.includes(code)
        })
      }

      if (this.queryEmployee.accountStatus !== '') {
        accountStatus = this.queryEmployee.accountStatus
        this.filterList = this.filterList.filter(function(employee) {
          return employee.accountStatus == accountStatus
        })
      }
      if (this.queryEmployee.status !== '') {
        status = this.queryEmployee.status
        this.filterList = this.filterList.filter(function(employee) {
          return employee.status == status
        })
      }
    },
    onAccountStatusChanged(val) {
      this.queryEmployee.accountStatus = val
      this.filterEmployeeList()
    },
    onStatusChanged(val) {
      this.queryEmployee.status = val
      this.filterEmployeeList()
    },
    resetRoleChange() {
      this.curRoleId = null
      this.curRoleCode = null
      this.newRoleId = null
    },
    onRoleChange(val) {
      this.newRoleId = val
      console.log(val)
    },
    handleRoleChangeConfirm() {
      console.log(this.newRoleId)
      console.log(this.curRoleId)
      console.log(this.curEmpId)
      if (this.newRoleId == null || this.newRoleId == '' || this.newRoleId == undefined) {
        window.alert('请选择角色')
      } else if (this.newRoleId == this.curRoleId) {
        window.alert('该员工已是该角色')
      } else {
        // 更改该员工角色
        changeEmployeeRole(this.curEmpId, this.curRoleId, this.newRoleId).then(res => {
          this.onQueryEmployees()
          this.resetRoleChange()
          this.handleRoleChangeClose()
        })
      }
    },
    onOpenEmployeeDrawer(row) {
      this.employeeDialogVisible = true
      this.openRoleId = row.id
      this.resetQuery()
      this.onQueryEmployees()
    },
    handleRoleChangeClose() {
      this.roleChangeDialogVisible = false
    },
    onOpenRoleChangeDialog(row) {
      this.roleChangeDialogVisible = true
      this.curRoleCode = row.roleName
      this.curRoleId = row.roleId
      this.curEmpId = row.employeeId
    },
    handleEmployeeDialogColse() {
      this.employeeDialogVisible = false
    },
    onQueryEmployees() {
      queryEmployeeByRoleId(this.openRoleId).then(res => {
        this.employeeList = res.data
        // this.filterList = this.employeeList
        this.filterEmployeeList()
      })
    },
    onQuery() {
      getAllRoles().then(res => {
        this.roleList = res.data
      })
    }

  }
}
</script>
