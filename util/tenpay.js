import config from '../config/wechat';
import path from 'path';
import tenpay from 'tenpay';

// // 方式一
// const api = new tenpay(config);
// // 方式二
// const api = tenpay.init(config);

// // 调试模式(传入第二个参数为true, 可在控制台输出数据)
// const api = new tenpay(config, true);

// 沙盒模式(用于微信支付验收)

// async function getApi(ctx, next) {
//   return new tenpay({
//     appid: config.appId,
//     mchid: config.mchid,
//     partnerKey: config.partnerKey,
//     pfx: require('fs').readFileSync(path.join(__dirname, "../../lemony-village-cert/apiclient_cert.p12")),
//     notify_url: 'https://www.janicex.com/pay/result',
//   }, true);
// }

module.exports = new tenpay({
  appid: config.appId,
  mchid: config.mchid,
  partnerKey: config.partnerKey,
  // pfx: require('fs').readFileSync(path.join(__dirname, "../../lemony-village-cert/apiclient_cert.p12")),
  notify_url: 'https://www.by-gym.com/api/pay/notice',
}, true);

