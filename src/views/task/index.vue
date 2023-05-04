<template>
  <div class="app-container">
    <div class="clearfix fn-bmb">
      <el-button class="fn-pull-left" type="danger" @click="handleDeleteBatch">批量删除</el-button>
      <span class="fn-pull-right">
        <el-button type="primary" @click="addTask"> 新增 </el-button>
        <el-button type="success" @click="importBatch"> 批量导入 </el-button>
        <el-button type="warning" @click="exportBatch"> 批量导出 </el-button>
      </span>
    </div>
    <Search placeholder="请输入姓名" @handleSearch="handleSearch" />
    <CommonTable
      :data="list"
      :total="total"
      :loading="listLoading"
      @handleSelectionChange="handleSelectEvents"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange">
      <el-table-column fixed="left" type="selection" align="center" width="40" />
      <el-table-column prop="title" align label="任务标题" />
      <!-- <el-table-column prop="title" align label="事件名" /> -->
      <el-table-column prop="description" align label="描述" />
      <el-table-column prop="address" align label="任务地点" />
      <el-table-column prop="executor" align label="执行者" />
      <el-table-column prop="grade" align label="任务等级">
        <template slot-scope="scope">
          {{ taskMap[scope.row.grade] }}
        </template>
      </el-table-column>
      <el-table-column prop="estimateTime" align label="任务限时" />
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleShow(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button class="fn-delete" type="text" size="small" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </CommonTable>
  </div>
</template>

<script>
import { getTaskList, createTask } from '@/api/task'

import CommonTable from '@/components/Table/index.vue'
import Search from '@/components/Search/index.vue'

export default {
  components: {
    CommonTable,
    Search
  },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: false,
      searchTitle: '',
      selections: [],
      params: {
        limit: 10,
        start: 0
      },
      taskMap: {
        1: '一级',
        2: '二级',
        3: '三级',
        4: '四级'
      },
      taskForm: {
        event_id: '',
        title: '',
        description: '',
        address: '',
        executor: '', // 执行者
        grade: '',
        estimateTime: '' // 预计用时
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const res = await getTaskList(this.params)
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
    addTask() {
      createTask(this.personForm)
    },
    importBatch() {

    },
    exportBatch() {

    },
    handleSelectEvents(selection) {
      this.selections = [...selection]
    },
    handleCurrentChange(pageNo) {
      console.log(pageNo)
    },
    handleSizeChange(limit) {
      console.log(limit)
    },
    handleShow(item) {
      console.log(item)
    },
    handleEdit(item) {
      console.log(item)
    },
    handleDelete(item) {
      console.log(item)
    },
    handleDeleteBatch() {
      console.log(this.selections)
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
