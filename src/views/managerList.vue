<template>
  <div id="managerList">
    <div class="breadcrumbOpt">
      <a class="breadcrumbLeft" href="/">首页</a>
      <a class="breadcrumbItem">管理员列表</a>
    </div>
    <div class="tableMainHeader">
      <p class="lead"><em>管理员列表（managerList）</em>展示所有管理员，管理员可以对用户进行状态管理操作，超级管理员还可以添加新的管理员。</p>
    </div>
    <table-list ref="tableList" :loading="tableLoading" :total="total" @searchPlanId='searchPhone' showPlanIdSearch='true' @prev='prev' @next='next' @pageSizeChange='pageSizeChange' :columns='columns' :tableData='tableData' @refresh='refresh' @repay='repay' refreshVisible='true' repayVisible='true'></table-list>
    <div class="tipsCon">
      <p class="tips">* 提示：用户状态标明为“禁用”，请自行联系 管理员 授权，常规渠道有<a>微信</a>或者<a>QQ</a>。</p>
      <p class="tips">* 如果 管理员 操作后状态仍为“禁用”，请自行联系 作者 授权，常规渠道有<a>微信</a>或者<a>QQ</a>。</p>
    </div>
    <el-dialog
      title="账户管理"
      :visible.sync="dialogVisible"
      width="500px">
      <el-form ref="manageForm" :model="manageForm" :disabled="true" label-width="120px">
        <el-form-item label="用户手机号">
          <el-input v-model="manageForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <el-form ref="manageForm" :model="manageForm" :disabled="formDisable" label-width="120px">
        <el-form-item label="账户状态">
          <el-switch v-model="manageForm.state"></el-switch>
        </el-form-item>
        <el-form-item label="权限等级">
          <el-radio-group v-model="manageForm.rule">
            <el-radio label="普通用户"></el-radio>
            <el-radio label="管理员"></el-radio>
            <el-radio label="超级管理员"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitChange">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  /*eslint-disable*/
  import tableList from '../components/tableList.vue'
  import webHttp from '../methods/http.js'
  export default {
    data() {
      return {
        total: 0,
        tableLoading: false,
        pageSize: 10,
        dialogVisible: false,
        formDisable: false,
        columns: [
          {
            label: '',
            key: 'id',
            width: 47,
            type: 'radio',
            align: 'center'
          },
          {
            label: '用户ID',
            key: 'user_id',
            width: 100
          },
          {
            label: '用户昵称',
            key: 'name',
            width: 120
          },
          {
            label: '用户手机号',
            key: 'phone',
            width: 120
          },
          {
            label: '状态',
            key: 'state',
            width: 100,
            // dateFilters: [
            //   {text: '禁用', value: '0'},
            //   {text: '正常', value: '1'},
            // ]
          },
          {
            label: '权限等级',
            key: 'rule',
            width: 100,
          },
          {
            label: '注册时间',
            key: 'register_time',
            type: 'normal',
            width: 120
          }
        ],
        tableData: [],
        manageForm: {
          state: true,
          phone: '',
          rule: ''
        }
      }
    },
    components: {
      tableList
    },
    mounted() {
      this.tableLoading = true
      webHttp.request({
          url: '/api/userListManager',
          method: 'POST',
          data: {
            pageNum: 1,
            pageSize: this.pageSize
          },
          callback: (res) => {
            this.tableLoading = false
            this.tableData = res.list.data
            this.total = res.list.totalCount
          }
      })
    },
    methods: {
      refresh() {
        console.log('刷新')
        window.location.reload()
      },
      repay(row) {
        console.log('账户管理',row)
        webHttp.request({
          url: '/api/getUserInfo',
          method: 'POST',
          data: {
            phone: localStorage.getItem('phone')
          },
          callback: (res) => {
            this.dialogVisible = true
            this.manageForm.phone = row.phone
            if(res.list.rule == '管理员' || res.list.rule == '超级管理员' || res.list.state == '正常'){
              this.formDisable = false
            }else{
              this.formDisable = true
            }
            if(row.state == '正常'){
              this.manageForm.state = true
            } else {
              this.manageForm.state = false
            }
            this.manageForm.rule = row.rule
          }
        })
      },
      submitChange() {// 确定权限
        let stateText;
        if(this.manageForm.state){
          stateText = '正常'
        } else {
          stateText = '禁用'
        }
        webHttp.request({
            url: '/api/changeManagerInfo',
            method: 'POST',
            data: {
              phone: this.manageForm.phone,
              state: stateText,
              rule: this.manageForm.rule
            },
            callback: (res) => {
              // 取消选中
              this.$refs.tableList.radio = ''
              this.$refs.tableList.canRepay = false
              
              this.dialogVisible = false
              this.tableData = res.list.data
              this.total = res.list.totalCount
            }
        })
      },
      prev(currentPage) {// 上一页
        // console.log('上一页'+currentPage)
        this.tableLoading = true
        webHttp.request({
            url: '/api/userListManager',
            method: 'POST',
            data: {
              pageNum: currentPage,
              pageSize: this.pageSize
            },
            callback: (res) => {
              this.tableLoading = false
              this.tableData = res.list.data
              this.total = res.list.totalCount
            }
        })
      },
      next(currentPage) {// 下一页
        // console.log('下一页'+currentPage)
        this.tableLoading = true
        webHttp.request({
            url: '/api/userListManager',
            method: 'POST',
            data: {
              pageNum: currentPage,
              pageSize: this.pageSize
            },
            callback: (res) => {
              this.tableLoading = false
              this.tableData = res.list.data
              this.total = res.list.totalCount
            }
        })
      },
      pageSizeChange(pageSize) {// 每页显示条数
        // console.log('每页显示条数'+pageSize)
        this.pageSize = pageSize
        this.tableLoading = true
        webHttp.request({
            url: '/api/userListManager',
            method: 'POST',
            data: {
              pageNum: 1,
              pageSize: this.pageSize
            },
            callback: (res) => {
              this.tableLoading = false
              this.tableData = res.list.data
              this.total = res.list.totalCount
            }
        })
      },
      searchPhone(phone) {
        this.tableLoading = true
        webHttp.request({
          url: '/api/userListManagerPhone',
          method: 'POST',
          data: {
            pageNum: 1,
            pageSize: this.pageSize,
            phone: phone
          },
          callback: (res) => {
            this.tableLoading = false
            this.tableData = res.list.data
            this.total = res.list.totalCount
          }
        })
      },
    }
  }
</script>
<style lang='less'>
  #managerList{
    width: 100%;
  }
</style>
