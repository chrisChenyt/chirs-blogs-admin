<template>
  <div class="con">
    <!--  顶部导航 -->
    <div class="nav">
      <div class="global-logo">
        <img src="../assets/head.jpeg">
        <span>blogs后台管理系统</span>
      </div>
      <TopMenu @goSetPass="goSetPass"></TopMenu>
    </div>
    <!--  左边菜单 -->
    <LeftMenu ref="leftMenu" :menuList="menuList" ></LeftMenu>
    <!-- 页面内容 -->
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import LeftMenu from '../components/leftMenu.vue'
  import TopMenu from '../components/topMenu.vue'
  export default {
    data(){
      return{
        menuList: [ // 左侧菜单数据
          {
            title: '已发布文章',
            pathName: 'allArticle',
            icon: 'el-icon-tickets',
            child: [
              {
                title: '全部文章',
                pathName: 'allArticle',
                icon: 'el-icon-document',
              },
              {
                title: 'JavaScript',
                pathName: 'JavaScript',
                icon: 'el-icon-document',
              },
              {
                title: 'CSS',
                pathName: 'css',
                icon: 'el-icon-document',
              },
              {
                title: 'HTML',
                pathName: 'html',
                icon: 'el-icon-document',
              },
              {
                title: 'Vue',
                pathName: 'vue',
                icon: 'el-icon-document',
              },
              {
                title: 'webpack',
                pathName: 'webpack',
                icon: 'el-icon-document',
              },
              {
                title: 'Node',
                pathName: 'node',
                icon: 'el-icon-document',
              },
              {
                title: 'React',
                pathName: 'react',
                icon: 'el-icon-document',
              },
              {
                title: '工作日记',
                pathName: 'work',
                icon: 'el-icon-document',
              },
              {
                title: '生活感悟',
                pathName: 'life',
                icon: 'el-icon-document',
              },
              {
                title: '其他',
                pathName: 'other',
                icon: 'el-icon-document',
              },
            ]
          },
          {
            title: '文章评论',
            pathName: 'articleComment',
            icon: 'el-icon-date',
          },
          {
            title: '留言板',
            pathName: 'messageBoard',
            icon: 'el-icon-message',
          },
          {
            title: '草稿箱',
            pathName: 'articleDrafts',
            icon: 'el-icon-tickets',
          },
          {
            title: '发表文章',
            pathName: 'publish',
            icon: 'el-icon-edit-outline',
          },
          {
            title: '新消息',
            pathName: 'newMsg',
            icon: 'el-icon-bell',
          },
          {
            title: '用户列表',
            pathName: 'userList',
            icon: 'el-icon-menu',
          },
          {
            title: '管理员列表',
            pathName: 'managerList',
            icon: 'el-icon-document',
          }
        ]
      }
    },
    components: {
      LeftMenu, TopMenu
    },
    mounted() {

    },
    methods:{
      goSetPass() {
        this.$refs.leftMenu.menuBlur()
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  body{
    background: #f1f4f6;
    .con{
      width: 100%;
      min-height: 100vh;
      margin: auto;
      min-width: 1024px;
      .nav{
        height: 48px;
        background: #fff;
        position: fixed;
        width: 100%;
        z-index: 99;

        .global-logo{
          width: 200px;
          color: #fff;
          text-align: center;
          line-height: 48px;
          float: left;
          background: rgb(40,40,52);
          img{
            width: 20px;
            margin-right: 10px;
            vertical-align: middle;
            border-radius: 3px;
          }
        }

      }
      .content{
        color: #2a2d2e;
        margin-left: 200px;
        border-top: 1px solid #ddd;
        padding-top: 48px;
        position: relative;
        .pd10{padding:10px;}
      }

    }
  }
</style>