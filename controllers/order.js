import connection from '../global/api';
import global from '../global/global';
import moment from 'moment';
// ['addOrder', 'queryOrder', 'editOrder', 'queryPrint', 'editPrint','queryOrderOperations']
// ['新增订单', '查询订单', '修改订单', '查询打印', '修改打印设置', '查询订单操作记录']
let obj = {
  'POST /addOrder': async (ctx, next) => {
    let param = ctx.request.body;
    let orderId = await connection.query(`select * from _orderId t where t.company = '${param.company}'`); // 先查询订单id表
    let num = 0;
    if (moment(orderId[0].updateDate).format('YYYY-MM-DD') !== moment(new Date()).format('YYYY-MM-DD')) {
      // 如果日期不对，证明是新的一天了
      num = 0;
      await connection.query(
        `update _orderId t set t.updateDate = '${moment(new Date()).format('YYYY-MM-DD')}' where t.company = '${
          param.company
        }'`
      ); // 先查询订单id表
    } else {
      num = orderId[0].currentIndex;
    }
    let str = global.add(
      [
        { str: 'name' },
        { str: 'phone' },
        { str: 'custAddress' },
        { str: 'orderId', data: 'DD-' + moment(new Date()).format('YYYY-MM-DD') + '-00' + (num + 1) },
        { str: 'sales' },
        { str: 'address', data: param.address.join(',') },
        { str: 'deliveryType' },
        { str: 'shipping' },
        { str: 'courier' },
        { str: 'orderDate' },
        { str: 'downPayment' },
        { str: 'remark' },
        { str: 'createDate' },
        { str: 'createUser' },
        { str: 'company' }
      ],
      '_order',
      param
    );
    let data = await connection.query(str); // 先插入order表，主表
    let orderAwait = await connection.query(
      `update _orderId set currentIndex = "${num + 1}" where company = "${param.company}"`
    ); // 再更新订单id表
    // orderProjectList 订单产品表
    let str1 = param.projectData
      .map(
        (r) =>
          `('${r.id}', '${r.sort}', '${r.units}', '${r.cost}', '${r.price}', '${r.count}', '${r.proRemark || ''}', '${
            data.insertId
          }')`
      )
      .join(',');
    let data1 = await connection.query(
      `INSERT INTO orderProjectList (projectId, sort, units, cost, price, count, proRemark, orderId) values ${str1}`
    );
    // orderPremium 订单额外费用表
    let str2 = '',
      data2 = '';
    if (param.premiumData.length) {
      str2 = param.premiumData.map((r) => `('${r.name}', '${r.money}', '${r.remark}','${data.insertId}')`).join(',');
      data2 = await connection.query(`INSERT INTO orderPremium (name, money, remark, orderId) values ${str2}`);
    }
    // 'orderoperation'
    let str3 = global.add(
      [
        { str: 'orderId', data: data.insertId },
        { str: 'operationUser', data: param.currentId },
        { str: 'operationDate', data: moment(new Date()).format('YYYY-MM-DD HH:mm:ss') },
        { str: 'operationType', data: 0 }, // [0: 新增，1：修改，2：删除，3：发货，4：收款，5：完成]
        { str: 'company' }
      ],
      'orderoperation',
      param
    );
    let data3 = await connection.query(str3);
    ctx.body = Object.assign(global.createObj(), {
      item: data,
      data: data1 + '/' + data2 + '/' + orderAwait,
      str: str + '/' + str1 + '/' + str2
    });
  },
  'POST /queryOrder': async (ctx, next) => {
    let param = ctx.request.body;
    let arr = [(param.pageIndex - 1) * param.pageSize, param.pageSize];
    let special = '1 = 1';
    if (param.id) special = `ta.id = ${param.id}`;
    let str = `
      select ta.id, ta.name, ta.phone, ta.custAddress, ta.sales, ta.deliveryType, ta.orderId, 
        ta.address, ta.shipping, ta.courier, ta.downPayment, ta.remark, ta.createUser, ta.company, 
        date_format(ta.createDate, '%Y-%m-%d %H:%i:%S') as createDate, date_format(ta.orderDate, '%Y-%m-%d') as orderDate,
        tb.name as createName , tc.name as custName , td.name as salesName,
        te.name as updateName, date_format(ta.updateDate, '%Y-%m-%d %H:%i:%S') as updateDate
        from _order ta
        left join user tb ON ta.createUser = tb.id
        left join customer tc ON ta.name = tc.id
        left join user td ON ta.sales = td.id
        left join user te ON ta.updateUser = te.id
        where ${special} and ta.company = '${param.company}' and (tc.name like '%${param.value}%' or
        ta.phone like '%${param.value}%')  ORDER BY ta.createDate DESC limit ${arr[0]},${arr[1]}
    `;
    let str1 = `select count(1) from _order ta left join user tb ON ta.createUser = tb.id where ta.company = '${param.company}' and (ta.name like '%${param.value}%' or ta.phone like '%${param.value}%')`;
    let data = await connection.query(str);
    let data1 = await connection.query(str1);
    let data2 = '',
      data3 = '';
    if (data.length) {
      data2 = await connection.query(`
        select ta.*, tb.name, tb.proNumber from orderProjectList ta 
        left join project tb ON ta.projectId = tb.id
        where ta.orderId in (${data.map((r) => r.id + '').join()})
      `);
      data3 = await connection.query(
        `select * from orderPremium ta where ta.orderId in (${data.map((r) => r.id + '').join()})`
      );
    }
    data.map((r) => {
      r.projectData = data2.filter((n) => n.orderId === r.id) || [];
      r.premiumData = data3.filter((n) => n.orderId === r.id) || [];
    });
    ctx.body = Object.assign(global.createObj(), { item: data, str: str, totalCount: data1[0]['count(1)'] });
  },
  'POST /editOrder': async (ctx, next) => {
    // 修改订单
    let param = ctx.request.body;
    let str = global.edit(
      [
        { str: 'phone' },
        { str: 'custAddress' },
        { str: 'sales' },
        { str: 'address', data: param.address.join(',') },
        { str: 'deliveryType' },
        { str: 'shipping' },
        { str: 'courier' },
        { str: 'orderDate' },
        { str: 'downPayment' },
        { str: 'remark' },
        { str: 'updateDate' },
        { str: 'updateUser' },
        { str: 'company' }
      ],
      '_order',
      param
    );
    let data = await connection.query(str); // 先更新order表，主表
    let data1 = await connection.query(
      `delete from orderProjectList where id not in(${param.projectData
        .filter((r) => r.id)
        .map((r) => r.id)
        .join(',') || 0}) and orderId = '${param.id}'`
    );
    let data2 = await connection.query(`
      INSERT INTO orderProjectList (id, projectId, sort, units, cost, price, count, proRemark, orderId) VALUES 
      ${param.projectData
        .map((r) => {
          return `(${r.projectId ? r.id : 0}, '${r.projectId || r.id}', '${r.sort}', '${r.units}', '${r.cost}', '${
            r.price
          }', '${r.count}', '${r.proRemark || ''}', '${param.id}')`;
        })
        .join(',')}
      ON DUPLICATE KEY UPDATE units = VALUES(units), sort = VALUES(sort), cost = VALUES(cost), price = VALUES(price), count = VALUES(count), proRemark = VALUES(proRemark), orderId = VALUES(orderId);
    `);
    await connection.query(
      `delete from orderPremium where id not in(${param.premiumData
        .filter((r) => r.id)
        .map((r) => r.id)
        .join(',') || 0}) and orderId = '${param.id}'`
    );
    if (param.premiumData.length) {
      await connection.query(`
        INSERT INTO orderPremium (id, name, money, remark, orderId) VALUES 
          ${param.premiumData
            .map((r) => {
              return `(${r.id || 0}, '${r.name}', '${r.money}', '${r.remark}', '${param.id}')`;
            })
            .join(',')}
          ON DUPLICATE KEY UPDATE name = VALUES(name), money = VALUES(money), remark = VALUES(remark), orderId = VALUES(orderId);
      `);
    }
    await connection.query(
      global.add(
        [
          { str: 'orderId', data: param.id },
          { str: 'operationUser', data: param.currentId },
          { str: 'operationDate', data: moment(new Date()).format('YYYY-MM-DD HH:mm:ss') },
          { str: 'operationType', data: 1 }, //  // [0: 新增，1：修改，2：删除，3：发货，4：收款，5：完成]
          { str: 'company' }
        ],
        'orderoperation',
        param
      )
    );
    ctx.body = Object.assign(global.createObj(), { item: str });
  },
  'POST /queryPrint': async (ctx, next) => {
    // 查询订单打印
    let param = ctx.request.body;
    let str = `select * from print t where t.company = '${param.company}'`;
    let data = await connection.query(str); // 先更新order表，主表
    ctx.body = Object.assign(global.createObj(), { item: data });
  },
  'POST /editPrint': async (ctx, next) => {
    // 修改订单打印
    let param = ctx.request.body;
    let arr = [
      { str: 'address' },
      { str: 'name' },
      { str: 'phone', data: param.phone.join(',') },
      { str: 'bank', data: param.bank.join(',') },
      { str: 'account', data: param.account.join(',') },
      { str: 'isCustAddress' },
      { str: 'isQrcode' },
      { str: 'company' }
    ];
    let str = param.id ? global.edit(arr, 'print', param) : global.add(arr, 'print', param);
    await connection.query(str); // 先更新order表，主表
    ctx.body = Object.assign(global.createObj(), { item: str });
  },
  'POST /queryOrderOperations': async (ctx, next) => {
    let param = ctx.request.body;
    let str = `select 
    date_format(t.operationDate, '%Y-%m-%d %H:%i:%S') as operationDate,
    t.operationType, t.id, t.orderId, t.operationUser, tb.name as operationUserName
    from orderoperation t 
    left join user tb ON t.operationUser = tb.id
    where 1= 1 and t.orderId ='${param.id}' and t.company = '${param.company}' order by t.operationDate desc`;
    let data = await connection.query(str);
    let data1 = await connection.query(
      `select t.*,tb.operationType, tc.name from orderdelivery t 
      left join orderoperation tb on t.orderOperationId = tb.id
      left join project tc on t.projectId = tc.id
      where t.orderId = '${param.id}' ORDER BY tb.operationDate desc`
    );
    ctx.body = Object.assign(global.createObj(), { item: data, list: data1 });
  },
  'POST /addOrderDelivery': async (ctx, next) => {
    let param = ctx.request.body;
    let str1 = global.add(
      [
        { str: 'orderId', data: param.id },
        { str: 'operationUser', data: param.currentId },
        { str: 'operationDate', data: moment(new Date()).format('YYYY-MM-DD HH:mm:ss') },
        { str: 'operationType', data: 3 }, // [0: 新增，1：修改，2：删除，3：发货，4：收款，5：完成]
        { str: 'company' }
      ],
      'orderoperation',
      param
    );
    let data1 = await connection.query(str1);

    let str = param.data
      .map((r) => `('${param.id}', '${r.projectId}', '${r.num}', '${r.remark}', '${data1.insertId}')`)
      .join(',');
    let data = await connection.query(
      `INSERT INTO orderdelivery (orderId, projectId, num, remark, orderOperationId) values ${str}`
    ); // 先更新order表，主表
    ctx.body = Object.assign(global.createObj(), { item: data });
  },
  'POST /addOrderMoney': async (ctx, next) => {
    let param = ctx.request.body;
    let str = `select 
    date_format(t.operationDate, '%Y-%m-%d %H:%i:%S') as operationDate,
    t.operationType, t.id, t.orderId, t.operationUser, tb.name as operationUserName
    from orderoperation t 
    left join user tb ON t.operationUser = tb.id
    where 1= 1 and t.orderId ='${param.id}' and t.company = '${param.company}' order by t.operationDate desc`;
    let data = await connection.query(str); // 先更新order表，主表
    ctx.body = Object.assign(global.createObj(), { item: data });
  }
};
module.exports = obj;
