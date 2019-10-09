import connection from '../global/api'
import global from '../global/global'
let obj = {
  'POST /addOrder': async (ctx, next) => {
    let param = ctx.request.body
    let str = global.add(
      [
        { str: 'name' }, { str: 'phone' }, { str: 'custAddress' },
        { str: 'sales' }, { str: 'address', data: param.address.join(',') }, { str: 'deliveryType' },
        { str: 'shipping' }, { str: 'courier' }, { str: 'downPayment' }, { str: 'remark' },
        { str: 'createDate' }, { str: 'createUser' }, { str: 'company' }
      ], '_order', param)
    let data = await connection.query(str) // 先插入order表，主表
    // orderProjectList 订单产品表
    let str1 = param.projectData.map(r => `('${r.id}', '${r.sort}', '${r.units}', '${r.cost}', '${r.price}', '${r.count}', '${data.insertId}')`).join(',')
    let data1 = await connection.query(`INSERT INTO orderProjectList (projectID, sort, units, cost, price, count, orderId) values ${str1}`)
    // orderPremium 订单额外费用表
    let str2 = '', data2 = ''
    if (param.premiumData.length) {
      str2 = param.premiumData.map(r => `('${r.name}', '${r.money}', '${r.remark}','${data.insertId}')`).join(',')
      data2 = await connection.query(`INSERT INTO orderPremium (name, money, remark, orderId) values ${str2}`)
    }
    ctx.body = (Object.assign(global.createObj(), { item: data, data: data1 + '/' + data2, str: str + '/' + str1 + '/' + str2 }))
  },
  'POST /queryOrder': async (ctx, next) => {
    let param = ctx.request.body
    let arr = [(param.pageIndex - 1) * param.pageSize, param.pageSize]
    let special = '1 = 1'
    if (param.id) special = `ta.id = ${param.id}`
    let str = `
      select ta.*, date_format(ta.createDate, '%Y-%m-%d %H:%I:%S') as createDate1, tb.name as createName , tc.name as custName  , td.name as salesName from _order ta
      left join user tb ON ta.createUser = tb.id
      left join customer tc ON ta.name = tc.id
      left join user td ON ta.sales = td.id
      where ${special} and ta.company = '${param.company}' and (ta.name like '%${param.value}%' or
      ta.phone like '%${param.value}%') limit ${arr[0]},${arr[1]}
    `
    let str1 = `select count(1) from _order ta left join user tb ON ta.createUser = tb.id where ta.company = '${param.company}' and (ta.name like '%${param.value}%' or ta.phone like '%${param.value}%')`
    let data = await connection.query(str)
    let data1 = await connection.query(str1)
    let data2 = '', data3 = ''
    if (data.length) {
      data2 = await connection.query(`
        select *, tb.name from orderProjectList ta 
        left join project tb ON ta.projectID = tb.id
        where ta.orderId in (${data.map(r => r.id + '').join()})
      `)
      data3 = await connection.query(`select * from orderPremium ta where ta.orderId in (${data.map(r => r.id + '').join()})`)
    }
    data.map(r => {
      r.projectData = data2.filter(n => n.orderId === r.id) || []
      r.premiumData = data3.filter(n => n.orderId === r.id) || []
    })
    ctx.body = (Object.assign(global.createObj(), { item: data, str: str, totalCount: data1[0]['count(1)'] }))
  },
}
module.exports = obj;