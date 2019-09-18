import connection from '../http/api'
import global from '../global/global'
let obj = {
  'POST /queryUser': async (ctx, next) => {
    let param = ctx.request.body
    let arr = [(param.pageIndex - 1) * param.pageSize, param.pageSize]
    let str = `select ta.* from user ta where ta.dr = '${param.dr || 1}' and ta.company = '${param.company}' and (ta.name like '%${param.value}%' or ta.phone like '%${param.value}%') limit ${arr[0]},${arr[1]}`
    let str1 = `select count(1) from user ta where ta.dr = '${param.dr || 1}' and ta.company = '${param.company}' and (ta.name like '%${param.value}%' or ta.phone like '%${param.value}%')`
    let data = await connection.query(str)
    let data1 = await connection.query(str1)
    ctx.body = (Object.assign(global.createObj(), { item: data, str: str, totalCount: data1[0]['count(1)'] }))
  }
}
module.exports = obj;