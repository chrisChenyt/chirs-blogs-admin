const db  = require('../config/db.js'); 
const pvModel = '../schema/pvSchema.js'// 引入表结构
const blogsDb = db.blogs // 引入数据库
const Pv = blogsDb.import(pvModel) // 用sequelize的import方法引入表结构，实例化了Article。

// 新建浏览消息
const createPv = async function (data) {
  await Pv.create({
    title: data.title,
    name: data.name
  })
  return true
}

// 查询未读浏览
const getPvByRead = async function () {
  const pv = await Pv.findAndCountAll({
    where: {
      read: 'false'
    }
  }).then(res => {
    let result = {};
    result.list = res.rows;
    result.totalCount = res.count;
    return result;
  });
  return pv
}


// 设置已读
const pvRead = async function () {
  await Pv.update(
    {
      read: 'true'
    },
    {
      where: {
        read: 'false'
      }
    }
  )
  return true
}

module.exports =  {
  getPvByRead,
  pvRead,
  createPv
}