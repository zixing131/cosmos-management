import AliOSS from 'ali-oss';
import * as config from '../config/default';

const aliyunConfig = config.aliyun;

module.exports = new AliOSS({
  region: aliyunConfig.OSSREGION,          // Redis port
  accessKeyId: aliyunConfig.ACCESSKEYID,   // Redis host
  accessKeySecret: aliyunConfig.ACCESSKEYSECRET,           // 4 (IPv4) or 6 (IPv6)
  bucket: aliyunConfig.OSSBUCKET
}); 