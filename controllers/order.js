import connection from '../global/api'
import global from '../global/global'
let obj = {
  'POST /addUser': async (ctx, next) => {
    let param = ctx.request.body
    let str = global.add(
      [
        { str: 'name' }, { str: 'branch', data: param.branch.join(',') }, { str: 'phone' },
        { str: 'sex' }, { str: 'address', data: param.address.join(',') }, { str: 'detailAddress' },
        { str: 'sales', data: param.sales ? 1 : 0 }, { str: 'password', data: '654321' }, { str: 'company' }, { str: 'dr', data: '1' }
      ], 'user', param)
    let data = await connection.query(str)
    ctx.body = (Object.assign(global.createObj(), { item: data }))
  }
}
module.exports = obj;