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
  //router.get("/version",controller.setup.checkversion);


  router.get("/login",controller.login.Login);
  router.get("/index",controller.login.Index);

  router.post("/updatemid",controller.account.updatemid);


  // for ios app start
  router.post("/register",controller.account.register);
  router.post("/applogin",controller.account.login);
  router.post("/getset",controller.pinopr.getsetting);
  router.post("/updateset",controller.pinopr.updateset);
  router.post("/getbinds", controller.pinopr.getbinds);
  router.post("/unbindforapp",controller.account.unbind);
  router.post("/bindmid",controller.account.bindmid);
  router.post("/updatefix",controller.pinopr.updatefix);
  router.post("/getfix",controller.pinopr.getfix);
  router.post("/getrepeats",controller.pinopr.getrepeats);
  router.post("/deltag",controller.pinopr.deltag);
  router.post("/emptytagsios",controller.pinopr.emptytagsios);
  router.post("/gettagvalueios",controller.pinopr.gettagvalueios);
  router.post("/updatetags",controller.pinopr.updatetags);
  router.get("/version",controller.setup.checkVersion);
  router.get("/checkesp",controller.setup.checkEsp);
  router.get("/espnew",controller.setup.espNew);
  router.post("/wxlogin",controller.account.wxlogin);
  // for ios app end

  // for wechat mini
  router.get("/minilogin",controller.login.LoginMini);
  // for wechat mini

  // for h5 pplight
  router.get("/wxh5login",controller.login.wxh5login);
  // for h5 pplight

  router.get("/gettest",controller.account.test);
  router.post("/posttest",controller.account.test);
  router.get("/NIXjTcrlqy.txt", controller.home.h5Auth);
  router.get("/apple-app-site-association",controller.home.ulink);
};
