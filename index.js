import hicky from './http/http'
import http from 'http'
import fs from 'fs'
import url from 'url'
import path from 'path'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import controller from './controller'
const app = new Koa();
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, token');
  ctx.set('Content-Type', 'application/json;charset=utf-8');
  ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
});
app.use(bodyParser());

app.use(controller());

app.listen(8000);
console.log('http://localhost:3000');


http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, token');
  res.setHeader('Content-Type', 'application/json;charset=utf-8');
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  let pathName = url.parse(req.url).pathname
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end()
    return
  }
  if (req.method === 'POST') {
    hicky(req, res)
    return
  }
  if (pathName === "/") {
    pathName = "index.html"
  }
  let extName = path.extname(pathName)
  if (pathName != "/favicon.ico") {
    fs.readFile("./dist/" + pathName, (err, data) => {
      if (err) {
        console.log("404 Not Found!");
        fs.readFile(
          "./dist/404.html",
          (errorNotFound, dataNotFound) => {
            if (errorNotFound) {
              console.log(errorNotFound);
            } else {
              res.writeHead(200, {
                "Content-Type": "text/html; charset='utf-8'"
              });
              res.write(dataNotFound);
              res.end();
            }
          }
        );
        return;
      }
      // 返回这个文件
      else {
        // 获取文件类型
        let ext = getExt(extName);

        // 设置请求头
        res.writeHead(200, {
          "Content-Type": ext + "; charset='utf-8'"
        });
        // 读取写入文件
        res.write(data);
        // 结束响应
        res.end();
      }
    });
  } else {
    res.end()
  }
}).listen(3000, () => {
  console.log('http://localhost:8000')
})
// 获取后缀名
function getExt(extName) {
  switch (extName) {
    case '.html': return 'text/html';
    case '.css': return 'text/css';
    case '.js': return 'text/js';
    default: return 'text/html';
  }
}
