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

  return config;
};
