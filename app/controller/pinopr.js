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
        // let lightinfo = {
        //     openid: "123456",
        //     lights: [{ lid: 1, tag: 20, tagvalue: 100 },
        //     { lid: 2, tag: 20, tagvalue: 200 },
        //     { lid: 3, tag: 20, tagvalue: 200 },
        //     { lid: 4, tag: 20, tagvalue: 200 },
        //     { lid: 5, tag: 20, tagvalue: 200 },
        //     { lid: 6, tag: 20, tagvalue: 200 },
        //     { lid: 7, tag: 20, tagvalue: 200 }]
        // }
        const ctx = this.ctx;
        let lightinfo = ctx.request.body;
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
        const modifydata = await this.service.pinopr.getmodifystamp(userinfo.openid);
        let modifytag = "";
        for(let ta of modifydata) {
            if(ta.tag ==0 && ta.tagvalue ==0) {
                continue;
            }else if(ta.tag == 23 && ta.tagvalue ==0) {                
                continue;
            } else {
                modifytag += ta.tag;
                modifytag += ",";
            }            
        }
        if(modifytag.length >2) {
            modifytag = modifytag.substring(0,modifytag.length-1);
        }
        let result = {
            userinfo: userinfores,
            machineinfo: machineinfo,
            repeatdata: repeatdata,
            modifytag: modifytag,
            domain: this.config.wechat.domain,
            appid: this.config.wechat.appid
        }
        await ctx.render('home/repeat.html', result);
    }

    async repeatdetail() {
        const ctx = this.ctx;
        let url = ctx.request.protocol + "://" + ctx.request.host + ctx.request.originalUrl;
        let code = ctx.query.code;
        let tag = ctx.request.query.state;
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

        const tagres = await ctx.service.pinopr.getrepeatdata(userinfo.openid);

        let l1 = tagres.t1.split(',')[tag];
        let l2 = tagres.t2.split(',')[tag];
        let l3 = tagres.t3.split(',')[tag];
        let l4 = tagres.t4.split(',')[tag];
        let l5 = tagres.t5.split(',')[tag];
        let l6 = tagres.t6.split(',')[tag];
        let l7 = tagres.t7.split(',')[tag];

        let tagvalues = {
            l1: l1,
            l2: l2,
            l3: l3,
            l4: l4,
            l5: l5,
            l6: l6,
            l7: l7
        }

        const hightag = await this.service.pinopr.candelete(userinfo.openid,tag);
        let result = {
            userinfo: userinfores,
            machineinfo: machineinfo,
            tag: tag,
            tagvalues: tagvalues,
            hightag: hightag,
            domain: this.config.wechat.domain,
            appid: this.config.wechat.appid
        }
        await ctx.render('home/repeatdetail.html', result);
    }


    async gettagvalue() {
        const ctx = this.ctx;
        let openid = ctx.request.body.openid;
        let tag = ctx.request.body.tag;
        const tagres = await ctx.service.pinopr.getrepeatdata(openid);
        let l1 = tagres.t1.split(',')[tag];
        let l2 = tagres.t2.split(',')[tag];
        let l3 = tagres.t3.split(',')[tag];
        let l4 = tagres.t4.split(',')[tag];
        let l5 = tagres.t5.split(',')[tag];
        let l6 = tagres.t6.split(',')[tag];
        let l7 = tagres.t7.split(',')[tag];
        let result = {
            l1: l1,
            l2: l2,
            l3: l3,
            l4: l4,
            l5: l5,
            l6: l6,
            l7: l7
        }
        ctx.body = { result };
        ctx.status = 201;
    }

    async candelete() {
        const ctx = this.ctx;
        let openid = "o9Ruz0iGzFv0VhAiKr6xeIM9ivOA";
        let tag = 15;

        const result = await this.service.pinopr.candelete(openid,tag);
        ctx.body = result;
        ctx.status = 201;
    }

    async deletetag() {
        const ctx = this.ctx;
        let openid = ctx.request.body.openid;
        let tag = ctx.request.body.tag;
        
        const result = await this.service.pinopr.deletetag(openid,tag);
        ctx.body = { result }
        ctx.status = 201;
    }

    async checktagvalue() {
        const ctx = this.ctx;
        let openid = "o9Ruz0k6t7SJYZgV358z-CcqUjGc";
        const result = await this.service.pinopr.checktagvalue(openid);
        ctx.body = { result }
        ctx.status = 201;

    }
}

module.exports = PinoprController;