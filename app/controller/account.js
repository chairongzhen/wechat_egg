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

    async getmacip() {
        let mid = "esp002";
        const result = await this.service.account.getmacip(mid);
        this.ctx.body = result;
    }
}

module.exports = AccountController;