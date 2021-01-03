var UUID = require('uuid');

const Service = require('egg').Service;


class AccountSerive extends Service {
    async checkaccount(userinfo) {
        const checkexist = `select count(*) existcount from users where openid = '${userinfo.openid}'`;
        const existres = await this.app.mysql.query(checkexist);
        let result = null;
        if(existres[0].existcount == 0) {
            let addsql = `INSERT INTO users (
                openid,
                nickname,
                gender,
                province,
                city,
                country,
                headimgurl,
                createdate,
                lastonline
            )
            VALUES
                (
                    '${userinfo.openid}',
                    '${userinfo.nickname}',
                    '${userinfo.gender}',
                    '${userinfo.province}',
                    '${userinfo.city}',
                    '${userinfo.country}',
                    '${userinfo.headimgurl}',
                    now(),
                    now()
                );`;
            result = await this.app.mysql.query(addsql);            
        } else {
            let updsql = `update users set lastonline = now() where openid = '${userinfo.openid}'`;
            result = await this.app.mysql.query(updsql); 
        }
        return result;
    }

    async checkmachine(userinfo,machineinfo) {
        const existsql = `SELECT
                        count(*) existcount
                    FROM
                        machines
                    WHERE
                        mid = '${machineinfo.mid}'`;
        const existres = await this.app.mysql.query(existsql);
        const unbindsql = `SELECT
                        count(*) existcount
                    FROM
                        usermachines
                    WHERE
                    1=1
                    AND mid = '${machineinfo.mid}'`;
        const unbindres = await this.app.mysql.query(unbindsql);
        let result = "";
        if(existres[0].existcount == 0) { 
            //result = "notexist";
            await this.addmid(`${machineinfo.mid}`);
            result = "new";
        } else {
            if(unbindres[0].existcount == 0) {
                result = "available";
            } else {
                result = "binded";
            }
        }
        return result;
    }

    async bindmid(openid,mid) {
        const existsql = `SELECT
                count(*) existcount
            FROM
                machines
            WHERE
                mid = '${mid}'`;
        const existres = await this.app.mysql.query(existsql);
        const unbindsql = `SELECT
                count(*) existcount
            FROM
                usermachines
            WHERE
            1=1
            AND mid = '${mid}'`;
        const unbindres = await this.app.mysql.query(unbindsql);
        let result = "";
        if(existres[0].existcount == 0) { 
            //result = "notexist";
            await this.addmid(`${mid}`);
            result = "new";
            } else {
            if(unbindres[0].existcount == 0) {
            result = "available";
            } else {
            result = "binded";
            }
        }
        if(result == "available" || result == "new") { 
            let insertsql = `INSERT INTO usermachines (openid, mid, binddate)
            VALUES
                (
                    '${openid}',
                    '${mid}',
                    now()
                )`;
            const insertres = await this.app.mysql.query(insertsql);

            const ipsql = `UPDATE usermachines 
                            SET ip = ( SELECT ip FROM machinelog WHERE mid = '${mid}' ORDER BY updatetime DESC LIMIT 1 ) 
                            WHERE
                                mid = '${mid}'`;
            await this.app.mysql.query(ipsql);
            return true
        } else {
            return false
        }
    }

    async bingmachine(userinfo,machineinfos) {
        let bindmachine = [];
        let unbindmachine = [];
        let result = {};
        for(let mar of machineinfos) {
            let res = await this.checkmachine(userinfo,mar);
            if(res == "available" || res == "new") {
                let insertsql = `INSERT INTO usermachines (openid, mid, binddate)
                        VALUES
                            (
                                '${userinfo.openid}',
                                '${mar.mid}',
                                now()
                            )`;
                const insertres = await this.app.mysql.query(insertsql);
                bindmachine.push(mar.mid);
            } else {
                let unbindmacinfo = {
                    mid: mar.mid,
                    err_msg: res
                }
                unbindmachine.push(unbindmacinfo);
            }
        }
        result.bindmachine = bindmachine;
        result.unbindmachine = unbindmachine;
        return result;
    }

    async unbindmachine(userinfo,machineinfo) {
        let deletesql = `DELETE
        FROM
            usermachines
        WHERE
            openid = '${userinfo.openid}'
        AND mid = '${machineinfo.mid}'`;
        const result = await this.app.mysql.query(deletesql);
        return result.affectedRows==0?false:true;
    }

    async unbind(openid,mid) {
        let deletesql = `DELETE
        FROM
            usermachines
        WHERE
            openid = '${openid}'
        AND mid = '${mid}'`;
        const result = await this.app.mysql.query(deletesql);
        return result.affectedRows==0?false:true;
    }

    async updateip(mid,ip) {
        let updatesql = `UPDATE usermachines
            SET ip = '${ip}'
            WHERE
            mid = '${mid}'`;
        const result = await this.app.mysql.query(updatesql);
        return result.affectedRows==0?false:true;
    }

    async updatemlog(mid,ip,version) {
        let checksql = `select count(*) existcount from machinelog where mid = '${mid}'`;
        const existres = await this.app.mysql.query(checksql);
        const ipsql = `update usermachines set ip = '${ip}',espversion='${version}' where mid = '${mid}'`;
        await this.app.mysql.query(ipsql);
        let result = null;
        if(existres[0].existcount == 0) {
            let addsql = `insert into machinelog (mid,ip,updatetime,espversion) values ('${mid}','${ip}',now(),'${version}')`;
            result = await this.app.mysql.query(addsql).affectedRows ==0?false:true;
        } else {
            let updsql = `update machinelog set ip = '${ip}',updatetime = now(),espversion = '${version}' where mid = '${mid}'`;
            result = await this.app.mysql.query(updsql).affectedRows ==0?false:true;
        }
        const updateUserMachine = `update usermachines SET espversion = '${version}' where mid = '${mid}'`;
        await this.app.mysql.query(updateUserMachine);
        return result;
    }
 

    async dislog(mid) {
        let newsql = `insert into disconnectlog (mid,disconnectdate) values ('${mid}',now())`;
        await this.app.mysql.query(newsql);
        return true;
    }

    async checkonline(mid) {
        let checksql = `update usermachines set online = 1 where mid = '${mid}'`;
        await this.app.mysql.query(checksql);
        return true;
    }

    async offline() {
        let offlinesql = `update usermachines set online = 0`;
        await this.app.mysql.query(offlinesql);
        return true;
    }

    async getmacip(mid) {
        let result = null;
        let checksql = `select count(*) existcount from machinelog where mid = '${mid}'`;
        const existres = await this.app.mysql.query(checksql);
        if(existres[0].existcount == 0) { 
            result = "未找到此设备，请确认设备号";
        } else {
            let getsql = `select ip from machinelog where mid = '${mid}'`;
            const res = await this.app.mysql.query(getsql);
            result = res[0].ip;
        }        
        return result;
    }

    async getusermachine(openid) {
        let getsql = `select usermachines.mid,machines.mname,ip,online,usermachines.espversion version from usermachines LEFT OUTER JOIN machines ON machines.mid = usermachines.mid where openid = '${openid}'`;
        const result = await this.app.mysql.query(getsql);
        return result;
    }

    async getmids() {
        let getsql = `select mid from machines order by mid`;
        const result = await this.app.mysql.query(getsql);
        return result;
    }

    async getmid(mid) {
        let getsql = `select mid from machines where mid = '${mid}'`;
        const result = await this.app.mysql.query(getsql);
        if(result && result.length >0) {
            return true;
        } else {
            return false;
        }
    }

    async addmid(mid) {
        let addsql = `INSERT INTO machines (mid,mname,mac) VALUES('${mid}', '${mid}','00000000')`;
        await this.app.mysql.query(addsql);
        return true;
    }

    async getonlines() {
        let onlinesql = 'SELECT mname FROM usermachines LEFT OUTER JOIN machines ON machines.mid = usermachines.mid WHERE ONLINE = 1';
        const result = await this.app.mysql.query(onlinesql);
        return result;
    }

    async updatemid(mid,mname) {
        let updatesql = `update machines set mname = '${mname}' where mid = '${mid}'`;
        await this.app.mysql.query(updatesql);
        return true;
    }

    async register(username,pwd,nickname) {
        let result = {
            isSuccess: false,
            message: ""
        }
        let checkuserexist = `select count(uid) existcount from appuser where username = '${username}' and isdelete = 0`
        const existres = await this.app.mysql.query(checkuserexist);
        if(existres[0].existcount > 0) { 
            result.isSuccess = false
            result.message = "用户名已存在"
        } else {
            let newid = UUID.v1();
            let insertSql = `INSERT INTO appuser (uid,username,pwd,nickname,openid,isdelete) values ("${newid}","${username}","${pwd}","${nickname}","${newid}",0) `;
            await this.app.mysql.query(insertSql);
            insertSql = `insert into users (openid,nickname,gender,province,city,country,headimgurl,createdate,lastonline) VALUES ("${newid}","${nickname}",1,"上海","上海","上海","",now(),now()) `
            await this.app.mysql.query(insertSql);
            insertSql = `INSERT INTO userlight (
                openid,
                showtype,
                testmode,
                t,
                updatetime,autoupdate
            )
            VALUES
                (
                    '${newid}',
                    'fix',
                    'test',
                    '{"t000":"0000000000000000","t001":"0000000000000000","t002":"0000000000000000","t003":"0000000000000000","t004":"0000000000000000","t005":"0000000000000000","t010":"0000000000000000","t011":"0000000000000000","t012":"0000000000000000","t013":"0000000000000000","t014":"0000000000000000","t015":"0000000000000000","t020":"0000000000000000","t021":"0000000000000000","t022":"0000000000000000","t023":"0000000000000000","t024":"0000000000000000","t025":"0000000000000000","t030":"0000000000000000","t031":"0000000000000000","t032":"0000000000000000","t033":"0000000000000000","t034":"0000000000000000","t035":"0000000000000000","t040":"0000000000000000","t041":"0000000000000000","t042":"0000000000000000","t043":"0000000000000000","t044":"0000000000000000","t045":"0000000000000000","t050":"0000000000000000","t051":"0000000000000000","t052":"0000000000000000","t053":"0000000000000000","t054":"0000000000000000","t055":"0000000000000000","t060":"0000000000000000","t061":"0000000000000000","t062":"0000000000000000","t063":"0000000000000000","t064":"0000000000000000","t065":"0000000000000000","t070":"0000000000000000","t071":"0000000000000000","t072":"0000000000000000","t073":"0000000000000000","t074":"0000000000000000","t075":"0000000000000000","t080":"0000000000000000","t081":"0000000000000000","t082":"0000000000000000","t083":"0000000000000000","t084":"0000000000000000","t085":"0000000000000000","t090":"0000000000000000","t091":"0000000000000000","t092":"0000000000000000","t093":"0000000000000000","t094":"0000000000000000","t095":"0000000000000000","t100":"0000000000000000","t101":"0000000000000000","t102":"0000000000000000","t103":"0000000000000000","t104":"0000000000000000","t105":"0000000000000000","t110":"0000000000000000","t111":"0000000000000000","t112":"0000000000000000","t113":"0000000000000000","t114":"0000000000000000","t115":"0000000000000000","t120":"0000000000000000","t121":"0000000000000000","t122":"0000000000000000","t123":"0000000000000000","t124":"0000000000000000","t125":"0000000000000000","t130":"0000000000000000","t131":"0000000000000000","t132":"0000000000000000","t133":"0000000000000000","t134":"0000000000000000","t135":"0000000000000000","t140":"0000000000000000","t141":"0000000000000000","t142":"0000000000000000","t143":"0000000000000000","t144":"0000000000000000","t145":"0000000000000000","t150":"0000000000000000","t151":"0000000000000000","t152":"0000000000000000","t153":"0000000000000000","t154":"0000000000000000","t155":"0000000000000000","t160":"0000000000000000","t161":"0000000000000000","t162":"0000000000000000","t163":"0000000000000000","t164":"0000000000000000","t165":"0000000000000000","t170":"0000000000000000","t171":"0000000000000000","t172":"0000000000000000","t173":"0000000000000000","t174":"0000000000000000","t175":"0000000000000000","t180":"0000000000000000","t181":"0000000000000000","t182":"0000000000000000","t183":"0000000000000000","t184":"0000000000000000","t185":"0000000000000000","t190":"0000000000000000","t191":"0000000000000000","t192":"0000000000000000","t193":"0000000000000000","t194":"0000000000000000","t195":"0000000000000000","t200":"0000000000000000","t201":"0000000000000000","t202":"0000000000000000","t203":"0000000000000000","t204":"0000000000000000","t205":"0000000000000000","t210":"0000000000000000","t211":"0000000000000000","t212":"0000000000000000","t213":"0000000000000000","t214":"0000000000000000","t215":"0000000000000000","t220":"0000000000000000","t221":"0000000000000000","t222":"0000000000000000","t223":"0000000000000000","t224":"0000000000000000","t225":"0000000000000000","t230":"0000000000000000","t231":"0000000000000000","t232":"0000000000000000","t233":"0000000000000000","t234":"0000000000000000","t235":"0000000000000000","tfix":"0000000000000000"}',
                    now(),'none'
                )`;
            await this.app.mysql.query(insertSql);    
            result.isSuccess = true
            result.message = "注册成功"
        }

        return result;
    }

    async login(username,pwd) {
        var result = {
            isSuccess: false,
            message: "",
            content: null
        }
        let loginSql = `select uid,username,nickname,openid from appuser where username = '${username}' and pwd = '${pwd}' AND isdelete = 0`;
        const existres = await this.app.mysql.query(loginSql);
        if(existres.length >0) { 
            result.isSuccess = true;
            result.message = "登陆成功"
            result.content = existres[0];
        } else {
            result.isSuccess = false;
            result.message = "用户名或密码错误"
        }

        return result;
    }

    async test() {
        console.log("herer it is");
        var result = {
            isSuccess: true,
            message: "获取成功",
            content: null
        }
        let testsql = "select * from users";
        const resultres = await this.app.mysql.query(testsql);
        result.content = resultres
        return result;      
    }

    async wxlogin(openid,nickname) {
        let checkSql = `select count(id) existcount from users where openid = '${openid}'`
        let existres = await this.app.mysql.query(checkSql);
        //console.log("here it is",checkSql);
        if(existres[0].existcount == 0) {
            let addsql = `INSERT INTO users (
                openid,
                nickname,
                gender,
                province,
                city,
                country,
                headimgurl,
                createdate,
                lastonline
            )
            VALUES
                (
                    '${openid}',
                    '${nickname}',
                    '0',
                    '',
                    '',
                    '',
                    '',
                    now(),
                    now()
                );`;
            //console.log(addsql);
            await this.app.mysql.query(addsql);
            
            let newsql = `INSERT INTO userlight (
                openid,
                showtype,
                testmode,
                t,
                autoupdate,
                updatetime
            )
            VALUES
                (
                    '${openid}',
                    'fix',
                    'test',
                    '{"t000":"0000000000000000","t001":"0000000000000000","t002":"0000000000000000","t003":"0000000000000000","t004":"0000000000000000","t005":"0000000000000000","t010":"0000000000000000","t011":"0000000000000000","t012":"0000000000000000","t013":"0000000000000000","t014":"0000000000000000","t015":"0000000000000000","t020":"0000000000000000","t021":"0000000000000000","t022":"0000000000000000","t023":"0000000000000000","t024":"0000000000000000","t025":"0000000000000000","t030":"0000000000000000","t031":"0000000000000000","t032":"0000000000000000","t033":"0000000000000000","t034":"0000000000000000","t035":"0000000000000000","t040":"0000000000000000","t041":"0000000000000000","t042":"0000000000000000","t043":"0000000000000000","t044":"0000000000000000","t045":"0000000000000000","t050":"0000000000000000","t051":"0000000000000000","t052":"0000000000000000","t053":"0000000000000000","t054":"0000000000000000","t055":"0000000000000000","t060":"0000000000000000","t061":"0000000000000000","t062":"0000000000000000","t063":"0000000000000000","t064":"0000000000000000","t065":"0000000000000000","t070":"0000000000000000","t071":"0000000000000000","t072":"0000000000000000","t073":"0000000000000000","t074":"0000000000000000","t075":"0000000000000000","t080":"0000000000000000","t081":"0000000000000000","t082":"0000000000000000","t083":"0000000000000000","t084":"0000000000000000","t085":"0000000000000000","t090":"0000000000000000","t091":"0000000000000000","t092":"0000000000000000","t093":"0000000000000000","t094":"0000000000000000","t095":"0000000000000000","t100":"0000000000000000","t101":"0000000000000000","t102":"0000000000000000","t103":"0000000000000000","t104":"0000000000000000","t105":"0000000000000000","t110":"0000000000000000","t111":"0000000000000000","t112":"0000000000000000","t113":"0000000000000000","t114":"0000000000000000","t115":"0000000000000000","t120":"0000000000000000","t121":"0000000000000000","t122":"0000000000000000","t123":"0000000000000000","t124":"0000000000000000","t125":"0000000000000000","t130":"0000000000000000","t131":"0000000000000000","t132":"0000000000000000","t133":"0000000000000000","t134":"0000000000000000","t135":"0000000000000000","t140":"0000000000000000","t141":"0000000000000000","t142":"0000000000000000","t143":"0000000000000000","t144":"0000000000000000","t145":"0000000000000000","t150":"0000000000000000","t151":"0000000000000000","t152":"0000000000000000","t153":"0000000000000000","t154":"0000000000000000","t155":"0000000000000000","t160":"0000000000000000","t161":"0000000000000000","t162":"0000000000000000","t163":"0000000000000000","t164":"0000000000000000","t165":"0000000000000000","t170":"0000000000000000","t171":"0000000000000000","t172":"0000000000000000","t173":"0000000000000000","t174":"0000000000000000","t175":"0000000000000000","t180":"0000000000000000","t181":"0000000000000000","t182":"0000000000000000","t183":"0000000000000000","t184":"0000000000000000","t185":"0000000000000000","t190":"0000000000000000","t191":"0000000000000000","t192":"0000000000000000","t193":"0000000000000000","t194":"0000000000000000","t195":"0000000000000000","t200":"0000000000000000","t201":"0000000000000000","t202":"0000000000000000","t203":"0000000000000000","t204":"0000000000000000","t205":"0000000000000000","t210":"0000000000000000","t211":"0000000000000000","t212":"0000000000000000","t213":"0000000000000000","t214":"0000000000000000","t215":"0000000000000000","t220":"0000000000000000","t221":"0000000000000000","t222":"0000000000000000","t223":"0000000000000000","t224":"0000000000000000","t225":"0000000000000000","t230":"0000000000000000","t231":"0000000000000000","t232":"0000000000000000","t233":"0000000000000000","t234":"0000000000000000","t235":"0000000000000000","tfix":"0000000000000000"}',
                    'none',
                    now()
                )`;
            await this.app.mysql.query(newsql);
            console.log(newsql);

        } else {
            let updsql = `update users set lastonline = now() where openid = '${openid}'`;
            await this.app.mysql.query(updsql); 
        }

        return true;
    }
    
    
}

module.exports = AccountSerive;