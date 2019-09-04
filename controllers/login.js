import connection from '../http/api'
import global from '../global/global'
let obj = {
  'POST /login': async (ctx, next) => {
    let param = ctx.request.body
    let str = `select * from user where phone = ${param.username}`
    let a = await connection.query(str).then((data) => {
      let obj = global.createObj()
      console.log(2, data)
      if (!data) { // 第一种情况，你还没有完全查不到这个人，就是未注册过
        Object.assign(obj, { message: '你还未注册, 请注册！', success: false, errorType: 2 })
      } else if (data.password !== param.password) { // 第二种，密码输错了.
        Object.assign(obj, { message: '密码输入有误，请检查!', success: false, errorType: 1 })
      }
      ctx.body = (Object.assign(obj, { item: data }))
    }).catch((err) => {
      console.log('login', err);
    })
    console.log(1, a)
  },
  'POST /register': async (ctx, next) => {
    let param = ctx.request.body
    let a = await obj.queryRegister(param).then((data) => {
      if (!data) {
        console.log(3, data);
        ctx.body = (Object.assign(global.createObj(false), { message: '公司名称已存在，请修改名称再试！' }))
        return
      } else {
        let str = global.add([
          { str: 'name' },
          { str: 'phone' },
          { str: 'createDate' }
        ], 'company', param)
        connection.query(str).then((data) => {
          console.log(4, data);
          // param.company = results.insertId
          // this.addUser(param).then((data) => {
          //   resolve(Object.assign(global.createObj(), { item: data, token: token.createToken(data.insertId, param.company) || '' }))
          // })
          ctx.body = (global.createObj(true))
        })
      }
    })
    console.log(5, a)
  },
  queryRegister (param) {
    return new Promise((resolve, reject) => {
      let str = `select * from company as ta where ta.name = "${param.name}"`
      resolve(2)
    })
  }
}
module.exports = obj;