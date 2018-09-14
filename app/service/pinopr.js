const Service = require('egg').Service;

// function getcontent(arr,start,end,tagvalue,light) {
//     if(start == 0) {
//         light[0] = tagvalue;
//     } else if(start == 24) {
//         light[23] = tagvalue;
//     } else {
//         let res = arr.splice(start,end);
//         updatecontent(res,tagvalue,light);
//     }    
// }

function updatecontent(arr, val, light) {
    let length = arr.length;
    light[arr[length - 1]] = val[1];
    let diff = 0;
    let perval = 0;
    if (val[0] < val[1]) {
        diff = val[1] - val[0];
        perval = diff / length | 0;
        for (let i = 0; i < length - 1; i++) {
            light[arr[i]] = (perval * (i + 1)) + val[0];
        }
    } else if (val[0] > val[1]) {
        diff = val[0] - val[1];
        perval = diff / length | 0;
        for (let i = 0; i < length - 1; i++) {
            light[arr[i]] = (perval * (length - i));
        }
        light[arr[length - 1]] = val[1];
    } else {
        for (let i = 0; i < length; i++) {
            light[arr[i]] = val[0];
        }
    }
}

function generateLightData(tagsres) {
    let light = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    return new Promise((resolve, reject) => {
        let temparr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
        let startflag = true;
        let tagslength = tagsres.length;
        let res = [];
        let val = [];
        for (let i = 0; i < tagslength; i++) {
            if (startflag) {
                res = temparr.splice(0, tagsres[i].tag + 1);
                startflag = false;
                val = [];
                if (tagsres[i].tag != 0) {
                    val.push(0);
                } else {
                    val.push(tagsres[i].tagvalue);
                }
                val.push(tagsres[i].tagvalue);
            } else {
                res = temparr.splice(0, tagsres[i].tag - tagsres[i - 1].tag);
                val = [];
                val.push(tagsres[i - 1].tagvalue);
                val.push(tagsres[i].tagvalue);
            }
            updatecontent(res, val,light);
        }

        resolve(light);
    });

}

class PinoprSerive extends Service {

    async getbindmachine(openid) {
        let getsql = `select mid from usermachines where openid = '${openid}'`;
        const getres = await this.app.mysql.query(getsql);
        let mids = [];
        for (let ta of getres) {
            mids.push(ta.mid);
        }
        return mids;
    }

    async getoriginlight(openid, lid) {
        let getoriginfix = `select t${lid} light from userlight where openid = '${openid}'`;
        let originfixres = await this.app.mysql.query(getoriginfix);
        return originfixres[0].light;
    }

    async getbasicinfo(openid) {
        let checksql = `SELECT
                        count(*) existcount
                    FROM
                        userlight
                    WHERE
                        openid = '${openid}'`;
        let checkres = await this.app.mysql.query(checksql);
        if (checkres[0].existcount == 0) {
            let newsql = `INSERT INTO userlight (
                openid,
                showtype,
                testmode,
                t1,
                t2,
                t3,
                t4,
                t5,
                t6,
                t7,
                updatetime
            )
            VALUES
                (
                    '${openid}',
                    'fix',
                    'test',
                    '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0',
                    '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0',
                    '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0',
                    '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0',
                    '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0',
                    '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0',
                    '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0',
                    now()
                )`;
            this.app.mysql.query(newsql);
        }
        let getsql = `SELECT
                            showtype,
                            testmode
                        FROM
                            userlight
                        WHERE
                            openid = '${openid}'
                        `;
        const getres = await this.app.mysql.query(getsql);
        let res = {};
        res.openid = openid;
        res.showtype = getres[0].showtype;
        res.testmode = getres[0].testmode;
        return res;
    }

    async updatebasicinfo(openid, showtype, testmode) {
        let updsql = `UPDATE userlight
                        SET showtype = '${showtype}',
                        testmode = '${testmode}',
                        updatetime = now()
                        WHERE
                            openid = '${openid}'`;
        let result = await this.app.mysql.query(updsql);
        //{"showtype":"repeat","testmode":"test","sysdate":"1525046400","status":"stop","conmode": "local"}
        let timestamp = Date.now() / 1000 | 0;
        let timestampstr = timestamp.toString();
        let tpl_basic = `{\"showtype\":\"${showtype}\","testmode":\"${testmode}\","sysdate":\"${timestampstr}\",\"status\":\"stop\",\"conmode\": \"local\"}`;

        let onlinemac = await this.getbindmachine(openid);
        for (let ta of onlinemac) {
            let sender = ta + "/p";
            await this.ctx.app.mqttclient.publish(sender, tpl_basic);
        }
        return result.affectedRows == 0 ? false : true;
    }

    async updatelightdetail(openid, lid, tag, tagvalue) {
        let result = false;
        let checksql = `SELECT
                        count(*) existcount
                    FROM
                        userlightdetails
                    WHERE
                        openid = '${openid}'
                    AND tag = ${tag} and lid = ${lid}`;
        const checkres = await this.app.mysql.query(checksql);
        let tagresult = false;
        if (checkres[0].existcount == 0) {
            let newsql = `INSERT INTO userlightdetails (
                            openid,
                            lid,
                            tag,
                            tagvalue,
                            createdate
                        )
                        VALUES
                            (
                                '${openid}',
                                ${lid},
                                '${tag}',
                                '${tagvalue}',
                                now()
                            )`;
            tagresult = await this.app.mysql.query(newsql).affectedRows == 0 ? false : true;
        } else {
            let updsql = `UPDATE userlightdetails
                            SET tag = ${tag}, tagvalue = ${tagvalue}
                            WHERE
                                openid = '${openid}' and tag = ${tag} and lid = ${lid}`;
            tagresult = await this.app.mysql.query(updsql) == 0 ? false : true;
        }

        let checkpre = `select count(*) existcount from userlightdetails where openid= '${openid}' and lid = ${lid} and tag = 0`;
        let checkpreres = await this.app.mysql.query(checkpre);
        
        if(checkpreres[0].existcount == 0) {
            let init1sql = `insert into userlightdetails (openid,lid,tag,tagvalue,createdate) values ('${openid}',${lid},0,0,now())`;
           await this.app.mysql.query(init1sql);
        }

        let checkbuf = `select count(*) existcount from userlightdetails where openid= '${openid}' and lid = ${lid} and tag = 23`;
        let checkbufres = await this.app.mysql.query(checkbuf);
        if(checkbufres[0].existcount == 0) {
           let init2sql = `insert into userlightdetails (openid,lid,tag,tagvalue,createdate) values ('${openid}',${lid},23,0,now())`;
           await this.app.mysql.query(init2sql);
        }

        if (tagresult) {
            let tagssql = `select tag,tagvalue from userlightdetails where openid= '${openid}' and lid = ${lid} order by tag`;
            let tagsres = await this.app.mysql.query(tagssql);
            let lightres = await generateLightData(tagsres);
            
            let content = "";
            for (let ta of lightres) {
                content += ta;
                content += ","
            }
   
            let fixres = await this.getoriginlight(openid, lid);
            let fixarr = fixres.split(',');
            content += fixarr[24];
            //content += 0;
            let updstr = `update userlight set t${lid} = '${content}' where openid = '${openid}'`;
            let onlinemac = await this.getbindmachine(openid);
            for (let ta of onlinemac) {
                let sender = ta + "/p";
                sender = sender + lid.toString();
                await this.ctx.app.mqttclient.publish(sender, content);
            }
            result = this.app.mysql.query(updstr).affectedRows == 0 ? false : true;
        }
        return result;
    }

    async updatefixlight(openid, lid, tagvalue) {
        let fixres = await this.getoriginlight(openid, lid);
        let fixarr = fixres.split(',');
        let content = "";
        for (let i = 0; i < fixarr.length - 1; i++) {
            content += fixarr[i];
            content += ",";
        }
        content += tagvalue;
        let updstr = `update userlight set t${lid} = '${content}' where openid = '${openid}'`;
        //console.log(content);
        let onlinemac = await this.getbindmachine(openid);
        for (let ta of onlinemac) {
            let sender = ta + "/p";
            sender = sender + lid.toString();
            await this.ctx.app.mqttclient.publish(sender, content);
        }
        let result = this.app.mysql.query(updstr).affectedRows == 0 ? false : true;
        return result;
    }

}

module.exports = PinoprSerive;

