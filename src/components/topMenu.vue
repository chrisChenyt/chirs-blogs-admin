<template>
  <div class="global-items">
    <ul class="global-items-ul">
      <li class="nav-item" @mouseover="onMouseover(1)" @mouseout="onMouseout(1)">
        <a href="#"><span class="icon icon-database"></span>账户信息</a>
        <!-- <transition name="fade"> -->
            <ul class="nav-top-hide" v-show="accountFlag">
              <li><a>用户名：<span class="nav-money">{{name}}</span></a></li>
              <li><a>手机号：<span class="nav-money">{{phone}}</span></a></li>
            </ul>
        <!-- </transition> -->
      </li>
      <li class="nav-item" @mouseover="onMouseover(2)" @mouseout="onMouseout(2)">
        <a href="#">blogs后台管理系统</a>
        <!-- <transition name="fade"> -->
          <ul class="nav-top-hide" v-show="companyFlag">
            <li @click="removeSel"><a href="javascript:void(0);"><span class="icon icon-lock"></span>密码管理</a></li>
            <li @click="logout"><a href="javascript:void(0);"><span class="icon icon-logout"></span>安全退出</a></li>
          </ul>
        <!-- </transition> -->
      </li>
    </ul>
  </div>
</template>
<script>
  import webHttp from '../methods/http.js'
  export default {
    data() {
      return {
        current: '',
        accountFlag: false,
        companyFlag: false,
        name: '',
        phone: ''
      }
    },
    mounted () {
      this.name = localStorage.getItem('name')
      this.phone = localStorage.getItem('phone')
    },
    methods: {
      onMouseover(num) {
        switch (num) {
          case 1:
            this.accountFlag = true
            break
          case 2:
            this.companyFlag = true
            break
        }
      },
      onMouseout(num) {
        switch (num) {
          case 1:
            this.accountFlag = false
            break
          case 2:
            this.companyFlag = false
            break
        }
      },
      removeSel() { // 清除左侧选中效果
        // this.$emit('goSetPass')
        this.$router.push({name: 'password'})
      },
      redirectRoute(routeName) {
        if (routeName) {
          this.currentRoute = routeName
          this.$router.push({name: routeName})
        }
      },
      logout() {
        localStorage.setItem('token',null); // 将token清空
        this.$notify.success({// 退出登录成功
          title: '提示',
          message: '退出登录成功',
          duration: 2000
        })
        this.$router.push({name: 'login'})
      }
    }
  }
</script>
<style lang="less">
  .global-items{
    margin-left: 201px;
    height: 48px;
    box-shadow: 0 -1px 8px 1px #bbb;
    background: #fff;
    .global-items-ul {
      float: right;
      .nav-item {
        display: inline-block;
        height: 48px;
        vertical-align: middle;
        line-height: 48px;
        position: relative;
        border-left:1px solid #eee;
        font-size: 14px;
        .pipe {
          height: 1px;
          margin: 4px 0;
          background-color: #eee;
        }
        a{
          color: #333;
          padding: 0 18px;
          text-decoration: none;
          max-width: 140px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          display: block;
          .icon{ margin-right: 5px;}
          &:hover{
            background: #f8f8f8;
            display: block;
          }
        }
        .fade-enter-active,.fade-leave-active{transition:.6s all cubic-bezier(.02,.17,0,1.06);}
        .fade-enter-active{
           top: 48px;
           opacity: 1;}
        .fade-leave-active{
          top: 0;
          opacity: 0;}
        .fade-leave{
          top: 48px;
          opacity:0;}
        .fade-enter{
          top: 0;
          opacity:0;}
        .nav-top-hide{
          min-width: 100%;
          padding: 5px 0 4px;
          background: #fff;
          border: 1px solid #ddd;
          box-shadow: 0 1px 2px 1px #e7e7e7;
          position: absolute;
          z-index: -1;
          right: -1px;
            li{
              font-size: 12px;
              box-sizing: border-box;
              height: 32px;
              line-height: 32px;
              overflow: hidden;
                a{
                  display: inline-block;
                  max-width: 300px;
                  min-width: 100%;
                  // height: 16px;
                  line-height: 16px;
                  padding: 8px 15px 8px 20px;
                  .nav-money{font-size: 15px;}
                  .icon{ margin-right: 5px;}
                  &:hover{
                    background: #eee;
                  }
                }
            }
        }
      }
    }
  }
</style>
