import connection from '../global/api'
import global from '../global/global'
let obj = {
  'POST /addUser': async (ctx, next) => {
    let param = ctx.request.body
    let str = global.add(
      [
        { str: 'name' }, { str: 'branch', data: param.branch.join(',') }, { str: 'phone' },
        { str: 'sex' }, { str: 'address', data: param.address.join(',') }, { str: 'detailAddress' },
        { str: 'sales', data: param.sales ? 1 : 0 }, { str: 'password', data: '654321' }, { str: 'company' }, { str: 'dr', data: '1' }
      ], 'user', param)
    let data = await connection.query(str)
    ctx.body = (Object.assign(global.createObj(), { item: data }))
  },
  'POST /editUser': async (ctx, next) => {
    let param = ctx.request.body
    let str = global.edit(
      [
        { str: 'name' }, { str: 'branch', data: param.branch.join(',') }, { str: 'phone' },
        { str: 'sex' }, { str: 'address', data: param.address.join(',') }, { str: 'detailAddress' },
        { str: 'sales', data: param.sales ? 1 : 0 }
      ], 'user', param)
    let data = await connection.query(str)
    ctx.body = (Object.assign(global.createObj(), { item: data }))
  },
  'POST /queryUser': async (ctx, next) => {
    let param = ctx.request.body
    let arr = [(param.pageIndex - 1) * param.pageSize, param.pageSize]
    let special = '1 = 1'
    let str = `select ta.* from user ta where ${special} and ta.dr = '${param.dr || 1}' and ta.company = '${param.company}' and (ta.name like '%${param.value}%' or ta.phone like '%${param.value}%') limit ${arr[0]},${arr[1]}`
    let str1 = `select count(1) from user ta where ta.dr = '${param.dr || 1}' and ta.company = '${param.company}' and (ta.name like '%${param.value}%' or ta.phone like '%${param.value}%')`
    let data = await connection.query(str)
    let data1 = await connection.query(str1)
    ctx.body = (Object.assign(global.createObj(), { item: data, str: str, totalCount: data1[0]['count(1)'] }))
  },
  'POST /deleteUser': async (ctx, next) => {
    let param = ctx.request.body
    let str = global.edit(
      [
        { str: 'dr' }
      ], 'user', param)
    let data = await connection.query(str)
    ctx.body = (Object.assign(global.createObj(), { item: data }))
  },
  'POST /querySalesUser': async (ctx, next) => {
    let param = ctx.request.body
    let str = `select ta.* from user ta where ta.dr = '${param.dr || 1}' and ta.company = '${param.company}' and ta.sales = 1 `
    let data = await connection.query(str)
    ctx.body = (Object.assign(global.createObj(), { item: data, str: str }))
  },
}
module.exports = obj;