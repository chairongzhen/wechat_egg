const mqtt = require("mqtt")

function numToIp(number) {
    var ip = number % 256;
    for (var i = 1; i <= 3; i++) {
    number = Math.floor(number / 256);
    ip = number % 256 + '.' + ip;
    }
    let arr = ip.split('.');
    let res = arr[3] + "." + arr[2] + "." + arr[1] + "." + arr[0];
    return res;
}


module.exports = app =>{    
    let self = app;
    const ctx = app.createAnonymousContext();
    app.beforeStart(async ()=>{
        let url = self.config.mqtt.url;
        let options = {
            username: self.config.mqtt.username,
            password: self.config.mqtt.password,
            clientId: self.config.mqtt.clientid
        }
        //app.mqttclient = mqtt.connect(url,options);
        app.mqttclient = mqtt.connect(url);
        
        app.mqttclient.subscribe("esp32/online");
        app.mqttclient.subscribe("esp32/heart");
        app.mqttclient.subscribe("esp32/disnotify");
        app.mqttclient.on("message",(topic,message)=>{
            if(topic == "esp32/online") {
                //{mid:esp002,mac:30:AE:A4:1A:40:DC,ip:1711843520}
                // console.log('the mqtt message is: ',message);
                let tempmessage = message.toString().replace("{","").replace("}","");
                let machineinfo = {};
                let ta = tempmessage.split(',');
                let ip = "";
                if(ta.length >0) {                    
                    try {
                        ip = numToIp(ta[2].split(":")[1]);
                        let machineinfo = {
                            mid: ta[0].replace("mid:",""),
                            ip: ip
                        }
                        console.log("mqtt online notify",machineinfo);
                        ctx.service.account.updatemlog(machineinfo.mid,machineinfo.ip);
                        
                        let timestamp = Date.now()/1000|0;
                        // app.mqttclient.publish("esp32/checktime",timestamp.toString(),{
                        //     qos: 2
                        // });
                        

                    } catch(e) {
                        console.log("mqtt online error");
                        console.log(e,tempmessage);
                    }

                } else {
                    console.log("mqtt online error");
                    console.log(tempmessage);
                }                
            } else if(topic == "esp32/heart") {
                //console.log("mqtt heart test",message.toString(),"is alive");
                ctx.service.account.checkonline(message.toString());
            } else if(topic == "esp32/disnotify") {
                console.log("mqtt disconnect notify: ",message.toString());
                ctx.service.account.dislog(message.toString());
            }
            
        });

    });
}