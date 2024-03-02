'use strict';
const Controller = require('egg').Controller;

/**
 * user controller
 */
class UserController extends Controller {

  /**
   * user paginate query
   */
  async list() {
    this.ctx.body = await this.ctx.service.user.paginate();
  }

  /**
   * create user
   */
  async create() {
    this.ctx.body = await this.ctx.service.user.create();
  }

  /**
   * update user by id
   */
  async update() {
    this.ctx.body = await this.ctx.service.user.update();
  }

  /**
   * update user by id
   */
  async info() {
    this.ctx.body = await this.ctx.service.user.info();
  }

  /**
   * destroy user by id
   */
  async destroy() {
    this.ctx.body = await this.ctx.service.user.destroy();
  }

  async login() {
    const { ctx, app } = this;
    const { code } = ctx.request.body;

    // 使用 code 获取 open_id 和 session_key
    const wechatData = await ctx.service.wechat.getOpenId(code);
    const { openid } = wechatData;

    // 检查用户是否存在
    let user = await ctx.model.User.findOne({ where: { open_id: openid } });

    // 如果用户不存在，则创建新用户
    if (!user) {
      user = await ctx.model.User.create({ open_id: openid });
    }

    // 通过openid查找一下account表是否有记录
    const account = await ctx.model.Account.findOne({ where: { open_id: openid } });


    // 生成 JWT Token
    const token = app.jwt.sign({
      id: user.id,
    }, app.config.jwt.secret);

    // 响应
    ctx.body = {
      user,
      token,
      isAdmin: account ? account.is_admin : false,
    };
  }
}

module.exports = UserController;
