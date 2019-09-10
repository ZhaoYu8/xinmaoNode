// import http from 'http'
// import fs from 'fs'
// import url from 'url'
import path from 'path'
import Koa from 'koa'
// import bodyParser from 'koa-bodyparser'
import koaBody from 'koa-body'
import controller from './controller'
import token from './http/token'
const app = new Koa();
// app.use(bodyParser());
app.use(koaBody({
  multipart: true, // 支持文件上传
  formidable: {
    // uploadDir: path.join(__dirname, 'upload/'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize: 2 * 1024 * 1024 // 文件上传大小
  }
}));
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, token');
  ctx.set('Content-Type', 'application/json;charset=utf-8');
  ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
    return
  }
  if (ctx.headers.token) { // 如果token传过来了
    let data = token.verifyToken(ctx.headers.token)
    if (!data) { // 如果返回flase证明过期了
      ctx.response.status = 401
      ctx.body = (Object.assign({
        message: 'token 失效了，请重新登录!', success: false
      }))
      return
    }
    ctx.request.body.currentId = data.id || ''
    ctx.request.body.company = data.company || ''
  } else if (!['/login', '/register', '/uploadfiles'].includes(ctx.request.url) && !ctx.request.url.includes('uploads')) {
    ctx.response.status = 401
    ctx.body = (Object.assign({
      message: '你已退出，请重新登录!', success: false
    }))
    return
  }
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: '出错了，重试！如果依然报错，请联系管理员！', err: err, errmessage: err.message
    };
  }
});
app.use(controller());

app.listen(8000, () => {
  console.log('启动成功 8000');
});


// http.createServer((req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, token');
//   res.setHeader('Content-Type', 'application/json;charset=utf-8');
//   res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   let pathName = url.parse(req.url).pathname
//   if (req.method === 'OPTIONS') {
//     res.statusCode = 200;
//     res.end()
//     return
//   }
//   if (pathName === "/") {
//     pathName = "index.html"
//   }
//   let extName = path.extname(pathName)
//   if (pathName != "/favicon.ico") {
//     fs.readFile("./dist/" + pathName, (err, data) => {
//       if (err) {
//         console.log("404 Not Found!");
//         fs.readFile(
//           "./dist/404.html",
//           (errorNotFound, dataNotFound) => {
//             if (errorNotFound) {
//               console.log(errorNotFound);
//             } else {
//               res.writeHead(200, {
//                 "Content-Type": "text/html; charset='utf-8'"
//               });
//               res.write(dataNotFound);
//               res.end();
//             }
//           }
//         );
//         return;
//       }
//       // 返回这个文件
//       else {
//         // 获取文件类型
//         let ext = getExt(extName);

//         // 设置请求头
//         res.writeHead(200, {
//           "Content-Type": ext + "; charset='utf-8'"
//         });
//         // 读取写入文件
//         res.write(data);
//         // 结束响应
//         res.end();
//       }
//     });
//   } else {
//     res.end()
//   }
// }).listen(3000, () => {
//   console.log('http://localhost:8000')
// })
// // 获取后缀名
// function getExt(extName) {
//   switch (extName) {
//     case '.html': return 'text/html';
//     case '.css': return 'text/css';
//     case '.js': return 'text/js';
//     default: return 'text/html';
//   }
// }
