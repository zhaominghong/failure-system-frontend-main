<template>
  <div id="commonTable">
    <el-table
      v-loading="loading"
      border
      fit
      :data="data"
      :max-height="maxHeight"
      element-loading-text="Loading"
      tooltip-effect="light"
      highlight-current-row
      @selection-change="handleSelectionChange">
      <slot />
    </el-table>
    <el-pagination
      style="text-align: center;margin:20px 0;"
      :current-page="pager.pageNo"
      :page-size="pager.limit"
      :page-sizes="pager.sizes"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    total: {
      type: Number,
      default: null
    },
    pager: {
      type: Object,
      default: () => {
        return {
          pageNo: 1,
          limit: 10,
          sizes: [10, 20, 30, 40, 50, 100]
        }
      }
    },
    maxHeight: {
      type: Number,
      default: 2000
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val)
    },
    handleSizeChange(val) {
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val)
    }
  }
}
</script>
