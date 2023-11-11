<!--一个组件多用，添加/编辑弹窗-->
<template>
  <div class="mycontainer">
    <el-form ref="form" :model="form" label-width="80px">
      <div style="display:flex;justify-content: space-between;">
        <el-form-item label="姓名">
          <el-input v-model="form.name"  required />
        </el-form-item>
        <el-form-item label="性别" label-width="100px">
        <el-select v-model="form.sex">
          <el-option label="女" value="0"></el-option>
          <el-option label="男" value="1"></el-option>
          <el-option label="未知" value="2"></el-option>
        </el-select>
      </el-form-item>
      </div>
      <div style="display:flex;justify-content: space-between;">
        <el-form-item label="电话">
          <el-input v-model="form.phone"  required />
        </el-form-item>
        <el-form-item label="角色" label-width="100px">
          <el-input v-model="form.role"  />
        </el-form-item>
      </div>
      <div style="display:flex;justify-content: space-between;">
        <el-form-item label="在职">
          <el-input v-model="form.status"  required />
        </el-form-item>
        <el-form-item label="入职时间" label-width="100px">
          <el-input v-model="form.createTime"  />
        </el-form-item>
      </div>
      <el-form-item label="住址">
        <el-input v-model="form.senderAddress" />
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
import { data } from '@/assets/js/china_address.js'

export default {
  name: '',
  components: {},
  props: ['childProp'],
  data() {
    return {
      select_data: {
        province: '',
        city: '',
        country: ''
      },
      jsonData: data,
      form: {
        name: '',
        phone: '',
        role: '',
        sex: '',
        status: '',
        createTime: '',
        address:'',
      }
    }
  },
  created() {
    console.log('ActivityWindow')
    // this._getJsonData()
    if (this.childProp != null) {
      if (this.childProp.length != 0) {
        this.form = this.childProp
      } else {
        console.log('1111')
      }
    }
  },
  methods: {
    fromData() {
      return this.form
    }
  }

}
</script>
<style>
    .mycontainer {
        display: flex;
        flex-direction: column;
        justify-content: space-around
    }
</style>
