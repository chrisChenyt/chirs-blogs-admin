const articleModel = require('../models/articleModel');
const commentModel = require('../models/commentModel');
const msgModel = require('../models/msgModel');
const likeModel = require('../models/likeModel');
const pvModel = require('../models/pvModel');
const blogModel = require('../models/blogsModel');
const captchapng  = require( 'captchapng');
const user = require('../models/user');
const bcrypt = require('bcryptjs');

const index = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  const list = await blogModel.articleList(data.pageNum,data.pageSize) // 通过await “同步”地返回查询结果
  const sort = await articleModel.articlePv(1,5)
  let tabList = {}
  tabList.tech = await articleModel.articleListType(1,5,"tech","commentNum")
  tabList.work = await articleModel.articleListType(1,5,"work","commentNum")
  tabList.life = await articleModel.articleListType(1,5,"life","commentNum")
  const thinklike = await articleModel.articleLikeNum(1,8)
  const recommend = await articleModel.articleCommentNum(1,6)
  ctx.body = {
    list,
    sort,
    tabList,
    thinklike,
    recommend
  }
}

const techArticle = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  let list = ''
  if(data.articleTag){
    list = await articleModel.articleListFindType(data.pageNum,data.pageSize,"tech","date",data.articleTag) // 通过await “同步”地返回查询结果
  } else{
    list = await articleModel.articleListType(data.pageNum,data.pageSize,"tech","date") // 通过await “同步”地返回查询结果
  }
  const sort = await articleModel.articlePv(1,5)
  const recommend = await articleModel.articleCommentNum(1,6)
  ctx.body = {
    list,
    sort,
    recommend
  }
}

const lifeArticle = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  let list = await articleModel.articleListType(data.pageNum,data.pageSize,"life","date") // 通过await “同步”地返回查询结果
  const sort = await articleModel.articlePv(1,5)
  const recommend = await articleModel.articleCommentNum(1,6)
  ctx.body = {
    list,
    sort,
    recommend
  }
}
const workArticle = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  let list = await articleModel.articleListType(data.pageNum,data.pageSize,"work","date") // 通过await “同步”地返回查询结果
  const sort = await articleModel.articlePv(1,5)
  const recommend = await articleModel.articleCommentNum(1,6)
  ctx.body = {
    list,
    sort,
    recommend
  }
}

const searchArticle = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  let list = await articleModel.searchArticle(data.pageNum,data.pageSize,data.title) // 通过await “同步”地返回查询结果
  const sort = await articleModel.articlePv(1,5)
  const recommend = await articleModel.articleCommentNum(1,6)
  ctx.body = {
    list,
    sort,
    recommend
  }
}

const articleShow = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  let curId = data.articleId,
      nextId = parseInt(curId)+1,
      preId = parseInt(curId)-1
  let article = await articleModel.articleFind(curId)
  let pvNum = parseInt(article.pv)+1
  // 更新阅读量
  await articleModel.pv(pvNum,curId)
  let pre_next = {}
  pre_next.next = await articleModel.articleFind(nextId)
  pre_next.pre = await articleModel.articleFind(preId)
  const sort = await articleModel.articlePv(1,5)
  const thinklike = await articleModel.articleLikeNum(1,8)
  const recommend = await articleModel.articleCommentNum(1,6)
  const comment = await commentModel.commentListId(1,8,data.articleId)
  const list = await articleModel.articleFind(curId)
  ctx.body = {
    list,
    pre_next,
    sort,
    thinklike,
    recommend,
    comment
  }
}


const commentList = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  let list = await commentModel.commentListId(data.pageNum,data.pageSize,data.articleId) // 通过await “同步”地返回查询结果
  ctx.body = {
    list
  }
}

const msgList = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  let list = await msgModel.msgList(data.pageNum,data.pageSize) // 通过await “同步”地返回查询结果
  ctx.body = {
    list
  }
}

const commentReply = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  let commentCon =  await commentModel.getCommentById(data.commentId)
  let reply = commentCon.reply
  reply.push(data.newReply)

  const success = await commentModel.commentReply(reply, data.commentId)
  const list = await commentModel.commentListId(1,8,data.newReply.articleId)
  ctx.body = {
    success,
    list
  }
}

const leaveComment = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  const success = await commentModel.leaveComment(data)
  const list = await commentModel.commentListId(1,8,data.articleId)
  const ar = await articleModel.articleReview(data.articleId)
  data.commentNum = parseInt(ar.commentNum)+1
  await articleModel.commentNum(data)
  const article = await articleModel.articleReview(data.articleId)
  ctx.body = {
    success,
    list,
    article
  }
}

const msgReply = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  let msgCon =  await msgModel.getMessageById(data.commentId)
  let reply = msgCon.reply
  reply.push(data.newReply)

  const success = await msgModel.msgReply(reply, data.commentId)
  const list = await msgModel.msgList(1,8)
  ctx.body = {
    success,
    list
  }
}

const leaveMsg = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  const success = await msgModel.leaveMsg(data)
  const list = await msgModel.msgList(1,8)
  ctx.body = {
    success,
    list
  }
}

const createPv = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  const success = await pvModel.createPv(data)
  ctx.body = {
    success
  }
}

const likeArticle = async function (ctx) {
  let data = ctx.request.body // post过来的数据存在request.body里
  const success = await likeModel.createLike(data)
  const article = await articleModel.articleReview(data.articleId)
  data.likeNum = parseInt(article.likeNum)+1
  await articleModel.likeNum(data)
  const list = await articleModel.articleReview(data.articleId)
  ctx.body = {
    success,
    list
  }
}

// 图形验证码
const captcha = async function (ctx) {
  const cap = parseInt(Math.random() * 9000 + 1000);//随机生成数字
  ctx.session.captcha = cap;// 存入session
  const p = new captchapng(80, 30, cap);//生成图片
  p.color(0, 0, 0, 0);
  p.color(80, 80, 80, 255);
  const img = p.getBase64();
  const imgbase64 = new Buffer(img, 'base64');
  ctx.status = 200;
  ctx.type = 'image/png';
  ctx.body = imgbase64
}

// 登录账户
const userLogin = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  const userInfo = await user.getUserInfo(data.phone)
  if (userInfo != null) { // 如果查无此用户会返回null
    if(ctx.session.captcha == data.imgCode){// 与session中的验证码对比
      ctx.body = {
        success: true,
        userInfo: userInfo
      }
    }else{
      ctx.body = {
        success: false,
        errorType: 'imgCode',
        message: '图形验证码错误'
      }
    }
  } else {
    ctx.body = {
      success: false,
      errorType: 'phone',
      message: '喔唷~该账号不存在...请先注册？' // 如果用户不存在返回用户不存在
    }
  }
}

// 注册账户
const register = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  const userInfo = await user.getUserInfo(data.phone)
  if (userInfo != null) { // 如果查无此用户会返回null
    ctx.body = {
      success: false,
      errorType: 'phone',
      message: '喔唷~该账号已注册...请登录？' // 如果用户存在
    }
  } else {
    const userInfoName = await user.getUserInfoByname(data.name)
    if(userInfoName!= null){
      ctx.body = {
        success: false,
        errorType: 'name',
        message: '喔唷~该昵称已被注册...换一个试试？' // 如果昵称存在
      }
    }else{
      if(ctx.session.captcha == data.imgCode){// 与session中的验证码对比
        // 设置默认密码 123456
        const defaultPwd = '123456';
        //生成salt的迭代次数
        const saltRounds = 10;
        //随机生成salt
        const salt = bcrypt.genSaltSync(saltRounds);
        //获取hash值
        var hash = bcrypt.hashSync(defaultPwd, salt);
        //把hash值赋值给password变量
        data.defaultPwd = hash;
        const success = await user.register(data)
        const userinfo = await user.getUserInfo(data.phone)
        ctx.body = {
          success,
          userInfo: userinfo
        }
      }else{
        ctx.body = {
          success: false,
          errorType: 'imgCode',
          message: '图形验证码错误'
        }
      }
    }
  }
}

module.exports =  {
  index,
  techArticle,
  lifeArticle,
  workArticle,
  articleShow,
  commentList,
  msgList,
  commentReply,
  msgReply,
  leaveMsg,
  leaveComment,
  likeArticle,
  createPv,
  captcha,
  userLogin,
  register,
  searchArticle
}