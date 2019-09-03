import connection from './api'
import token from './token'
import global from '../global/global'
let obj = {
  login(param) {
    return new Promise((resolve, reject) => {
      let str = `select * from user where phone = ${param.username}`
      connection.connect((err) => {
        connection.query(str, (err, results, fields) => {
          let obj = global.createObj()
          if (!err) {
            reject(Object.assign(global.createObj(false), { message: '出错了，请联系管理员!', errorType: '401', str: str }))
            return
          }
          if (results && !results.length) { // 第一种情况，你还没有完全查不到这个人，就是未注册过
            Object.assign(obj, { message: '你还未注册, 请注册！', success: false, errorType: 2 })

          } else if (results[0].password !== param.password) { // 第二种，密码输错了.
            Object.assign(obj, { message: '密码输入有误，请检查!', success: false, errorType: 1 })

          } else if (!param.currentId || results[0].company !== param.company) { // 当currentId为空的时候，或者 Token 传的公司和查的公司对不上的时候。重新创建 Token 给前台
            obj.token = token.createToken(results[0].id, results[0].company) || ''
          }
          resolve(Object.assign(obj, { item: results }))
        })
      })
    })
  },
  register(param) {
    return new Promise((resolve, reject) => {
      this.queryRegister(param).then((data) => {
        if (data && data.length) {
          reject(Object.assign(global.createObj(false), { message: '公司名称已存在，请修改名称再试！' }))
          return
        }
        let str = global.add([
          { str: 'name' },
          { str: 'phone' },
          { str: 'createDate' }
        ], 'company', param)
        connection.connect((err) => {
          connection.query(str, (err, results, fields) => {
            if (err) {
              reject(global.createObj(false))
              return
            }
            param.company = results.insertId
            this.addUser(param).then((data) => {
              resolve(Object.assign(global.createObj(), { item: data, token: token.createToken(data.insertId, param.company) || '' }))
            })
          })
        })
      })
    })
  },
  addUser(param) {
    return new Promise((resolve, reject) => {
      let str = global.add([
        { str: 'name', data: param.phone },
        { str: 'phone' },
        { str: 'password' },
        { str: 'company' }
      ], 'user', param)
      connection.connect((err) => {
        connection.query(str, (err, results, fields) => {
          if (err) {
            reject(global.createObj(false))
            return
          }
          resolve(results)
        })
      })
    })
  },
  queryRegister(param) {
    return new Promise((resolve, reject) => {
      let str = `select * from company as ta where ta.name = "${param.name}"`
      connection.connect((err) => {
        connection.query(str, (err, results, fields) => {
          if (err) {
            reject(global.createObj(false))
            return
          }
          resolve(results)
        })
      })
    })
  }
}
export default obj