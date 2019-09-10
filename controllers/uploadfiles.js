import connection from '../http/api'
import fs from 'fs'
import path from 'path'
import global from '../global/global'
let obj = {
  'POST /uploadfiles': async (ctx, next) => {
    const file = ctx.request.files.file; // 上传的文件在ctx.request.files.file
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    // 修改文件的名称
    var myDate = new Date();
    var newFilename = myDate.getTime()+'.'+file.name.split('.')[1];
    var targetPath = path.join(__dirname, '../nginx/html/uploads') + `/${newFilename}`;
    //创建可写流
    const upStream = fs.createWriteStream(targetPath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    //返回保存的路径
    
    return ctx.body = (Object.assign(global.createObj(), { file: {
      name: file.name,
      address: 'http://106.13.198.174/uploads/' + newFilename
    }}))
  }
}
module.exports = obj;