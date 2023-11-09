<template>
  <el-container style="padding: 50px; height: 84vh; display: flex; flex-direction: column">
    <div>
      <el-input v-model="id" style="width: 200px" placeholder="查询快递单号" />
      <el-input v-model="sender" style="width: 200px; margin: 0 5px" placeholder="查询寄件人" />
      <el-button type="primary">查询</el-button>
      <el-button type="info" @click="reset">重置</el-button>
    </div>
    <div style="height: 40px" />
    <el-table :data="tableData">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column prop="id" label="快递单号" width="70" align="center" />
      <el-table-column prop="receiveTime" label="签收时间" />
      <el-table-column prop="name" label="寄件人" />
      <el-table-column prop="phone" label="收件人" />
      <el-table-column prop="email" label="寄送城市" />
      <el-table-column prop="address" label="收件城市" />
      <el-table-column prop="role" label="快递状态" />
      <el-table-column label="操作" align="center" width="180" />
    </el-table>
  </el-container>
</template>

<script>
export default {
  name: 'Received',
  data() {
    return {
      id: '',
      sender: '',
      tableData: []
    }
  },
  methods: {
    reset() {
      this.id = ''
      this.sender = ''
    }
  }
}
</script>

<style scoped>

</style>
