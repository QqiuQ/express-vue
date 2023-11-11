<template>
    <div>
      <el-container>
        <el-form :inline="true" :model=" queryList" label-width="68px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model=" queryList.name" placeholder="请输入姓名" clearable @input="SearchEvent" />
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-input v-model=" queryList.sex" placeholder="请输入性别" clearable @input="SearchEvent" />
          </el-form-item>
          <!-- <el-form-item label="在职" prop="status">
            <el-input v-model=" queryList.status" placeholder="是否在职" clearable @input="SearchEvent" />
          </el-form-item> -->
          <el-form-item label="电话" prop="phone">
            <el-input v-model=" queryList.phone" placeholder="电话" clearable @input="SearchEvent" />
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-input v-model=" queryList.role" placeholder="角色" clearable @input="SearchEvent" />
          </el-form-item>
          <el-form-item label="住址" prop="address">
            <el-input v-model=" queryList.address" placeholder="住址" clearable @input="SearchEvent" />
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" @click="addInfo()">添加快递员</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
            <!-- <el-button @click="deleteInfo()">批量删除</el-button> -->
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
        <ActivityWindow1 v-if="windowVisible_edit" ref="popWindow" :child-prop="parentData" />
        <span slot="footer" class="dialog-footer">
          <el-button type="submit" @click="edit_station">提交</el-button>
          <el-button @click="windowVisible_edit = false">取消</el-button>
        </span>
      </el-dialog>
      <el-table ref="multipleTable" :data="view_station" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="姓名" prop="name" />
        <el-table-column label="性别" prop="sex" ><template slot-scope="scope">
            <span v-if="scope.row.sex === 0">女</span>
            <span v-else-if="scope.row.sex === 1">男</span>
            <span v-else>未知</span>
        </template></el-table-column>
        <el-table-column label="电话" prop="phone" />
        <el-table-column label="角色" prop="role" />
        <el-table-column label="住址" prop="address" />
        <!-- <el-table-column label="在职" prop="status" /> -->
        <el-table-column label="入职时间" prop="createTime" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button @click.native.prevent="onOpenDetailDrawer(scope.$index)" type="text" size="small">
                  详情
              </el-button> -->
            <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.$row)">
              修改
            </el-button>
            <el-button type="text" size="small" @click="delete_one(scope.$index, scope.$row)">
              撤销快递员
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
  
  import ActivityWindow1 from './ActivityWindow1'
  import { queryList, queryStation, addStationemployee, editStation, deleteoneStation, deletemanyStation } from '@/api/deliveryStation'
  export default {
    // import引入组件才能使用
  
    components: {
      
      ActivityWindow1
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
          id: '',
          name: '',
          sex: '',
          status: '',
          role:'',
          phone: '',
          createTime:''
        },
        station:[],
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
      async delete_one(index, row) {
        try {
            await deleteoneStation(this.view_station[index].employeeId);
            console.log("deletewancheng")
            const response = await queryList(this.station.id);
            console.log("response.data", response.data);
            this.select_station = response.data;
            this.total_station = response.data;
            this.view_station = this.total_station.slice(0, this.pages.pageSize);
            this.pages.totalData = this.total_station.length;
        } catch (error) {
            console.error(error);
        }
        },
    addInfo() {
        this.$prompt('请输入快递员id', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
        }).then(({ value }) => {
            return addStationemployee(value, this.station.id);
        }).then(() => {
            return queryList(this.station.id);
        }).then(response => {
            console.log(response.data);
            this.select_station = response.data;
            this.total_station = response.data;
            this.view_station = this.total_station.slice(0, this.pages.pageSize);
            this.pages.totalData = this.total_station.length;
        }).catch(() => {
            this.$message({
            type: 'info',
            message: '取消输入'
            });
        });
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
        let phone = ''; let createTime = ''; let sex = ''; let name = ''; let status = '',role=''
        this.select_station = this.total_station
        if(this. queryList.role != ""){
            role = this. queryList.role
          this.select_station = this.select_station.filter(function(select_station){
              return select_station.role == role
            })
        }
        if (this.queryList.name !== '') {
          name = this.queryList.name
          this.select_station = this.select_station.filter(function(select_station) {
            return select_station.name.includes(name) && select_station.name
          })
        }
        if (this.queryList.sex !== '') {
          sex = this.queryList.sex
          if(sex === '女')sex = 0
          else if(sex === '男') sex = 1
          else sex = 2
          this.select_station = this.select_station.filter(function(select_station) {
            return select_station.sex.includes(sex) && select_station.sex
          })
        }
        if (this.queryList.status !== '') {
          status = this.queryList.status
          this.select_station = this.select_station.filter(function(select_station) {
            return select_station.status.includes(status) && select_station.status
          })
        }
        if (this.queryList.phone !== '') {
          phone = this.queryList.phone
          this.select_station = this.select_station.filter(function(select_station) {
            return select_station.phone.includes(phone) && select_station.phone
          })
        }
        if (this.queryList.createTime !== '') {
            createTime = this.queryList.createTime
          this.select_station = this.select_station.filter(function(select_station) {
            return select_station.createTime.includes(createTime) && select_station.createTime
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
        console.log(this.$store.getters.accountId);

        queryStation(this.$store.getters.accountId)
            .then(stationResponse => {
            this.station = stationResponse.data;
            console.log("station.id",this.station.id)
            return queryList(this.station.id); // 返回 Promise 对象
            })
            .then(listResponse => {
            console.log(listResponse.data);
            this.select_station = listResponse.data;
            this.total_station = listResponse.data;
            this.view_station = this.total_station.slice(0, this.pages.pageSize);
            this.pages.totalData = this.total_station.length;
            })
            .catch(error => {
            // 处理错误
            });
        }
  
    }
  }
  </script>
  