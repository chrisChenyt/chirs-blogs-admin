const articleModel = require('../models/articleModel');

const articleList = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  let list = ''
  if(data.articleTag){
    list = await articleModel.articleListFind(data.pageNum,data.pageSize,data.articleTag) // 通过await “同步”地返回查询结果
  } else{
    list = await articleModel.articleList(data.pageNum,data.pageSize) // 通过await “同步”地返回查询结果
  }
  ctx.body = {
    list
  }
}

const articleDrafts = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  const list = await articleModel.articleDrafts(data.pageNum,data.pageSize) // 通过await “同步”地返回查询结果
  ctx.body = {
    list
  }
}

const articleDel = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  const success = await articleModel.articleDel(data.articleId)
  let list = ''
  if(data.articleTag){
    list = await articleModel.articleListFind(1,10,data.articleTag) // 通过await “同步”地返回查询结果
  } else{
    list = await articleModel.articleList(1,10) // 通过await “同步”地返回查询结果
  }
  ctx.body = {
    success,
    list
  }
}

const articleCreate = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  const success = await articleModel.articleCreate(data)
  ctx.body = {
    success
  }
}

const draftsCreate = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  const success = await articleModel.draftsCreate(data)
  ctx.body = {
    success
  }
}

const articleSave = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  const success = await articleModel.articleSave(data)
  ctx.body = {
    success
  }
}

const draftsPublish = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  const success = await articleModel.draftsPublish(data)
  ctx.body = {
    success
  }
}

const articleReview = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  const article = await articleModel.articleReview(data.articleId)
  ctx.body = {
    article
  }
}

module.exports =  {
  articleList,
  articleDel,
  articleCreate,
  draftsCreate,
  articleSave,
  draftsPublish,
  articleReview,
  articleDrafts
}