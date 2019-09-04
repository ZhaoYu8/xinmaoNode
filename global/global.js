// add 新增 edit 修改 delete 删除 query 查询
import moment from 'moment'
let obj = {
  add(arr = [], table = '', param = {}) {
    let [str, str1] = [`INSERT INTO ${table} (${arr.map(r => r.str).join(',')}) value (`, ``]
    arr.map(r => {
      let paramData = `${r.data ? r.data : param[r.str] || ''}`
      if (r.str === 'createDate') { // 创建时间单独处理
        paramData = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      } else if (r.str === 'createUser') { // 创建人单独处理
        paramData = param['currentId']
      }
      str1 += `"${paramData}"` + ','
    })
    return str + str1.slice(0, str1.length - 1) + ')'
  },
  createObj(type = true, obj = {}) {
    return obj = type ? Object.assign(obj, { message: '成功', success: true }) : Object.assign(obj, { message: '失败, 请联系管理员', success: false })
  }
}
export default obj