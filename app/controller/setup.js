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
        const machineinfo = await ctx.service.verify.verify(url);
        let result = {
            userinfo: userinfores,
            machineinfo: machineinfo
        }
        await ctx.render('home/scan.html',result);
    }

    async bind() {
        const ctx = this.ctx;
        console.log(ctx.request.body);
        let bindmachine = ctx.request.body;
        let result = {
            data: "nice guy",
        }
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
}

module.exports = SetupController;