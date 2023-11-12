import jwt from 'jsonwebtoken'
import config from '../config/default'

// const {promisify} = require('util');
// const redisConfig = config.redis;
// const client = Redis.createClient({
//   port: redisConfig.PORT,          // Redis port
//   host: redisConfig.HOST,   // Redis host
//   family: redisConfig.FAMILY,           // 4 (IPv4) or 6 (IPv6)
//   password: redisConfig.PAWORD
// })

// const get = promisify(client.get).bind(client);
// const set = promisify(client.set).bind(client);

async function getLoginInfo(ctx) {
  const authorization = ctx.request.header.authorization // 获取jwt
  // if(!authorization) throw ''
  const authList = authorization ? authorization.split(' ') : []
  const token = Array.isArray(authList) && authList[1] ? authList[1] : ''
  let loginUser = ''
  if (token) {
    loginUser = await jwt.verify(token, config.secret) // 解密payload，获取用户名和ID
    // console.log('---------loginUser--------')
    // console.log('login_user_code:' + loginUser.code)
    // console.log('login_user_type:' + loginUser.type)
    // console.log('login_user_id:' + loginUser.id)
    // console.log('token:' + token)
    // console.log('--------------------------')
    return {
      code: loginUser.code,
      type: loginUser.type,
      id: loginUser.id,
      token: token
    }
  } else {
    throw '获取登录信息失败！'
  }
}

async function filterQuery(ctx, info = {}) {
  const { id, type } = await getLoginInfo(ctx)
  if (type === 'USER') {
    info = JSON.parse(JSON.stringify(info))
    info.userId = id
  }
  return info
}

module.exports = {
  getLoginInfo,
  filterQuery
}
