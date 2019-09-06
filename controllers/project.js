import connection from '../http/api'
import global from '../global/global'
let obj = {
  'POST /addProject': async (ctx, next) => {
    let param = ctx.request.body
    let str = global.add(
      [
        { str: 'name' }, { str: 'sort' }, { str: 'units' },
        { str: 'cost' }, { str: 'price' }, { str: 'photo' },
        { str: 'createDate' }, { str: 'createUser' }, { str: 'company' }
      ], 'project', param)
    let data = await connection.query(str)
    ctx.body = (Object.assign(global.createObj(), { item: data }))
  }
}
module.exports = obj;