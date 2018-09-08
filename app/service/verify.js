const Service = require('egg').Service;
const https = require('https');
const cache = require('memory-cache');
const sha1 = require('sha1');


class VerifySerive extends Service {
    async verify(originalurl) {
        let url = originalurl;
        let noncestr = this.config.wechat.noncestr,
            timestamp = Math.floor(Date.now() / 1000),
            jsapi_ticket, signature;
        if (cache.get('ticket')) {
            jsapi_ticket = cache.get('ticket');
            console.log('1:' + 'jsapi_ticket=' + jsapi_ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + url);
            signature = sha1('jsapi_ticket=' + jsapi_ticket + "&noncestr=" + noncestr + "&timestamp=" + timestamp + "&url=" + url);
        } else {
            let grantUrl = this.config.wechat.accessTokenUrl + '?grant_type=' + this.config.wechat.grant_type + '&appid=' + this.config.wechat.appid + '&secret=' + this.config.wechat.secret;
            const tokenMap = await getUrlcontent(grantUrl);
            let ticketUrl = this.config.wechat.ticketUrl + "?access_token=" + tokenMap.access_token + "&type=jsapi";
            const ticketMap = await getUrlcontent(ticketUrl);
            jsapi_ticket = ticketMap.ticket;
            signature = sha1('jsapi_ticket=' + ticketMap.ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + url)
        }
        let result = {
            noncestr: noncestr,
            timestamp: timestamp,
            url: url,
            jsapi_ticket: jsapi_ticket,
            appId: this.config.wechat.appid,
            signature: signature
        }
        return result;
    }

    async getwechatuser(code) {
        let authurl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${this.config.wechat.appid}&secret=${this.config.wechat.secret}&code=${code}&grant_type=authorization_code`;
        const authres = await getUrlcontent(authurl);
        let reauthurl = `https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${this.config.wechat.appid}&grant_type=refresh_token&refresh_token=${authres.refresh_token}`;
        const reauthres = await getUrlcontent(reauthurl);
        let userinfourl = `https://api.weixin.qq.com/sns/userinfo?access_token=${reauthres.access_token}&openid=${reauthres.openid}&lang=zh_CN`;
        const userinfores = await getUrlcontent(userinfourl);
        return userinfores;
    }
}

module.exports = VerifySerive;

function getUrlcontent(url) {
    return new Promise((reslove, reject) => {
        https.get(url, res => {
            let chunks = [];
            res.on('data', chunk => {
                chunks.push(chunk);
            });
            res.on('end', () => {
                let tokenMap = JSON.parse(chunks);
                reslove(tokenMap);
            });
            res.on('error', e => {
                reject(e);
            })
        });
    });
}