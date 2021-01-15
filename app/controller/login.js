'use strict';
const Controller = require('egg').Controller;
const urlencode = require('urlencode');

class LoginController extends Controller {
    async Login() {
        const ctx = this.ctx;
        let loginurl = this.config.wechat.loginUrl;
        let appID = this.config.wechat.appid;
        let scope = "snsapi_login";
        let redirecturl = urlencode(this.config.wechat.serviceUrl + "/index");
        
        // let timespan = new Date().getTime();
        // let a = MD5("aa");
        //let wechatloginurl = `${loginurl}?appid=${appID}&redirect_uri=${redirecturl}/index&response_type=code&scope=${scope}&state=STATE#wechat_redirect`;
        
        let wechatloginurl = `https://open.weixin.qq.com/connect/qrconnect?appid=wxf5d8fc1891bdf774&redirect_uri=${redirecturl}&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect;`;
        await ctx.redirect(wechatloginurl);
    }

    async LoginMini() {
        const ctx = this.ctx;
        let js_code = ctx.request.query.code.replace(/\"/g,"");
        let url = `https://api.weixin.qq.com/sns/jscode2session?appid=wxd0318f0677af5a14&secret=2c4b71944744280d619fd2786979db64&js_code=${js_code}&grant_type=authorization_code`;
        let data = await ctx.curl(url,{dataType: 'json'});
        ctx.body = data;
    }

    async Index() {
        const ctx = this.ctx;
        let code = ctx.query.code;
        await ctx.render('main/index.html');
    }

    async wxh5login()  {
        const ctx = this.ctx;
        let code = ctx.request.query.code.replace(/\"/g,"");
        const userinfores = await ctx.service.verify.getwechatuserh5(code);
        ctx.cookies.set("username",'hellocookie')
        ctx.body = userinfores;
    }
}

module.exports = LoginController;