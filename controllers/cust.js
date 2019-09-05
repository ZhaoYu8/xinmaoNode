import connection from '../http/api'
import global from '../global/global'
let obj = {
  'POST /addCust': async (ctx, next) => {
    let param = ctx.request.body
    let str = global.add([
      { str: 'name' },
      { str: 'phone' },
      { str: 'address' },
      { str: 'detailAddress' },
      { str: 'photo' },
      { str: 'createDate' },
      { str: 'createUser' },
      { str: 'company' }
    ], 'customer', param)
    let data = await connection.query(str)
    ctx.body = (Object.assign(global.createObj(), { item: data }))
  },
  'POST /queryCust': async (ctx, next) => {
    let param = ctx.request.body
    let arr = [(param.pageIndex - 1) * param.pageSize, param.pageSize]
    let str = `select ta.*, date_format(ta.createDate, '%Y-%m-%d %H:%I:%S') as createDate1, tb.name as createName from customer ta left join user tb ON ta.createUser = tb.id where ta.company = '${param.company}' and (ta.name like '%${param.value}%' or ta.phone like '%${param.value}%') limit ${arr[0]},${arr[1]}`
    let str1 = `select count(1) from customer ta left join user tb ON ta.createUser = tb.id where ta.company = '${param.company}' and (ta.name like '%${param.value}%' or ta.phone like '%${param.value}%')`
    let data = await connection.query(str)
    let data1 = await connection.query(str1)
    ctx.body = (Object.assign(global.createObj(), { item: data, str: str, totalCount: data1[0]['count(1)'] }))
  },
  'POST /deleteCust': async (ctx, next) => {
    let param = ctx.request.body
    let str = `delete from customer where id = ${param.id}`
    let data = await connection.query(str)
    ctx.body = (Object.assign(global.createObj(), { item: data }))
  },
  'POST /editCust': async (ctx, next) => {
    let param = ctx.request.body
    let str = `update customer set name = "${param.name}", phone = "${param.phone}", address = "${param.address}", detailAddress = "${param.detailAddress}", photo = "${param.photo}" where id = "${param.id}"`
    let data = await connection.query(str)
    ctx.body = (Object.assign(global.createObj(), { item: data }))
  }
}
module.exports = obj;