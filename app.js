const Koa = require('koa');
const json = require('koa-json');
const logger = require('koa-logger');
const auth = require('./server/routes/auth.js');
const api = require('./server/routes/api.js');
const blog = require('./server/routes/blog.js');
const koaRouter  = require( 'koa-router');
const koaBodyparser  = require( 'koa-bodyparser');
const jwt = require('koa-jwt');
const session = require('koa-session');


const app = new Koa()
const router = koaRouter()


const ueditor = require('koa2-ueditor')
 
router.all('/app/ueditor/UE', ueditor(['static',{
  "imageAllowFiles": [".png", ".jpg", ".jpeg"],
  "imagePathFormat": "/upload/img/{yyyy}{mm}{dd}_{rand:6}",
  "imageUrlPrefix": "http://blogs-erp.cweb.fun/static"
}]))

app.use(koaBodyparser({
  "formLimit":"5mb",
  "jsonLimit":"5mb",
  "textLimit":"5mb"
}))
app.use(json())
app.use(logger())

app.keys = ['some secret hurr'];
const CONFIG = {
  key: 'koa:sess',   //cookie key (default is koa:sess)
  maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
  overwrite: true,  //是否可以overwrite    (默认default true)
  httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
  signed: true,   //签名默认true
  rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
  renew: false,  //(boolean) renew session when session is nearly expired,
}
app.use(session(CONFIG, app))

app.use(async function (ctx, next) {
  let start = new Date()
  await next()
  let ms = new Date() - start
  console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

app.use(async function (ctx, next) {  //  如果JWT验证失败，返回验证失败信息
  try {
    await next()
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        success: false,
        token: null,
        info: 'Protected resource, use Authorization header to get access'
      }
    } else {
      throw err
    }
  }
})

app.on('error', function (err, ctx) {
  console.log('server error', err)
})

router.use('/auth', auth.routes()) // 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。
router.use("/api",jwt({secret: 'vue-koa-chen'}),api.routes()) // 所有走/api/打头的请求都需要经过jwt中间件的验证。secret密钥必须跟我们当初签发的secret一致
router.use("/blog",blog.routes())

app.use(router.routes()) // 将路由规则挂载到Koa上。

app.listen(8888,() => {
  console.log('Koa is listening in 8888');
});

module.exports = app;