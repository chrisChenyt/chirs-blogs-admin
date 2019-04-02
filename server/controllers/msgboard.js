const msgModel = require('../models/msgModel');

const msgList = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  let list = await msgModel.msgList(data.pageNum,data.pageSize) // 通过await “同步”地返回查询结果
  ctx.body = {
    list
  }
}

const msgDel = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  const success = await msgModel.msgDel(data.commentId)
  const list = await msgModel.msgList(1,10) // 通过await “同步”地返回查询结果
  ctx.body = {
    success,
    list
  }
}

const msgReply = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  let msgCon =  await msgModel.getMessageById(data.commentId)
  let reply = msgCon.reply
  reply.push(data.newReply)

  const success = await msgModel.msgReply(reply, data.commentId)
  const list = await msgModel.msgList(1,10)
  ctx.body = {
    success,
    list
  }
}


const delMsgReply = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  let msgCon =  await msgModel.getMessageById(data.commentId)
  let reply = msgCon.reply
  let index = ''
  for(let j = 0,len = reply.length; j < len; j++){
    if(reply[j]._id == data._id){
      index = j
    }
  }
  reply.splice(index,1)

  const success = await msgModel.delMsgReply(reply, data.commentId)
  const list = await msgModel.msgList(1,10)
  ctx.body = {
    success,
    list
  }
}

module.exports =  {
  msgList,
  msgReply,
  delMsgReply,
  msgDel
}