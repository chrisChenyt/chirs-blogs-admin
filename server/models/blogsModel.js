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
    attributes: ['title','tag','tag1','tag2','articleId','abstract','date']
  }).then(res => {
    let result = {};
    result.data = res.rows;
    result.totalCount = res.count;
    return result;
  });
  return articleList
}
module.exports =  {
  articleList
}