<template>
  <div class="app-container">
    <Search placeholder="请输入事件标题" @handleSearch="handleSearch" />
    <CommonTable
      :data="list"
      :loading="listLoading"
      :total="total"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    >
      <el-table-column prop="title" label="事件标题" align="center" />
      <el-table-column prop="location" label="事发地点" width="110" align="center" />
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">
            {{ statusNoteMap[scope.row.status] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="submit_time" label="提交时间" width="150">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ new Date(scope.row.submit_time).toLocaleString() }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="handler_time" label="处理时间" width="150">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ new Date(scope.row.handler_time).toLocaleString() }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleAudit(scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </CommonTable>
    <el-dialog
      title="事件审核"
      :visible.sync="dialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <el-form ref="eventForm" :model="eventForm" status-icon :rules="rules" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="eventForm.title" :disabled="true" autocomplete="off" />
        </el-form-item>
        <el-form-item label="事件描述" prop="description">
          <el-input v-model="eventForm.description" :disabled="true" autocomplete="off" />
        </el-form-item>
        <el-form-item label="位置" prop="location">
          <el-input v-model="eventForm.location" :disabled="true" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <!-- <el-input v-model.number="eventForm.status" /> -->
          <el-select
            v-model.number="eventForm.status"
            placeholder="请选择状态"
            :disabled="true"
          >
            <el-option
              v-for="item in statusList"
              :key="item.status"
              :label="item.label"
              :value="item.status"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="管道" prop="pipeline_id">
          <!-- <el-input v-model.number="eventForm.pipeline_id" /> -->
          <el-select
            v-model.number="eventForm.pipeline_id"
            placeholder="请选择管道"
            :disabled="true"
          >
            <el-option
              v-for="item in pipelineList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="事件级别" prop="level">
          <!-- <el-input v-model.number="eventForm.level" /> -->
          <el-select v-model.number="eventForm.level" placeholder="请选择级别" :disabled="true">
            <el-option
              v-for="item in levelList"
              :key="item.level"
              :label="item.label"
              :value="item.level"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="处理人员" prop="handler_id">
          <!-- <el-input v-model.number="eventForm.handler_id" /> -->
          <el-select
            v-model.number="eventForm.handler_id"
            placeholder="请指派处理人员"
            :disabled="true"
          >
            <el-option
              v-for="item in personnelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="处理时间" prop="handler_time">
          <el-input v-model="eventForm.handler_time" :disabled="true" />
        </el-form-item>
        <el-form-item label="任务级别" prop="level">
          <!-- <el-input v-model="taskForm.level" :disabled="onlyShow" /> -->
          <el-select v-model.number="eventForm.level" placeholder="请选择任务级别" :disabled="true">
            <el-option
              v-for="item in levelList"
              :key="item.level"
              :label="item.label"
              :value="item.level"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="审核意见" prop="option">
          <el-input v-model="eventForm.option" type="textarea" :rows="4" placeholder="请输入意见" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAuditList, createAudit } from '@/api/audit'
import { getPersonnelList } from '@/api/personnel'
import { getPipelineList } from '@/api/pipeline'
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
      personnelList: [{ id: '', name: '' }],
      pipelineList: [{ id: '', name: '' }],
      levelList: [{ level: 1, label: '一般' }, { level: 2, label: '重要' }, { level: 3, label: '紧急' }],
      statusList: [{ status: 0, label: '已完成' }, { status: 1, label: '待指派' }, { status: 2, label: '执行中' }, { status: 3, label: '已暂停' }],
      total: 0,
      listLoading: false,
      dialogVisible: false,
      statusNoteMap: {
        0: '已完成',
        1: '待指派',
        2: '执行中',
        3: '已暂停'
      },
      eventForm: {
        id: '',
        title: '',
        description: '',
        location: '',
        status: '',
        handler_id: '',
        handler_time: '',
        manager_id: '',
        pipeline_id: '',
        level: '',
        option: ''
      },
      rules: {
        title: [],
        description: [],
        location: [],
        status: [],
        handler_id: [],
        handler_time: [],
        manager_id: [],
        pipeline_id: [],
        level: [],
        option: [{ required: true }]
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
    this.fetchPersonnel()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const res = await getAuditList(this.params)
      if (this.$$isResponseSuccess(res)) {
        this.list = res.data.items
        this.total = res.data.total
      }
      this.listLoading = false
    },
    async fetchPersonnel() {
      const personnel = await getPersonnelList()
      const pipeline = await getPipelineList()

      if (this.$$isResponseSuccess(personnel) && this.$$isResponseSuccess(pipeline)) {
        this.personnelList = personnel.data.items
        this.pipelineList = pipeline.data.items
      }
    },
    handleSearch(search) {
      this.searchTitle = search
      console.log(search)
    },
    getPersonnelName(handler_id) {
      const handler = this.personnelList.find(item => item.id === handler_id)
      return handler?.name
    },
    handleCancel() {
      this.eventForm = this.$options.data.call(this).eventForm
      this.$refs['eventForm'].resetFields()
      this.dialogVisible = false
    },
    handleSubmit() {
      const that = this
      this.$refs['eventForm'].validate(async valid => {
        if (valid) {
          const params = {
            event_id: this.eventForm.id,
            option: this.eventForm.option
          }
          const res = await createAudit(params)
          if (this.$$isResponseSuccess(res)) {
            that.dialogVisible = false
            this.fetchData()
            this.$message.success('事件审核提交成功')
          } else {
            this.$message.error('事件审核提交失败')
          }
        }
      })
    },

    handleCurrentChange(pageNo) {
      this.params.start = (pageNo - 1) * this.params.limit
      this.fetchData()
    },
    handleSizeChange(limit) {
      this.params.limit = limit
    },
    handleAudit(item) {
      for (const key of Object.keys(this.eventForm)) {
        console.log(key)
        this.eventForm[key] = item[key]
      }
      this.dialogVisible = true
    }
  }
}
</script>

