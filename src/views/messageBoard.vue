<template>
  <div id="articleCSS">
    <div class="breadcrumbOpt">
      <a class="breadcrumbLeft" href="/">首页</a>
      <a class="breadcrumbItem">留言板</a>
    </div>
    <div class="tableMainHeader">
      <p class="lead"><em>留言板（messageBoard）</em>博客中的留言板。</p>
    </div>
    <comment :loading="tableLoading" :total="total" @prev='prev' @next='next' @pageSizeChange='pageSizeChange' :columns='columns' :tableData='tableData' @refresh='refresh' @del='del' @deleteReply='deleteReply' @reply='reply' refreshVisible='true'></comment>
  </div>
</template>
<script>
  /*eslint-disable*/
  import comment from '../components/comment/comment.vue'
  import webHttp from '../methods/http.js'
  import util from '../methods/util.js'
  export default {
    data() {
      return {
        total: 0,
        tableLoading: false,
        pageSize: 10,
        columns: [
          { label: '序号', key: 'commentId', width: 30 },
          { label: '用户名', key: 'name', width: 50 },
          { label: '留言内容', key: 'content', width: 120 },
          { label: '时间', key: 'date', width: 100 },
          { label: '操作', key: 'operation', type: 'operation', width: 100 },
        ],
        tableData: []
      }
    },
    components: {
      comment
    },
    mounted() {
      this.tableLoading = true
      webHttp.request({
        url: '/api/msgList',
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
        this.tableLoading = true
        webHttp.request({
          url: '/api/msgList',
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
      reply(row) { // 回复
        this.$prompt('评论内容：'+row.content, '回复@ '+row.name, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPlaceholder: '请输入回复内容',
          inputPattern: /\S/,
          inputErrorMessage: '回复不能为空'
        }).then(({ value }) => {
          let newReply = {
            aite: row.name,
            content: value,
            date: util.getNowFormatDate('yyyy-MM-dd HH:mm'),
            imgUrl: '/img/defaultUser.jpg',
            like: 0,
            name: localStorage.getItem('name'),
            _id: util.generateUUID()
          }
          this.tableLoading = true
          webHttp.request({
            url: '/api/msgReply',
            method: 'POST',
            data: {
              newReply: newReply,
              commentId: row.commentId
            },
            callback: (res) => {
              this.tableLoading = false
              if(res.success){
                this.tableData = res.list.data
                this.total = res.list.totalCount
                this.$notify.success({// 回复成功
                  title: '提示',
                  message: '回复成功！',
                  duration: 2000
                })
              } else {
                this.$notify.error({// 回复失败
                  title: '提示',
                  message: '回复失败！',
                  duration: 2000
                })
              }
            }
          })
        }).catch(() => {})
      },
      del(row) { // 删除
        this.tableLoading = true
        webHttp.request({
          url: '/api/msgDel',
          method: 'POST',
          data: {
            commentId: row.commentId
          },
          callback: (res) => {
            this.tableLoading = false
            if(res.success){
              this.tableData = res.list.data
              this.total = res.list.totalCount
              this.$notify.success({// 删除成功
                title: '提示',
                message: '删除成功！',
                duration: 2000
              })
            } else {
              this.$notify.error({// 删除失败
                title: '提示',
                message: '删除失败！',
                duration: 2000
              })
            }
          }
        })
      },
      deleteReply(row,_id) { // 删除留言回复
        this.tableLoading = true
        webHttp.request({
          url: '/api/delMsgReply',
          method: 'POST',
          data: {
            commentId: row.commentId,
            _id: _id
          },
          callback: (res) => {
            this.tableLoading = false
            if(res.success){
              this.tableData = res.list.data
              this.total = res.list.totalCount
              this.$notify.success({// 删除回复成功
                title: '提示',
                message: '删除成功！',
                duration: 2000
              })
            } else {
              this.$notify.error({// 删除回复失败
                title: '提示',
                message: '删除失败！',
                duration: 2000
              })
            }
          }
        })
      },
      prev(currentPage) {// 上一页
        this.tableLoading = true
        webHttp.request({
          url: '/api/msgList',
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
        this.tableLoading = true
        webHttp.request({
          url: '/api/msgList',
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
        this.pageSize = pageSize
        this.tableLoading = true
        webHttp.request({
          url: '/api/msgList',
          method: 'POST',
          data: {
            pageNum: 1,
            pageSize: pageSize
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
  #articleCSS{
    width: 100%;
  }
</style>
