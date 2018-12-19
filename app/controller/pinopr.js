'use strict';
const Controller = require('egg').Controller;

function tohex(str) {
    if (str == "0") {
        return "00";
    } else {
        var intval = parseInt(str);
        if (intval) {
            var hexval = intval.toString(16);
            if (hexval.length == 1) {
                var res = "0";
                return res + hexval;
            } else {
                return hexval;
            }
        } else {
            return "00";
        }
    }
}

class PinoprController extends Controller {

    async getbindmachine() {
        let openid = "123456";
        const result = await this.service.pinopr.getbindmachine(openid);
        this.ctx.body = result;
    }

    async getbasicinfo() {
        let openid = "o9Ruz0iGzFv0VhAiKr6xeIM9ivOA";
        //let tag = 14;
        //const result = await this.service.pinopr.getbasicinfo(openid);
        //const result = await this.service.pinopr.getrepeatdata(openid);
        //const result = await this.service.pinopr.test();
        //const result = await this.service.pinopr.deletetag(openid,tag);
        //const result = await this.service.pinopr.updaterepeatdata(openid);
        //console.log(result.join(','));
        
        const result = await this.service.pinopr.getmodifystamp(openid);
        console.log(result);
        this.ctx.body = "hello world";
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
        result = await this.service.pinopr.updatelightdetail(lightinfo.openid, lightinfo.lights);
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
        let tagvalue = tohex(l1) + tohex(l2) + tohex(l3) + tohex(l4) + tohex(l5) + tohex(l6) + tohex(l7);
        let result = false;
        result = await this.service.pinopr.updatefixlight(openid, tagvalue);
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

    async repeattest() {
        let openid = "o9Ruz0iGzFv0VhAiKr6xeIM9ivOA";
        const repeatdata = await this.service.pinopr.getmodifystamp(openid);
        
        let result = {
            tags : repeatdata.tags,
            l1: repeatdata.l1,
            l2: repeatdata.l2,
            l3: repeatdata.l3,
            l4: repeatdata.l4,
            l5: repeatdata.l5,
            l6: repeatdata.l6,
            l7: repeatdata.l7
        }
        await this.ctx.render('home/repeattest.html', result);
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
        const repeatdata = await this.service.pinopr.getmodifystamp(userinfo.openid);
        let result = {
            userinfo: userinfores,
            machineinfo: machineinfo,
            tags : repeatdata.tags,
            l1: repeatdata.l1,
            l2: repeatdata.l2,
            l3: repeatdata.l3,
            l4: repeatdata.l4,
            l5: repeatdata.l5,
            l6: repeatdata.l6,
            l7: repeatdata.l7,
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

        let l1 = tagres.t1;
        let l2 = tagres.t2;
        let l3 = tagres.t3;
        let l4 = tagres.t4;
        let l5 = tagres.t5;
        let l6 = tagres.t6;
        let l7 = tagres.t7;

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
        let openid = ctx.query.openid;
        const repeatdata = await this.service.pinopr.getmodifystamp(openid);
        let result = {
            tags : repeatdata.tags,
            l1: repeatdata.l1,
            l2: repeatdata.l2,
            l3: repeatdata.l3,
            l4: repeatdata.l4,
            l5: repeatdata.l5,
            l6: repeatdata.l6,
            l7: repeatdata.l7
        }
        ctx.body = { result }
        ctx.status = 201;
    }

    async emptytags() {
        const ctx = this.ctx;
        let openid = ctx.request.body.openid;
        const result = await this.service.pinopr.emptytags(openid);
        ctx.body = result;
        ctx.status = 201;
    }
}

module.exports = PinoprController;