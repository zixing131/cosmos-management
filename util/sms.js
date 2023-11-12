import * as config from '../config/default';
import SMSClient from '@alicloud/sms-sdk';

const aliyunConfig = config.aliyun;

module.exports = new SMSClient({
  accessKeyId : aliyun.accessKeyId,
  secretAccessKey : aliyunConfig.ACCESSKEYSECRET
});
