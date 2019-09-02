import connection from './api'
import token from './token'
import global from '../global/global'
import moment from 'moment'
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
              message: '你还未注册, 请注册！',
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
            if (!param.currentId) obj.token = token.createToken(param.username, results[0].id) || ''
          }
          resolve(obj)
        })
      })
    })
  },
  register(param) {
    return new Promise((resolve, reject) => {
      this.queryRegister(param).then((data) => {
        if (data.length) {
          reject({
            message: '公司名称已存在，请修改名称再试！'
          })
          return
        }
        let str = global.add(
          [{
            str: 'name'
          },
          {
            str: 'phone'
          },
          {
            str: 'createDate',
            data: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
          }
          ], 'company', param)
        connection.connect((err) => {
          connection.query(str, (err, results, fields) => {
            console.log(results)
            return
            let obj = {
              message: "注册成功",
              success: true,
              item: str,
              token: token.createToken(param.phone, results[1].insertId)
            }
            resolve(obj)
          })
        })
      })
    })
  },
  addUser(param) {
    let str = global.add([{
      str: 'name',
      data: param.phone
    }, {
      str: 'phone'
    }, {
      str: 'password'
    }, {
      str: 'company'
    }], 'user', param)
  },
  queryRegister(param) {
    return new Promise((resolve, reject) => {
      let str = `select * from company as ta where ta.name = '"${param.name}"'`
      connection.connect((err) => {
        connection.query(str, (err, results, fields) => {
          resolve(results)
        })
      })
    })
  }
}
export default obj