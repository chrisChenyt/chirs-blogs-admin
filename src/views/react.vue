<template>
  <div id="articleReact">
    <div class="breadcrumbOpt">
      <a class="breadcrumbLeft" href="/">首页</a>
      <a class="breadcrumbItem">全部文章</a>
    </div>
    <div class="tableMainHeader">
      <p class="lead"><em>React相关文章（articleReact）</em>所有已发布在博客中的React相关文章。</p>
    </div>
    <articleList :loading="tableLoading" :total="total" @prev='prev' @next='next' @pageSizeChange='pageSizeChange' :columns='columns' :tableData='tableData' @refresh='refresh' @del='del' @check='check' @edit='edit' refreshVisible='true'></articleList>
  </div>
</template>
<script>
  /*eslint-disable*/
  import articleList from '../components/article/articleList.vue'
  import webHttp from '../methods/http.js'
  export default {
    data() {
      return {
        total: 0,
        tableLoading: false,
        pageSize: 10,
        columns: [
          { label: '', key: 'id', width: 30, type: 'radio' },
          { label: 'ID', key: 'articleId', width: 40 },
          { label: '标题', key: 'title', width: 80 },
          { label: '标签', key: 'tag', type: 'tag', width: 100 },
          { label: '浏览', key: 'pv', width: 50 },
          { label: '喜欢', key: 'likeNum', width: 50 },
          { label: '评论', key: 'commentNum', width: 50 },
          { label: '发表时间', key: 'date', width: 100 },
          { label: '操作', key: 'operation', type: 'operation', width: 100 }
        ],
        tableData: []
      }
    },
    components: {
      articleList
    },
    mounted() {
      this.tableLoading = true
      webHttp.request({
        url: '/api/articleList',
        method: 'POST',
        data: {
          pageNum: 1,
          pageSize: this.pageSize,
          articleTag: 'react'
        },
        callback: (res) => {
          this.tableLoading = false
          this.tableData = res.list.data
          this.total = res.list.totalCount
        }
      })
    },
    methods: {
      refresh() { // 刷新
        this.tableLoading = true
        webHttp.request({
          url: '/api/articleList',
          method: 'POST',
          data: {
            pageNum: 1,
            pageSize: this.pageSize,
            articleTag: 'react'
          },
          callback: (res) => {
            this.tableLoading = false
            this.tableData = res.list.data
            this.total = res.list.totalCount
          }
        })
      },
      check(row) { // 查看
				this.$router.push({path: "/review",query: {article_id: row.articleId}})
      },
      edit(row) { // 编辑
				this.$router.push({path: "/editArticle",query: {article_id: row.articleId}})
      },
      del(row) { // 删除
        this.tableLoading = true
        webHttp.request({
          url: '/api/articleDel',
          method: 'POST',
          data: {
            articleId: row.articleId,
            articleTag: 'react'
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
      prev(currentPage) {// 上一页
        this.tableLoading = true
        webHttp.request({
          url: '/api/articleList',
          method: 'POST',
          data: {
            pageNum: currentPage,
            pageSize: this.pageSize,
            articleTag: 'react'
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
          url: '/api/articleList',
          method: 'POST',
          data: {
            pageNum: currentPage,
            pageSize: this.pageSize,
            articleTag: 'react'
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
          url: '/api/articleList',
          method: 'POST',
          data: {
            pageNum: 1,
            pageSize: pageSize,
            articleTag: 'react'
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
  #articleReact{
    width: 100%;
  }
</style>
