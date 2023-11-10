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
      <el-row>
        Search
      </el-row>
      <div style="margin: 20px;">
        <el-table :data="employeeList" style="width: 100%" max-height="500">
          <el-table-column fixed prop="username" label="用户名"/>
          <el-table-column fixed prop="code" label="工号"/>
          <
          <el-table-column fixed prop="phone" label="手机号"/>
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
      width="30%"
      :before-close="handleRoleChangeClose"
    >
      <span>当前角色:
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
    resetRoleChange() {
      this.curRoleId = null
      this.curRoleCode = null
      this.newRoleId = null
    },
    onRoleChange(val) {
      this.newRoleId = val
    },
    handleRoleChangeConfirm() {
      console.log(this.newRoleId)
      console.log(this.curRoleId)
      console.log(this.curEmpId)
      if (this.newRoleId == this.curRoleId) {
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
