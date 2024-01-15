// app/service/wechat.js

const Service = require('egg').Service;
const axios = require('axios');

class WechatService extends Service {
  async getOpenId(code) {
    const { appid, secret } = this.config.wechat;
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`;

    const response = await axios.get(url);
    return response.data; // 包含 open_id 和 session_key
  }
}

module.exports = WechatService;
