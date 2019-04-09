const db  = require('../config/db.js');
const userModel = '../schema/user.js' // 引入user的表结构
const blogsDb = db.blogs // 引入数据库

import util from '../../src/methods/util';


const User = blogsDb.import(userModel) // 用sequelize的import方法引入表结构，实例化了User。


const register = async function (data) {
  await User.create({
    phone: data.phone,
    name: data.name,
    password: data.defaultPwd,
    register_time: util.getNowFormatDate('yyyy-MM-dd HH:mm')
  })
  return true
}

const getUserInfoByname = async function (name) {
  let userInfo = await User.findOne({
    where: {
      name: name
    },
    attributes: ['name','imgUrl']
  })
  return userInfo
}

const getUserInfo = async function (phone) {
  let userInfo = await User.findOne({
    where: {
      phone: phone
    },
    attributes: ['name','imgUrl']
  })
  return userInfo
}

const getAccountInfo = async function (phone) {
  const userInfo = await User.findOne({
    where: {
      phone: phone
    },
    attributes: ['phone', 'state', 'rule'] // 只需返回这三个字段的结果即可
  })
  return userInfo
}

const checkPassword = async function (name) {
  const userInfo = await User.findOne({
    where: {
      phone: name
    }
  })
  if(userInfo == null){
    return userInfo
  } else {
    return userInfo.toJSON()
  }
}

const changePassword = async function (phone, password) {
  await User.update(
    {
      password
    },
    {
      where: {
        phone: phone
      }
    }
  )
  return true
}
const changeUserInfo = async function (phone, state, rule) {
  await User.update(
    {
      state,
      rule
    },
    {
      where: {
        phone: phone
      }
    }
  )
  return true
}
const changeManagerInfo = async function (phone, state, rule) {
  await User.update(
    {
      state,
      rule
    },
    {
      where: {
        rule: {
          $like: '%管理员%',
        },
        phone: phone
      }
    }
  )
  return true
}

const userList = async function (pageNum,pageSize) {
  //  参数 pageNum 就是当前是第几页
  //  参数 pageSize 是每次查询几条数据
  let offset = (pageNum - 1) * pageSize;
  const userList = await User.findAndCountAll({
    limit: parseInt(pageSize),
    offset,
    attributes: ['user_id', 'name', 'phone', 'register_time'] // 只需返回这三个字段的结果即可
  }).then(res => {
    let result = {};
    result.data = res.rows;
    result.totalCount = res.count;
    return result;
  });
  return userList
}

const userListPhone = async function (pageNum,pageSize,phone) {
  //  参数 pageNum 就是当前是第几页
  //  参数 pageSize 是每次查询几条数据
  let offset = (pageNum - 1) * pageSize;
  const userListPhone = await User.findAndCountAll({
    where: {
      phone: phone
    },
    limit: parseInt(pageSize),
    offset,
    attributes: ['user_id', 'name', 'phone', 'register_time'] // 只需返回这三个字段的结果即可
  }).then(res => {
    let result = {};
    result.data = res.rows;
    result.totalCount = res.count;
    return result;
  });
  return userListPhone
}
const userListState = async function (pageNum,pageSize,state) {
  //  参数 pageNum 就是当前是第几页
  //  参数 pageSize 是每次查询几条数据
  let offset = (pageNum - 1) * pageSize;
  const userListState = await User.findAndCountAll({
    where: {
      state: state
    },
    limit: parseInt(pageSize),
    offset,
    attributes: ['user_id', 'name', 'phone', 'register_time'] // 只需返回这三个字段的结果即可
  }).then(res => {
    let result = {};
    result.data = res.rows;
    result.totalCount = res.count;
    return result;
  });
  return userListState
}

const userListManager = async function (pageNum,pageSize) {
  //  参数 pageNum 就是当前是第几页
  //  参数 pageSize 是每次查询几条数据
  let offset = (pageNum - 1) * pageSize;
  const userListState = await User.findAndCountAll({
    where: {
      rule: {
        $like: '%管理员%',
      }
    },
    limit: parseInt(pageSize),
    offset,
    attributes: ['user_id', 'name', 'phone', 'register_time'] // 只需返回这三个字段的结果即可
  }).then(res => {
    let result = {};
    result.data = res.rows;
    result.totalCount = res.count;
    return result;
  });
  return userListState
}
const userListManagerPhone = async function (pageNum,pageSize,phone) {
  //  参数 pageNum 就是当前是第几页
  //  参数 pageSize 是每次查询几条数据
  let offset = (pageNum - 1) * pageSize;
  const userListManagerPhone = await User.findAndCountAll({
    where: {
      rule: {
        $like: '%管理员%',
      },
      phone: phone
    },
    limit: parseInt(pageSize),
    offset,
    attributes: ['user_id', 'name', 'phone', 'register_time'] // 只需返回这三个字段的结果即可
  }).then(res => {
    let result = {};
    result.data = res.rows;
    result.totalCount = res.count;
    return result;
  });
  return userListManagerPhone
}


module.exports =  {
  checkPassword,
  register,
  getUserInfo,
  getUserInfoByname,
  getAccountInfo,
  changeUserInfo,
  userList,
  userListPhone,
  userListState,
  changePassword,
  userListManager,
  userListManagerPhone,
  changeManagerInfo
}