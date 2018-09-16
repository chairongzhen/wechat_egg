'use strict';
const Controller = require('egg').Controller;

class PinoprController extends Controller {
    
    async getbindmachine() {
        let openid = "123456";
        const result = await this.service.pinopr.getbindmachine(openid);
        this.ctx.body = result;
    }
    
    async getbasicinfo() {
        let openid = "123456";
        const result = await this.service.pinopr.getbasicinfo(openid);
        this.ctx.body = result;
    }

    async updatebasicinfo() {
        let openid = "123456";
        let showtype = "fix";
        let testmode = "test";
        const result = await this.service.pinopr.updatebasicinfo(openid,showtype,testmode);
        this.ctx.body = result;
    }

    async updatelightdetail() {
        let result = false;
        let lightinfo = {
            openid: "123456",
            lights: [{lid:1,tag: 20,tagvalue:100},
                {lid:2,tag:20,tagvalue:200},
                {lid:3,tag:20,tagvalue:200},
                {lid:4,tag:20,tagvalue:200},
                {lid:5,tag:20,tagvalue:200},
                {lid:6,tag:20,tagvalue:200},
                {lid:7,tag:20,tagvalue:200}]
        }

        let openid = lightinfo.openid;
        for(let ta of lightinfo.lights) {
            let lid = ta.lid;
            let tag = ta.tag;
            let tagvalue = ta.tagvalue;
            result = await this.service.pinopr.updatelightdetail(openid,lid,tag,tagvalue);
        }
        this.ctx.body = result;
    }

    async updatefixlight(openid,lid,tagvalue) {
        let result = false;
        let lightinfo = {
            openid: "123456",
            lights: [{lid:1,tagvalue:255},
                {lid:2,tagvalue:255},
                {lid:3,tagvalue:255},
                {lid:4,tagvalue:255},
                {lid:5,tagvalue:255},
                {lid:6,tagvalue:255},
                {lid:7,tagvalue:255}]
        }
        for(let ta of lightinfo.lights) {
            result = await this.service.pinopr.updatefixlight(lightinfo.openid,ta.lid,ta.tagvalue);
        }
        this.ctx.body = result;
    }

    async basic() {
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
            binddata: bindedres
        }
        await ctx.render('home/basic.html',result);
    }
}

module.exports = PinoprController;