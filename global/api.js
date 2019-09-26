let mysql = require('mysql')
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'xinmao',
  multipleStatements: true
})
// 封装
pool.query = (sql) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      connection.query(sql, (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
        connection.release() // 释放连接资源 | 跟 connection.destroy() 不同，它是销毁
      })
    })
  });
}
export default pool
