import connection from './api'
import token from './token'
let obj = {
  login(param) {
    return new Promise((resolve, reject) => {
      let str = `select * from user where phone = ${param.username}`
      connection.connect((err) => {
        connection.query(str, (err, results, fields) => {
          let obj = {
            message: "成功！",
            success: true,
            item: results
          }
          if (err) {
            Object.assign(obj, {
              message: '出错了，请联系管理员!',
              errorType: '401'
            })
            reject(obj)
            return
          }
          if (results && !results.length) { // 第一种情况，你还没有完全查不到这个人，就是未注册过
            Object.assign(obj, {
              message: '你还未注册, 点击确定立即注册！',
              success: false,
              errorType: 2
            })
          } else if (results[0].password !== param.password) { // 第二种，密码输错了.
            Object.assign(obj, {
              message: '密码输入有误，请检查!',
              success: false,
              errorType: 1
            })
          } else {
            let _token = ''
            if (!param.currentId) {
              _token = token.createToken(param.username, results[0].id)
            }
            obj.token = _token
          }
          resolve(obj)
        })
      })
    })
  },
  register(param) {
    return new Promise((resolve, reject) => {
      let str = `INSERT INTO user (phone, password) values (${param.username}, ${param.password})`
      connection.connect((err) => {
        connection.query(str, (err, results, fields) => {
          let obj = {
            message: "注册成功",
            success: true,
            item: str,
            token: token.createToken(param.username, results.insertId)
          }
          resolve(obj)
        })
      })
    })
  }
}
export default obj