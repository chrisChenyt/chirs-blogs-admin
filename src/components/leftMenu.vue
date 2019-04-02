<template>
  <div id="menu">
    <el-menu
      :default-active="activeMenu"
      :default-openeds="openeds"
      class="menuList"
      router
      background-color="#22222c"
      text-color="#fff"
      active-text-color="#fff">
      <template v-for="(menuItem,index) in menuList">
        <el-submenu v-if="menuItem.child" :index="menuItem.pathName" :key="index">
          <template slot="title">
            <i :class="menuItem.icon"></i>
            <span>{{menuItem.title}}</span>
          </template>
          <el-menu-item :index="childItem.pathName" v-for="(childItem,childIndex) in menuItem.child" :key="childIndex">
            <template slot="title">
              <i :class="childItem.icon"></i>
              <span>{{childItem.title}}</span>
            </template>
          </el-menu-item>
        </el-submenu>
        <el-menu-item :index="menuItem.pathName" :key="index" v-else>
          <template slot="title">
            <i :class="menuItem.icon"></i>
            <span>{{menuItem.title}}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeMenu: '',
        openeds: [],
      }
    },
    props: ['menuList'],
    created() {
      this.activeMenu = this.$route.name
      this.openeds = [this.$route.name]
    },
    mounted() {
    },
    methods: {
    }
  }
</script>
<style lang="less">
  #menu{
    width: 201px;
    height: 100%;
    float: left;
    padding-top: 48px;
    position: fixed;
    z-index: 90;
    .el-menu{
      height: 100%;
      .el-menu-item.is-active{
        background-color: #57b382!important;
      }
      .el-menu-item{
        height: 40px!important;
        line-height: 40px!important;
      }
    }
  }
</style>
