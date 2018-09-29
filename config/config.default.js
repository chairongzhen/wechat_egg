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

  config.wechat = {
    grant_type: 'client_credential',
    appid: 'wx34727032e21a5295',
    secret: 'b1a3b1ec1fc4daeac1f08e173d37279d',
    noncestr: '160303',
    accessTokenUrl: 'https://api.weixin.qq.com/cgi-bin/token',
    ticketUrl: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
    cache_duration: 1000*60*60*24
  }
   
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks'
    }
  }

  config.mqtt = {
    url: "tcp://m12.cloudmqtt.com:16610",
    username: 'cqyjmitd',
    password: 'SXLMuaorn881',
    clientid: 'wechatserver-1536282709723'
  }

  config.mysql = {
      // 单数据库信息配置
      client: {
        // host
        //host: '192.168.8.102',
        //host: '192.168.31.127',
        host: localhost,
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '111111',
        // 数据库名
        database: 'Lights',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
  }

  return config;
};
