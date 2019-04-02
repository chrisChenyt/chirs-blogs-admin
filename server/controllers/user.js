const user = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// 登录账户
const userLogin = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  const userInfo = await user.checkPassword(data.phone)
  if (userInfo != null) { // 如果查无此用户会返回null
    if (!bcrypt.compareSync(data.password, userInfo.password)) {
      ctx.body = {
        success: false, // success标志位是方便前端判断返回是正确与否
        message: '密码错误！'
      }
    } else {
      const payload = {
        name: userInfo.name,
        userId: userInfo.user_id,
        phone: userInfo.phone,
      }
      const secret = 'vue-koa-chen' // 指定密钥
      const token = jwt.sign(payload, secret, {expiresIn: "7d"}) // 签发token
      ctx.body = {
        success: true,
        token: token // 返回token
      }
    }
  } else {
    ctx.body = {
      success: false,
      message: '该用户不存在！' // 如果用户不存在返回用户不存在
    }
  }
}

// 修改密码
const changePassword = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  const userInfo = await user.checkPassword(data.phone)
  if (!bcrypt.compareSync(data.oldPassword, userInfo.password)) {
    ctx.body = {
      success: false,
      message: '旧密码错误！'
    }
  } else {
    //生成salt的迭代次数
    const saltRounds = 10;
    //随机生成salt
    const salt = bcrypt.genSaltSync(saltRounds);
    //获取hash值
    var hash = bcrypt.hashSync(data.newPassword, salt);
    //把hash值赋值给password变量
    data.newPassword = hash;
    const success = await user.changePassword(data.phone, data.newPassword)
    ctx.body = {
      success
    }
  }
}

// 修改用户状态、权限
const changeUserInfo = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  const success = await user.changeUserInfo(data.phone, data.state, data.rule)
  const list = await user.userList(1,10)
  ctx.body = {
    success,
    list
  }
}

const changeManagerInfo = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  const success = await user.changeManagerInfo(data.phone, data.state, data.rule)
  const list = await user.userListManager(1,10)
  ctx.body = {
    success,
    list
  }
}

const getUserInfo = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  const list = await user.getAccountInfo(data.phone) // 通过await “同步”地返回查询结果
  ctx.body = {
    list
  }
}

const userList = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  const list = await user.userList(data.pageNum,data.pageSize) // 通过await “同步”地返回查询结果
  ctx.body = {
    list
  }
}
const userListPhone = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  let list = '';
  if(data.phone == ''){
    list = await user.userList(data.pageNum,data.pageSize)
  }else{
    list = await user.userListPhone(data.pageNum,data.pageSize,data.phone) // 通过await “同步”地返回查询结果
  }
  ctx.body = {
    list
  }
}
const userListState = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  let list = '';
  if(data.state == ''){
    list = await user.userList(data.pageNum,data.pageSize)
  }else{
    let state = ''
    if(data.state == 0){
      state = '禁用'
    } else if(data.state == 1) {
      state = '正常'
    }
    list = await user.userListState(data.pageNum,data.pageSize,state) // 通过await “同步”地返回查询结果
  }
ctx.body = {
    list
  }
}

const userListManager = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  const list = await user.userListManager(data.pageNum,data.pageSize) // 通过await “同步”地返回查询结果
  ctx.body = {
    list
  }
}

const userListManagerPhone = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  let list =''
  if(data.phone == '') {
    list = await user.userListManager(data.pageNum,data.pageSize) // 通过await “同步”地返回查询结果
  } else {
    list = await user.userListManagerPhone(data.pageNum,data.pageSize,data.phone) // 通过await “同步”地返回查询结果
  }
  ctx.body = {
    list
  }
}

module.exports =  {
  userLogin,
  changeUserInfo,
  getUserInfo,
  userList,
  userListPhone,
  changePassword,
  userListManager,
  userListManagerPhone,
  changeManagerInfo,
  userListState
}