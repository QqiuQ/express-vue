<template>
  <el-container style="padding: 50px; height: 84vh; display: flex; flex-direction: column">
    <div>
      <el-input v-model="name" style="width: 200px; margin: 0 5px" placeholder="查询联系人" />
      <el-button type="primary">查询</el-button>
    </div>
    <div style="height: 40px" />
    <el-table :data="tableData">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column prop="name" label="联系人" align="center" style="display: flex; flex-direction: column;" />
      <el-table-column prop="address" label="地址" />
      <el-table-column label="操作" align="center" width="180" />
    </el-table>
  </el-container>
</template>

<script>
export default {
  name: 'AddressBooks',
  data() {
    return {
      name: '',
      tableData: []
    }
  }
}
</script>

<style scoped>

</style>
