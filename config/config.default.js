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
    database: 'art-buddy',
    host: 'gz-cdb-ezdfpaq3.sql.tencentcdb.com',
    port: '63645',
    username: 'root',
    password: '@Benstyle1024',
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

  return {
    ...config,
  };
};
