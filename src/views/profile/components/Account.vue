<template>

</template>

<script>
export default {
  props: {
    account: null,
    isEmployee: null
  },
  data() {
    return {
    }
  },
  methods: {
    submit() {
      this.$message({
        message: 'account information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>
