import connection from '../global/api';
import global from '../global/global';
let obj = {
  'POST /addUser': async (ctx, next) => {
    let param = ctx.request.body;
    let str = global.add(
      [
        { str: 'name' },
        { str: 'branch', data: param.branch.join(',') },
        { str: 'phone' },
        { str: 'sex' },
        { str: 'address', data: param.address.join(',') },
        { str: 'detailAddress' },
        { str: 'sales', data: param.sales ? 1 : 0 },
        { str: 'password', data: '654321' },
        { str: 'company' },
        { str: 'dr', data: '1' }
      ],
      'user',
      param
    );
    let data = await connection.query(str);
    ctx.body = Object.assign(global.createObj(), { item: data });
  },
  'POST /editUser': async (ctx, next) => {
    let param = ctx.request.body;
    let str = global.edit(
      [
        { str: 'name' },
        { str: 'branch', data: param.branch.join(',') },
        { str: 'phone' },
        { str: 'sex' },
        { str: 'address', data: param.address.join(',') },
        { str: 'detailAddress' },
        { str: 'sales', data: param.sales ? 1 : 0 }
      ],
      'user',
      param
    );
    let data = await connection.query(str);
    ctx.body = Object.assign(global.createObj(), { item: data });
  },
  'POST /queryUser': async (ctx, next) => {
    let param = ctx.request.body;
    let arr = [(param.pageIndex - 1) * param.pageSize, param.pageSize];
    let special = '1 = 1';
    let str = `select ta.* from user ta where ${special} and ta.dr = '${param.dr || 1}' and ta.company = '${
      param.company
    }' and (ta.name like '%${param.value}%' or ta.phone like '%${param.value}%') limit ${arr[0]},${arr[1]}`;
    let str1 = `select count(1) from user ta where ta.dr = '${param.dr || 1}' and ta.company = '${
      param.company
    }' and (ta.name like '%${param.value}%' or ta.phone like '%${param.value}%')`;
    let data = await connection.query(str);
    let data1 = await connection.query(str1);
    ctx.body = Object.assign(global.createObj(), { item: data, str: str, totalCount: data1[0]['count(1)'] });
  },
  'POST /deleteUser': async (ctx, next) => {
    let param = ctx.request.body;
    let str = global.edit([{ str: 'dr' }], 'user', param);
    let data = await connection.query(str);
    ctx.body = Object.assign(global.createObj(), { item: data });
  },
  'POST /querySalesUser': async (ctx, next) => {
    let param = ctx.request.body;
    let str = `select ta.* from user ta where ta.dr = '${param.dr || 1}' and ta.company = '${
      param.company
    }' and ta.sales = 1 `;
    let data = await connection.query(str);
    ctx.body = Object.assign(global.createObj(), { item: data, str: str });
  },
  'POST /commonInfo': async (ctx, next) => {
    let param = ctx.request.body;
    let str = `select ta.* from user ta where 1=1 and ta.id = '${param.currentId}' and ta.company = '${param.company}'`;
    let data = await connection.query(str);
    let str1 = `
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
        where 1=1 and ta.company = '${param.company}' ORDER BY ta.createDate DESC limit 0,6
    `;
    let data1 = await connection.query(str1),
      data2 = '',
      data3 = '';
    if (data1.length) {
      data2 = await connection.query(`
        select ta.*, tb.name from orderProjectList ta 
        left join project tb ON ta.projectId = tb.id
        where ta.orderId in (${data1.map((r) => r.id + '').join()})
      `);
      data3 = await connection.query(
        `select * from orderPremium ta where ta.orderId in (${data1.map((r) => r.id + '').join()})`
      );
    }
    data1.map((r) => {
      r.projectData = data2.filter((n) => n.orderId === r.id) || [];
      r.premiumData = data3.filter((n) => n.orderId === r.id) || [];
    });
    data[0].orderInfo = data1;
    ctx.body = Object.assign(global.createObj(), { item: data, str: str });
  },
  'POST /weather': async (ctx, next) => {
    let data = await global.commonGet('http://pv.sohu.com/cityjson', false);
    let data1 = JSON.parse(`{${data.split('{')[1].split('}')[0]}}`).cid;
    let data2 = await global.commonGet(
      `http://www.tianqiapi.com/api/?version=v1&cityid=${data1 || 101220305}&appid=64432121&appsecret=n5ZcREXu`
    );
    ctx.body = Object.assign(global.createObj(), { item: data2 });
  }
};
module.exports = obj;
