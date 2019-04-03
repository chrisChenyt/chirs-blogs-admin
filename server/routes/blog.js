
import article from '../controllers/article'
import blogs from '../controllers/blogs'
import comment from '../controllers/comment'
import msgBoard from '../controllers/msgboard'
import news from '../controllers/news'
import koaRouter from 'koa-router'
const router = koaRouter()

router.post('/articleList', article.articleList) // 文章列表
      .post('/index', blogs.index) // 博客首页
      .post('/techArticle', blogs.techArticle) // 技术分享文章页
      .post('/workArticle', blogs.workArticle) // 工作日记文章页
      .post('/lifeArticle', blogs.lifeArticle) // 生活感悟文章页
      .post('/articleShow', blogs.articleShow) // 文章详情

      .post('/searchArticle', blogs.searchArticle) // 搜索文章

      .post('/commentList', blogs.commentList) // 文章评论列表
      .post('/leaveComment', blogs.leaveComment) // 新建文章评论
      .post('/commentReply', blogs.commentReply) // 评论回复

      .post('/msgList', blogs.msgList) // 留言板
      .post('/leaveMsg', blogs.leaveMsg) // 新建留言
      .post('/msgReply', blogs.msgReply) // 留言回复

      .post('/likeArticle', blogs.likeArticle) // 文章点赞
      .post('/createPv', blogs.createPv) // 文章浏览

      .get('/captcha', blogs.captcha) // 图形验证码
      .post('/login', blogs.userLogin) // 登录
      .post('/register', blogs.register) // 注册

module.exports = router;