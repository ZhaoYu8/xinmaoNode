
import fs from 'fs'
function addMapping(router, mapping) {
  for (let url in mapping) {
    if (url.startsWith('GET ')) {
      let path = url.substring(4);
      router.get(path, mapping[url]);
    } else if (url.startsWith('POST ')) {
      let path = url.substring(5);
      router.post(path, mapping[url]);
    } else {
      console.log(`invalid URL: ${url}`);
    }
  }
}

function addControllers(router, dir) {
  fs.readdirSync(__dirname + '/' + dir).filter((n) => {
    return n.endsWith('.js');
  }).map((n) => {
    let mapping = require(__dirname + '/' + dir + '/' + n);
    addMapping(router, mapping);
  });
}
export default function (dir = 'controllers') {
  let router = require('koa-router')()
  addControllers(router, dir);
  return router.routes();
};