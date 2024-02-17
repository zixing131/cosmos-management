// app/controller/upload.js

const Controller = require('egg').Controller;

class UploadController extends Controller {
  async index() {
    const { ctx } = this;

    // 检查请求是否包含文件
    if (!ctx.request.files) {
      ctx.throw(400, '没有上传的文件');
    }

    const file = ctx.request.files[0]; // 获取上传的文件

    // file.filename的文件名和文件后缀中间添加随机数
    
    try {
      // 假设有一个 service 用于处理文件上传
      // 这里调用该 service，并传入文件信息
      const url = await ctx.service.oss.put(file.filepath, encodeURIComponent(`${Math.random().toString(36).slice(2)}.${file.filename.split('.')[1]}`)); // 上传文件

      ctx.body = {
        url, // 返回文件 URL
        message: '上传成功'
      };
    } catch (err) {
      ctx.body = {
        message: '上传失败',
        error: err.message,
      };
    } finally {
      // 清理临时文件
      await ctx.cleanupRequestFiles();
    }
  }
}

module.exports = UploadController;
