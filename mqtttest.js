var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://www.polypite.com'); //连接到服务端

// client.subscribe('test',{qos:1});//订阅主题为test的消息  
client.publish("esp_24:0A:C4:9F:85:5C/setp", "test", { qos: 2 });
// client.on('message',function(top,message) {  
//     console.log(message.toString());  
// });

