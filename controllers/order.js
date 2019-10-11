import connection from '../global/api'
import global from '../global/global'
let obj = {
  'POST /addOrder': async (ctx, next) => {
    let param = ctx.request.body
    let str = global.add(
      [
        { str: 'name' }, { str: 'phone' }, { str: 'custAddress' },
        { str: 'sales' }, { str: 'address', data: param.address.join(',') }, { str: 'deliveryType' },
        { str: 'shipping' }, { str: 'courier' }, { str: 'orderDate' }, { str: 'downPayment' }, { str: 'remark' },
        { str: 'createDate' }, { str: 'createUser' }, { str: 'company' }
      ], '_order', param)
    let data = await connection.query(str) // 先插入order表，主表
    // orderProjectList 订单产品表
    let str1 = param.projectData.map(r => `('${r.id}', '${r.sort}', '${r.units}', '${r.cost}', '${r.price}', '${r.count}', '${data.insertId}')`).join(',')
    let data1 = await connection.query(`INSERT INTO orderProjectList (projectId, sort, units, cost, price, count, orderId) values ${str1}`)
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
      select ta.id, ta.name, ta.phone, ta.custAddress, ta.sales, ta.deliveryType, 
        ta.address, ta.shipping, ta.courier, ta.downPayment, ta.remark, ta.createUser, ta.company, 
        date_format(ta.createDate, '%Y-%m-%d %H:%I:%S') as createDate, date_format(ta.orderDate, '%Y-%m-%d') as orderDate,
        tb.name as createName , tc.name as custName , td.name as salesName from _order ta
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
        select ta.*, tb.name from orderProjectList ta 
        left join project tb ON ta.projectId = tb.id
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
  'POST /editOrder': async (ctx, next) => {
    let param = ctx.request.body
    let str = global.edit(
      [
        { str: 'phone' }, { str: 'custAddress' },
        { str: 'sales' }, { str: 'address', data: param.address.join(',') }, { str: 'deliveryType' },
        { str: 'shipping' }, { str: 'courier' }, { str: 'orderDate' }, { str: 'downPayment' }, { str: 'remark' },
        { str: 'company' }
      ], '_order', param)
    let data = await connection.query(str) // 先更新order表，主表
    let data1 = await connection.query(`delete from orderProjectList where id not in(${param.projectData.filter(r => r.id).map(r => r.id).join(',') || ''}) and orderId = '${param.id}'`)
    let data2 = await connection.query(`
      INSERT INTO orderProjectList (id, projectId, sort, units, cost, price, count, orderId) VALUES 
      ${param.projectData.map(r => {
      return `(${r.projectId ? r.id : 0}, '${r.projectId || r.id}', '${r.sort}', '${r.units}', '${r.cost}', '${r.price}', '${r.count}', '${param.id}')`
    }).join(',')}
      ON DUPLICATE KEY UPDATE units = VALUES(units), sort = VALUES(sort), cost = VALUES(cost), price = VALUES(price), count = VALUES(count), orderId = VALUES(orderId);
    `)
    let data3 = await connection.query(`delete from orderPremium where id not in(${param.premiumData.filter(r => r.id).map(r => r.id).join(',') || ''}) and orderId = '${param.id}'`)
    let data4 = await connection.query(`
      INSERT INTO orderPremium (id, name, money, remark, orderId) VALUES 
      ${param.premiumData.map(r => {
      return `(${r.id || 0}, '${r.name}', '${r.money}', '${r.remark}', '${param.id}')`
    }).join(',')}
      ON DUPLICATE KEY UPDATE name = VALUES(name), money = VALUES(money), remark = VALUES(remark), orderId = VALUES(orderId);
  `)
    ctx.body = (Object.assign(global.createObj(), { item: data + ',' + data1 + ',' + data2 + ',' + data3 + ',' + data4 }))
  }
}
module.exports = obj;