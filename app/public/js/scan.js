wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: appId, // 必填，公众号的唯一标识
    timestamp: timestamp, // 必填，生成签名的时间戳
    nonceStr: nonceStr, // 必填，生成签名的随机串
    signature: signature,// 必填，签名，见附录1
    jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，
});

wx.ready(function(){
    let temp = wx.scanQRCode({
        needResult: 1,
        desc: 'scanQRCode desc',
        success: function(res) {
                let tempres = res.resultStr;
                tempres = tempres.replace('}',"").replace("{","");
                let tmparr = tempres.split(',');
                let machineinfo = {
                    mid: tmparr[0].replace("mid:",""),
                    mac: tmparr[1].split(':')[1]
                }
                alert(tmparr[0]);
                let bindinfo = {
                    openid: $("#hidopenid").val(),
                    mc: [{
                        mid: machineinfo.mid                        
                    }]
                }
                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    url: "/bind",
                    data: JSON.stringify(bindinfo),
                    dataType: 'json',
                    success: (res)=>{
                        let errormessage = "";
                        if(res.result.unbindmachine.length >0) {
                            
                            for(let ta of res.result.unbindmachine) {
                                errormessage += ta.mid;
                                errormessage += ":"
                                errormessage += ta.err_msg == "binded"?"已被绑定":"设备未注册";
                            }
                        }
                        $("#spresult").html(errormessage);
                        if(errormessage.length == 0) {
                            $("#spflag").html("绑定成功");
                            $("#iicon").attr("class","weui_icon_success weui_icon_msg");
                        } else {
                            $("#spflag").html("绑定失败");
                            $("#iicon").attr("class","weui_icon_msg weui_icon_warn");
                            $("#spresult").attr("style","color:red");
                        }                        
                    }
                });

            }
        });

    $("#btnBind").click(()=>{

        let openid = $("#spopenid").html();
        let mc =[];
        $(".mid").each((i,val)=>{
            let machine = {
                id: i,
                mid: $(val).html()
            }
            mc.push(machine);
        });
        
        for(let ta of mc) {
            $(".mac").each((i,val)=>{
                if(ta.id == i) {
                    ta.mac = $(val).html();
                }
            });
        }
        let bindinfo = {
            openid: openid,
            mc: mc
        }
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/bind",
            data: JSON.stringify(bindinfo),
            dataType: 'json',
            success: (res)=>{
                let errormessage = "";
                if(res.result.unbindmachine.length >0) {
                    
                    for(let ta of res.result.unbindmachine) {
                        errormessage += ta.mid;
                        errormessage += ":"
                        errormessage += ta.err_msg == "binded"?"已被绑定":"设备未注册";
                    }
                }
                $("#spresult").html(errormessage);
            }
        });
    });

    $("#btnBinded").click(()=>{
        let domain = $("#btnBinded").attr("data-domain");
        let appid = $("#btnBinded").attr("data-appid");
        window.location = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=http://" + domain + "/binded&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
    });
});

wx.error(function(res){
	JSON.stringify(res)
});