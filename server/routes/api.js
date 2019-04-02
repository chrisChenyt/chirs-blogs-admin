import auth from '../controllers/user.js'
import article from '../controllers/article'
import comment from '../controllers/comment'
import msgBoard from '../controllers/msgboard'
import news from '../controllers/news'
import koaRouter from 'koa-router'
const router = koaRouter()

router.post('/userList', auth.userList) //用户列表(all)
      .post('/userListPhone', auth.userListPhone) //用户列表(手机号)
      .post('/userListState', auth.userListState) //用户列表(状态)
      .post('/getUserInfo', auth.getUserInfo) //获取用户信息
      .post('/changePassword', auth.changePassword) //修改密码
      .post('/changeUserInfo', auth.changeUserInfo) //修改用户状态、权限
      .post('/userListManager', auth.userListManager) //管理员列表
      .post('/userListManagerPhone', auth.userListManagerPhone) //管理员列表(手机号)
      .post('/changeManagerInfo', auth.changeManagerInfo) //修改管理员状态、权限

      .post('/articleList', article.articleList) // 文章列表
      .post('/articleDel', article.articleDel) // 删除文章
      .post('/articleCreate', article.articleCreate) // 发表文章（新建文章）
      .post('/draftsCreate', article.draftsCreate) // 新建草稿
      .post('/articleSave', article.articleSave) // 保存草稿
      .post('/draftsPublish', article.draftsPublish) // 发表草稿、文章更新
      .post('/articleDrafts', article.articleDrafts) // 草稿箱
      .post('/articleReview', article.articleReview) // 查看文章

      .post('/commentList', comment.commentList) // 文章评论
      .post('/commentDel', comment.commentDel) // 删除文章评论
      .post('/delReply', comment.delReply) // 删除文章评论回复
      .post('/commentReply', comment.commentReply) // 回复评论
      
      .post('/msgList', msgBoard.msgList) // 留言板
      .post('/msgDel', msgBoard.msgDel) // 删除留言
      .post('/msgReply', msgBoard.msgReply) // 回复留言
      .post('/delMsgReply', msgBoard.delMsgReply) // 删除留言回复

      .post('/news', news.news) // 未读消息
      .post('/commentRead', news.commentRead) // 评论全部已读
      .post('/msgRead', news.msgRead) // 留言全部已读
      .post('/pvRead', news.pvRead) // 浏览全部已读
      .post('/likeRead', news.likeRead) // 点赞全部已读

module.exports = router;