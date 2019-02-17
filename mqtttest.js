var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://www.polypite.com'); //连接到服务端

client.subscribe('test',{qos:1});//订阅主题为test的消息  
  
client.on('message',function(top,message) {  
    console.log(message.toString());  
});

