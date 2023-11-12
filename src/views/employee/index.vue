<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="queryEmployee" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="queryEmployee.username" placeholder="用户名" clearable/>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="queryEmployee.name" placeholder="姓名" clearable/>
        </el-form-item>
        <el-form-item label="工号">
          <el-input v-model="queryEmployee.code" placeholder="工号" clearable/>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="queryEmployee.email" placeholder="邮箱" clearable/>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="queryEmployee.phone" placeholder="手机号" clearable/>
        </el-form-item>
        <el-form-item label="住址">
          <el-input v-model="queryEmployee.address" placeholder="住址" clearable/>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="queryEmployee.sex" clearable placeholder="请选择" @change="onSexChanged">
            <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
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
        <el-form-item label="角色">
          <el-select v-model="queryEmployee.roleName" clearable placeholder="请选择" @change="onRoleChange">
            <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQuery">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-row>
        <el-button primary @click="onOpenAddEmployeeDialog">新增员工</el-button>
      </el-row>
    </div>

    <el-table :data="pageList" style="width: 100%" max-height="500">
      <!--      <el-table-column fixed prop="avatar" label="头像"/>-->
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
      <el-table-column fixed prop="accountStatus" label="账户状态">
        <template slot-scope="scope">
          <el-tag
            :type="accountStatusTagColor[scope.row.accountStatus]"
            close-transition
          >{{ accountStatusTag[scope.row.accountStatus] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed prop="status" label="员工状态">
        <template slot-scope="scope">
          <el-tag
            :type="accountStatusTagColor[scope.row.status]"
            close-transition
          >{{ statusTag[scope.row.status] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed prop="address" label="住址"/>
      <el-table-column fixed prop="roleName" label="角色名称">
        <template slot-scope="scope">
          <el-tag :type="roleTagColorDict[scope.row.roleName]" close-transition>{{
              roleDict[scope.row.roleName]
            }}
          </el-tag>
        </template>
      </el-table-column>
      <!--      <el-table-column fixed prop="hireDate" label="入职日期"/>-->

      <!--      <el-table-column fixed prop="lastLoginTime" label="上次登录时间"/>-->


      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.native.prevent="onOpenDetailDrawer(scope.$index)">
            详情
          </el-button>
          <el-button v-if="modifyAvailable(scope.row)" type="text" size="small"
                     @click.native.prevent="onOpenEditDialog(scope.$index)"
          >
            修改
          </el-button>
          <el-button v-if="modifyAvailable(scope.row)" type="text" size="small"
                     @click.native.prevent="onOpenDeleteDialog(scope.$index)"
          >
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
    <el-drawer title="员工详情" :visible.sync="detailDrawerVisible" direction="ltr" size="50%">
      <el-row type="flex" justify="center" align="middle">
        <el-avatar
          :size="100"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <!-- <el-avatar src="rowData.avatar"></el-avatar> -->
      </el-row>
      <el-row  type="flex" justify="center">
        <el-tag :type="roleTagColorDict[rowData.roleName]" close-transition>{{
            roleDict[rowData.roleName]
          }}
        </el-tag>
      </el-row>
      <el-divider></el-divider>

      <div style="margin: 20px">
        <el-descriptions class="margin-top" title="个人信息" :column="3" border>
          <el-descriptions-item>
            <template slot="label">
              姓名
            </template>
            {{ rowData.name }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              性别
            </template>
            <el-tag
              :type="sexTagColor[rowData.sex]"
              close-transition
            >{{ sexTag[rowData.sex] }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              员工状态
            </template>
            <el-tag
              :type="accountStatusTagColor[rowData.status]"
              close-transition
            >{{ statusTag[rowData.status] }}
            </el-tag>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              手机号
            </template>
            {{ rowData.phone }}
          </el-descriptions-item>

          <el-descriptions-item :column="2">
            <template slot="label">
              邮箱
            </template>
            {{ rowData.email }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              入职日期
            </template>
            {{ rowData.hireDate }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              住址
            </template>
            {{ rowData.address }}
          </el-descriptions-item>

        </el-descriptions>

        <el-divider></el-divider>
        <el-descriptions class="margin-top" title="账户信息" :column="3" border>
          <el-descriptions-item>
            <template slot="label">
              用户名
            </template>
            {{ rowData.username }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              工号
            </template>
            {{ rowData.code }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              账户状态
            </template>
            <el-tag
              :type="accountStatusTagColor[rowData.accountStatus]"
              close-transition
            >{{ accountStatusTag[rowData.accountStatus] }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              创建时间
            </template>
            {{ rowData.createTime }}
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              更新时间
            </template>
            {{ rowData.updateTime }}
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              上次登录
            </template>
            {{ rowData.lastLoginTime }}
          </el-descriptions-item>
        </el-descriptions>

      </div>
    </el-drawer>

    <!-- add dialog -->
    <el-dialog title="新增员工" :visible.sync="addDialogVisible" width="80%">

      <el-form v-model="newFormData" label-width="80px">
        <!--        <el-row type="flex" justify="center" align="middle" style="margin-bottom: 20px;">-->

        <!--          <el-upload-->
        <!--            class="avatar-uploader"-->
        <!--            action="#"-->
        <!--            :show-file-list="false"-->
        <!--            :on-success="handleAvatarSuccess"-->
        <!--            :before-upload="beforeAvatarUpload"-->
        <!--            :http-request="handleUploadAvatar"-->
        <!--          >-->
        <!--            <img v-if="rowData.avatar" :src="rowData.avatar" class="avatar">-->
        <!--            <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
        <!--          </el-upload>-->
        <!--          <img src="../../assets/upload/6bd5e119e66841bba621ee4a6b1db576-fzu.jpg" alt="绳之以法" width="100%">-->

        <!--          <el-avatar-->
        <!--            :size="100"-->
        <!--            src="imageUrl"-->
        <!--          />-->

        <!--          <el-avatar-->
        <!--            :size="100"-->
        <!--            src="https://p.qqan.com/up/2021-6/16246735796128385.png"-->
        <!--          />-->
        <!--          &lt;!&ndash; <el-avatar src="rowData.avatar"></el-avatar> &ndash;&gt;-->
        <!--        </el-row>-->
        <el-row>
          <el-form-item label="角色">
            <el-select v-model="newFormData.roleName" clearable placeholder="请选择" @change="onRoleChange">
              <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名">
              <el-input v-model=" newFormData.username"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工号">
              <el-input v-model=" newFormData.code"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-form-item label="密码">
            <el-input v-model=" newFormData.password"/>
          </el-form-item>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名">
              <el-input v-model=" newFormData.name"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别">
              <el-select v-model=" newFormData.sex" clearable placeholder="请选择" @change="onEditSexChange">
                <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱">
              <el-input v-model=" newFormData.email"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号">
              <el-input v-model=" newFormData.phone"/>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row>
          <el-col :span="12">
            <el-form-item label="账户状态">
              <el-radio-group v-model=" newFormData.accountStatus">
                <el-radio-button label="0">正常</el-radio-button>
                <el-radio-button label="1">封禁</el-radio-button>
                <el-radio-button label="2">注销</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="员工状态">
              <el-radio-group v-model=" newFormData.status">
                <el-radio-button label="0">在岗</el-radio-button>
                <el-radio-button label="1">离职</el-radio-button>
                <el-radio-button label="2">休假</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="片区">
          <el-col :span="6">
            <el-cascader
              placeholder="请选择地区"
              size="medium"
              :options="placeOptions"
              @change="handleRegionChange"
            />

          </el-col>
          <!--          <el-button v-if="!showCascadePlace" @click="showCascadePlace=true">-->
          <!--            <template slot-scope="">-->
          <!--              {{ this.region }}-->
          <!--            </template>-->
          <!--          </el-button>-->
          <el-col :span="10">
            <el-input v-model.trim="street" label="街道"/>

          </el-col>

        </el-form-item>
        <el-form-item label="入职日期">
          <el-date-picker v-model=" newFormData.hireDate" type="date" placeholder="入职日期"/>
        </el-form-item>

        <el-row type="flex" justify="end" align="middle">
          <el-button type="primary" round @click="onAddSave">保存</el-button>
        </el-row>
      </el-form>
    </el-dialog>

    <!-- edit dialog -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="80%">

      <el-form v-model="rowData" label-width="80px">
        <!--        <el-row type="flex" justify="center" align="middle" style="margin-bottom: 20px;">-->

        <!--          <el-upload-->
        <!--            class="avatar-uploader"-->
        <!--            action="#"-->
        <!--            :show-file-list="false"-->
        <!--            :on-success="handleAvatarSuccess"-->
        <!--            :before-upload="beforeAvatarUpload"-->
        <!--            :http-request="handleUploadAvatar"-->
        <!--          >-->
        <!--            <img v-if="rowData.avatar" :src="rowData.avatar" class="avatar">-->
        <!--            <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
        <!--          </el-upload>-->
        <!--          <img src="../../assets/upload/6bd5e119e66841bba621ee4a6b1db576-fzu.jpg" alt="绳之以法" width="100%">-->

        <!--          <el-avatar-->
        <!--            :size="100"-->
        <!--            src="imageUrl"-->
        <!--          />-->

        <!--          <el-avatar-->
        <!--            :size="100"-->
        <!--            src="https://p.qqan.com/up/2021-6/16246735796128385.png"-->
        <!--          />-->
        <!-- <el-avatar src="rowData.avatar"></el-avatar> -->
        <!--        </el-row>-->
        <el-row>
          <el-form-item label="角色">
            <el-select v-model="rowData.roleName" clearable placeholder="请选择" @change="onRoleChange">
              <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名">
              <el-input v-model="rowData.username" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工号">
              <el-input v-model="rowData.code" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名">
              <el-input v-model="rowData.name"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别">
              <el-select v-model="rowData.sex" clearable placeholder="请选择" @change="onEditSexChange">
                <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱">
              <el-input v-model="rowData.email"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号">
              <el-input v-model="rowData.phone"/>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row>
          <el-col :span="12">
            <el-form-item label="账户状态">
              <el-radio-group v-model="rowData.accountStatus">
                <el-radio-button label="0">正常</el-radio-button>
                <el-radio-button label="1">封禁</el-radio-button>
                <el-radio-button label="2">注销</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="员工状态">
              <el-radio-group v-model="rowData.status">
                <el-radio-button label="0">在岗</el-radio-button>
                <el-radio-button label="1">离职</el-radio-button>
                <el-radio-button label="2">休假</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="家庭住址">
          <el-input v-model="rowData.address"/>
        </el-form-item>
        <el-form-item label="入职日期">
          <el-date-picker v-model="rowData.hireDate" type="date" placeholder="入职日期"/>
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
import { addEmployee, deleteEmployee, editEmployee, queryList } from '@/api/employee'
import { uploadAvatar } from '@/api/file'
import { codeToText, regionData } from 'element-china-area-data'
import { employeeProfile } from '@/api/profile'

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
      placeOptions: regionData,
      showCascadePlace: false, // 是否显示级联
      roleOptions: [
        { value: 'ROLE_SUPER_ADMIN', label: '超级管理员' },
        { value: 'ROLE_STATION_ADMIN', label: '站点管理员' },
        { value: 'ROLE_DELIVERY_MAN', label: '快递员' },
        { value: 'ROLE_EMPLOYEE', label: '普通员工' }],
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
      imageUrl: encodeURI('../../assets/upload/6bd5e119e66841bba621ee4a6b1db576-fzu.jpg'),
      // imageUrl:'upload/'+encodeURI('avatars/45d7122ca9834c658dbaa3a1a8149337-fzu.jpg'),
      addDialogVisible: false,
      detailDrawerVisible: false,
      deleteDialogVisible: false,
      editDialogVisible: false,
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
      listLoading: false,
      employeeList: null, // 总List
      pageList: null, // 分页List
      totalRecords: 0, // employeeList总记录
      currentPage: 1, // 当前页
      pageLimit: 5, // 页大小
      queryEmployee: {
        roleName: null,
        name: null,
        code: null,
        sex: null,
        phone: null,
        username: null,
        email: null,
        accountStatus: null,
        lastLoginTime: null,
        status: null,
        hireDate: null,
        address: null
      },
      rowData: {
        roleName: '',
        username: '',
        code: '',
        name: '',
        email: '',
        phone: '',
        hireDate: null,
        sex: 2,
        accountStatus: 0,
        password: '',
        status: 0,
        address: ''
      },
      newFormData: {
        roleName: '',
        username: '',
        code: '',
        name: '',
        email: '',
        phone: '',
        hireDate: null,
        sex: 2,
        accountStatus: 0,
        password: '',
        status: 0,
        address: ''
      },
      rowDataIdx: null,
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
      profile: null
    }
  },
  created() {
    this.onQuery()
    employeeProfile(this.$store.getters.accountId).then(res => {
      this.profile = res.data
    })
  },
  methods: {
    modifyAvailable(row) {
      // 哪些不能修改
      if (this.profile.username === 'bobby') {
        return row.id !== this.profile.id
      }
      return row.id !== this.profile.id && row.username !== 'bobby' && row.roleName === 'ROLE_SUPER_ADMIN'
    },
    handleRegionChange(val) {
      this.region = codeToText[val[0]] + '/' + codeToText[val[1]] + '/' + codeToText[val[2]]
    },
    handleUploadAvatar(param) {
      const formData = new FormData()
      formData.append('file', param.file)
      uploadAvatar(formData)
        .then((response) => {
          console.log('上传图片成功')
          this.rowData.avatar = url(response.data.path)
          console.log(this.rowData.avatar)
          // this.formData.fileList.push([
          //   { name: param.file.name, url: response.data.data }
          // ])
          // console.log(this.formData.fileList)
        })
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      console.log(file)
      // this.rowData.avatar = file.response.data.fullUrl
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/webp' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 jgp,jpeg,webp,png格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    onAddSave() {
      addEmployee(this.newFormData).then(response => {
        this.$message('添加成功')
        this.addDialogVisible = false
        this.onQuery()  // 重新读取
      })
    },
    onOpenAddEmployeeDialog() {
      this.addDialogVisible = true
    },
    onOpenDetailDrawer(index) {
      this.detailDrawerVisible = true
      const idx = this.getRowDataIndex(index)
      this.rowData = this.employeeList[idx]
    },
    getRowDataIndex(rowIndex) { // 获取该页数据在employeeList的索引
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
      if (this.employeeList != null) {
        const start = (this.currentPage - 1) * this.pageLimit
        this.pageList = this.employeeList.slice(start, start + this.pageLimit)
      }
    },
    filterAccountStatusTag(val, row) {
      return row.accountStatus === val
    },

    onDeleteConfirm() {
      deleteEmployee(this.employeeList[this.rowDataIdx].id).then(response => {
        this.deleteDialogVisible = false
        this.onQuery()
      })
      this.rowDataIdx = null
    },
    onOpenDeleteDialog(index) {
      this.deleteDialogVisible = true
      this.rowDataIdx = this.getRowDataIndex(index)
    },

    onEditSave() {
      // 编辑保存按钮
      editEmployee(this.rowData).then(response => {
        this.$message({
          message: '修改成功', type: 'success'
        })
        this.editDialogVisible = false
        this.onQuery()  // 重新读取
      })
    },
    onEditSexChange(val) {
      // eslint-disable-next-line no-undef
      if ($.isEmptyObject(this.rowData)) {
        this.rowData.sex = val
      }
    },
    onOpenEditDialog(index) {

      const idx = this.getRowDataIndex(index)
      this.editDialogVisible = true

      // this.tmpRowData =
      this.rowData = JSON.parse(JSON.stringify(this.employeeList[idx]))
    },
    // 员工查询
    onQuery() {
      queryList(this.queryEmployee).then(response => {
        this.employeeList = response.data
        this.totalRecords = this.employeeList.length
        this.showPageList(this.currentPage, this.pageLimit)
      })
    },
    onSexChanged(val) {
      this.queryEmployee.sex = val
    },
    onRoleChange(val) {
      this.queryEmployee.roleName = val
    },
    onAccountStatusChanged(val) {
      this.queryEmployee.accountStatus = val
    },
    onStatusChanged(val) {
      this.queryEmployee.status = val
    }

  }
}
</script>
