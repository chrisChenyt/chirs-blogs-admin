import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import 'lib-flexible'
import './styles/base.less'
import './styles/component.less'
Vue.use(Router)
Vue.use(VueResource)
import base64 from 'base-64'
window.base64 = base64
import jwt from 'jsonwebtoken'
window.jwt = jwt
import $ from 'jquery'
window.$ = $

Vue.config.productionTip = false

// 按需引用
import {
    Table,
    Dialog,
    Switch,
    TableColumn,
    Radio,
    DatePicker,
    Popover,
    Form,
    FormItem,
    Input,
    Button,
    Loading,
    Notification,
    RadioGroup,
    Menu,
    Submenu,
    Tooltip,
    MessageBox,
    Collapse,
    CollapseItem,
    Tag,
    Checkbox,
    CheckboxGroup,
    MenuItem
 } from 'element-ui'

 Vue.use(Table)
 Vue.use(Dialog)
 Vue.use(Switch)
 Vue.use(TableColumn)
 Vue.use(Radio)
 Vue.use(DatePicker)
 Vue.use(Popover)
 Vue.use(Form)
 Vue.use(FormItem)
 Vue.use(Input)
 Vue.use(Button)
 Vue.use(RadioGroup)
 Vue.use(Menu)
 Vue.use(Submenu)
 Vue.use(Tooltip)
 Vue.use(Collapse)
 Vue.use(CollapseItem)
 Vue.use(Checkbox)
 Vue.use(CheckboxGroup)
 Vue.use(Tag)
 Vue.use(MenuItem)
 Vue.use(Loading.directive)
 Vue.prototype.$loading = Loading.service
 Vue.prototype.$notify = Notification
 Vue.prototype.$msgbox = MessageBox;
 Vue.prototype.$alert = MessageBox.alert;
 Vue.prototype.$confirm = MessageBox.confirm;
 Vue.prototype.$prompt = MessageBox.prompt;

import axios from 'axios'
Vue.prototype.$ajax = axios

Vue.filter("reviseTime",function(value){
	let localTime = new Date(value),
	 	year = localTime.getFullYear(),
	 	month = localTime.getMonth()+1,
	 	day = localTime.getDate(),
	 	hours = localTime.getHours(),
	 	minutes = localTime.getMinutes(),
		// seconds = localTime.getSeconds(),
		finTime;
		for(let i = 0;i < 10;i++){
			if(i === minutes){
				minutes = "0" + minutes
			}
		}
	finTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes 
			// + ":" +seconds
	return finTime
})

/*配置路由*/
let router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component:() => import(/* webpackChunkName: "login" */ '@/views/login')
    },
    {
      path: '/layout',
      name: 'layout',
      component:() => import(/* webpackChunkName: "index" */ '@/views/layout'), children: [
        {
          path: '/userList',
          name: 'userList',
          component:() => import(/* webpackChunkName: "index" */ '@/views/userList'),
          meta: {
            requireAuth: true,// 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: '/password',
          name: 'password',
          component:() => import(/* webpackChunkName: "index" */ '@/views/password'),
          meta: { requireAuth: true }
        },
        {
          path: '/allArticle',
          name: 'allArticle',
          component:() => import(/* webpackChunkName: "article" */ '@/views/allArticle'),
          meta: { requireAuth: true }
        },
        {
          path: '/JavaScript',
          name: 'JavaScript',
          component:() => import(/* webpackChunkName: "article" */ '@/views/JavaScript'),
          meta: { requireAuth: true }
        },
        {
          path: '/css',
          name: 'css',
          component:() => import(/* webpackChunkName: "article" */ '@/views/css'),
          meta: { requireAuth: true }
        },
        {
          path: '/html',
          name: 'html',
          component:() => import(/* webpackChunkName: "article" */ '@/views/html'),
          meta: { requireAuth: true }
        },
        {
          path: '/vue',
          name: 'vue',
          component:() => import(/* webpackChunkName: "article" */ '@/views/vue'),
          meta: { requireAuth: true }
        },
        {
          path: '/react',
          name: 'react',
          component:() => import(/* webpackChunkName: "article" */ '@/views/react'),
          meta: { requireAuth: true }
        },
        {
          path: '/webpack',
          name: 'webpack',
          component:() => import(/* webpackChunkName: "article" */ '@/views/webpack'),
          meta: { requireAuth: true }
        },
        {
          path: '/node',
          name: 'node',
          component:() => import(/* webpackChunkName: "article" */ '@/views/node'),
          meta: { requireAuth: true }
        },
        {
          path: '/work',
          name: 'work',
          component:() => import(/* webpackChunkName: "article" */ '@/views/work'),
          meta: { requireAuth: true }
        },
        {
          path: '/life',
          name: 'life',
          component:() => import(/* webpackChunkName: "article" */ '@/views/life'),
          meta: { requireAuth: true }
        },
        {
          path: '/other',
          name: 'other',
          component:() => import(/* webpackChunkName: "article" */ '@/views/other'),
          meta: { requireAuth: true }
        },
        {
          path: '/articleComment',
          name: 'articleComment',
          component:() => import(/* webpackChunkName: "article" */ '@/views/articleComment'),
          meta: { requireAuth: true }
        },
        {
          path: '/messageBoard',
          name: 'messageBoard',
          component:() => import(/* webpackChunkName: "article" */ '@/views/messageBoard'),
          meta: { requireAuth: true }
        },
        {
          path: '/articleDrafts',
          name: 'articleDrafts',
          component:() => import(/* webpackChunkName: "article" */ '@/views/drafts'),
          meta: { requireAuth: true }
        },
        {
          path: '/publish',
          name: 'publish',
          component:() => import(/* webpackChunkName: "article" */ '@/views/publish'),
          meta: { requireAuth: true }
        },
        {
          path: '/editArticle',
          name: 'editArticle',
          component:() => import(/* webpackChunkName: "article" */ '@/views/editArticle'),
          meta: { requireAuth: true }
        },
        {
          path: '/review',
          name: 'review',
          component:() => import(/* webpackChunkName: "article" */ '@/views/review'),
          meta: { requireAuth: true }
        },
        {
          path: '/newMsg',
          name: 'newMsg',
          component:() => import(/* webpackChunkName: "article" */ '@/views/newMsg'),
          meta: { requireAuth: true }
        },
      ]
    }
  ]
})


router.beforeEach((to,from,next) =>{
  const token = localStorage.getItem('token');
  // console.log(token)
  if(to.path == '/'){ // 如果是跳转到登录页的
    jwt.verify(token, 'vue-koa-chen', (error,decoded) => {
      if(error){
        next(); // token验证失败跳转登录页
        return
      }
      next('/userList') // token验证成功 首页 不返回登录页
    })
  }else{
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
      jwt.verify(token, 'vue-koa-chen', (error,decoded) => {
        if(error){ // token验证失败跳转登录页
          next({
            path: '/'
          })
          return
        }
        Vue.prototype.$ajax.defaults.headers.common['Authorization'] = 'Bearer ' + token; // 全局设定header的token验证，注意Bearer后有个空格
        next() // token验证成功就正常转向
      })
    }else {
      next();
    }
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
