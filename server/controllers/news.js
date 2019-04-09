const commentModel = require('../models/commentModel');
const msgModel = require('../models/msgModel');
const pvModel = require('../models/pvModel');
const likeModel = require('../models/likeModel');

const news = async function (ctx) {
  let news = {};
  news.comment = await commentModel.getCommentByRead()
  news.msgboard = await msgModel.getMessageByRead()
  news.like = await likeModel.getLikeByRead()
  let pvList = await pvModel.getPvByRead(1,15)
  news.pv = pvList.list
  news.pvNum = pvList.totalCount
  ctx.body = {
    news
  }
}

const commentRead = async function (ctx) {
  const success = await commentModel.commentRead()
  ctx.body = {
    success
  }
}

const msgRead = async function (ctx) {
  const success = await msgModel.msgRead()
  ctx.body = {
    success
  }
}

const pvRead = async function (ctx) {
  const success = await pvModel.pvRead()
  ctx.body = {
    success
  }
}

const likeRead = async function (ctx) {
  const success = await likeModel.likeRead()
  ctx.body = {
    success
  }
}

module.exports =  {
  news,
  commentRead,
  msgRead,
  pvRead,
  likeRead
}