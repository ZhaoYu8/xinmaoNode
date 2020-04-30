import connection from '../global/api';
import global from '../global/global';
import moment from 'moment';
let obj = {
  // 根据地址查询天气
  'POST /weather': async (ctx, next) => {
    let arr = ['province', 'city', 'county'];
    let param = ctx.request.body;
    let params = ['上海', '上海', '宝山'];
    if (param.city && param.city.length) params = param.city;
    // 解决直辖市的问题, 数据为 ['湖北省', '湖北省', '仙桃市']
    if (params[0] === params[1] && params[0].includes('省')) {
      params[0] = params[0].slice(0, params[0].length - 1);
      params[1] = params[2];
      params.length--;
    }
    console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'), params);
    const strParams = (o) => {
      let str = '';
      if (o === 1) {
        str = params.map((r, i) => {
          return `&${arr[i]}=${i !== 2 ? encodeURIComponent(r) : ''}`;
        });
      } else {
        str = params.map((r, i) => {
          return `&${arr[i]}=${encodeURIComponent(r)}`;
        });
      }
      return str.join('');
    };
    let [str, str1] = [
      'https://wis.qq.com/weather/common?source=xw&weather_type=observe|rise|forecast_1h|forecast_24h|index|alarm|limit|tips', // 实时天气
      'https://wis.qq.com/weather/common?source=xw&weather_type=air' // pm 取值，这里有个逻辑，如果要找县或者区级，PM county 要传空值
    ];
    let data = await global.commonGet(`${str}${strParams()}`);
    if (!data) {
      // 因为 腾讯的接口刷新几次会卡住很久，所以如果500毫秒没有返回结果，直接开启新的请求。不等待了。
      data = await global.commonGet(`${str}${strParams()}`);
      if (!data) {
        data = await global.commonGet(`${str}${strParams()}`);
      }
      if (!data) {
        data = await global.commonGet(`${str}${strParams()}`);
      }
      if (!data) {
        data = await global.commonGet(`${str}${strParams()}`);
      }
      if (!data) {
        data = await global.commonGet(`${str}${strParams()}`);
      }
    }
    let data1 = await global.commonGet(`${str1}${strParams(1)}`);
    ctx.body = Object.assign(global.createObj(), { item: Object.assign(data.data, { air: data1.data && data1.data.air, loc: params }) });
  },
  // 'GET /weather2': async (ctx, next) => {
  //   let data = await global.commonGet('http://restapi.amap.com/v3/ip?key=2e274b34f0284d295206dd1f8afca37c');
  //   let data1 = JSON.parse(`{${data.split('{')[1].split('}')[0]}}`).adcode;
  //   let data2 = await global.commonGet(`http://www.tianqiapi.com/api/?version=v1&cityid=${data1 || 101220305}&appid=64432121&appsecret=n5ZcREXu`);
  //   ctx.body = Object.assign(global.createObj(), { item: data2 });
  // },
  // 根据地址查询天气
  'GET /weather': async (ctx, next) => {
    let arr = ['province', 'city', 'county'];
    let param = ctx.request.body;
    let params = ['上海', '上海', '宝山'];
    if (param.city && param.city.length) params = param.city;
    const strParams = (o) => {
      let str = '';
      if (o === 1) {
        str = params.map((r, i) => {
          return `&${arr[i]}=${i !== 2 ? encodeURIComponent(r) : ''}`;
        });
      } else {
        str = params.map((r, i) => {
          return `&${arr[i]}=${encodeURIComponent(r)}`;
        });
      }
      return str.join('');
    };
    let [str, str1] = [
      'https://wis.qq.com/weather/common?source=xw&weather_type=observe|rise|forecast_1h|forecast_24h|index|alarm|limit|tips', // 实时天气
      'https://wis.qq.com/weather/common?source=xw&weather_type=air' // pm 取值，这里有个逻辑，如果要找县或者区级，PM county 要传空值
    ];
    let data = await global.commonGet(`${str}${strParams()}`);
    if (!data) {
      // 因为 腾讯的接口刷新几次会卡住很久，所以如果500毫秒没有返回结果，直接开启新的请求。不等待了。
      data = await global.commonGet(`${str}${strParams()}`);
      if (!data) {
        data = await global.commonGet(`${str}${strParams()}`);
      }
      if (!data) {
        data = await global.commonGet(`${str}${strParams()}`);
      }
      if (!data) {
        data = await global.commonGet(`${str}${strParams()}`);
      }
      if (!data) {
        data = await global.commonGet(`${str}${strParams()}`);
      }
    }
    let data1 = await global.commonGet(`${str1}${strParams(1)}`);
    ctx.body = Object.assign(global.createObj(), { item: Object.assign(data.data, { air: data1.data && data1.data.air, loc: params }) });
  },
  'POST /selWeather': async (ctx, next) => {
    let param = ctx.request.body;
    let data = {};
    if (param.city.trim()) {
      data = await global.commonGet(`https://wis.qq.com/city/matching?source=xw&city=${encodeURIComponent(param.city)}`);
    }
    // let arr = ['province', 'city', 'county'];
    ctx.body = Object.assign(global.createObj(), { item: data.data });
  }
  // 适用于h5页面进行ip定位
  // 'POST /ipAddress': async (ctx, next) => {
  //   let data = await global.commonGet('http://restapi.amap.com/v3/ip?key=2e274b34f0284d295206dd1f8afca37c');
  //   let data1 = JSON.parse(`{${data.split('{')[1].split('}')[0]}}`).adcode;
  //   let data2 = await global.commonGet(`http://www.tianqiapi.com/api/?version=v1&cityid=${data1 || 101220305}&appid=64432121&appsecret=n5ZcREXu`);
  //   ctx.body = Object.assign(global.createObj(), { item: data2 });
  // }
};
module.exports = obj;
