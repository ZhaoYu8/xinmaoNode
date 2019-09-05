import cust from './cust'
import token from './token'
import project from './project'
import projectSort from './projectSort'
import upload from './upload'

let url = require("url")
let arr = {
  '/addCust': [cust, 'addCust'],
  '/queryCust': [cust, 'queryCust'],
  '/deleteCust': [cust, 'deleteCust'],
  '/editCust': [cust, 'editCust'],
  '/queryProject': [project, 'queryProject'],
  '/addSort': [projectSort, 'addSort'],
  '/querySort': [projectSort, 'querySort'],
  '/delSort': [projectSort, 'delSort'],
  '/editSort': [projectSort, 'editSort'],
  '/upload': [upload, 'upload']
}
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
      if (!data) { // 如果返回flase证明过期了
        res.statusCode = 401;
        res.write(JSON.stringify({
          message: 'token 失效了，请重新登录!'
        }))
        res.end()
        return
      }
      item.currentId = data.id || ''
      item.company = data.company || ''
    } else if (!['/login', '/register'].includes(pathName)) {
      res.statusCode = 401;
      res.write(JSON.stringify({
        message: '你已退出，请重新登录!'
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
      data.message = data.message ? data.message : '失败了，请重试。如果依然失败请联系管理员！'
      res.statusCode = data.errorType ? data.errorType : 400;
      res.write(JSON.stringify(data))
      res.end()
    })
  })
}
export default obj