<template>

</template>

<script>
import PanThumb from '@/components/PanThumb'

export default {
  components: { PanThumb },
  props: {
    account: null
  },
  created() {
    this.accountType = this.$store.getters.accountType
    // window.alert(this.isEmployee())
  },
  data() {
    return {

    }
  },
  methods: {

  }

}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.account-profile {
  .account-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .account-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .account-follow {
    padding-top: 20px;
  }
}

.account-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .account-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .account-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
