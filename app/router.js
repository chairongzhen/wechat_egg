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
  router.post('/bind',controller.setup.bind);
  router.get('/checktime',controller.setup.checktime);
  router.get("/checkaccount",controller.account.checkaccount);
  router.get("/checkmachine",controller.account.checkmachine);
  router.get("/bingmachine",controller.account.bingmachine);
  router.get("/unbindmachine",controller.account.unbindmachine);
  router.get("/updateip",controller.account.updateip);
  router.get("/updatemlog",controller.account.updatemlog);
  router.get("/getmacip",controller.account.getmacip);
  router.get("/getbasicinfo",controller.pinopr.getbasicinfo);
  router.get("/updatebasicinfo",controller.pinopr.updatebasicinfo);
  router.get("/updatelightdetail",controller.pinopr.updatelightdetail);
  router.get("/getbindmachine",controller.pinopr.getbindmachine);
  router.get("/updatefixlight",controller.pinopr.updatefixlight);

};
