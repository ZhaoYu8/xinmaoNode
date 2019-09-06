import connection from '../http/api'
import global from '../global/global'
let obj = {
  'POST /uploadfiles': async (ctx, next) => {
    const files = ctx.request.files.file; // 获取上传文件
    ctx.body = (Object.assign(global.createObj(), {file: files}))
  }
}
module.exports = obj;