<template>
  <div class="fn-flex fn-bmb">
    <el-input v-model="value" :placeholder="placeholder" />
    <el-button class="fn-bml" type="primary" @click="handleSearch">搜索</el-button>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    placeholder: {
      type: String,
      default: '请输入搜索内容'
    }
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    handleSearch() {
      this.$emit('handleSearch', this.value)
    }
  }
}
</script>

<style scoped></style>
