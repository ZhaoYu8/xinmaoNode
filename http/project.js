import connection from './api'
import global from '../global/global'
import moment from 'moment'
let obj = {
  addProject(param) { // 新增产品
    return new Promise((resolve, reject) => {
      let str = global(['name', 'sort', 'units', 'cost', 'price', 'photo', 'createDate', 'createUser'], 'project', param)
      connection.connect((err) => {
        connection.query(str, (err, results, fields) => {
          let obj = {
            message: "新增成功",
            success: true
          }
          if (err) {
            Object.assign(obj, {
              message: '新增失败',
              success: false
            })
            reject(obj)
            return
          }
          resolve(obj)
        })
      })
    })
  },
  queryProject(param) { // 查询产品
    return new Promise((resolve, reject) => {
      let arr = [(param.pageIndex - 1) * param.pageSize, param.pageSize]
      let str = `select ta.*, date_format(ta.createDate, '%Y-%m-%d %H:%I:%S') as createDate1, tb.name as createName from customer ta left join user tb ON ta.createUser = tb.id where ta.name like '%${param.value}%' or ta.phone like '%${param.value}%' limit ${arr[0]},${arr[1]}`
      let str1 = `;select count(1) from customer ta left join user tb ON ta.createUser = tb.id where ta.name like '%${param.value}%' or ta.phone like '%${param.value}%'`
      connection.connect((err) => {
        connection.query(str + str1, (err, results, fields) => {
          let obj = {
            message: "成功！",
            success: true,
            item: results[0]
          }
          if (err) {
            Object.assign(obj, {
              message: '查询失败,请联系管理员!',
              success: false,
              str: str,
              err: err
            })
            reject(obj)
            return
          }
          Object.assign(obj, { totalCount: results[1][0]['count(1)'] })
          resolve(obj)
        })
      })
    })
  },
  deleteProject(param) { // 删除产品
    return new Promise((resolve, reject) => {
      let str = `delete from customer where id = ${param.id}`
      connection.connect((err) => {
        connection.query(str, (err, results, fields) => {
          let obj = {
            message: "成功！",
            success: true,
            item: results
          }
          if (err) {
            Object.assign(obj, {
              message: '删除失败, 请联系管理员!',
              success: false
            })
            reject(obj)
            return
          }
          resolve(obj)
        })
      })
    })
  },
  editProject(param) { // 修改产品
    return new Promise((resolve, reject) => {
      let str = `update customer set name = "${param.name}", phone = "${param.phone}", address = "${param.address}", detailAddress = "${param.detailAddress}", photo = "${param.photo}" where id = "${param.id}"`
      connection.connect((err) => {
        connection.query(str, (err, results, fields) => {
          let obj = {
            message: "修改成功！",
            success: true,
            item: results
          }
          if (err) {
            Object.assign(obj, {
              message: '修改失败, 请联系管理员!',
              success: false,
              str: str,
              param: param
            })
            reject(obj)
            return
          }
          resolve(obj)
        })
      })
    })
  }
}
export default obj