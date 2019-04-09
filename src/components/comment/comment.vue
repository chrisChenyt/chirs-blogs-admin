<template>
  <div class="tableCon">
    <div class="table-toolbar">
      <!-- 刷新按钮 -->
      <div v-show="refreshVisible" v-on:click="refresh()" class="btn">
        <span class="icon icon-refresh"></span>
      </div>
      <!-- 文章搜索输入框 -->
      <el-input placeholder="请输入文章标题" @keyup.enter.native="searchTitle" @blur="searchTitle" v-model="title" v-if="showTitleSearch" class="toolbar-input-con">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <!-- 分页组合 -->
      <div class="pagination">
        <span class="pages">合计 : {{total}}&nbsp;&nbsp;</span>
        <span class="per-page">每页:&nbsp;</span>
        <div class="select-con" style="width: 55px;">
          <select class="dropdown-select" v-model="pageSize" @change="pageSizeChange" name="limit">
            <option value="10" selected="">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
          </select>
        </div>
        <div v-show="pageConVisible" style="display:inline-block">
          <span class="pages">&nbsp;页数 {{currentPage}} / {{totalPages}}</span>
          <div class="btn prev" @click="prev" :class="{ 'btn-forbidden':currentPage==1 }" data-direction="prev"><span class="icon-prev" data-direction="prev"></span></div>
          <div class="btn next" @click="next" :class="{ 'btn-forbidden':currentPage==totalPages }" data-direction="next"><span class="icon-next" data-direction="next"></span></div>
        </div>
      </div>
    </div>
    <!-- 表格内容 -->
    <div class="tableMain">
      <el-table
        max-height="530"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :data="tableData"
        @expand-change="expandChange"
        @row-click="clickTable"
        ref="refTable"
        style="width: 100%">
        <el-table-column type="expand" class="expand-list">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="昵称：" class="commentCon">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="留言：" class="commentCon">
                <pre><span v-html='props.row.content.replace(/img\/emoji/g,"static/img/emoji")'></span></pre>
              </el-form-item>
              <el-form-item label="时间：" class="commentCon">
                <span>{{ props.row.date }}</span>
              </el-form-item>
              <el-form-item class="commentCon">
                <p class="replyTitle">本条回复：</p>
                <span v-if="props.row.reply ==''">暂无</span>
                <ul v-else>
                  <li class="replyItem" v-for="replyItem in props.row.reply">
                    <span class="replyName">{{replyItem.name}} @ {{replyItem.aite}}：</span>
                    <pre><span v-html='replyItem.content.replace(/img\/emoji/g,"static/img/emoji")'></span></pre>
                    <span class="replyItemTime">{{ replyItem.date }}</span>
                    <i size="mini" class="el-icon-delete" @click="deleteReply(props.row,replyItem._id)"></i>
                  </li>
                </ul>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" :column-key="item.key" align="center" :label="item.label" :prop="item.key" :min-width="item.width" v-for="(item, index) in columns" :key="index">
          <template slot-scope="scope">
            <div v-if="item.type == 'operation'">
              <!-- 回复 -->
              <el-tooltip content="回复" placement="top" effect="light">
                <el-button type="warning"size="mini" icon="el-icon-edit-outline" circle @click.stop="handlerReply(scope.row)"></el-button>
              </el-tooltip>
              <!-- 删除 -->
              <el-tooltip content="删除" placement="top" effect="light">
                <el-button type="danger"size="mini" icon="el-icon-delete"circle @click.stop="handleDelete(scope.row)"></el-button>
              </el-tooltip>
            </div>
            <div v-if="item.type=='content'">
              <pre><span v-html='tableData[scope.$index][item.key].replace(/img\/emoji/g,"static/img/emoji")'></span></pre>
            </div>
            <div class="cellCon" v-else>{{tableData[scope.$index][item.key]}}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  /*eslint-disable*/
  export default {
    data() {
      return {
        pageConVisible: true,
        currentPage: 1,
        // totalPages: 6,
        pageSize: 10,
        row: '',
        title: ''// 文章标题搜索框
      }
    },
    props: {
      refreshVisible: false,
      loading: {
        type: Boolean,
        default: false,
      },
      total: {
        type: Number,
        default: '',
      },
      columns: '',
      tableData: '',
      showTitleSearch: false,
    },
    mounted() {
    },
    computed: {
      totalPages: function() {
        if(this.total/this.pageSize == 0){
          this.pageConVisible = false
        } else {
          return  Math.ceil(this.total/this.pageSize)
        }
      }
    },
    watch: {
      totalPages(curVal,oldVal) {
        if(curVal == 1){
          this.pageConVisible = false
        }else{
          this.pageConVisible = true
        }
      }
    },
    methods: {
      encodeHtml(str){
          var encodedStr = "" ;
          if (str=="") return encodedStr ;
          else {
              for (var i = 0 ; i < str.length ; i ++){
                  encodedStr += "&#" + str.substring(i, i + 1).charCodeAt().toString(10) + ";" ;
              }
          }
          return encodedStr ;
      },
      refresh() {// 刷新
        this.currentPage = 1
        this.$emit('refresh')
      },
      searchTitle() {
        this.$emit('searchTitle',this.title)
      },
      handlerReply(row) {// 回复
        this.$emit('reply',row)
      },
      deleteReply(row,_id) {// 删除评论
        this.$confirm('此操作将永久删除此条回复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 确定删除
          this.$emit('deleteReply',row,_id)
        }).catch(() => {});
      },
      handleDelete(row) {// 删除
        this.$confirm('此操作将永久删除 “'+row.name+'” 的这条评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 确定删除
          this.$emit('del',row)
        }).catch(() => {});
      },
      pageSizeChange() {
        this.currentPage = 1
        this.$emit('pageSizeChange',this.pageSize)
      },
      prev() {
        if(this.currentPage > 1) {
          this.currentPage -= 1
          this.$emit('prev',this.currentPage)
        }
      },
      next() {
        if(this.currentPage < this.totalPages) {
          this.currentPage += 1
          this.$emit('next',this.currentPage)
        }
      },
      expandChange(row,expandedRows){// 同时只展示一行下拉
        if(expandedRows.length>1){
          expandedRows.shift()
        }
      },
      clickTable(row,index,e){
        this.$refs.refTable.toggleRowExpansion(row)
      }
    }
  }
</script>
<style lang='less'>
  .tableCon{
    padding: 10px 20px;
    margin: 0 20px;
    background-color: #ffffff;
    .table-toolbar {
      position: relative;
      z-index: 4;
      margin: 10px 0;
      .pagination{
          float: right;
          color: #777;
      }
    }
  }
  .el-table{
    color: #2a2d2e;
    .cell{
      line-height: normal;
      .cellCon{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
    tr{
      td:last-child{
        border-right: 1px solid #e4eaec;
      }
    }
    td, th {
      border-bottom: 1px solid #e4eaec;
      border-left: 1px solid #e4eaec;
      font-weight: 400;
      font-size: 12px;
      padding: 10px 0;
      empty-cells: show;
    }
    thead {
      color: #909399;
      font-weight: 500;
      th {
          background: #e4eaec;
          color: #58666e;
      }
    }
  }
  .el-table th div{
    line-height: normal;
  }
  .commentCon{
    width: 100%;
    margin-bottom: -10px;
    >.el-form-item__label{
      color: orange;
      font-size: 12px;
    }
    >.el-form-item__content{
      font-size: 12px;
    }
    .replyItem{
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      line-height: 20px;
    }
    .replyTitle{
      color: orange;
    }
    .replyName{
      color: orange;
      margin-right: 10px;
      white-space: nowrap;
    }
    .replyItemCon{
      width: 40%;
      line-height: 22px;
    }
    .replyItemTime{
      margin: 0 20px;
      white-space: nowrap;
      font-size: 12px;
      color: gray;
    }
  }
</style>
