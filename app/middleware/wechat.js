const wechat = require("co-wechat");

module.exports = (options,app) =>{
    return wechat(options).middleware(async (message,ctx)=>{
        let { MsgType, Content } = message;
        if(MsgType == "text") {
            let reply;
            if(Content.toLowerCase().substring(0,3) == "esp") {
                if(Content.length <4) {
                    reply = "请输入设备号";
                } else {
                    const res = await ctx.service.account.getmacip(Content.toLowerCase());
                    reply = "IP: " + res ;
                }
            } else if(Content.toLowerCase()== "list") {
                const res = await ctx.service.account.getmids();
                let resstr = "";
                for(let ta of res) {
                    resstr += ta["mid"];
                    resstr += ",";
                }
                reply = resstr;
            } else if(Content.toLowerCase().substring(0,3) == "add") {
                if(Content.length <4) {
                    reply = "请输入设备号";
                } else {
                    let mid = Content.toLowerCase().substring(4);
                    const exist = await ctx.service.account.getmid(mid);
                    if(exist) {
                        reply = "已存在";
                    } else {
                        await ctx.service.account.addmid(mid);
                        reply = "添加成功";
                    }
                }
            }else if(Content.toLowerCase() == "online"){
                const res = await ctx.service.account.getonlines();
                let resstr = "";
                for(let ta of res) {
                    resstr += ta["mid"];
                    resstr += ",";
                }
                reply = resstr;

            }else {
                reply = "未知指令";
            }
            return reply;
        }else {
            return;
        }
    });
};

