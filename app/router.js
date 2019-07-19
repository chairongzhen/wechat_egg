'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  
  const wechat = app.middlewares.wechat({
    token: "wechattest",
    appid: "wxf5d8fc1891bdf774",
    encodingAESKey: ""
  })
  
  router.get('/', controller.home.index);
  router.get('/404', controller.home.error);
  router.get('/MP_verify_JLi94vO16rP0kiBE.txt', controller.home.sercert)
  router.get('/wechat',wechat);
  router.post('/wechat',wechat);
  router.get('/smartconfig',controller.setup.smartConfig);
  router.get('/scan',controller.setup.scan);
  router.post('/bind',controller.setup.bind);
  router.post('/unbind',controller.setup.unbind);
  router.get('/checktime',controller.setup.checktime);
  router.get("/checkaccount",controller.account.checkaccount);
  router.get("/checkmachine",controller.account.checkmachine);
  router.get("/bingmachine",controller.account.bingmachine);
  router.get("/unbindmachine",controller.account.unbindmachine);
  router.get("/updateip",controller.account.updateip);
  router.get("/updatemlog",controller.account.updatemlog);
  router.get("/getmacip",controller.account.getmacip);
  router.get("/getbasicinfo",controller.pinopr.getbasicinfo);
  router.post("/updatebasicinfo",controller.pinopr.updatebasicinfo);
  router.post("/updatelightdetail",controller.pinopr.updatelightdetail);
  router.get("/getbindmachine",controller.pinopr.getbindmachine);
  router.post("/updatefixlight",controller.pinopr.updatefixlight);
  router.get("/binded",controller.setup.binded);
  router.get("/basic",controller.pinopr.basic);
  router.get("/repeat",controller.pinopr.repeat);
  router.get("/repeattest",controller.pinopr.repeattest);
  router.get("/repeatdetail",controller.pinopr.repeatdetail);
  router.post("/gettagvalue",controller.pinopr.gettagvalue);
  router.get("/candelete",controller.pinopr.candelete);
  router.post("/deletetag",controller.pinopr.deletetag);
  router.get("/checktagvalue",controller.pinopr.checktagvalue);
  router.get("/dislog",controller.account.dislog);
  router.get("/checkonline",controller.account.checkonline);
  router.post("/emptytags",controller.pinopr.emptytags);
  router.get("/version",controller.setup.checkversion);


  router.get("/login",controller.login.Login);
  router.get("/index",controller.login.Index);

  router.post("/updatemid",controller.account.updatemid);


  // for ios app start
  router.post("/register",controller.account.register);
  router.post("/applogin",controller.account.login);
  router.post("/getset",controller.pinopr.getsetting);
  router.post("/updateset",controller.pinopr.updateset);
  router.post("/getbinds", controller.pinopr.getbinds);
  router.post("/unbindforapp", controller.account.unbind);
  
  // for ios app end

  router.get("/gettest",controller.account.test);
  router.post("/posttest",controller.account.test);
};
