// add 新增 edit 修改 delete 删除 query 查询
import moment from 'moment';
import http from 'http';
import fs from 'fs';
import path from 'path';
let obj = {
  add(arr = [], table = '', param = {}) {
    let [str, str1] = [`INSERT INTO ${table} (${arr.map((r) => r.str).join(',')}) value (`, ``];
    arr.map((r) => {
      let paramData = `${r.data !== undefined ? r.data : param[r.str] !== undefined ? param[r.str] : ''}`; // 这里是解决，和id对不上。而自己单独赋值的方法
      if (r.str === 'createDate') {
        // 创建时间单独处理
        paramData = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      } else if (r.str === 'createUser') {
        // 创建人单独处理
        paramData = param['currentId'];
      }
      str1 += `"${paramData}"` + ',';
    });
    return str + str1.slice(0, str1.length - 1) + ')';
  },
  edit(arr = [], table = '', param = {}) {
    let [str, str1] = [`update ${table} set `, ``];
    arr.map((r, i) => {
      let paramData = `${r.data !== undefined ? r.data : param[r.str] !== undefined ? param[r.str] : ''}`; // 这里是解决，和id对不上。而自己单独赋值的方法
      if (r.str === 'updateDate') {
        // 创建时间单独处理
        paramData = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      } else if (r.str === 'updateUser') {
        // 创建人单独处理
        paramData = param['currentId'];
      }
      str1 += `${r.str}= "${paramData}"` + ',';
    });
    return str + str1.slice(0, str1.length - 1) + ` where id = "${param.id}"`;
  },
  createObj(type = true, obj = {}) {
    return (obj = type
      ? Object.assign(obj, { message: '成功', success: true })
      : Object.assign(obj, { message: '失败了，请重试。如果依然失败请联系管理员！', success: false }));
  },
  commonGet(url, jsonParse = true) {
    // 天气接口，单独领到这
    return new Promise((resolve, reject) => {
      http.get(url, (res) => {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => {
          rawData += chunk;
        });
        res.on('end', () => {
          if (jsonParse) {
            resolve(JSON.parse(rawData));
          } else {
            resolve(rawData);
          }
        });
      });
    });
  },
  // 查询目录是否存在
  getStat(path) {
    return new Promise((resolve, reject) => {
      fs.access(path, (err) => {
        resolve(err);
      });
    });
  },
  // 创建文件夹
  mkdir(dir) {
    return new Promise((resolve, reject) => {
      fs.mkdir(dir, fs.constants.F_OK, (err) => {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  },
  // 查询文件夹目录
  async dirExists(date) {
    let YY = await obj.getStat(date[0]);
    let MM = await obj.getStat(date[1]);
    //如果月份文件夹和日期文件夹都存在的话，就不用创建的了!
    if (!YY && !MM) {
      return true;
    }
    if (YY) {
      await obj.mkdir(date[0]);
    }
    if (MM) {
      await obj.mkdir(date[1]);
    }
    return true;
  }
};
export default obj;
