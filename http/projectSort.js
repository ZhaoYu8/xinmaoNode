import connection from './api'
import global from '../global/global'
let obj = {
  addProjectSort(param) { // 新增产品分类
    return new Promise((resolve, reject) => {
      let str = global.add(['name', 'parent'], 'projectSort', param)
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
  queryProjectSort(param) { // 查询产品
    return new Promise((resolve, reject) => {
      let str = `select ta.* from projectSort ta`
      connection.connect((err) => {
        connection.query(str, (err, results, fields) => {
          let obj = {
            message: "成功！",
            success: true,
            item: results
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
          resolve(obj)
        })
      })
    })
  }
}
export default obj