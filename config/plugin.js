'use strict';
const path = require('path');
// exports.sequelize = {
//   enable: true,
//   package: 'egg-isequelize'
// }
 
exports.validate = {
  enable: true,
  package: 'egg-async-ivalidator',
};
 
exports.generator = {
  enable: true,
  path: path.join(__dirname, '../lib/plugins/egg-generator'),
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
}