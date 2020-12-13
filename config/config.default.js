'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1536282709723_477';

  // add your config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    }
  }

  // config.wechat = {
  //   grant_type: 'client_credential',
  //   appid: 'wx34727032e21a5295',
  //   secret: 'b1a3b1ec1fc4daeac1f08e173d37279d',
  //   noncestr: '160303',
  //   accessTokenUrl: 'https://api.weixin.qq.com/cgi-bin/token',
  //   ticketUrl: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
  //   cache_duration: 1000*60*60*24,
  //   domain: 'crz.natapp1.cc'
  // }

  config.wechat = {
    grant_type: 'client_credential',
    appid: 'wxf5d8fc1891bdf774',
    secret: 'ffc645af2acb0b589e2c7f5e63dc8da6',
    noncestr: '160303',
    accessTokenUrl: 'https://api.weixin.qq.com/cgi-bin/token',
    ticketUrl: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
    loginUrl: 'https://open.weixin.qq.com/connect/qrconnect',
    serviceUrl: 'http://www.polypite.com',
    cache_duration: 1000*60*60*24,
    domain: 'www.polypite.com',
    appid_h5: 'wx824ffce0d4f15829',
    secret_h5: '503427dc2866a5c48ee1ddbb982e42c8'
  }
   
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks'
    }
  }

  config.mqtt = {
    url: "mqtt://www.polypite.com:1883",
    username: '',
    password: '',
    clientid: ''

    // url: "tcp://m12.cloudmqtt.com:16610",
    // username: 'cqyjmitd',
    // password: 'SXLMuaorn881',
    // clientid: 'wechatserver-1536282709723'
  }

  config.mysql = {
      // 单数据库信息配置
      client: {
        // host
        //host: '192.168.8.102',
        //host: '192.168.31.127',
        host: '212.129.143.159',
        // 端口号
        port: '3307',
        // 用户名
        user: 'root',
        // 密码
        password: '1983117@crz',
        // 数据库名
        database: 'newlights',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
  }

  return config;
};
