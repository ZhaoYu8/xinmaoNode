import connection from '../global/api'
import global from '../global/global'
import token from '../global/token'
import moment from 'moment'
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
    } else if (data[0].company !== param.company || !param.currentId) { // Token 传的公司和查的公司对不上的时候。重新创建 Token 给前台 或者当currentId为空的时候（第二种情况是第一次进入系统会触发）
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
    let companyData = await connection.query(global.add([{ str: 'name' }, { str: 'phone' }, { str: 'createDate' }], 'company', param)) // 往公司表里面插入数据
    let branch = await connection.query(global.add([{ str: 'name' }, { str: 'parent', data: 0 }, { str: 'company', data: companyData.insertId }], 'branch', param)) // 往部门表插入数据
    let userData = await connection.query(global.add([{ str: 'name', data: param.phone }, { str: 'phone' }, { str: 'password' }, { str: 'sex', data: 1 }, { str: 'branch', data: branch.insertId }, { str: 'company', data: companyData.insertId }, { str: 'dr', data: 1 }, { str: 'sales', data: 1 }], 'user', param)) // 往员工表插入数据
    await connection.query(global.add([{ str: 'CurrentIndex', data: 1 }, { str: 'updateDate', data: moment(new Date()).format("YYYY-MM-DD") }, { str: 'company', data: companyData.insertId }], '_orderId', param)) // 往订单id表里面插入一条数据
    ctx.body = (Object.assign(global.createObj(), { item: userData, token: token.createToken(userData.insertId, companyData.insertId) || '' }))
  }
}
module.exports = obj;