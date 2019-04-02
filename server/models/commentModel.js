const db  = require('../config/db.js'); 
const commentModel = '../schema/commentSchema.js'// 引入表结构
const blogsDb = db.blogs // 引入数据库
const Comment = blogsDb.import(commentModel) // 用sequelize的import方法引入表结构，实例化了Article。

// 全部文章
const commentList = async function (pageNum,pageSize) {
  //  参数 pageNum 就是当前是第几页
  //  参数 pageSize 是每次查询几条数据
  let offset = (pageNum - 1) * pageSize;
  const list = await Comment.findAndCountAll({
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

// 按标题搜索评论
const commentListFind = async function (pageNum,pageSize,title) {
  //  参数 pageNum 就是当前是第几页
  //  参数 pageSize 是每次查询几条数据
  let offset = (pageNum - 1) * pageSize;
  const list = await Comment.findAndCountAll({
    limit: parseInt(pageSize),
    offset,
    order: [['date', 'DESC']],
    where: {
      title: {
        $like: '%'+title+'%'
      }
    }
  }).then(res => {
    let result = {};
    result.data = res.rows;
    result.totalCount = res.count;
    return result;
  });
  return list
}

// 按文章id搜索评论
const commentListId = async function (pageNum,pageSize,articleId) {
  //  参数 pageNum 就是当前是第几页
  //  参数 pageSize 是每次查询几条数据
  let offset = (pageNum - 1) * pageSize;
  const list = await Comment.findAndCountAll({
    limit: parseInt(pageSize),
    offset,
    order: [['date', 'DESC']],
    where: {
      aritcleId: articleId
    }
  }).then(res => {
    let result = {};
    result.data = res.rows;
    result.totalCount = res.count;
    return result;
  });
  return list
}

// 根据id查询
const getCommentById = async function (commentId) {
  const comment = await Comment.findOne({
    where: {
      commentId: commentId
    },
    attributes: ['reply'] // 只需返回reply即可
  })
  return comment
}

// 查询未读评论
const getCommentByRead = async function () {
  const comment = await Comment.findAll({
    where: {
      read: 'false'
    },
    order: [['date', 'DESC']],
    attributes: {exclude:['reply','imgUrl']}
  })
  return comment
}


// 设置已读
const commentRead = async function () {
  await Comment.update(
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


// 删除文章评论
const commentDel = async function (commentId) {
  await Comment.destroy({
    where: {
      commentId: commentId
    },
  })
  return true
}

// 删除文章回复
const delReply = async function (reply, commentId) {
  await Comment.update(
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

// 回复评论
const commentReply = async function (reply, commentId) {
  await Comment.update(
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

// 新建文章评论
const leaveComment = async function (comment) {
  await Comment.create({
    name: comment.name,
    content: comment.content,
    date: comment.date,
    reply: [],
    imgUrl: comment.imgUrl,
    aritcleId: comment.articleId,
    title: comment.title
  })
  return true
}

module.exports =  {
  commentList,
  commentListFind,
  commentDel,
  delReply,
  commentReply,
  getCommentById,
  getCommentByRead,
  commentRead,
  commentListId,
  leaveComment
}