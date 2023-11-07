<template>
    <div class="app-container">
        <div class="filter-container">
            <el-button @click.native="getList">获取列表</el-button>
            <el-button @click.native="queryList">条件查询</el-button>
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
                    <el-button @click.native.prevent="editRow(scope.$index, tableData)" type="text" size="small">
                        修改
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import axios from 'axios'
    import { fetchList, queryUsers, queryList } from '@/api/user2'
    export default {

        data() {
            return {
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
            // this.getList()
        },
        methods: {
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
                    this.userList=response.data
                })
            }
        }
    }
</script>