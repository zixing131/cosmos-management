module.exports = (options, app) => {
  return async function jwt(ctx, next) {
    const token = ctx.request.header.authorization;
    let decode;
    if (token) {
      try {
        decode = app.jwt.verify(token, options.secret); // 验证 token
        await next();
      } catch (error) {
        ctx.status = 401;
        ctx.body = {
          message: 'token 已过期，请重新登录',
        };
        return;
      }
    } else {
      if (options.whitelist.includes(ctx.path)) { // 如果当前路径在白名单中，则跳过验证
        await next();
      } else {
        ctx.status = 401;
        ctx.body = {
          message: '请登录',
        };
        return;
      }
    }
  };
};