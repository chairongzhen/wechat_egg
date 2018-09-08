
/**
 *  以下内容多摘自官方demo
 *
**/
wx.config({
  beta: true,  
  debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: appId, // 必填，公众号的唯一标识
    timestamp: timestamp, // 必填，生成签名的时间戳
    nonceStr: nonceStr, // 必填，生成签名的随机串
    signature: signature,// 必填，签名，见附录1
    jsApiList: [
        'configWXDeviceWiFi',
      ] // 必填，需要使用的JS接口列表，
});

wx.ready(function(){
  wx.invoke("configWXDeviceWiFi",{},res=>{
    if(res.err_msg == "configWXDeviceWiFi:ok") {
      $("#spresult").html("配网成功");
      $("#spresult").attr("style","color:#00CD00");
      alert("配网成功");
    } else {
      $("#spresult").html("配网失败,请重启设备后重试");
      $("#spresult").attr("style","color:red");
      alert("配网失败");
    }
  });
});

wx.error(function(res){
	JSON.stringify(res)
});