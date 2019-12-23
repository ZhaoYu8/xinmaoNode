import connection from '../global/api';
import global from '../global/global';
let obj = {
  'POST /addProject': async (ctx, next) => {
    let param = ctx.request.body;
    let data3 = await connection.query(
      `select * from project t where t.name = '${param.name}' and t.company = '${param.company}'`
    );
    if (data3.length) {
      ctx.body = Object.assign(global.createObj(false), {
        item: data,
        item1: data1,
        message: `已经存在名称为 ${param.name} 的产品，请修改产品名称后，再提交！`
      });
      return;
    }
    let data2 = await connection.query(`select * from _projectid t where t.company = '${param.company}'`);
    let num = 0;
    if (!data2.length) {
      // 证明新企业第一次添加产品
      num = num + 1;
      await connection.query(`INSERT INTO _projectid(currentIndex, company) VALUES ('${num}', '${param.company}') `);
    } else {
      num = data2[0].currentIndex + 1;
      await connection.query(`update _projectid t set t.currentIndex = '${num}' where t.company = '${param.company}'`);
    }
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
        { str: 'testUrl' }
      ],
      'project',
      param
    );
    let data = await connection.query(str);
    let data1 = {};
    if (param.photo && param.photo.length) {
      let str1 = param.photo
        .map((r) => `('${r.name}', '${r.url.replace(/\\/g, '\\\\')}', '${data.insertId}')`)
        .join(',');
      data1 = await connection.query(`INSERT INTO projectPhoto (name, url, projectId) values ${str1}`);
    }
    ctx.body = Object.assign(global.createObj(), { item: data, item1: data1 });
  },
  'POST /queryProject': async (ctx, next) => {
    let param = ctx.request.body;
    let arr = [(param.pageIndex - 1) * param.pageSize, param.pageSize];
    let str = `select ta.*, date_format(ta.createDate, '%Y-%m-%d %H:%i:%S') as createDate1, tb.name as createName from project ta left join user tb ON ta.createUser = tb.id where ta.company = '${param.company}' and (ta.name like '%${param.value}%') limit ${arr[0]},${arr[1]}`;
    let str1 = `select count(1) from project ta left join user tb ON ta.createUser = tb.id where ta.company = '${param.company}' and (ta.name like '%${param.value}%')`;
    let data = await connection.query(str);
    let data1 = await connection.query(str1);
    let data2 = [];
    if (data.length) {
      data2 = await connection.query(
        `select * from projectPhoto ta where ta.projectId in (${data.map((r) => r.id + '').join()})`
      );
    }
    data.map((r) => {
      r.photo = [];
      data2.map((n) => {
        if (r.id !== n.projectId) return;
        r.photo.push(n);
      });
    });
    ctx.body = Object.assign(global.createObj(), { item: data, str: str, totalCount: data1[0]['count(1)'] });
  },
  'POST /delProject': async (ctx, next) => {
    let param = ctx.request.body;
    let str = `delete from project where id = '${param.id}'`;
    let data = await connection.query(str);
    ctx.body = Object.assign(global.createObj(), { item: data });
  },
  'POST /editProject': async (ctx, next) => {
    let param = ctx.request.body;
    let str = global.edit(
      [
        { str: 'name' },
        { str: 'sort', data: param.sort.join(',') },
        { str: 'units' },
        { str: 'cost' },
        { str: 'price' },
        { str: 'testUrl' }
      ],
      'project',
      param
    );
    let data = await connection.query(str);
    let [data1, data2] = [{}, {}];
    if (!param.photo.length) {
      // 如果为空了，去删除图片库的产品图片数据 或者photo的老数据带id的都空了。那也全部删除
      data1 = await connection.query(`delete from projectphoto where projectId = '${param.id}'`);
    } else {
      let [arr, arr1] = [param.photo.filter((r) => r.id), param.photo.filter((r) => !r.id)]; // 筛选出id不为空的数据， id为空的就是修改的时候新增的图片
      if (arr.length) {
        // 如果带id的还有，就not in删除
        data1 = await connection.query(
          `delete from projectphoto where id not in(${arr.map((r) => r.id).join(',')}) and projectId = '${param.id}'`
        );
      } else {
        // 如果一个都没了。直接全部删除
        data1 = await connection.query(`delete from projectphoto where projectId = '${param.id}'`);
      }
      if (arr1.length) {
        // 有新增的图片就插入新的
        data2 = await connection.query(
          `INSERT INTO projectPhoto (name, url, projectId) values ${arr1
            .map((r) => `('${r.name}', '${r.url.replace(/\\/g, '\\\\')}', '${param.id}')`)
            .join(',')}`
        );
      }
    }
    ctx.body = Object.assign(global.createObj(), { item: data, photoItem: [data1, data2] });
  },
  'POST /allProject': async (ctx, next) => {
    let param = ctx.request.body;
    let str = `select ta.*, date_format(ta.createDate, '%Y-%m-%d %H:%i:%S') as createDate1, tb.name as createName from project ta left join user tb ON ta.createUser = tb.id where ta.company = '${
      param.company
    }' and (ta.name like '%${param.value || ''}%') `;

    let data = await connection.query(str);
    let data2 = [];
    if (data.length) {
      data2 = await connection.query(
        `select * from projectPhoto ta where ta.projectId in (${data.map((r) => r.id + '').join()})`
      );
    }
    data.map((r) => {
      r.photo = [];
      data2.map((n) => {
        if (r.id !== n.projectId) return;
        r.photo.push(n);
      });
    });
    ctx.body = Object.assign(global.createObj(), { item: data, str: str });
  }
};
module.exports = obj;
