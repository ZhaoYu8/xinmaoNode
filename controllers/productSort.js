import connection from '../global/api'
import global from '../global/global'
let obj = {
  'POST /addSort': async (ctx, next) => {
    let param = ctx.request.body
    let str = `select ta.* from productSort ta where 1 = 1 and ta.company = '${param.company}' and ta.name = '${param.name}'`
    let sortData = await connection.query(str)
    if (sortData && sortData.length) {
      ctx.body = (Object.assign(global.createObj(false), { item: sortData, message: '名称已存在，请修改再试!' }))
      return
    }
    let data = await connection.query(global.add([{ str: 'name' }, { str: 'parent' }, { str: 'company' }], 'productSort', param))
    ctx.body = (Object.assign(global.createObj(), { item: data }))
  },
  'POST /delSort': async (ctx, next) => {
    let param = ctx.request.body
    let data = await connection.query(`delete from productSort ta where ta.id = '${param.id}'`)
    ctx.body = (Object.assign(global.createObj(), { item: data }))
  },
  'POST /querySort': async (ctx, next) => {
    let param = ctx.request.body
    let data = await connection.query(`select ta.* from productSort ta where ta.company = '${param.company}' ${param.name ? `and ta.name = ${param.name}` : ''}`)
    ctx.body = (Object.assign(global.createObj(), { item: data }))
  },
  'POST /editSort': async (ctx, next) => {
    let param = ctx.request.body
    let data = await connection.query(`update productSort set name = "${param.name}", parent = "${param.parent}" where id = "${param.id}"`)
    ctx.body = (Object.assign(global.createObj(), { item: data }))
  }
}
module.exports = obj;