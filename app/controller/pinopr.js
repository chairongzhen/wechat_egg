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
        // let openid = "123456";
        // let showtype = "fix";
        // let testmode = "test";
        const ctx = this.ctx;
        let openid = ctx.request.body.openid;
        let showtype = ctx.request.body.showtype;
        let testmode = ctx.request.body.testmode;
        const result = await this.service.pinopr.updatebasicinfo(openid, showtype, testmode);
        this.ctx.body = result;
    }

    async updatelightdetail() {
        let result = false;
        let lightinfo = {
            openid: "123456",
            lights: [{ lid: 1, tag: 20, tagvalue: 100 },
            { lid: 2, tag: 20, tagvalue: 200 },
            { lid: 3, tag: 20, tagvalue: 200 },
            { lid: 4, tag: 20, tagvalue: 200 },
            { lid: 5, tag: 20, tagvalue: 200 },
            { lid: 6, tag: 20, tagvalue: 200 },
            { lid: 7, tag: 20, tagvalue: 200 }]
        }

        let openid = lightinfo.openid;
        for (let ta of lightinfo.lights) {
            let lid = ta.lid;
            let tag = ta.tag;
            let tagvalue = ta.tagvalue;
            result = await this.service.pinopr.updatelightdetail(openid, lid, tag, tagvalue);
        }
        this.ctx.body = result;
    }

    async updatefixlight() {
        const ctx = this.ctx;
        let openid = ctx.request.body.openid;
        let l1 = ctx.request.body.l1;
        let l2 = ctx.request.body.l2;
        let l3 = ctx.request.body.l3;
        let l4 = ctx.request.body.l4;
        let l5 = ctx.request.body.l5;
        let l6 = ctx.request.body.l6;
        let l7 = ctx.request.body.l7;

        let lightinfo = {
            openid: openid,
            lights: [{ lid: 1, tagvalue: l1 },
            { lid: 2, tagvalue: l2 },
            { lid: 3, tagvalue: l3 },
            { lid: 4, tagvalue: l4 },
            { lid: 5, tagvalue: l5 },
            { lid: 6, tagvalue: l6 },
            { lid: 7, tagvalue: l7 }]
        }

        let result = false;
        // let lightinfo = {
        //     openid: "123456",
        //     lights: [{lid:1,tagvalue:255},
        //         {lid:2,tagvalue:255},
        //         {lid:3,tagvalue:255},
        //         {lid:4,tagvalue:255},
        //         {lid:5,tagvalue:255},
        //         {lid:6,tagvalue:255},
        //         {lid:7,tagvalue:255}]
        // }
        for (let ta of lightinfo.lights) {
            result = await this.service.pinopr.updatefixlight(lightinfo.openid, ta.lid, ta.tagvalue);
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
        const basicres = await this.service.pinopr.getbasicinfo(userinfo.openid);
        const machineinfo = await ctx.service.verify.verify(url);
        basicres.showtype = basicres.showtype == "fix" ? "固定" : "循环";
        basicres.testmode = basicres.testmode == "test" ? "测试" : "产品";
        let result = {
            userinfo: userinfores,
            machineinfo: machineinfo,
            basicres: basicres
        }

        await ctx.render('home/basic.html', result);
    }

    async repeat() {
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
        const machineinfo = await ctx.service.verify.verify(url);
        const repeatdata = await this.service.pinopr.getrepeatdata(userinfo.openid);
        let result = {
            userinfo: userinfores,
            machineinfo: machineinfo,
            repeatdata: repeatdata
        }
        await ctx.render('home/repeat.html', result);
    }

    async repeatdetail() {
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
        const machineinfo = await ctx.service.verify.verify(url);
        let result = {
            userinfo: userinfores,
            machineinfo: machineinfo
        }
        await ctx.render('home/repeatdetail.html', result);
    }

}

module.exports = PinoprController;