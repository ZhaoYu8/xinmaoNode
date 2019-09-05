import connection from '../http/api'
import global from '../global/global'
let obj = {
  'POST /addProject': async (ctx, next) => {
    let param = ctx.request.body
    let str = `select ta.* from projectSort ta where 1 = 1 and ta.name = '${param.name}'`
    let sortData = await connection.query(str)
    if (sortData && sortData.length) {
      ctx.body = (Object.assign(global.createObj(false), { item: sortData, message: '名称已存在，请修改再试!' }))
      return
    }
    let data = await connection.query(global.add([{ str: 'name' }, { str: 'parent' }, { str: 'company' }], 'projectSort', param))
    ctx.body = (Object.assign(global.createObj(), { item: data }))
  }
}
module.exports = obj;