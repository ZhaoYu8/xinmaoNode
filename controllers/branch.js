import connection from '../http/api'
import global from '../global/global'
let obj = {
  'POST /addBranch': async (ctx, next) => {
    let param = ctx.request.body
    let data = await connection.query(global.add([{ str: 'name' }, { str: 'parent' }, { str: 'company' }], 'branch', param))
    ctx.body = (Object.assign(global.createObj(), { item: data }))
  },
  'POST /delBranch': async (ctx, next) => {
    let param = ctx.request.body
    let data = await connection.query(`delete from branch ta where ta.id = '${param.id}'`)
    ctx.body = (Object.assign(global.createObj(), { item: data }))
  },
  'POST /queryBranch': async (ctx, next) => {
    let param = ctx.request.body
    let data = await connection.query(`select ta.* from branch ta where ta.company = '${param.company}' ${param.name ? `and ta.name = ${param.name}` : ''}`)
    ctx.body = (Object.assign(global.createObj(), { item: data }))
  },
  'POST /editBranch': async (ctx, next) => {
    let param = ctx.request.body
    let data = await connection.query(`update branch set name = "${param.name}", parent = "${param.parent}" where id = "${param.id}"`)
    ctx.body = (Object.assign(global.createObj(), { item: data }))
  }
}
module.exports = obj;