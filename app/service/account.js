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
                        mid = '${machineinfo.mid}'
                    AND mac = '${machineinfo.mac}'`;
        console.log('xxxxxxxxxxxxxxxxxxxxxx',existsql);
        const existres = await this.app.mysql.query(existsql);
        const unbindsql = `SELECT
                        count(*) existcount
                    FROM
                        usermachines
                    WHERE
                        openid = '${userinfo.openid}'
                    AND mid = '${machineinfo.mid}'`;
        const unbindres = await this.app.mysql.query(unbindsql);
        let result = "";
        if(existres[0].existcount == 0) { 
            result = "notexist";
        } else {
            if(unbindres[0].existcount == 0) {
                result = "available";
            } else {
                result = "binded";
            }
        }
        return result;
    }

    async bingmachine(userinfo,machineinfos) {
        let bindmachine = [];
        let unbindmachine = [];
        let result = {};
        for(let mar of machineinfos) {
            let res = await this.checkmachine(userinfo,mar); 
            if(res == "available") {
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

    async updateip(mid,ip) {
        let updatesql = `UPDATE usermachines
            SET ip = '${ip}'
            WHERE
            mid = '${mid}'`;
        const result = await this.app.mysql.query(updatesql);
        return result.affectedRows==0?false:true;
    }

    async updatemlog(mid,ip) {
        let checksql = `select count(*) existcount from machinelog where mid = '${mid}'`;
        const existres = await this.app.mysql.query(checksql);
        let result = null;
        if(existres[0].existcount == 0) {
            let addsql = `insert into machinelog (mid,ip,updatetime) values ('${mid}','${ip}',now())`;
            result = await this.app.mysql.query(addsql).affectedRows ==0?false:true;
        } else {
            let updsql = `update machinelog set ip = '${ip}' where mid = '${mid}'`;
            result = await this.app.mysql.query(updsql).affectedRows ==0?false:true;
        }
        return result;
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
}

module.exports = AccountSerive;