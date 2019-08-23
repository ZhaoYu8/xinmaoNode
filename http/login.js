import connection from './api'
let obj = {
  login (param) {
    return new Promise((resolve, reject) => {
      let str = `select * from user where phone = ${param.username} and password = ${param.password}`
      connection.connect((err) => {
        connection.query(str, (err, results, fields) => {
          let obj = {
            message: "成功！",
            success: true,
            item: results
          }
          if (!results.length) {
            Object.assign(obj, {message: '你还未注册, 点击确定立即注册！', success: false})
          }
          resolve(obj)
        })
      })
    })
  },
  register (param) {
    return new Promise((resolve, reject) => {
      let str = `insert into user (phone, password) values (${param.username}, ${param.password})`
      connection.connect((err) => {
        connection.query(str, (err, results, fields) => {
          let obj = {
            message: "注册成功",
            success: true,
            item: results
          }
          resolve(obj)
        })
      })
    })
  }
}
export default obj