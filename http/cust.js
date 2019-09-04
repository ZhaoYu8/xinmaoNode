import connection from './api'
import global from '../global/global'
let obj = {
  addCust(param) { // 新增客户
    return new Promise((resolve, reject) => {
      let str = global.add([
        { str: 'name' },
        { str: 'phone' },
        { str: 'address' },
        { str: 'detailAddress' },
        { str: 'photo' },
        { str: 'createDate' },
        { str: 'createUser' },
        { str: 'company' }
      ], 'customer', param)
        connection.query(str, (err, results, fields) => {
          if (err) {
            reject(Object.assign(global.createObj(false), { str: str, err: err }))
            return
          }
          resolve(global.createObj())
        })
    })
  },
  queryCust(param) { // 查询客户
    return new Promise((resolve, reject) => {
      let arr = [(param.pageIndex - 1) * param.pageSize, param.pageSize]
      let str = `select ta.*, date_format(ta.createDate, '%Y-%m-%d %H:%I:%S') as createDate1, tb.name as createName from customer ta left join user tb ON ta.createUser = tb.id where ta.company = '${param.company}' and (ta.name like '%${param.value}%' or ta.phone like '%${param.value}%') limit ${arr[0]},${arr[1]}`
      let str1 = `;select count(1) from customer ta left join user tb ON ta.createUser = tb.id where ta.company = '${param.company}' and (ta.name like '%${param.value}%' or ta.phone like '%${param.value}%')`
        connection.query(str + str1, (err, results, fields) => {
          if (err) {
            reject(Object.assign(global.createObj(false), { str: str, err: err, param: param }))
            return
          }
          resolve(Object.assign(global.createObj(), { item: results[0], str: str, totalCount: results[1][0]['count(1)'] }))
        })
    })
  },
  deleteCust(param) { // 删除客户
    return new Promise((resolve, reject) => {
      let str = `delete from customer where id = ${param.id}`
      connection.connect((err) => {
        connection.query(str, (err, results, fields) => {
          if (err) {
            reject(global.createObj(false))
            return
          }
          resolve(Object.assign(global.createObj(), { item: results }))
        })
      })
    })
  },
  editCust(param) { // 修改客户
    return new Promise((resolve, reject) => {
      let str = `update customer set name = "${param.name}", phone = "${param.phone}", address = "${param.address}", detailAddress = "${param.detailAddress}", photo = "${param.photo}" where id = "${param.id}"`
      connection.connect((err) => {
        connection.query(str, (err, results, fields) => {
          if (err) {
            reject(Object.assign(global.createObj(false), { str: str, param: param }))
            return
          }
          resolve(Object.assign(global.createObj(), { item: results }))
        })
      })
    })
  }
}
export default obj