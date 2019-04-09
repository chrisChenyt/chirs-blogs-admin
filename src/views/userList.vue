<template>
  <div id="userList">
    <div class="breadcrumbOpt">
      <a class="breadcrumbLeft" href="/">首页</a>
      <a class="breadcrumbItem">用户列表</a>
    </div>
    <div class="tableMainHeader">
      <p class="lead"><em>用户列表（userList）</em>展示所有注册用户基本信息。</p>
    </div>
    <table-list ref="tableList" :loading="tableLoading" :total="total" @searchPhone='searchPhone' showPlanIdSearch='true' @prev='prev' @next='next' @pageSizeChange='pageSizeChange' :columns='columns' :tableData='tableData' @refresh='refresh' refreshVisible='true'></table-list>
    <div class="tipsCon">
      <p class="tips">* 提示：如果有疑问，请自行联系 管理员，常规渠道有<a>微信</a>或者<a>QQ</a>。</p>
    </div>
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
            label: '注册时间',
            key: 'register_time',
            type: 'normal',
            width: 120
          }
        ],
        tableData: []
      }
    },
    components: {
      tableList
    },
    mounted() {
      this.tableLoading = true
      webHttp.request({
          url: '/api/userList',
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
      refresh() {// 刷新
        this.tableLoading = true
        webHttp.request({
          url: '/api/userList',
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
      prev(currentPage) {// 上一页
        // console.log('上一页'+currentPage)
        this.tableLoading = true
        webHttp.request({
            url: '/api/userList',
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
            url: '/api/userList',
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
            url: '/api/userList',
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
            url: '/api/userListPhone',
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
      }
    }
  }
</script>
<style lang='less'>
  #userList{
    width: 100%;
  }
</style>
