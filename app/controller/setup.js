'use strict';
const Controller = require('egg').Controller;

class SetupController extends Controller {
    async smartConfig() {
        const ctx = this.ctx;
        let url = ctx.request.protocol + "://" + ctx.request.host + ctx.request.originalUrl;
        const result = await ctx.service.verify.verify(url);
        await ctx.render('home/setup.html',result);
    }

    async scan() {
        const ctx = this.ctx;
        let url = ctx.request.protocol + "://" + ctx.request.host + ctx.request.originalUrl;
        let code = ctx.query.code;
        const userinfores = await ctx.service.verify.getwechatuser(code);
        
        let userinfo = {
            openid: userinfores.openid,
            nickname: userinfores.nickname,
            gender: userinfores.sex,
            province: userinfores.province,
            city: userinfores.city,
            country: userinfores.country,
            headimgurl: userinfores.headimgurl
        }
        await this.service.account.checkaccount(userinfo);
        const bindedres = await this.service.account.getusermachine(userinfores.openid);
        const machineinfo = await ctx.service.verify.verify(url);

        let result = {
            userinfo: userinfores,
            machineinfo: machineinfo,
            binddata: bindedres,
            domain: this.config.wechat.domain,
            appid: this.config.wechat.appid
        }
        await ctx.render('home/scan.html',result);
    }

    async binded() {
        const ctx = this.ctx;
        let url = ctx.request.protocol + "://" + ctx.request.host + ctx.request.originalUrl;
        let code = ctx.query.code;
        const userinfores = await ctx.service.verify.getwechatuser(code);
        if(userinfores && userinfores.openid) {
            let userinfo = {
                openid: userinfores.openid,
                nickname: userinfores.nickname,
                gender: userinfores.sex,
                province: userinfores.province,
                city: userinfores.city,
                country: userinfores.country,
                headimgurl: userinfores.headimgurl
            }
            await this.service.account.checkaccount(userinfo);
            const bindedres = await this.service.account.getusermachine(userinfores.openid);
            let res = [];
            for(let ta of bindedres) {
                let bindma = {
                    mid: ta.mid,
                    ip: ta.ip,
                    online: ta.online ==0?"离线":"在线" 
                }
                res.push(bindma);
            }
            const machineinfo = await ctx.service.verify.verify(url);
    
            let result = {
                userinfo: userinfores,
                machineinfo: machineinfo,
                binddata: res
            }
            await ctx.render('home/binded.html',result);
        } else {
            console.log('cannot get the openid');
            await ctx.redirect("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf5d8fc1891bdf774&redirect_uri=http://www.polypite.com/binded&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect");
        }
        
    }

    async bind() {
        const ctx = this.ctx;
        let openid = ctx.request.body.openid;
        let userinfo = {
            openid: openid
        }
        let mc = ctx.request.body.mc;        
        const result = await this.service.account.bingmachine(userinfo,mc);  
        ctx.body = { result };
        ctx.status = 201;
    }

    async unbind() {
        const ctx = this.ctx;
        let openid = ctx.request.body.openid;
        let userinfo = {
            openid: openid
        }
        let machineinfo = ctx.request.body.mc;    
        const result = await this.service.account.unbindmachine(userinfo,machineinfo);
        ctx.body = { result };
        ctx.status = 201;
    }

    async checktime() {
        const ctx = this.ctx;
        let timestamp = await ctx.service.setup.checktime();   
        ctx.body = {
            error_code : 0,
            err_msg: null,
            data: timestamp
        }
        
    }

    async checkversion() {
        const ctx = this.ctx;
        let res = await ctx.service.setup.checkversion();
        ctx.body = {
            error_code : 0,
            err_msg: null,
            data : res[0]["version"]
        }
    }
}

module.exports = SetupController;