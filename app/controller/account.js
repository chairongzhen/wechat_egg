'use strict';
const Controller = require('egg').Controller;

class AccountController extends Controller { 
    async checkaccount() {
        let userinfo = {
            openid: "123456",
            nickname: "xiaobai",
            gender: 1,
            province: "Shanghai",
            city: "Shanghai",
            country: "Shanghai",
            headimgurl: "https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=1357553958,621150550&fm=85&s=61B08D72172D60A2465C7D620300E060"
        }
        const result = await this.service.account.checkaccount(userinfo);
        this.ctx.body = result;
    }

    async checkmachine() {
        let userinfo = {
            openid: "123456",
            nickname: "xiaobai",
            gender: 1,
            province: "Shanghai",
            city: "Shanghai",
            country: "Shanghai",
            headimgurl: "https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=1357553958,621150550&fm=85&s=61B08D72172D60A2465C7D620300E060"
        }
        let machineinfo = {
            mid: "esp002",
            mac: "30AEA4736598"
        }
        const result = await this.service.account.checkmachine(userinfo,machineinfo);
        this.ctx.body = result;
    }

    async bingmachine() {
        let userinfo = {
            openid: "123456",
            nickname: "xiaobai",
            gender: 1,
            province: "Shanghai",
            city: "Shanghai",
            country: "Shanghai",
            headimgurl: "https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=1357553958,621150550&fm=85&s=61B08D72172D60A2465C7D620300E060"
        };
        let machineinfos = [
            {
                mid: "esp002",
                mac: "30AEA4736598"
            },{
                mid: "esp003",
                mac: "30AEA41A40DC"
            }            
        ];
        const result = await this.service.account.bingmachine(userinfo,machineinfos);
        this.ctx.body = result;
    }


    async unbindmachine() {
        // let userinfo = {
        //     openid: "123456",
        //     nickname: "xiaobai",
        //     gender: 1,
        //     province: "Shanghai",
        //     city: "Shanghai",
        //     country: "Shanghai",
        //     headimgurl: "https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=1357553958,621150550&fm=85&s=61B08D72172D60A2465C7D620300E060"
        // };
        // let machineinfo = {
        //     mid: "esp003",
        //     mac: "30AEA41A40DC"
        // };
        const ctx = this.ctx;
        let openid = ctx.request.body.openid;
        let userinfo = {
            openid: openid
        }
        console.log('xxxxxxxxxxxxxxxxxxxx',ctx.request.body);
        // let machineinfo = ctx.request.body.mc;    
        // const result = await this.service.account.unbindmachine(userinfo,machineinfo);
        ctx.body = {};
        ctx.status = 201;
    }

    async updateip() {
        let mid = "esp003";
        let ip = "192.168.8.102";
        const result = await this.service.account.updateip(mid,ip);
        this.ctx.body = result;
    }

    async updatemlog() {
        let mid = "esp003";
        let ip = "192.168.8.102";
        const result = await this.service.account.updatemlog(mid,ip);
        this.ctx.body = result;
    }

    async dislog() {
        let mid = "esp004";
        const result = await this.service.account.dislog(mid);
        this.ctx.body = result;
    }

    async checkonline() {
        let mid = "esp004";
        const result = await this.service.account.checkonline(mid);
        this.ctx.body = result;
    }

    async getmacip() {
        let mid = "esp002";
        const result = await this.service.account.getmacip(mid);
        this.ctx.body = result;
    }

    async updatemid() {
        const ctx = this.ctx;
        let mid = ctx.request.body.mid;
        let mname = ctx.request.body.mname;
        const result = await this.service.account.updatemid(mid, mname);
        this.ctx.body = result;
    }

    async register() {
        const ctx = this.ctx;
        let username = ctx.request.body.username;
        let pwd = ctx.request.body.pwd;
        let nickname = ctx.request.body.nickname;
        const result = await this.service.account.register(username,pwd,nickname);
        this.ctx.body = result;
    }

    async login() { 
        const ctx = this.ctx;
        let username = ctx.request.body.username;
        let pwd = ctx.request.body.pwd;
        const result = await this.service.account.login(username,pwd);
        this.ctx.body = result;
    }

    async test() {
        const result = await this.service.account.test();
        this.ctx.body = result;
    }

    async unbind() {
        const ctx = this.ctx;
        let openid = ctx.request.body.openid;
        let mid = ctx.request.body.mid;
        const resultres = await this.service.account.unbind(openid,mid);
        let result = {
            isSuccess: false,
            message: ""
        }
        if(resultres) {
            result.isSuccess = true;
        } else {
            result.message = "操作失败,请联系商家";
        }
        this.ctx.body = result;
    }

    async bindmid() {
        const ctx = this.ctx;

        let result = {
            isSuccess: false,
            message: ""
        }

        let openid = ctx.request.body.openid;
        let mid = ctx.request.body.mid;
        var reg = /^esp_[A-Z,a-z,0-9]{12}$/;
        if(reg.test(mid)) {
            const resultres = await this.service.account.bindmid(openid,mid);
            if(resultres) {
                result.isSuccess = true;
            } else {
                result.message = "操作失败,设备已被绑定";
            }
        }  else {
            result.message = "设备编号有误,请检查二维码";
        }



        this.ctx.body = result;
    }

    async wxlogin() {
        const ctx = this.ctx;
        let openid = ctx.request.body.openid;
        let nickname = ctx.request.body.nickname;
        await this.service.account.wxlogin(openid,nickname);
        let result = {
            isSuccess: true,
            message: ""
        }
        this.ctx.body = result;
    }
}

module.exports = AccountController;