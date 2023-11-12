'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/api/user', controller.api.user.list);
  router.post('/api/user/create', controller.api.user.create);
  router.put('/api/user/update', controller.api.user.update);
  router.delete('/api/user/destroy', controller.api.user.destroy);
};
