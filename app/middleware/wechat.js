const wechat = require("co-wechat");

module.exports = (options,app) =>{
    return wechat(options).middleware(async (message,ctx)=>{
        let { MsgType, Content } = message;
        if(MsgType == "text") {
            let reply;
            switch(Content) {
                case "你好":
                    reply = "hello";
                    break;
                case "操":
                    reply = "fuck";
                    break;
                default:
                    const msgs = [
                        "test default 1",
                        "test default 2"
                    ];
                    let rand = Math.floor(Math.random() * msgs.length);
                    reply = msgs[rand];
            }
            return reply;
        } else {
            return "Welcome";
        }
    });
};

