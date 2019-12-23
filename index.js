import Koa from 'koa';
import koaBody from 'koa-body';
import controller from './controller';
import token from './global/token';

const app = new Koa();
// app.use(bodyParser());
app.use(
  koaBody({
    multipart: true, // 支持文件上传
    formidable: {
      // uploadDir: path.join(__dirname, 'upload/'), // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 2 * 1024 * 1024 // 文件上传大小
    }
  })
);
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, token');
  ctx.set('Content-Type', 'application/json;charset=utf-8');
  ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
    return;
  }
  if (!ctx.request.body.noToken) {
    if (ctx.headers.token) {
      // 如果token传过来了
      let data = token.verifyToken(ctx.headers.token);
      if (!data && !['/login', '/register'].includes(ctx.request.url)) {
        // 如果返回flase证明过期了， 但是登陆注册不用管
        ctx.response.status = 401;
        ctx.body = Object.assign({
          message: 'token 失效了，请重新登录!',
          success: false
        });
        return;
      }
      ctx.request.body.currentId = data.id || '';
      ctx.request.body.company = data.company || '';
    } else if (!['/login', 'uploads', '/register', '/uploadfiles', '/weather'].includes(ctx.request.url)) {
      ctx.response.status = 401;
      ctx.body = Object.assign({
        message: '你已退出，请重新登录!',
        success: false
      });
      return;
    }
  }

  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: '出错了，重试！如果依然报错，请联系管理员！',
      err: err,
      errmessage: err.message
    };
  }
});
app.use(controller());

app.listen(8000, () => {
  console.log('启动成功 8000');
});
