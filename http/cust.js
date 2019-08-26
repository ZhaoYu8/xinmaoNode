import connection from './api'
let obj = {
  addCust (param) {
    return new Promise((resolve, reject) => {
      let str = `INSERT INTO customer (name, phone, address, detailAddress, photo) values ("${param.name}", "${param.phone}", "${param.address}", "${param.detailaddress}", "${param.photo}")`
      connection.connect((err) => {
        connection.query(str, (err, results, fields) => {
          let obj = {
            message: "新增成功",
            success: true
          }
          if (err) {
            console.log(str)
            console.log(err)
            Object.assign(obj, {message: '新增失败', success: false, item: results})
            reject(obj)
          }
          resolve(obj)
        })
      })
    })
  },
  queryCust (param) {
    return new Promise((resolve, reject) => {
      let str = `select * from customer`
      connection.connect((err) => {
        connection.query(str, (err, results, fields) => {
          let obj = {
            message: "成功！",
            success: true,
            item: results
          }
          if (err) {
            Object.assign(obj, {message: '查询失败请联系管理员!', success: false, errorType: '400'})
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