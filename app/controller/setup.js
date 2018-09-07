'use strict';
const Controller = require('egg').Controller;

class SetupController extends Controller {
    async smartConfig() {
        const ctx = this.ctx;
        let url = ctx.request.protocol + "://" + ctx.request.host + ctx.request.originalUrl;
        const result = await ctx.service.verify.verify(url);    
        await ctx.render('home/setup.html',result);
    }

    async scanMachine() {
        const ctx = this.ctx;
        let url = ctx.request.protocol + "://" + ctx.request.host + ctx.request.originalUrl;
        const result = await ctx.service.verify.verify(url);
        await ctx.render('home/scan.html',result);
    }
}

module.exports = SetupController;