const db  = require('../config/db.js'); 
const articleModel = '../schema/articleSchema.js'// 引入表结构
const blogsDb = db.blogs // 引入数据库
const Article = blogsDb.import(articleModel) // 用sequelize的import方法引入表结构，实例化了Article。

// 全部文章(按时间降序)
const articleList = async function (pageNum,pageSize) {
  //  参数 pageNum 就是当前是第几页
  //  参数 pageSize 是每次查询几条数据
  let offset = (pageNum - 1) * pageSize;
  const articleList = await Article.findAndCountAll({
    limit: parseInt(pageSize),
    offset,
    order: [['date', 'DESC']],
    where: {
      publish: 'true'
    },
    attributes: ['articleId','title','abstract','original','tag','tag1','tag2','likeNum','pv','commentNum','date']
  }).then(res => {
    let result = {};
    result.data = res.rows;
    result.totalCount = res.count;
    return result;
  });
  return articleList
}
// 全部文章数量
const articleListNum = async function (pageNum,pageSize) {
  //  参数 pageNum 就是当前是第几页
  //  参数 pageSize 是每次查询几条数据
  let offset = (pageNum - 1) * pageSize;
  const articleListNum = await Article.findAndCountAll({
    limit: parseInt(pageSize),
    offset,
    where: {
      publish: 'true'
    }
  }).then(res => {
    return res.count;
  });
  return articleListNum
}
// 全部文章(前5浏览量)
const articlePv = async function (pageNum,pageSize) {
  //  参数 pageNum 就是当前是第几页
  //  参数 pageSize 是每次查询几条数据
  let offset = (pageNum - 1) * pageSize;
  const articlePv = await Article.findAndCountAll({
    limit: parseInt(pageSize),
    offset,
    order: [['pv', 'DESC']],
    where: {
      publish: 'true'
    },
    attributes: ['title','tag','tag1','tag2','articleId']
  }).then(res => {
    let result = res.rows;
    return result;
  });
  return articlePv
}

// 全部文章(前8评论量)
const articleCommentNum = async function (pageNum,pageSize) {
  //  参数 pageNum 就是当前是第几页
  //  参数 pageSize 是每次查询几条数据
  let offset = (pageNum - 1) * pageSize;
  const articleCommentNum = await Article.findAndCountAll({
    limit: parseInt(pageSize),
    offset,
    order: [['commentNum', 'DESC']],
    where: {
      publish: 'true'
    },
    attributes: ['title','tag','tag1','tag2','articleId']
  }).then(res => {
    let result = res.rows;
    return result;
  });
  return articleCommentNum
}
// 全部文章(前6赞量)
const articleLikeNum = async function (pageNum,pageSize) {
  //  参数 pageNum 就是当前是第几页
  //  参数 pageSize 是每次查询几条数据
  let offset = (pageNum - 1) * pageSize;
  const articleLikeNum = await Article.findAndCountAll({
    limit: parseInt(pageSize),
    offset,
    order: [['likeNum', 'DESC']],
    where: {
      publish: 'true'
    },
    attributes: ['title','tag','tag1','tag2','articleId']
  }).then(res => {
    let result = res.rows;
    return result;
  });
  return articleLikeNum
}

// 草稿箱
const articleDrafts = async function (pageNum,pageSize) {
  //  参数 pageNum 就是当前是第几页
  //  参数 pageSize 是每次查询几条数据
  let offset = (pageNum - 1) * pageSize;
  const list = await Article.findAndCountAll({
    limit: parseInt(pageSize),
    offset,
    order: [['date', 'DESC']],
    where: {
      publish: 'false'
    },
    attributes: ['articleId','title','abstract','tag','tag1','tag2','likeNum','pv','commentNum','date']
  }).then(res => {
    let result = {};
    result.data = res.rows;
    result.totalCount = res.count;
    return result;
  });
  return list
}

const articleListFind = async function (pageNum,pageSize,articleTag) {
  //  参数 pageNum 就是当前是第几页
  //  参数 pageSize 是每次查询几条数据
  let offset = (pageNum - 1) * pageSize;
  const articleList = await Article.findAndCountAll({
    limit: parseInt(pageSize),
    offset,
    order: [['date', 'DESC']],
    where: {
      publish: 'true',
      $or: [
        {tag1: articleTag},
        {tag2: articleTag}
      ]
    },
  }).then(res => {
    let result = {};
    result.data = res.rows;
    result.totalCount = res.count;
    return result;
  });
  return articleList
}
// 按类型查询文章 tech、work、life
const articleListType = async function (pageNum,pageSize,articleType,order) {
  //  参数 pageNum 就是当前是第几页
  //  参数 pageSize 是每次查询几条数据
  let offset = (pageNum - 1) * pageSize;
  const articleList = await Article.findAndCountAll({
    limit: parseInt(pageSize),
    offset,
    order: [[order, 'DESC']],
    where: {
      publish: 'true',
      type: articleType
    },
    attributes: ['title','tag','tag1','tag2','articleId','original','abstract','date']
  }).then(res => {
    let result = {};
    result.data = res.rows;
    result.totalCount = res.count;
    return result;
  });
  return articleList
}
// 按类型查询文章 tech、work、life,和tag查询
const articleListFindType = async function (pageNum,pageSize,articleType,order,articleTag) {
  //  参数 pageNum 就是当前是第几页
  //  参数 pageSize 是每次查询几条数据
  let offset = (pageNum - 1) * pageSize;
  const articleList = await Article.findAndCountAll({
    limit: parseInt(pageSize),
    offset,
    order: [[order, 'DESC']],
    where: {
      publish: 'true',
      type: articleType,
      $or: [
        {tag1: articleTag},
        {tag2: articleTag}
      ]
    },
  }).then(res => {
    let result = {};
    result.data = res.rows;
    result.totalCount = res.count;
    return result;
  });
  return articleList
}

// 按标题模糊查询文章
const searchArticle = async function (pageNum,pageSize,articleTitle) {
  //  参数 pageNum 就是当前是第几页
  //  参数 pageSize 是每次查询几条数据
  let offset = (pageNum - 1) * pageSize;
  const articleList = await Article.findAndCountAll({
    limit: parseInt(pageSize),
    offset,
    order: [['date', 'DESC']],
    where: {
      publish: 'true',
      title: {$like: '%'+articleTitle+'%'}
    },
  }).then(res => {
    let result = {};
    result.data = res.rows;
    result.totalCount = res.count;
    return result;
  });
  return articleList
}

// 查看文章
const articleReview = async function (articleId) {
  const article = await Article.findOne({
    where: {
      articleId: articleId
    }
  })
  return article
}

// 查看文章(已发布)
const articleFind = async function (articleId) {
  const article = await Article.findOne({
    where: {
      articleId: articleId,
      publish: 'true'
    }
  })
  return article
}

// 查看文章(已发布)
const articleFindNext = async function (articleId) {
  const article = await Article.findOne({
    where: {
      articleId: articleId,
      publish: 'true'
    },
    attributes: ['title','tag','tag1','tag2','articleId']
  })
  return article
}


// 删除文章
const articleDel = async function (articleId) {
  await Article.destroy({
    where: {
      articleId: articleId
    },
  })
  return true
}

// 发表文章（新建文章）
const articleCreate = async function (data) {
  await Article.create({
    title: data.title,
    abstract: data.abstract,
    original: data.original,
    type: data.type,
    tag1: data.tag1,
    tag2: data.tag2,
    content: data.content,
    date: data.date,
    publish: 'true'
  })
  return true
}

// 新建草稿
const draftsCreate = async function (data) {
  await Article.create({
    title: data.title,
    abstract: data.abstract,
    original: data.original,
    type: data.type,
    tag1: data.tag1,
    tag2: data.tag2,
    content: data.content,
    date: data.date,
    publish: 'false'// 未发表
  })
  return true
}

// 保存草稿
const articleSave = async function (data) {
  await Article.update(
    {
      title: data.title,
      abstract: data.abstract,
      original: data.original,
      type: data.type,
      tag1: data.tag1,
      tag2: data.tag2,
      content: data.content,
      date: data.date,
    },
    {
      where: {
        articleId: data.articleId
      }
    }
  )
  return true
}

// 草稿发表、文章更新
const draftsPublish = async function (data) {
  await Article.update(
    {
      title: data.title,
      abstract: data.abstract,
      original: data.original,
      type: data.type,
      tag1: data.tag1,
      tag2: data.tag2,
      content: data.content,
      date: data.date,
      publish: 'true'
    },
    {
      where: {
        articleId: data.articleId
      }
    }
  )
  return true
}

// 更新文章“阅读”数量（pv）
const pv = async function (pv,articleId) {
  await Article.update(
    {
      pv: pv
    },
    {
      where: {
        articleId: articleId
      }
    }
  )
  return true
}

// 更新文章“赞”数量
const likeNum = async function (data) {
  await Article.update(
    {
      likeNum: data.likeNum
    },
    {
      where: {
        articleId: data.articleId
      }
    }
  )
  return true
}

// 更新文章“评论”数量
const commentNum = async function (data) {
  await Article.update(
    {
      commentNum: data.commentNum
    },
    {
      where: {
        articleId: data.articleId
      }
    }
  )
  return true
}

module.exports =  {
  articleList,
  articleListNum,
  articleListFind,
  articleDel,
  articleCreate,
  draftsCreate,
  articleSave,
  draftsPublish,
  articleReview,
  articleFind,
  articleFindNext,
  articleDrafts,
  articlePv,
  articleListType,
  articleListFindType,
  articleCommentNum,
  articleLikeNum,
  pv,
  likeNum,
  commentNum,
  searchArticle
}