import login from './login'
import cust from './cust'
import token from './token'
import project from './project'
import projectSort from './projectSort'
let url = require("url")
let arr = {
  '/login': [login, 'login'],
  '/register': [login, 'register'],
  '/addCust': [cust, 'addCust'],
  '/queryCust': [cust, 'queryCust'],
  '/deleteCust': [cust, 'deleteCust'],
  '/editCust': [cust, 'editCust'],
  '/queryProject': [project, 'queryProject'],
  '/addProjectSort': [projectSort, 'addProjectSort']
}
let needCurrent = ['/addCust'] // 需要接收当前人的接口
let obj = (req, res) => {
  let pathName = url.parse(req.url).pathname
  let str = arr[pathName]
  let item = {}
  req.on('data', (chunk) => {
    item = JSON.parse(chunk)
  })
  req.on('end', () => {
    if (req.headers.token) { // 如果token传过来了 过滤掉登录和注册二个接口
      let data = token.verifyToken(req.headers.token)
      if (pathName === '/login' || pathName === '/register') {
        item.currentId = !data ? '' : data.id
      } else {
        if (!data) { // 如果返回flase证明过期了
          res.statusCode = 401;
          res.write(JSON.stringify({
            message: 'token 失效了，请重新登录!'
          }))
          res.end()
          return
        } else if (needCurrent.includes(pathName)) {
          item.currentId = data.id
        }
      }
    }
    if (!str) { // 防止后台未找到这个方法
      res.statusCode = 400;
      res.write(JSON.stringify({
        message: '后台未定义该方法,请联系管理员!'
      }))
      res.end()
      return
    }
    str[0][str[1]](item).then((data) => {
      data.success = data.success ? data.success : false
      res.write(JSON.stringify(data))
      res.end()
    }).catch((data) => {
      data.success = false
      res.statusCode = data.errorType ? data.errorType : 400;
      res.write(JSON.stringify(data))
      res.end()
    })
  })
}
export default obj