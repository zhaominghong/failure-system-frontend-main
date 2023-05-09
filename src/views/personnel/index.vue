<template>
  <div class="app-container">
    <div class="clearfix fn-bmb">
      <el-button class="fn-pull-left" type="danger" @click="handleDeleteBatch">批量删除</el-button>
      <span class="fn-pull-right">
        <el-button type="primary" @click="addPerson"> 新增 </el-button>
        <el-button type="success" @click="importBatch"> 批量导入 </el-button>
        <el-button type="warning" @click="exportBatch"> 批量导出 </el-button>
      </span>
    </div>
    <Search placeholder="请输入姓名" @handleSearch="handleSearch" />
    <CommonTable
      :data="list"
      :total="total"
      :loading="listLoading"
      @handleSelectionChange="handleSelectPersonnels"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange">
      <el-table-column fixed="left" type="selection" align="center" width="40" />
      <el-table-column prop="name" align="center" label="姓名" />
      <el-table-column align="center" label="身份">
        <template slot-scope="scope">
          {{ personnelMap[scope.row.identity] }}
        </template>
      </el-table-column>
      <el-table-column prop="identityNo" align="center" label="身份证号" />
      <el-table-column prop="telePhoneNo" align="center" label="电话号码" />
      <el-table-column prop="email" align="center" label="邮箱" />
      <el-table-column fixed="right" align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleShow(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="确认删除该人员吗" @onConfirm="handleDelete(scope.row)">
            <el-button slot="reference" class="fn-delete fn-bml" type="text" size="small">
              删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </CommonTable>
    <el-dialog title="新增人员" :visible.sync="dialogVisible" :show-close="false" width="30%">
      <el-form
        ref="personnelForm"
        :model="personnelForm"
        status-icon
        :rules="rules"
        label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="personnelForm.name" :disabled="onlyShow" />
        </el-form-item>
        <el-form-item label="身份" prop="identity">
          <!-- <el-input v-model="personnelForm.identity" :disabled="onlyShow" /> -->
          <el-select
            v-model.number="personnelForm.identity"
            placeholder="请选择身份"
            :disabled="onlyShow">
            <el-option
              v-for="item in identityList"
              :key="item.indentity"
              :label="item.label"
              :value="item.indentity" />
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号" prop="identityNo">
          <el-input v-model="personnelForm.identityNo" :disabled="onlyShow" />
        </el-form-item>
        <el-form-item label="电话号码" prop="telePhoneNo">
          <el-input v-model="personnelForm.telePhoneNo" :disabled="onlyShow" />
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model="personnelForm.email" :disabled="onlyShow" />
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-input v-model="personnelForm.avatar" :disabled="onlyShow" />
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
import { getPersonnelList, createPersonnel, deletePersonnel, batchDeletePersonnel } from '@/api/personnel'

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
      dialogVisible: false,
      onlyShow: false,
      searchName: '',
      selections: [],
      params: {
        limit: 10,
        start: 0
      },
      personnelMap: {
        1: '巡线人员',
        2: '抢险人员'
      },
      identityList: [{ indentity: 1, label: '巡线人员' }, { indentity: 2, label: '抢险人员' }],
      personnelForm: {
        name: '',
        identity: '',
        identityNo: '',
        telePhoneNo: '',
        email: '',
        avatar: ''
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
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const res = await getPersonnelList(this.params)
      if (this.$$isResponseSuccess(res)) {
        this.list = res.data.items
        this.total = res.data.total
      }
      this.listLoading = false
    },
    handleSearch(search) {
      this.searchName = search
      console.log(search)
    },
    addPerson() {
      this.dialogVisible = true
    },
    importBatch() {

    },
    exportBatch() {

    },
    handleCancel() {
      this.personnelForm = this.$options.data.call(this).personnelForm
      this.$refs['personnelForm'].resetFields()
      this.dialogVisible = false
      this.onlyShow = false
    },
    handleSubmit() {
      const that = this
      this.$refs['personnelForm'].validate(async valid => {
        if (valid) {
          const res = await createPersonnel(this.personnelForm)
          if (this.$$isResponseSuccess(res)) {
            that.dialogVisible = false
            this.fetchData()
            this.$messsage.success('新增人员成功')
          } else {
            this.$message.error('新增人员失败')
          }
        }
      })
    },
    handleSelectPersonnels(selection) {
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
      for (const key of Object.keys(this.personnelForm)) {
        this.personnelForm[key] = item[key]
      }
      this.dialogVisible = true
    },
    handleEdit(item) {
      for (const key of Object.keys(this.personnelForm)) {
        this.personnelForm[key] = item[key]
      }
      this.dialogVisible = true
    },
    async handleDelete(item) {
      const res = await deletePersonnel({ id: item.id })
      if (this.$$isResponseSuccess(res)) {
        this.$message.success('人员删除成功')
        this.fetchData()
      } else {
        this.$message.error('人员删除失败')
      }
    },
    async handleDeleteBatch() {
      const ids = this.selections.map(item => item.id)
      const res = await batchDeletePersonnel({ ids: ids })
      if (this.$$isResponseSuccess(res)) {
        this.$message.success('人员批量删除成功')
        this.fetchData()
      } else {
        this.$message.error('人员批量删除失败')
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
