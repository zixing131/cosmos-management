module.exports = () => {
  return async function wrapResponse(ctx, next) {
    try {
      await next();
      console.log('wrapResponse', ctx.body)
      
      if (ctx.url.indexOf('/api') === -1) {
        return;
      }
      
      if (ctx.body) {
        if(ctx.body.meta) {
          ctx.body = {
            code: 200,
            data: ctx.body.data,
            meta: ctx.body.meta,
            message: '操作成功',
            success: true,
          };
        } else {
          ctx.body = {
            code: 200,
            data: ctx.body,
            message: '操作成功',
            success: true,
          };
        }
      }
    } catch (err) {
      // 如果发生错误，设置错误响应
      ctx.status = err.status || 500;
      ctx.body = {
        code: err.status || 500,
        message: err.message || '服务器错误',
        success: false
      };
    }
  };
};
