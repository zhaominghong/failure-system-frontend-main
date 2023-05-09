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
      <el-table-column prop="title" align="center" label="任务标题" />
      <!-- <el-table-column prop="title" align="center" label="任务名" /> -->
      <el-table-column prop="description" align="center" label="描述" />
      <el-table-column prop="event_id" align="center" label="事件">
        <template slot-scope="scope">
          {{ getEventName(scope.row.event_id) }}
        </template>
      </el-table-column>
      <el-table-column prop="handler_id" align="center" label="执行者">
        <template slot-scope="scope">
          {{ getPersonnelName(scope.row.handler_id) }}
        </template>
      </el-table-column>
      <el-table-column prop="level" align="center" label="任务等级">
        <template slot-scope="scope">
          {{ taskMap[scope.row.level] }}
        </template>
      </el-table-column>
      <el-table-column prop="status" align="center" label="任务状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">
            {{ statusNoteMap[scope.row.status] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="created_time" align="center" label="创建时间" width="150">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ new Date(scope.row.created_time).toLocaleString() }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updated_time" align="center" label="更新时间" width="150">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ new Date(scope.row.updated_time).toLocaleString() }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleShow(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="确认删除该任务吗" @onConfirm="handleDelete(scope.row)">
            <el-button slot="reference" class="fn-delete fn-bml" type="text" size="small">
              删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </CommonTable>
    <el-dialog title="新增任务" :visible.sync="dialogVisible" :show-close="false" width="30%">
      <el-form ref="taskForm" :model="taskForm" status-icon :rules="rules" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="taskForm.title" :disabled="onlyShow" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="taskForm.description" :disabled="onlyShow" />
        </el-form-item>
        <el-form-item label="事件" prop="event_id">
          <!-- <el-input v-model="taskForm.identity" :disabled="onlyShow" /> -->
          <el-select
            v-model.number="taskForm.event_id"
            placeholder="请选择事件"
            :disabled="onlyShow">
            <el-option
              v-for="item in eventList"
              :key="item.id"
              :label="item.title"
              :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="处理人员" prop="handler_id">
          <!-- <el-input v-model="taskForm.identity" :disabled="onlyShow" /> -->
          <el-select
            v-model.number="taskForm.handler_id"
            placeholder="请选择处理人员"
            :disabled="onlyShow">
            <el-option
              v-for="item in personnelList"
              :key="item.id"
              :label="item.name"
              :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="级别" prop="level">
          <!-- <el-input v-model="taskForm.level" :disabled="onlyShow" /> -->
          <el-select v-model.number="taskForm.level" placeholder="请选择级别" :disabled="onlyShow">
            <el-option
              v-for="item in levelList"
              :key="item.level"
              :label="item.label"
              :value="item.level" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <!-- <el-input v-model="taskForm.status" :disabled="onlyShow" /> -->
          <el-select v-model.number="taskForm.status" placeholder="请选择状态" :disabled="onlyShow">
            <el-option
              v-for="item in statusList"
              :key="item.status"
              :label="item.label"
              :value="item.status" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button v-show="!onlyShow" type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getTaskList, createTask, deleteTask, batchDeleteTask } from '@/api/task'
import { getPersonnelList } from '@/api/personnel'
import { getEventList } from '@/api/event'

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
      onlyShow: false,
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
      statusNoteMap: {
        0: '已完成',
        1: '待指派',
        2: '执行中',
        3: '已暂停'
      },
      personnelList: [{ id: '', name: '' }],
      eventList: [{ id: '', title: '' }],
      statusList: [{ status: 0, label: '已完成' }, { status: 1, label: '待指派' }, { status: 2, label: '执行中' }, { status: 3, label: '已暂停' }],
      levelList: [{ level: 1, label: '一般' }, { level: 2, label: '重要' }, { level: 3, label: '紧急' }],
      taskForm: {
        event_id: '',
        title: '',
        description: '',
        handler_id: '',
        level: '',
        status: ''
      },
      rules: {
        name: [{ required: true }],
        identity: [{ required: true }],
        identityNo: [{ required: true }],
        telePhoneNo: [{ required: true }],
        email: [],
        avatar: []
      }
    }
  },
  created() {
    this.fetchData()
    this.fetchPersonnel()
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
    async fetchPersonnel() {
      const personnel = await getPersonnelList()
      const event = await getEventList()

      if (this.$$isResponseSuccess(personnel) && this.$$isResponseSuccess(event)) {
        this.personnelList = personnel.data.items
        this.eventList = event.data.items
      }
    },
    handleSearch(search) {
      this.searchTitle = search
      console.log(search)
    },
    addTask() {
      this.dialogVisible = true
    },
    importBatch() {

    },
    exportBatch() {

    },
    getPersonnelName(handler_id) {
      const handler = this.personnelList.find(item => item.id === handler_id)
      return handler?.name
    },
    getEventName(event_id) {
      const event = this.eventList.find(item => item.id === event_id)
      return event?.title
    },
    handleCancel() {
      this.taskForm = this.$options.data.call(this).taskForm
      this.$refs['taskForm'].resetFields()
      this.dialogVisible = false
      this.onlyShow = false
    },
    handleSubmit() {
      const that = this
      this.$refs['taskForm'].validate(async valid => {
        if (valid) {
          const res = await createTask(this.taskForm)
          if (this.$$isResponseSuccess(res)) {
            that.dialogVisible = false
            this.fetchData()
            this.$message.success('新增任务成功')
          } else {
            this.$message.error('新增任务失败')
          }
        }
      })
    },
    handleSelectEvents(selection) {
      this.selections = [...selection]
    },
    handleCurrentChange(pageNo) {
      this.params.start = pageNo * this.params.limit
      this.fetchData()
    },
    handleSizeChange(limit) {
      this.params.limit = limit
    },
    handleShow(item) {
      this.onlyShow = true
      for (const key of Object.keys(this.taskForm)) {
        this.taskForm[key] = item[key]
      }
      this.dialogVisible = true
    },
    handleEdit(item) {
      for (const key of Object.keys(this.taskForm)) {
        this.taskForm[key] = item[key]
      }
      this.dialogVisible = true
    },
    async handleDelete(item) {
      const res = await deleteTask({ id: item.id })
      if (this.$$isResponseSuccess(res)) {
        this.$message.success('任务删除成功')
        this.fetchData()
      } else {
        this.$message.error('任务删除失败')
      }
    },
    async handleDeleteBatch() {
      const ids = this.selections.map(item => item.id)
      const res = await batchDeleteTask({ ids: ids })
      if (this.$$isResponseSuccess(res)) {
        this.$message.success('任务批量删除成功')
        this.fetchData()
      } else {
        this.$message.error('任务批量删除失败')
      }
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
