<template>
  <div class="app-container">
    <div class="clearfix fn-bmb">
      <span class="fn-pull-right">
        <el-button type="warning" @click="exportBatch"> 批量导出 </el-button>
      </span>
    </div>
    <Search placeholder="请输入事件标题" @handleSearch="handleSearch" />
    <CommonTable
      :data="list"
      :loading="listLoading"
      :total="total"
      @handleSelectionChange="handleSelectPersonnels"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    >
      <el-table-column fixed="left" type="selection" align="center" width="40" />
      <el-table-column prop="title" label="事件标题" width="180" align="center" />
      <el-table-column prop="description" label="事件描述" align="center" />
      <el-table-column prop="level" label="事件等级" width="80" align="center" />
      <el-table-column prop="location" label="事发地点" width="180" align="center" />
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">
            {{ statusNoteMap[scope.row.status] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="submit_time" label="提交时间" width="160">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ new Date(scope.row.submit_time).toLocaleString() }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="handler_time" label="处理时间" width="160">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ new Date(scope.row.handler_time).toLocaleString() }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="audit_option" label="审核意见" width="150" align="center" />
    </CommonTable>
  </div>
</template>

<script>
import { getRecordList } from '@/api/audit'
import { exportToExcel } from '@/utils/index.js'
import CommonTable from '@/components/Table/index.vue'
import Search from '@/components/Search/index.vue'

export default {
  components: {
    CommonTable,
    Search
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'danger', // 已完成
        1: '', // 待指派
        2: 'success', // 执行中
        3: 'info' // 已暂停
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: false,
      dialogVisible: false,
      selections: [],
      statusNoteMap: {
        0: '已完成',
        1: '待指派',
        2: '执行中',
        3: '已暂停'
      },
      params: {
        limit: 10,
        start: 0
      },
      searchTitle: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const res = await getRecordList(this.params)
      if (this.$$isResponseSuccess(res)) {
        this.list = res.data.items
        this.total = res.data.total
      }
      this.listLoading = false
    },
    handleSearch(search) {
      this.searchTitle = search
      console.log(search)
    },
    exportBatch() {
      exportToExcel(this.selections.map(item => {
        const newItem = JSON.parse(JSON.stringify(item))
        delete newItem.id
        delete newItem.event_id
        newItem.status = this.statusNoteMap[newItem.status]
        return newItem
      }), ['事件标题', '事件描述', '事件等级', '事发地点', '状态', '提交时间', '处理时间', '审核意见'], '审核记录列表' + Date.now())
    },
    handleSelectPersonnels(selection) {
      this.selections = [...selection]
    },
    handleCurrentChange(pageNo) {
      this.params.start = (pageNo - 1) * this.params.limit
      this.fetchData()
    },
    handleSizeChange(limit) {
      this.params.limit = limit
    }
  }
}
</script>

