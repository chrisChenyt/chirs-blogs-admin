<template>
  <div class="tableCon">
    <div class="table-toolbar">
      <!-- 刷新按钮 -->
      <div v-show="refreshVisible" v-on:click="refresh()" class="btn">
        <span class="icon icon-refresh"></span>
      </div>
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
        max-height="550"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :data="tableData"
        style="width: 100%">
        <el-table-column :show-overflow-tooltip="true" :column-key="item.key" align="center" :label="item.label" :prop="item.key" :min-width="item.width" v-for="(item, index) in columns" :key="index">
          <template slot-scope="scope">
            <div v-if="item.type == 'radio'">
              <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="selectRow(scope.row)" >&nbsp;</el-radio>
            </div>
            <div v-if="item.type == 'tag'">
              <template v-for="(tagItem,tagIndex) in tableData[scope.$index][item.key]">
                <el-tag size="mini" v-if="tagItem == 'JS' || tagItem == 'life'" :key="tagIndex">{{tagItem}}</el-tag>
                <el-tag size="mini" v-if="tagItem == 'Vue' || tagItem == 'nginx'" type="success" :key="tagIndex">{{tagItem}}</el-tag>
                <el-tag size="mini" v-if="tagItem == 'CSS' || tagItem == 'work'" type="info" :key="tagIndex">{{tagItem}}</el-tag>
                <el-tag size="mini" v-if="tagItem == 'webpack' || tagItem == 'react'" type="warning" :key="tagIndex">{{tagItem}}</el-tag>
                <el-tag size="mini" v-if="tagItem == 'nodejs' || tagItem == 'other' || tagItem == 'html'" type="danger" :key="tagIndex">{{tagItem}}</el-tag>
              </template>
            </div>
            <div class="cellCon" v-else>{{tableData[scope.$index][item.key]}}</div>
            <div v-if="item.type == 'operation'">
              <!-- 查看 -->
              <el-tooltip content="查看" placement="top" effect="light">
                <el-button type="primary"size="mini" icon="el-icon-view"circle @click="handleCheck(scope.row)"></el-button>
              </el-tooltip>
              <!-- 编辑 -->
              <el-tooltip content="编辑" placement="top" effect="light">
                <el-button type="warning"size="mini" icon="el-icon-edit"circle @click="handleEdit(scope.row)"></el-button>
              </el-tooltip>
              <!-- 删除 -->
              <el-tooltip content="删除" placement="top" effect="light">
              <el-button type="danger"size="mini" icon="el-icon-delete"circle @click="handleDelete(scope.row)"></el-button>
              </el-tooltip>
            </div>
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
        radio: '',
        pageConVisible: true,
        currentPage: 1,
        // totalPages: 6,
        pageSize: 10,
        row: '',
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
      selectRow(row){
        this.row = row
      },
      refresh() {// 刷新
        this.currentPage = 1
        this.$emit('refresh')
      },
      handleCheck(row) {// 查看
        this.$emit('check',row)
      },
      handleEdit(row) {// 编辑
        this.$emit('edit',row)
      },
      handleDelete(row) {// 删除
        this.$confirm('此操作将永久 “'+row.title+'” 这篇文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 确定删除
          this.$emit('del',row)
        }).catch(() => {
          console.log('取消')
        });
      },
      pageSizeChange() {
        // 取消选中
        this.radio = ''
        
        this.currentPage = 1
        this.$emit('pageSizeChange',this.pageSize)
      },
      prev() {
        // 取消选中
        this.radio = ''
        
        if(this.currentPage > 1) {
          this.currentPage -= 1
          this.$emit('prev',this.currentPage)
        }
      },
      next() {
        // 取消选中
        this.radio = ''
        
        if(this.currentPage < this.totalPages) {
          this.currentPage += 1
          this.$emit('next',this.currentPage)
        }
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
  .el-radio__label{
    padding: 0;
  }
  .el-table th div{
    line-height: normal;
  }
</style>
