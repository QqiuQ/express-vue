<template>
  <div>
    <el-container>
      <el-form :inline="true" :model=" queryList" label-width="68px">
        <el-form-item label="省" prop="province">
          <el-input v-model=" queryList.province" placeholder="请输入省" clearable @input="SearchEvent" />
        </el-form-item>
        <el-form-item label="市" prop="city">
          <el-input v-model=" queryList.city" placeholder="请输入市" clearable @input="SearchEvent" />
        </el-form-item>
        <el-form-item label="县" prop="country">
          <el-input v-model=" queryList.country" placeholder="请输入县" clearable @input="SearchEvent" />
        </el-form-item>
        <el-form-item label="街道">
          <el-input v-model=" queryList.street" placeholder="街道" clearable @input="SearchEvent" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model=" queryList.phone" placeholder="电话" clearable @input="SearchEvent" />
        </el-form-item>
        <el-form-item label="驿站名称">
          <el-input v-model=" queryList.station_name" placeholder="驿站名称" clearable @input="SearchEvent" />
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="addInfo()">增加网点</el-button>
          <el-button @click="toggleSelection()">取消选择</el-button>
          <el-button @click="deleteInfo()">批量删除</el-button>
        </el-form-item>
      </el-form>
    </el-container>
    <el-dialog :visible.sync="windowVisible" :append-to-body="true">
      <ActivityWindow v-if="windowVisible" ref="popWindow" :child-prop="parentData" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add_station">提交</el-button>
        <el-button @click="windowVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="windowVisible_edit" :append-to-body="true">
      <ActivityWindow v-if="windowVisible_edit" ref="popWindow" :child-prop="parentData" />
      <span slot="footer" class="dialog-footer">
        <el-button type="submit" @click="edit_station">提交</el-button>
        <el-button @click="windowVisible_edit = false">取消</el-button>
      </span>
    </el-dialog>
    <el-table ref="multipleTable" :data="view_station" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column label="省" prop="province" />
      <el-table-column label="市" prop="city" />
      <el-table-column label="县" prop="country" />
      <el-table-column label="街道" prop="street" />
      <el-table-column label="电话" prop="phone" />
      <el-table-column label="驿站名称" prop="stationName" />
      <el-table-column label="管理员" prop="stationManager" />
      <el-table-column label="管理员电话" prop="managerPhone" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button @click.native.prevent="onOpenDetailDrawer(scope.$index)" type="text" size="small">
                详情
            </el-button> -->
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
import { queryList, addStation, editStation, deleteoneStation, deletemanyStation } from '@/api/station'
export default {
  // import引入组件才能使用

  components: {
    ActivityWindow
  },
  props: {},
  data() {
    return {
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
        if (response.data == '删除失败') {
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
      let phone = ''; let street = ''; let city = ''; let province = ''; let country = ''
      this.select_station = this.total_station
      // if(this. queryList.id != ""){
      //   id = this. queryList.id
      //   this.select_station = this.select_station.filter(function(select_station){
      //       return select_station.id == id
      //     })
      // }
      if (this.queryList.province != '') {
        province = this.queryList.province
        this.select_station = this.select_station.filter(function(select_station) {
          return select_station.province.includes(province)
        })
      }
      if (this.queryList.city != '') {
        city = this.queryList.city
        this.select_station = this.select_station.filter(function(select_station) {
          return select_station.city.includes(city)
        })
      }
      if (this.queryList.country != '') {
        country = this.queryList.country
        this.select_station = this.select_station.filter(function(select_station) {
          return select_station.country.includes(country)
        })
      }
      if (this.queryList.phone != '') {
        phone = this.queryList.phone
        this.select_station = this.select_station.filter(function(select_station) {
          return select_station.phone.includes(phone)
        })
      }
      if (this.queryList.street != '') {
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
