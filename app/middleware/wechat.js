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
            } else {
                reply = "未知指令";
            }
            return reply;
        }else {
            return "Welcome to the ESP";
        }
    });
};

