'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/api/user', controller.api.user.list);
  router.get('/api/user/login', controller.api.user.list);
  router.post('/api/wx/login', controller.api.user.login);
  router.post('/api/user/create', controller.api.user.create);
  router.put('/api/user/update', controller.api.user.update);
  router.delete('/api/user/destroy', controller.api.user.destroy);

  router.get('/api/account', controller.api.account.list);
  router.post('/api/account/create', controller.api.account.create);
  router.put('/api/account/update', controller.api.account.update);
  router.delete('/api/account/destroy', controller.api.account.destroy);
  router.post('/api/account/login', controller.api.account.login);

  router.get('/api/info', controller.api.info.list);
  router.post('/api/info/create', controller.api.info.create);
  router.put('/api/info/update', controller.api.info.update);
  router.delete('/api/info/destroy', controller.api.info.destroy);

  router.get('/api/warranty', controller.api.warranty.list);
  router.post('/api/warranty/create', controller.api.warranty.create);
  router.put('/api/warranty/update', controller.api.warranty.update);
  router.delete('/api/warranty/destroy', controller.api.warranty.destroy);

  router.get('/api/cases', controller.api.cases.list);
  router.post('/api/cases/create', controller.api.cases.create);
  router.put('/api/cases/update', controller.api.cases.update);
  router.delete('/api/cases/destroy', controller.api.cases.destroy);

  router.get('/api/caseImages', controller.api.caseImages.list);
  router.post('/api/caseImages/create', controller.api.caseImages.create);
  router.put('/api/caseImages/update', controller.api.caseImages.update);
  router.delete('/api/caseImages/destroy', controller.api.caseImages.destroy);

  router.post('/api/upload', controller.api.upload.index)
  
  router.get('*', controller.home.index);
};
