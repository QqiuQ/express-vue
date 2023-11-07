<template>
    <div class="app-container">
        <div class="filter-container">
            <el-form :inline="true" :model="user" class="demo-form-inline">
                <el-form-item label="用户名">
                    <el-input v-model="user.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="user.nickname" placeholder="昵称"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="user.email" placeholder="邮箱"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="user.phone" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="user.sex" clearable placeholder="请选择" @change="onSexChanged">
                        <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onQuery">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-button primary @click="onAdd">新增</el-button>
        </div>
        <el-table :data="userList" style="width: 100%" max-height="250">
            <el-table-column fixed prop="username" label="用户名">
            </el-table-column>
            <el-table-column fixed prop="nickname" label="昵称">
            </el-table-column>
            <el-table-column fixed prop="avatar" label="头像">
            </el-table-column>
            <el-table-column fixed prop="sex" label="性别">
            </el-table-column>
            <el-table-column fixed prop="email" label="邮箱">
            </el-table-column>
            <el-table-column fixed prop="phone" label="手机号">
            </el-table-column>
            <el-table-column fixed prop="birthday" label="生日">
            </el-table-column>
            <el-table-column fixed prop="lastLoginTime" label="上次登录时间">
            </el-table-column>
            <el-table-column fixed prop="accountStatus" label="账户状态">
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                    <el-button @click.native.prevent="onEdit(scope.$index)" type="text" size="small">
                        修改
                    </el-button>

                    <el-button type="text" size="small">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>


        <!-- edit dialog -->
        <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="30%">
            <!-- <el-form :label-position="left" label-width="80px" :model="rowUser">
                <el-form-item label="用户名">
                    <el-input v-model="rowUser.username"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="rowUser.nickname"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="rowUser.sex" clearable placeholder="请选择" @change="onEditSexChange">
                        <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="rowUser.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="rowUser.phone"></el-input>
                </el-form-item>
                <el-form-item label="生日">
                    <el-date-picker v-model="rowUser.birthday" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item> -->

            </el-form>
        </el-dialog>
    </div>

</template>
<script>
    import axios from 'axios'
    import { fetchList, queryUsers, queryList } from '@/api/user2'
    export default {

        data() {
            return {
                editDialogVisible: false,
                sexOptions: [
                    { value: 0, label: '女' },
                    { value: 1, label: '男' },
                    { value: 2, label: '未知' }
                ],
                rowUser: null,
                listLoading: false,
                userList: null,
                page: 1,
                limit: 20,
                query: {
                    page: 1,
                    limit: 20
                },
                pageParams: {
                    page: 1,
                    limit: 20
                },
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
                }

            }
        },
        created() {
            this.queryList()
        },
        methods: {
            onEditSexChange(val) {
                if (rowUser != null) {
                    rowUser.sex = val
                }
            },
            onEdit(index) {
                this.editDialogVisible = true
                // show info
                // deep copy
                this.rowUser = JSON.parse(JSON.stringify(this.userList[index]))

                console.log(this.rowUser)
            },
            getList() {
                console.log("getList")
                fetchList(this.page, this.limit).then(response => {
                    console.log("fetchList")
                })
            },
            // queryList() {
            //     queryUsers(this.pageParams, this.user).then(response => {
            //         console.log(this.pageParams)
            //     })
            // }
            queryList() {
                queryList(this.user).then(response => {
                    console.log(response)
                    // response.data
                    this.userList = response.data
                })
            },
            onQuery(user) {
                queryList(this.user).then(response => {
                    console.log(response)
                    // response.data
                    this.userList = response.data
                })
            },
            onSexChanged(val) {
                this.user.sex = val
            }

        }
    }
</script>