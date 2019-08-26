import login from './login'
import cust from './cust'
let url = require("url")
let arr = {
  '/login': [login, 'login'],
  '/register': [login, 'register'],
  '/addCust': [cust, 'addCust'],
  '/queryCust': [cust, 'queryCust'],
}
export default (req, res) => {
  let pathName = url.parse(req.url).pathname
  let item = ''
  req.on('data', (chunk) => {
    item += chunk
  })
  req.on('end', () => {
    let str = arr[pathName]
    str[0][str[1]](JSON.parse(item)).then((data) => {
      res.write(JSON.stringify(data))
      res.end()
    }).catch((data) => {
      res.statusCode = data.errorType ? data.errorType : 400;
      res.write(JSON.stringify(data))
      res.end()
    })
  })
}