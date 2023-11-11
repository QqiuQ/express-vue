<template>
    <div>
        <aside>
      <a target="_blank">快递揽件
      </a>
    </aside>
        <el-container>
      <el-form :inline="true" :model=" queryList" label-width="68px">
        <el-form-item label="寄件地址">
          <el-input v-model=" queryList.senderAddress" placeholder="请输入寄件地址" clearable @input="SearchEvent" />
        </el-form-item>
        <el-form-item label="收件地址">
          <el-input v-model=" queryList.recipientAddress" placeholder="请输入收件地址" clearable @input="SearchEvent" />
        </el-form-item>
      </el-form>
        
    </el-container>
        <el-table ref="multipleTable" :data="view_Data" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column label="物流单号" prop="expressNumber" />
            <el-table-column label="寄件人姓名" prop="senderName" />
            <el-table-column label="寄件地址" prop="senderAddress" />
            <el-table-column label="收件人姓名" prop="recipientName" />
            <el-table-column label="收货地址" prop="recipientAddress" />
            <el-table-column label="快递员" prop="courierName" />
            <el-table-column label="快递状态" prop="expressStatus" />
            <!-- <el-table-column label="管理员电话" prop="managerrecipient_address" /> -->
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click.native.prevent="onOpenDetailDrawer(scope.$index)">
                揽件
                </el-button>
            </template>

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
    import { regionData, codeToText } from 'element-china-area-data'
    import { queryList,expresser,change_status } from '@/api/deliveryCollect'
    export default {
    name: 'collect',
    data() {
        return {
        employee:{
            id:'',
            name:''
        },
        status:1,
        tableSight: false,
        options: regionData,
        locationPath: [],
        address: '',
        pages: {
            totalData: 0,
            currentPage: 1,
            pageSize: 5
        },
        tableData: [],
        select_Data:[],
        view_Data:[],
        queryList : {
            senderAddress:'',
            recipientAddress:'',
        }
        }
    },
    methods: {
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
            this.pages.currentPage = val
            const start = (this.pages.currentPage - 1) * this.pages.pageSize
            const end = start + this.pages.pageSize
            this.view_Data = this.select_Data.slice(start, end)
            console.log("view_Data",this.view_Data)
            this.pages.totalData = this.select_Data.length
        },
        handleLocChange() {
        
            console.log(this.locationPath[2])
        },
        handleAddChange() {
            console.log(this.address)
        },
        async onOpenDetailDrawer(index) {
            try {
                await this.$confirm('是否揽件？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                });

                await change_status(this.view_Data[index].id); // 等待 change_status 执行完

                const response = await queryList(this.status); // 等待 queryList 执行完
                this.tableData = response.data;
                this.select_Data = this.tableData;
                this.view_Data = this.select_Data.slice(0, this.pages.pageSize);
                this.pages.totalData = this.tableData.length;
            } catch (error) {
                this.$message({
                type: 'info',
                message: '已取消删除'
                });
            }
        },
        query() {
            console.log(this.$store.getters.accountId)
            this.employee.id = this.$store.getters.accountId
            expresser(this.$store.getters.accountId).then(response => {
                // this.tableData = response.data
                // this.view_Data = this.tableData.slice(0, this.pages.pageSize)
                this.employee.name = response.data.username
                // this.pages.totalData = this.tableData.length
            })
            queryList(this.status).then(response => {
                this.tableData = response.data
                this.select_Data = this.tableData
                this.view_Data = this.select_Data.slice(0, this.pages.pageSize)
                console.log("order_data",this.view_Data)
                this.pages.totalData = this.tableData.length
            })
            this.$message.success('查询成功')
        },
        SearchEvent() {
            let senderAddress = ''; let recipientAddress = '';
            this.select_Data = this.tableData
            if (this.queryList.senderAddress !== '') {
                senderAddress = this.queryList.senderAddress
                this.select_Data = this.select_Data.filter(function(select_Data) {
                return select_Data.senderAddress.includes(senderAddress) && select_Data.senderAddress
                })
            }
            if (this.queryList.recipientAddress !== '') {
                recipientAddress = this.queryList.recipientAddress
                this.select_Data = this.select_Data.filter(function(select_Data) {
                return select_Data.recipientAddress.includes(recipientAddress) && select_Data.recipientAddress
                })
            }
            this.pages.totalData = this.select_Data.length
            this.view_Data = this.select_Data.slice(0, 5)
            },
    },
    mounted() {
        this.query()
    },
    }
</script>

<style scoped>

</style>
