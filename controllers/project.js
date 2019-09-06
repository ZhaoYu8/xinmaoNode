import connection from '../http/api'
import global from '../global/global'
let obj = {
  'POST /addProject': async (ctx, next) => {
    let param = ctx.request.body
    let str = global.add(
      [
        { str: 'name' }, { str: 'sort' }, { str: 'units' },
        { str: 'cost' }, { str: 'price' },
        { str: 'createDate' }, { str: 'createUser' }, { str: 'company' }
      ], 'project', param)
    let data = await connection.query(str)
    let data1 = {}
    if (param.photo.length) {
      let str1 = param.photo.map(r => `('${r.name}', '${r.address.replace(/\\/g, "\\\\")}', '${data.insertId}')`).join(',')
      console.log(str1);
      data1 = await connection.query(`INSERT INTO projectPhoto (photoName, photoAddress, projectId) values ${str1}`)
    }
    ctx.body = (Object.assign(global.createObj(), { item: data, item1: data1 }))
  },
  'POST /queryProject': async (ctx, next) => {
    let param = ctx.request.body
    let arr = [(param.pageIndex - 1) * param.pageSize, param.pageSize]
    let str = `select ta.*, date_format(ta.createDate, '%Y-%m-%d %H:%I:%S') as createDate1, tb.name as createName from project ta left join user tb ON ta.createUser = tb.id where ta.company = '${param.company}' and (ta.name like '%${param.value}%') limit ${arr[0]},${arr[1]}`
    let str1 = `select count(1) from project ta left join user tb ON ta.createUser = tb.id where ta.company = '${param.company}' and (ta.name like '%${param.value}%')`
    let data = await connection.query(str)
    let data1 = await connection.query(str1)
    let data2 = []
    if (data.length) {
      data2 = await connection.query(`select * from projectPhoto ta where ta.projectId in (${data.map(r => r.id + '').join()})`)
    }
    data.map(r => {
      r.photo = []
      data2.map(n => {
        if (r.id !== n.projectId) return
        r.photo.push(n)
      })
    })
    ctx.body = (Object.assign(global.createObj(), { item: data, str: str, totalCount: data1[0]['count(1)'] }))
  }
}
module.exports = obj;