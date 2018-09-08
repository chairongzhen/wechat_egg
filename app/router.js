'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  
  const wechat = app.middlewares.wechat({
    token: "wechattest",
    appid: "wx34727032e21a5295",
    encodingAESKey: ""
  })
  
  router.get('/', controller.home.index);
  router.get('/wechat',wechat);
  router.post('/wechat',wechat);
  router.get('/smartconfig',controller.setup.smartConfig);
  router.get('/scan',controller.setup.scan);
};
