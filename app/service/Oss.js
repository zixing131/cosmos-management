
const OSS = require('ali-oss');
const Service = require('egg').Service;

class OssService extends Service {
  constructor(ctx) {
    super(ctx);
    this.client = new OSS({
      region:'oss-cn-shenzhen',
      accessKeyId: 'LTAI5tAub7YFLbrYZg6MViZM',
      accessKeySecret: 'Eh8L14ZRSlHIHqLAzUbB154oChcTCW',
      bucket: 'cosmos-oss',
    });
  }

  async put(stream, filename) {
    // 获取当前日期，格式为 yyyy/MM/dd
    const date = new Date().toISOString().split('T')[0].replace(/-/g, '/');

    // 构建包含日期的文件路径
    const targetPath = `uploads/${date}/${filename}`;

    console.log('Uploading to:', targetPath);

    // 上传文件到指定的 OSS 路径
    const result = await this.client.put(targetPath, stream);
    return result.url;  // 返回文件的 URL
  } catch (err) {
    throw err;
  }
}

module.exports = OssService;