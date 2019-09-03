import connection from './api'
import global from '../global/global'
let obj = {
  addSort(param) { // 新增产品分类
    return new Promise((resolve, reject) => {
      this.querySort(param).then((data) => {
        if (data.item && data.item.length) {
          reject({ message: '名称已存在，请修改再试!' })
          return
        }
        let str = global.add([{ str: 'name' }, { str: 'parent' }, { str: 'company' }], 'projectSort', param)
        connection.connect((err) => {
          connection.query(str, (err, results, fields) => {
            if (err) {
              reject(global.createObj(false))
              return
            }
            resolve(global.createObj())
          })
        })
      })
    })
  },
  querySort(param) { // 查询产品分类
    return new Promise((resolve, reject) => {
      let str = `select ta.* from projectSort ta where 1 = 1`
      if (param.name) {
        str += ` and ta.name = '${param.name}'`
      }
      connection.connect((err) => {
        connection.query(str, (err, results, fields) => {
          if (err) {
            reject(Object.assign(global.createObj(false), { str: str, err: err }))
            return
          }
          resolve(Object.assign(global.createObj(), {item: results}))
        })
      })
    })
  },
  delSort(param) { // 删除产品分类
    return new Promise((resolve, reject) => {
      let str = `delete from projectSort ta where ta.id = '${param.id}'`
      connection.connect((err) => {
        connection.query(str, (err, results, fields) => {
          if (err) {
            reject(Object.assign(global.createObj(false), { str: str, err: err }))
            return
          }
          resolve(Object.assign(global.createObj()))
        })
      })
    })
  }
}
export default obj