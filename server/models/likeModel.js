const db  = require('../config/db.js'); 
const likeModel = '../schema/likeSchema.js'// 引入表结构
const blogsDb = db.blogs // 引入数据库
const Like = blogsDb.import(likeModel) // 用sequelize的import方法引入表结构，实例化了Article。

// 新建点赞消息
const createLike = async function (data) {
  await Like.create({
    title: data.title,
    name: data.name
  })
  return true
}

// 查询未读赞
const getLikeByRead = async function () {
  const like = await Like.findAll({
    where: {
      read: 'false'
    }
  })
  return like
}

// 设置已读
const likeRead = async function () {
  await Like.update(
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
  getLikeByRead,
  likeRead,
  createLike
}