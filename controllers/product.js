import connection from '../global/api';
import global from '../global/global';
let obj = {
  'POST /addProduct': async (ctx, next) => {
    let param = ctx.request.body;
    let data = await connection.query(`select * from product t where t.name = '${param.name}' and t.company = '${param.company}'`);
    // 先检查一下是否存在同名产品
    if (data.length) {
      ctx.body = Object.assign(global.createObj(false), {
        item: data,
        message: `已经存在名称为 ${param.name} 的产品，请修改产品名称后，再提交！`
      });
      return;
    }
    // 再去产品id表，给每个产品一个特定的id
    let data1 = await connection.query(`select * from _productid t where t.company = '${param.company}'`);
    let num = 0;
    if (!data1.length) {
      // 证明新企业第一次添加产品
      num = num + 1;
      await connection.query(`INSERT INTO _productid(currentIndex, company) VALUES ('${num}', '${param.company}') `);
    } else {
      num = data1[0].currentIndex + 1;
      await connection.query(`update _productid t set t.currentIndex = '${num}' where t.company = '${param.company}'`);
    }
    // 新增产品主表
    let str = global.add(
      [
        { str: 'proNumber', data: [...new Array(6 - (num + '').length)].map((r) => 0).join('') + num },
        { str: 'name' },
        { str: 'sort', data: param.sort.join(',') },
        { str: 'units' },
        { str: 'cost' },
        { str: 'price' },
        { str: 'createDate' },
        { str: 'createUser' },
        { str: 'company' },
        { str: 'sortNum' },
        { str: 'detailNum' },
        { str: 'detailNumB' }
      ],
      'product',
      param
    );
    let data2 = await connection.query(str);
    // productList 产品list表
    // let str1 = param.list
    //   .map((r) => `('${r.capacity}', '${r.money}', '${r.suttle}', '${r.size}', '${r.color}', '${r.remark || ''}', '${data2.insertId}')`)
    //   .join(',');
    // await connection.query(`INSERT INTO productList (capacity, money, suttle, size, color, remark, productId) values ${str1}`);
    // 添加图片
    if (param.photo && param.photo.length) {
      let str2 = param.photo.map((r) => `('${r.name}', '${r.url.replace(/\\/g, '\\\\')}', '${data2.insertId}')`).join(',');
      await connection.query(`INSERT INTO productPhoto (name, url, productId) values ${str2}`);
    }
    ctx.body = Object.assign(global.createObj(), { item: data, item1: data1, item2: data2 });
  },
  'POST /queryProduct': async (ctx, next) => {
    let param = ctx.request.body;
    let arr = [(param.pageIndex - 1) * param.pageSize, param.pageSize];
    let str = `select ta.*, date_format(ta.createDate, '%Y-%m-%d %H:%i:%S') as createDate1, tb.name as createName from product ta left join user tb ON ta.createUser = tb.id where ta.company = '${param.company}' and (ta.name like '%${param.value}%') limit ${arr[0]},${arr[1]}`;
    let str1 = `select count(1) from product ta left join user tb ON ta.createUser = tb.id where ta.company = '${param.company}' and (ta.name like '%${param.value}%')`;
    let data = await connection.query(str);
    let data1 = await connection.query(str1);
    let data2 = [];
    if (data.length) {
      data2 = await connection.query(`select * from productPhoto ta where ta.productId in (${data.map((r) => r.id + '').join()})`);
    }
    data.map((r) => {
      r.photo = [];
      r.photo = data2.filter(n => r.id === n.productId)
    });
    ctx.body = Object.assign(global.createObj(), { item: data, str: str, totalCount: data1[0]['count(1)'] });
  },
  'POST /delProduct': async (ctx, next) => {
    let param = ctx.request.body;
    let str = `delete from product where id = '${param.id}'`;
    let data = await connection.query(str);
    ctx.body = Object.assign(global.createObj(), { item: data });
  },
  'POST /editProduct': async (ctx, next) => {
    let param = ctx.request.body;
    let data_a = await connection.query(`select * from product t where t.name = '${param.name}' and t.company = '${param.company}'`);
    // 先检查一下是否存在同名产品
    if (data_a.length && data_a[0].id !== param.id) {
      ctx.body = Object.assign(global.createObj(false), {
        item: data_a,
        message: `已经存在名称为 ${param.name} 的产品，请修改产品名称后，再提交！`
      });
      return;
    }
    let str = global.edit(
      [
        { str: 'name' },
        { str: 'sort', data: param.sort.join(',') },
        { str: 'units' },
        { str: 'cost' },
        { str: 'price' },
        { str: 'sortNum' },
        { str: 'detailNum' },
        { str: 'detailNumB' }
      ],
      'product',
      param
    );
    let data = await connection.query(str);
    if (!param.photo.length) {
      // 如果为空了，去删除图片库的产品图片数据 或者photo的老数据带id的都空了。那也全部删除
      data1 = await connection.query(`delete from productphoto where productId = '${param.id}'`);
    } else {
      let [arr, arr1] = [param.photo.filter((r) => r.id), param.photo.filter((r) => !r.id)]; // 筛选出id不为空的数据， id为空的就是修改的时候新增的图片
      if (arr.length) {
        // 如果带id的还有，就not in删除
        data1 = await connection.query(`delete from productphoto where id not in(${arr.map((r) => r.id).join(',')}) and productId = '${param.id}'`);
      } else {
        // 如果一个都没了。直接全部删除
        data1 = await connection.query(`delete from productphoto where productId = '${param.id}'`);
      }
      if (arr1.length) {
        // 有新增的图片就插入新的
        data2 = await connection.query(
          `INSERT INTO productPhoto (name, url, productId) values ${arr1
            .map((r) => `('${r.name}', '${r.url.replace(/\\/g, '\\\\')}', '${param.id}')`)
            .join(',')}`
        );
      }
    }
    // // 处理产品详情多条的数据
    // let [arr, arr1] = [param.list.filter((r) => r.id), param.list.filter((r) => !r.id)]; // 筛选出id不为空的数据， id为空的就是修改的时候新增的
    // if (arr.length) {
    //   // 如果带id的还有，就not in删除，修改带id的数据
    //   data1 = await connection.query(`delete from productList where id not in(${arr.map((r) => r.id).join(',')}) and productId = '${param.id}'`);
    //   // 修改带id的数据
    //   await connection.query(global.update(param.list, 'productList'));
    // } else {
    //   // 如果一个都没了。直接全部删除
    //   data1 = await connection.query(`delete from productList where productId = '${param.id}'`);
    // }
    // // 有新增的就插入新的
    // if (arr1.length) {
    //   data2 = await connection.query(
    //     `INSERT INTO productList (capacity, money, suttle, size, color, remark, productId) values ${param.list
    //       .map((r) => `('${r.capacity}', '${r.money}', '${r.suttle}', '${r.size}', '${r.color}', '${r.remark || ''}', '${param.id}')`)
    //       .join(',')}`
    //   );
    // }
    ctx.body = Object.assign(global.createObj(), { item: data });
  },
  'POST /allProduct': async (ctx, next) => {
    let param = ctx.request.body;
    let str = `select ta.*, date_format(ta.createDate, '%Y-%m-%d %H:%i:%S') as createDate1, tb.name as createName from product ta left join user tb ON ta.createUser = tb.id where ta.company = '${
      param.company
    }' and (ta.name like '%${param.value || ''}%') `;

    let data = await connection.query(str);
    let data2 = [];
    if (data.length) {
      data2 = await connection.query(`select * from productPhoto ta where ta.productId in (${data.map((r) => r.id + '').join()})`);
    }
    data.map((r) => {
      r.photo = [];
      data2.map((n) => {
        if (r.id !== n.productId) return;
        r.photo.push(n);
      });
    });
    ctx.body = Object.assign(global.createObj(), { item: data, str: str });
  }
};
module.exports = obj;
