<template>
  <div class="tableCon">
    <div class="table-toolbar">
      <!-- 刷新按钮 -->
      <div v-show="refreshVisible" v-on:click="refresh()" class="btn">
        <span class="icon icon-refresh"></span>
      </div>
      <!-- 手机号搜索输入框 -->
      <el-input placeholder="请输入手机号" @keyup.enter.native="searchPhone" @blur="searchPhone" v-model="phone" v-if="showPhoneSearch" class="toolbar-input-con">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <!-- 分页组合 -->
      <div class="pagination">
        <span class="pages">合计 : {{total}}&nbsp;&nbsp;</span>
        <span class="per-page">每页:&nbsp;</span>
        <div class="select-con" style="width: 55px;">
          <select class="dropdown-select" v-model="pageSize" @change="pageSizeChange" name="limit">
            <option value="10" selected="">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
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
        max-height="500"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :data="tableData"
        style="width: 100%">
        <el-table-column :render-header="item.renderHeader" :column-key="item.key" show-overflow-tooltip :filter-multiple='false' filter-placement="bottom-start" :filters="item.dateFilters" :align="item.align" :label="item.label" :prop="item.key" :min-width="item.width" v-for="(item, index) in columns" :key="index">
          <template slot-scope="scope">
            <div v-if="item.type == 'radio'">
              <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="selectRow(scope.row)" >&nbsp;</el-radio>
            </div>
            <div v-if="item.type == 'index'">{{scope.$index}}</div>
            <div v-else>{{tableData[scope.$index][item.key]}}</div>
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
        startTimeValue: '',
        endTimeValue: '',
        pageConVisible: true,
        currentPage: 1,
        // totalPages: 6,
        pageSize: 10,
        canRepay: false,
        row: '',
        phone: '',
        planId: ''
      }
    },
    props: {
      refreshVisible: false,
      createVisible: false,
      repayVisible: false,
      moreVisible: false,
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
      showPhoneSearch: false,
      showPlanIdSearch: false
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
        this.canRepay = true
        this.row = row
      },
      refresh() {// 刷新
        this.currentPage = 1
        this.$emit('refresh')
      },
      searchPhone() {
        this.$emit('searchPhone',this.phone)
      },
      pageSizeChange() {
        // 取消选中
        this.radio = ''
        this.canRepay = false
        
        this.currentPage = 1
        this.$emit('pageSizeChange',this.pageSize)
      },
      prev() {
        // 取消选中
        this.radio = ''
        this.canRepay = false
        
        if(this.currentPage > 1) {
          this.currentPage -= 1
          this.$emit('prev',this.currentPage)
        }
      },
      next() {
        // 取消选中
        this.radio = ''
        this.canRepay = false
        
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
  .el-table__column-filter-trigger{
    position: absolute;
    line-height: normal;
    height: 14px;
    background: #9ed5f0;
    border-bottom: 2px solid #6ec0e9;
    margin-left: 5px;
    border-radius: 2px;
    i{
      color: #555;
      padding: 0 2px;
    }
  }
  .el-table-filter__list{
    padding: 0;
    min-width: 140px;
    line-height: 32px;
    background-color: #3b3f4e;
    color: #9e9daa;
    .el-table-filter__list-item.is-active{
      background-color: #3b3f4e;
      color: #9e9daa;
    }
    .el-table-filter__list-item:hover{
      background-color: #2a2d2e;
      color: #ffffff;
    }
  }
  .el-radio__label{
    padding: 0;
  }
  .el-table th div{
    line-height: normal;
  }
</style>
