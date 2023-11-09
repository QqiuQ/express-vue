<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="user" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="user.username" placeholder="用户名" clearable/>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="user.nickname" placeholder="昵称" clearable/>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="user.email" placeholder="邮箱" clearable/>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="user.phone" placeholder="手机号" clearable/>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="user.sex" clearable placeholder="请选择" @change="onSexChanged">
            <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="账户状态">
          <el-select
            v-model="user.accountStatus"
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

        <el-form-item>
          <el-button type="primary" @click="onQuery">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="pageList" style="width: 100%" max-height="500">
      <el-table-column fixed prop="username" label="用户名"/>
      <el-table-column fixed prop="nickname" label="昵称"/>
      <el-table-column fixed prop="avatar" label="头像"/>
      <el-table-column fixed prop="sex" label="性别">
        <template slot-scope="scope">
          <el-tag :type="sexTagColor[scope.row.sex]" close-transition>{{ sexTag[scope.row.sex] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed prop="email" label="邮箱"/>
      <el-table-column fixed prop="phone" label="手机号"/>
      <el-table-column fixed prop="birthday" label="生日"/>
      <el-table-column fixed prop="lastLoginTime" label="上次登录时间"/>
      <el-table-column fixed prop="accountStatus" label="账户状态">
        <template slot-scope="scope">
          <el-tag
            :type="accountStatusTagColor[scope.row.accountStatus]"
            close-transition
          >{{ accountStatusTag[scope.row.accountStatus] }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.native.prevent="onOpenDetailDrawer(scope.$index)">
            详情
          </el-button>
          <el-button type="text" size="small" @click.native.prevent="onOpenEditDialog(scope.$index)">
            修改
          </el-button>
          <el-button type="text" size="small" @click.native.prevent="onOpenDeleteDialog(scope.$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-footer style="margin-top: 40px;">
      <el-row type="flex" justify="center" align="middle">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 30, 40, 50]"
          :page-size="pageLimit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalRecords"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </el-footer>

    <!-- detail drawer -->
    <el-drawer title="用户详情" :visible.sync="detailDrawerVisible" :direction="lrt">
      <div style="padding: 20px; display: flex; flex-direction: column">
        <div>
          <span>用户名：</span><span>{{ detailUser.username }}</span>
        </div>
        <div>
          <span>电话：</span><span>{{ detailUser.phone }}</span>
        </div>
        <div>
          <span>生日：</span><span>{{ detailUser.birthday }}</span>
        </div>
        <div>
          <span>创建时间：</span><span>{{ detailUser.createTime }}</span>
        </div>
        <div>
          <span>最后登录时间：</span><span>{{ detailUser.lastLoginTime }}</span>
        </div>
      </div>
    </el-drawer>

    <!-- edit dialog -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%">

      <el-form v-model="rowUser" label-width="80px">
        <el-row type="flex" justify="center" align="middle" style="margin-bottom: 20px;">
          <el-avatar
            :size="100"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <!-- <el-avatar src="rowUser.avatar"></el-avatar> -->
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名">
              <el-input v-model="rowUser.username" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称">
              <el-input v-model="rowUser.nickname"/>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱">
              <el-input v-model="rowUser.email"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号">
              <el-input v-model="rowUser.phone"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="性别">
          <el-select v-model="rowUser.sex" clearable placeholder="请选择" @change="onEditSexChange">
            <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>

        <el-form-item label="生日">
          <el-date-picker v-model="rowUser.birthday" type="date" placeholder="选择日期"/>
        </el-form-item>
        <el-form-item label="账户状态">
          <el-radio-group v-model="rowUser.accountStatus">
            <el-radio-button label="0">正常</el-radio-button>
            <el-radio-button label="1">封禁</el-radio-button>
            <el-radio-button label="2">注销</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-row type="flex" justify="end" align="middle">
          <el-button type="primary" round @click="onEditSave">保存</el-button>
        </el-row>
      </el-form>
    </el-dialog>

    <!-- delete dialog -->
    <el-dialog title="确认是否删除" :visible.sync="deleteDialogVisible" width="50%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onDeleteConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>
<script>
import { queryList, editUser, deleteUser, queryUser } from '@/api/user2'

export default {

  data() {
    // 日期格式化
    // const dataFormater = new DateFormat("yyyy-MM-dd")
    // eslint-disable-next-line no-extend-native
    Date.prototype.format = function(fmt) {
      var o = {
        'M+': this.getMonth() + 1, // 月份
        'd+': this.getDate(), // 日
        'h+': this.getHours(), // 小时
        'm+': this.getMinutes(), // 分
        's+': this.getSeconds(), // 秒
        'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
        'S': this.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (const k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    }
    return {
      detailDrawerVisible: false,
      deleteDialogVisible: false,
      editDialogVisible: false,
      accountStatusOptions: [
        { value: 0, label: '正常' },
        { value: 1, label: '封禁' },
        { value: 2, label: '注销' }],
      sexOptions: [
        { value: 0, label: '女' },
        { value: 1, label: '男' },
        { value: 2, label: '未知' }
      ],
      listLoading: false,
      userList: null, // 总List
      pageList: null, // 分页List
      totalRecords: 0, // userList总记录
      currentPage: 1, // 当前页
      pageLimit: 5, // 页大小
      user: {
        nickname: null,
        sex: null,
        phone: null,
        birthday: null,
        registerTime: null,
        username: null,
        email: null,
        accountStatus: null,
        lastLoginTime: null
      },
      detailUser: {
        username: '',
        email: '',
        createTime: '',
        updateTime: '',
        lastLoginTime: '',
        nickname: '',
        phone: '',
        birthday: ''
      },
      rowUser: {
        username: null,
        nickname: null,
        email: null,
        phone: null,
        birthday: null,
        sex: null,
        accountStatus: null
      },
      tmpRowUser: null,
      userIdx: null,
      accountStatusTag: {
        0: '正常',
        1: '封禁',
        2: '注销'
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
      }
    }
  },
  created() {
    // this.resetRowUser()
    window.alert("loginAccountId: " + this.$store.getters.accountId)

    this.onQuery(this.user)
  },
  methods: {
    onOpenDetailDrawer(index) {
      this.detailDrawerVisible = true
      this.userIdx = this.getRowDataIndex(index)
      this.tmpRowUser = this.userList[this.userIdx]
      console.log(this.tmpRowUser.id)
      console.log(this.tmpRowUser)
      this.onQueryOneUser(this.tmpRowUser.id)
    },
    getRowDataIndex(rowIndex) { // 获取该页数据在userList的索引
      return rowIndex + (this.currentPage - 1) * this.pageLimit
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.showPageList(this.currentPage, this.pageLimit)
    },
    handleSizeChange(val) {
      this.pageLimit = val
      this.showPageList(this.currentPage, this.pageLimit)
    },
    showPageList(page, limit) {
      if (this.userList != null) {
        // console.log(this.userList)
        const start = (this.currentPage - 1) * this.pageLimit
        this.pageList = this.userList.slice(start, start + this.pageLimit)
      }
    },
    filterAccountStatusTag(val, row) {
      return row.accountStatus === val
    },
    onDeleteConfirm() {
      // console.log(this.userIdx)
      // console.log(this.userList[this.userIdx])
      deleteUser(this.userList[this.userIdx].id)
      this.userList.splice(this.userIdx, 1)
      this.deleteDialogVisible = false
      this.userIdx = null
    },
    onOpenDeleteDialog(index) {
      this.deleteDialogVisible = true
      this.userIdx = this.getRowDataIndex(index)
    },
    resetRowUser() {
      this.rowUser.username = null
      this.rowUser.birthday = null
      this.rowUser.nickname = null
      this.rowUser.email = null
      this.rowUser.phone = null
      this.rowUser.sex = null
      this.rowUser.accountStatus = null
    },
    onEditSave() {
      // 编辑保存按钮
      this.setUserData(this.tmpRowUser, this.rowUser)
      // this.tmpRowUser.birthday = this.getFormatDate(this.tmpRowUser.birthday)
      // console.log()
      this.tmpRowUser.birthday = (new Date(this.tmpRowUser.birthday)).format('yyyy-MM-dd').toString()
      editUser(this.tmpRowUser).then(response => {
        this.$message('修改成功')
        this.editDialogVisible = false
      })
      // this.resetRowUser()
    },
    onEditSexChange(val) {
      // eslint-disable-next-line no-undef
      if ($.isEmptyObject(this.rowUser)) {
        this.rowUser.sex = val
      }
    },
    setUserData(user, data) {
      // console.log(data)
      user.username = data.username
      user.nickname = data.nickname
      user.phone = data.phone
      user.email = data.email
      user.sex = data.sex
      user.birthday = data.birthday
      // user.birthday = dataFormater.format(data.birthday)
      user.accountStatus = data.accountStatus
    },
    onOpenEditDialog(index) {
      const idx = this.getRowDataIndex(index)
      this.editDialogVisible = true
      // show info
      // deep copy
      this.tmpRowUser = this.userList[idx]
      this.setUserData(this.rowUser, this.tmpRowUser)
    },
    onQuery(user) {
      queryList(this.user).then(response => {
        // console.log(response)
        // response.data
        this.userList = response.data
        this.totalRecords = this.userList.length
        this.showPageList(this.currentPage, this.pageLimit)
      })
    },
    onQueryOneUser(id) {
      queryUser(id).then(res => {
        this.detailUser = res.data
        console.log(res.data)
        console.log(this.detailUser)
      })
    },
    onSexChanged(val) {
      this.user.sex = val
    },
    onAccountStatusChanged(val) {
      this.user.accountStatus = val
    }

  }
}
</script>
