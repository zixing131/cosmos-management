/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1689863525045_1308';

  // add your middleware config here
  config.middleware = [];

  config.sequelize = {
    // single database
    dialect: 'mysql',// support: mysql, mariadb, postgres, mssql
    database: 'cosmos',
    host: 'rm-cn-uqm3kp6mj000loyo.rwlb.rds.aliyuncs.com',
    port: '3306',
    username: 'cosmos',
    password: 'Benstyle1024',
    timezone: '+08:00',
    hooks: {
      afterDefine(Model) {
        // add paginate method
        require('sequelize-pagination')({
          oneBaseIndex: true,
          pageSize: 20,
        })(Model);
      },
    },
  };

  // https://blog.csdn.net/weixin_43704471/article/details/90763103
  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.jwt = {
    secret: 'cosmos',
    whitelist: ['/api/account/login', '/api/user/login', '/api/register'],
  }

  config.middleware = ["wrapResponse"]

  config.wechat = {
    appid: 'wx1468d1149679d87e', // 微信小程序的 App ID
    secret: '3aec5fa93721ea6d1a4c886d91b3fb6f', // 微信小程序的 App Secret
  };

  config.multipart = {
    mode: 'file',
  };

  config.aliyunOSS = {
    client: {
      accessKeyId: 'LTAI5tAub7YFLbrYZg6MViZM',
      accessKeySecret: 'Eh8L14ZRSlHIHqLAzUbB154oChcTCW',
      bucket: 'cosmos-oss',
    }
  };

  return {
    ...config,
  };
};
