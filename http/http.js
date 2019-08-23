import login from './login'
let url = require("url")
let arr = {
  '/login': [login, 'login'],
  '/register': [login, 'register']
}
export default (req, res) => {
  let pathName = url.parse(req.url).pathname
  console.log(url.parse(req.url))
  let item = '';
  req.on('data', (chunk) => {
    item += chunk;
  });
  req.on('end', () => {
    let str = arr[pathName]
    str[0][str[1]](JSON.parse(item)).then((data) => {
      res.write(JSON.stringify(data))
      res.end()
    })
  })
}