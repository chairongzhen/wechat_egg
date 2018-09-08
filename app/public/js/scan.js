wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: appId, // 必填，公众号的唯一标识
    timestamp: timestamp, // 必填，生成签名的时间戳
    nonceStr: nonceStr, // 必填，生成签名的随机串
    signature: signature,// 必填，签名，见附录1
    jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，
});

wx.ready(function(){
    $("#btnScan").click(()=>{
        let temp = wx.scanQRCode({
            needResult: 1,
            desc: 'scanQRCode desc',
            success: function(res) {
                let tempres = res.resultStr;
                tempres = tempres.replace('}',"").replace("{","");
                let tmparr = tempres.split(',');
                let machineinfo = {
                    mid: tmparr[0].split(':')[1],
                    mac: tmparr[1].split(':')[1]
                }
                let html = "<tr><td><span class='mid'>";
                html += machineinfo.mid;
                html += "</span></td><td><span class='mac'>";
                html += machineinfo.mac;
                html += "</span></td></tr>";
                $("#tbContent").append(html);
            }
        });
    });

    $("#btnBind").click(()=>{
        let openid = $("#spopenid").html();
        let mc =[];
        $(".mid").each((i,val)=>{
            let machine = {
                id: i,
                mname: $(val).html(),
                openid: openid
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
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/bind",
            data: JSON.stringify(mc),
            dataType: 'json',
            success: (res)=>{
                alert("aaaa");
            }
        });
    });
});

wx.error(function(res){
	JSON.stringify(res)
});