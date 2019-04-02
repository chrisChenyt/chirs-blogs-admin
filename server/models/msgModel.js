const db  = require('../config/db.js'); 
const msgModel = '../schema/msgSchema.js'// 引入表结构
const blogsDb = db.blogs // 引入数据库
const Message = blogsDb.import(msgModel) // 用sequelize的import方法引入表结构，实例化了Article。

// 留言板
const msgList = async function (pageNum,pageSize) {
  //  参数 pageNum 就是当前是第几页
  //  参数 pageSize 是每次查询几条数据
  let offset = (pageNum - 1) * pageSize;
  const list = await Message.findAndCountAll({
    limit: parseInt(pageSize),
    offset,
    order: [['date', 'DESC']]
  }).then(res => {
    let result = {};
    result.data = res.rows;
    result.totalCount = res.count;
    return result;
  });
  return list
}

// 根据id查询
const getMessageById = async function (commentId) {
  const message = await Message.findOne({
    where: {
      commentId: commentId
    },
    attributes: ['reply'] // 只需返回reply即可
  })
  return message
}

// 查询未读留言
const getMessageByRead = async function () {
  const message = await Message.findAll({
    where: {
      read: 'false'
    },
    order: [['date', 'DESC']],
    attributes: {exclude:['reply','imgUrl']}
  })
  return message
}

// 设置已读
const msgRead = async function () {
  await Message.update(
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

// 删除留言
const msgDel = async function (commentId) {
  await Message.destroy({
    where: {
      commentId: commentId
    }
  })
  return true
}

// 回复留言
const msgReply = async function (reply, commentId) {
  await Message.update(
    {
      reply
    },
    {
      where: {
        commentId: commentId
      }
    }
  )
  return true
}

// 删除留言回复
const delMsgReply = async function (reply, commentId) {
  await Message.update(
    {
      reply
    },
    {
      where: {
        commentId: commentId
      }
    }
  )
  return true
}

// 新建留言
const leaveMsg = async function (msg) {
  await Message.create({
    name: msg.name,
    content: msg.content,
    date: msg.date,
    reply: [],
    imgUrl: msg.imgUrl
  })
  return true
}


module.exports =  {
  msgList,
  getMessageById,
  getMessageByRead,
  msgDel,
  msgReply,
  delMsgReply,
  msgRead,
  leaveMsg
}