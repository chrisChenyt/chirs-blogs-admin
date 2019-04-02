const commentModel = require('../models/commentModel');

const commentList = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  let list = ''
  if(data.title){
    list = await commentModel.commentListFind(data.pageNum,data.pageSize,data.title) // 通过await “同步”地返回查询结果
  } else{
    list = await commentModel.commentList(data.pageNum,data.pageSize) // 通过await “同步”地返回查询结果
  }
  ctx.body = {
    list
  }
}

const commentDel = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  const success = await commentModel.commentDel(data.commentId)
  const list = await commentModel.commentList(1,10) // 通过await “同步”地返回查询结果
  ctx.body = {
    success,
    list
  }
}

const delReply = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  let commentCon =  await commentModel.getCommentById(data.commentId)
  let reply = commentCon.reply
  let index = ''
  for(let j = 0,len = reply.length; j < len; j++){
    if(reply[j]._id == data._id){
      index = j
    }
  }
  reply.splice(index,1)

  const success = await commentModel.delReply(reply, data.commentId)
  const list = await commentModel.commentList(1,10)
  ctx.body = {
    success,
    list
  }
}

const commentReply = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  let commentCon =  await commentModel.getCommentById(data.commentId)
  let reply = commentCon.reply
  reply.push(data.newReply)

  const success = await commentModel.commentReply(reply, data.commentId)
  const list = await commentModel.commentList(1,10)
  ctx.body = {
    success,
    list
  }
}

module.exports =  {
  commentList,
  commentDel,
  delReply,
  commentReply
}