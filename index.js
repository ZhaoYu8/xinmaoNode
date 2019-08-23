let http = require("http")
let fs = require("fs")
let url = require("url")
let path = require("path")
import hicky from './http/http'
http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json;charset=utf-8');
  res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  let pathName = url.parse(req.url).pathname
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end()
  }
  if (req.method === 'POST') {
    hicky(req, res)
  } else if (pathName === "/") {
    let extName = path.extname(pathName)
    pathName = "index.html"
    if (pathName != "/favicon.ico") {
      fs.readFile("./dist/" + pathName, (err, data) => {
        if (err) {
          fs.readFile(
            "./dist/404.html",
            (errorNotFound, dataNotFound) => {
              if (errorNotFound) {
                console.log(errorNotFound)
              } else {
                res.writeHead(200, {
                  "Content-Type": "text/html charset='utf-8'"
                })
                res.write(dataNotFound)
                res.end()
              }
            }
          )
          return
        }
        else {
          let ext = getExt(extName)
          res.writeHead(200, {
            "Content-Type": ext + " charset='utf-8'"
          })
          res.write(data)
          res.end()
        }
      })
    } else {
      res.end()
    }
  }
}).listen(8000, () => {
  console.log('启动成功!')
})

// 获取后缀名
function getExt(extName) {
  switch(extName) {
    case '.html': return 'text/html'
    case '.css': return 'text/css'
    case '.js': return 'text/js'
    default: return 'text/html'
  }
}
