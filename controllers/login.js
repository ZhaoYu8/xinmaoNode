import connection from '../http/api'
import global from '../global/global'
import token from '../http/token'
let obj = {
  'POST /login': async (ctx, next) => { // 登陆
    let param = ctx.request.body,
    str = `select * from user where phone = ${param.username}`,
    data = await connection.query(str),
    obj = global.createObj()
    if (data && !data.length) { // 第一种情况，你还没有完全查不到这个人，就是未注册过
      Object.assign(obj, { message: '你还未注册, 请注册！', success: false, errorType: 2 })
    } else if (data[0].password !== param.password) { // 第二种，密码输错了.
      Object.assign(obj, { message: '密码输入有误，请检查!', success: false, errorType: 1 })
    } else if (!param.currentId || data[0].company !== param.company) { // 当currentId为空的时候，或者 Token 传的公司和查的公司对不上的时候。重新创建 Token 给前台
      obj.token = token.createToken(data[0].id, data[0].company) || ''
    }
    ctx.body = (Object.assign(obj, { item: data }))
  },
  'POST /register': async (ctx, next) => { // 注册
    let param = ctx.request.body
    let registerData = await connection.query(`select * from company as ta where ta.name = "${param.name}"`)
    if (registerData && registerData.length) {
      ctx.body = (Object.assign(global.createObj(false), { message: '公司名称已存在，请修改公司名称再试！' }))
      return
    }
    let companyData = await connection.query(global.add([{ str: 'name' }, { str: 'phone' }, { str: 'createDate' }], 'company', param))
    let userData = await connection.query(global.add([{ str: 'name', data: param.phone }, { str: 'phone' }, { str: 'password' }, { str: 'company', data: companyData.insertId }], 'user', param))
    ctx.body = (Object.assign(global.createObj(), { item: userData, token: token.createToken(userData.insertId, companyData.insertId) || '' }))
  }
}
module.exports = obj;