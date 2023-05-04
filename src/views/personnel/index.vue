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
      @handleSelectionChange="handleSelectEvents"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange">
      <el-table-column fixed="left" type="selection" align="center" width="40" />
      <el-table-column prop="name" align label="姓名" />
      <el-table-column prop="identity" align label="身份" />
      <el-table-column prop="identityNo" align label="身份证号" />
      <el-table-column prop="telePhoneNo" align label="电话号码" />
      <el-table-column prop="email" align label="邮箱" />
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
import { getPersonnelList, createPerson } from '@/api/personnel'

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
      searchName: '',
      selections: [],
      params: {
        limit: 10,
        start: 0
      },
      personMap: {
        1: '巡线人员',
        2: '抢险人员'
      },
      personForm: {
        name: '',
        identity: '',
        identityNo: '',
        avatar: ''
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
      createPerson(this.personForm)
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
