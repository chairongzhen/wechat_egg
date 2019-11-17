const Service = require('egg').Service;

let TIMEDEFINE =
    ["0:00", "0:10", "0:20", "0:30", "0:40", "0:50",
        "1:00", "1:10", "1:20", "1:30", "1:40", "1:50",
        "2:00", "2:10", "2:20", "2:30", "2:40", "2:50",
        "3:00", "3:10", "3:20", "3:30", "3:40", "3:50",
        "4:00", "4:10", "4:20", "4:30", "4:40", "4:50",
        "5:00", "5:10", "5:20", "5:30", "5:40", "5:50",
        "6:00", "6:10", "6:20", "6:30", "6:40", "6:50",
        "7:00", "7:10", "7:20", "7:30", "7:40", "7:50",
        "8:00", "8:10", "8:20", "8:30", "8:40", "8:50",
        "9:00", "9:10", "9:20", "9:30", "9:40", "9:50",
        "10:00", "10:10", "10:20", "10:30", "10:40", "10:50",
        "11:00", "11:10", "11:20", "11:30", "11:40", "11:50",
        "12:00", "12:10", "12:20", "12:30", "12:40", "12:50",
        "13:00", "13:10", "13:20", "13:30", "13:40", "13:50",
        "14:00", "14:10", "14:20", "14:30", "14:40", "14:50",
        "15:00", "15:10", "15:20", "15:30", "15:40", "15:50",
        "16:00", "16:10", "16:20", "16:30", "16:40", "16:50",
        "17:00", "17:10", "17:20", "17:30", "17:40", "17:50",
        "18:00", "18:10", "18:20", "18:30", "18:40", "18:50",
        "19:00", "19:10", "19:20", "19:30", "19:40", "19:50",
        "20:00", "20:10", "20:20", "20:30", "20:40", "20:50",
        "21:00", "21:10", "21:20", "21:30", "21:40", "21:50",
        "22:00", "22:10", "22:20", "22:30", "22:40", "22:50",
        "23:00", "23:10", "23:20", "23:30", "23:40", "23:50"
    ];

function tohex(str) {
    if (str == "0") {
        return "00";
    } else {
        var intval = parseInt(str);
        if (intval) {
            var hexval = intval.toString(16);
            if (hexval.length == 1) {
                var res = "0";
                return res + hexval;
            } else {
                return hexval;
            }
        } else {
            return "00";
        }
    }
}

function updatecontent(arr, val, light) {
    let length = arr.length;
    light[arr[length - 1]] = val[1];
    let diff = 0;
    let perval = 0;
    if (val[0] < val[1]) {
        diff = val[1] - val[0];
        perval = diff / length | 0;
        for (let i = 0; i < length - 1; i++) {
            if (perval > 0) {
                light[arr[i]] = (perval * (i + 1)) + val[0] > val[1] ? val[1] : (perval * (i + 1)) + val[0];
            } else {
                light[arr[i]] = val[0] + (i + 1) > val[1] ? val[1] : val[0] + (i + 1);
            }

        }
    } else if (val[0] > val[1]) {
        diff = val[0] - val[1];
        perval = diff / length | 0;

        for (let i = 0; i < length - 1; i++) {
            if (perval > 0) {
                light[arr[i]] = (perval * (length - i)) + val[1] - perval < val[1] ? val[1] : (perval * (length - i)) + val[1] - perval;
            } else {
                light[arr[i]] = val[0] - (i + 1) < val[1] ? val[1] : val[0] - (i + 1);
            }

        }
    } else {
        for (let i = 0; i < length; i++) {
            light[arr[i]] = val[0];
        }
    }
}

function generateLightData(tagsres) {

    let has143 = false;
    let has0 = false;

    for (let tag of tagsres) {
        if (tag.tag == "0") {
            has0 = true;
        } else if (tag.tag == "143") {
            has143 = true;
        }
    }

    if (!has0) {
        tagsres.splice(0, 0, { tag: 0, tagvalue: 0 });
    }
    if (!has143) {
        tagsres.push({
            tag: 143,
            tagvalue: 0
        });
    }
    let light = [];
    for (var i = 0; i < 144; i++) {
        light.push(0);
    }
    return new Promise((resolve, reject) => {
        let temparr = [];
        for (var i = 0; i < 144; i++) {
            temparr.push(i);
        }
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
            updatecontent(res, val, light);
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

    async getoriginlight(openid) {
        let getoriginfix = `select t lvs from userlight where openid = '${openid}'`;
        let originfixres = await this.app.mysql.query(getoriginfix);
        return originfixres[0].lvs;
    }

    async getsetting(openid) {
        let getsql = `SELECT
                showtype repeatMode,
                testmode productionMode,
                autoupdate
            FROM
                userlight
            WHERE
                openid = '${openid}'
            `;
        const getres = await this.app.mysql.query(getsql);
        let res = {
            isSuccess: false,
            content: null,
            message: ""
        };

        if(getres[0]) {
            res.isSuccess = true;
            res.content = getres[0];
        } else {
            res.message = "未找到配置信息,请联系商家";
        }
        return res;
    } 

    async getfix(openid) {
        let getsql = `SELECT
                            t
                        FROM
                            userlight
                        WHERE
                            openid = '${openid}'
                        `;
        const getres = await this.app.mysql.query(getsql);
        let lvs = JSON.parse(getres[0].t);
        let res = {};
        res.l1 = parseInt(lvs.tfix.substr(0, 2), 16);
        res.l2 = parseInt(lvs.tfix.substr(2, 2), 16);
        res.l3 = parseInt(lvs.tfix.substr(4, 2), 16);
        res.l4 = parseInt(lvs.tfix.substr(6, 2), 16);
        res.l5 = parseInt(lvs.tfix.substr(8, 2), 16);
        res.l6 = parseInt(lvs.tfix.substr(10, 2), 16);
        res.l7 = parseInt(lvs.tfix.substr(12, 2), 16);
        res.l8 = parseInt(lvs.tfix.substr(14,2),16);
        return res;
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
            this.app.mysql.query(newsql);
        }
        let getsql = `SELECT
                            showtype,
                            testmode,
                            t
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

        let lvs = JSON.parse(getres[0].t);

        res.l1 = parseInt(lvs.tfix.substr(0, 2), 16);
        res.l2 = parseInt(lvs.tfix.substr(2, 2), 16);
        res.l3 = parseInt(lvs.tfix.substr(4, 2), 16);
        res.l4 = parseInt(lvs.tfix.substr(6, 2), 16);
        res.l5 = parseInt(lvs.tfix.substr(8, 2), 16);
        res.l6 = parseInt(lvs.tfix.substr(10, 2), 16);
        res.l7 = parseInt(lvs.tfix.substr(12, 2), 16);
        res.l8 = parseInt(lvs.tfix.substr(14,2),16);

        return res;
    }

    async updatebasicinfo(openid, showtype, testmode,autoupdate="none") {
        let updsql = `UPDATE userlight
                        SET showtype = '${showtype}',
                        testmode = '${testmode}',
                        updatetime = now(),
                        autoupdate = '${autoupdate}'
                        WHERE
                            openid = '${openid}'`;
        let result = await this.app.mysql.query(updsql);
        //{"showtype":"repeat","testmode":"test","sysdate":"1525046400","status":"stop","conmode": "local"}
        let timestamp = Date.now() / 1000 | 0;
        let timestampstr = timestamp.toString();
        let tpl_basic = `{\"showtype\":\"${showtype}\","testmode":\"${testmode}\","sysdate":\"${timestampstr}\",\"status\":\"stop\",\"conmode\": \"${autoupdate}\"}`;

        let onlinemac = await this.getbindmachine(openid);
        for (let ta of onlinemac) {
            let sender = ta + "/p";
            await this.ctx.app.mqttclient.publish(sender, tpl_basic, { qos: 2 });
        }
        return result.affectedRows == 0 ? false : true;
    }

    


    async updatetagvals(openid,tag,values) {
        //console.log('the vals is :',values);
        let result = false;
        let valarr = values.split(",");
        let tagresult = false;
        for (let i=0;i<valarr.length;i++) {
            let checksql = `SELECT
                                count(*) existcount
                            FROM
                                userlightdetails
                            WHERE
                                openid = '${openid}'
                            AND tag = ${tag} and lid = ${i+1}`;
            const checkres = await this.app.mysql.query(checksql);
            
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
                        ${i+1},
                        '${tag}',
                        '${valarr[i]}',
                        now()
                    )`;
                tagresult = await this.app.mysql.query(newsql).affectedRows == 0 ? false : true;
            } else {
                let updsql = `UPDATE userlightdetails
                SET tag = ${tag}, tagvalue = ${valarr[i]}
                WHERE
                    openid = '${openid}' and tag = ${tag} and lid = ${i+1}`;
                tagresult = await this.app.mysql.query(updsql) == 0 ? false : true;
            }
        }

        if(tagresult) {
            await this.updaterepeatdata(openid);
        }
        return tagresult;
    }

    async updatelightdetail(openid, tagvalues) {
        let result = false;
        for (let i = 0; i < tagvalues.length; i++) {
            let checksql = `SELECT
                                count(*) existcount
                            FROM
                                userlightdetails
                            WHERE
                                openid = '${openid}'
                            AND tag = ${tagvalues[i].tag} and lid = ${tagvalues[i].lid}`;
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
                                        ${tagvalues[i].lid},
                                        '${tagvalues[i].tag}',
                                        '${tagvalues[i].tagvalue}',
                                        now()
                                    )`;
                tagresult = await this.app.mysql.query(newsql).affectedRows == 0 ? false : true;
            } else {
                let updsql = `UPDATE userlightdetails
                SET tag = ${tagvalues[i].tag}, tagvalue = ${tagvalues[i].tagvalue}
                WHERE
                    openid = '${openid}' and tag = ${tagvalues[i].tag} and lid = ${tagvalues[i].lid}`;
                tagresult = await this.app.mysql.query(updsql) == 0 ? false : true;
            }
        }
        await this.updaterepeatdata(openid);
        return true;
    }


    async updatefixlight(openid, tagvalue) {
        let fixres = await this.getoriginlight(openid);
        let fixresarr = JSON.parse(fixres);
        fixresarr.tfix = tagvalue;
        let content = JSON.stringify(fixresarr);
        let updstr = `update userlight set t = '${content}' where openid = '${openid}'`;
        let onlinemac = await this.getbindmachine(openid);
        for (let ta of onlinemac) {
            let sender = ta + "/setp";
            //await this.ctx.app.mqttclient.publish(sender, content, { qos: 2 });
            //await this.ctx.app.mqttclient.publish(sender, content, { qos: 2 });
            await this.ctx.app.mqttclient.publish(sender,"[100,100,100,100,100,100,100,100]",{ qos : 2});
        }
        let result = this.app.mysql.query(updstr).affectedRows == 0 ? false : true;
        return result;
        // await this.ctx.app.mqttclient.publish("esp_24:0A:C4:9F:85:5C/setp", "hello world", { qos: 2 });
        // return true;
    }

    async getrepeatdata(openid) {
        let res = {};
        let lightdata = await this.getoriginlight(openid);
        let jsonlvs = JSON.parse(lightdata);
        let l1 = [];
        let l2 = [];
        let l3 = [];
        let l4 = [];
        let l5 = [];
        let l6 = [];
        let l7 = [];
        let l8 = [];
        for (let key in jsonlvs) {
            if (key != "tfix") {
                let tv = "";
                let tdec = 0;
                tv = jsonlvs[key].substr(0, 2);
                tdec = parseInt(tv, 16);
                l1.push(tdec);
                tv = jsonlvs[key].substr(2, 2);
                tdec = parseInt(tv, 16);
                l2.push(tdec);
                tv = jsonlvs[key].substr(4, 2);
                tdec = parseInt(tv, 16);
                l3.push(tdec);
                tv = jsonlvs[key].substr(6, 2);
                tdec = parseInt(tv, 16);
                l4.push(tdec);
                tv = jsonlvs[key].substr(8, 2);
                tdec = parseInt(tv, 16);
                l5.push(tdec);
                tv = jsonlvs[key].substr(10, 2);
                tdec = parseInt(tv, 16);
                l6.push(tdec);
                tv = jsonlvs[key].substr(12, 2);
                tdec = parseInt(tv, 16);
                l7.push(tdec);
                tv = jsonlvs[key].substr(14, 2);
                tdec = parseInt(tv, 16);
                l8.push(tdec);
            }
        }
        res.t1 = l1;
        res.t2 = l2;
        res.t3 = l3;
        res.t4 = l4;
        res.t5 = l5;
        res.t6 = l6;
        res.t7 = l7;
        res.t8 = l8;
        return res;
    }

    async getmodifystamp(openid) {
        let getsql = `SELECT
                        lid,tag,tagvalue
                    FROM
                        userlightdetails
                    WHERE
                        openid = '${openid}'
                    order by tag`;
        const getres = await this.app.mysql.query(getsql);

        let result = {};
        result.tags = [];
        result.l1 = [];
        result.l2 = [];
        result.l3 = [];
        result.l4 = [];
        result.l5 = [];
        result.l6 = [];
        result.l7 = [];
        result.l8 = [];
        for (let tags of getres) {
            switch (tags.lid) {
                case 1:
                    result.tags.push(Number(tags.tag));
                    result.l1.push(tags.tagvalue);
                    break;
                case 2:
                    result.l2.push(tags.tagvalue);
                    break;
                case 3:
                    result.l3.push(tags.tagvalue);
                    break;
                case 4:
                    result.l4.push(tags.tagvalue);
                    break;
                case 5:
                    result.l5.push(tags.tagvalue);
                    break;
                case 6:
                    result.l6.push(tags.tagvalue);
                    break;
                case 7:
                    result.l7.push(tags.tagvalue);
                    break;
                case 8:
                    result.l8.push(tags.tagvalue);
                    break;
                default:
                    break;
            }
        }
        return result;
    }


    async candelete(openid, tag) {
        return true;
    }

    async updaterepeatdata(openid) {
        let lvs = {};
        for (let i = 1; i <= 8; i++) {
            let tagssql = `select tag,tagvalue from userlightdetails where openid= '${openid}' and lid = ${i} order by tag`;
            let tagsres = await this.app.mysql.query(tagssql);
            let j = 1;
            // find bug for sometimes the result will get empty arrary. looks like the sql problem.
            while(tagsres.length == 0) {
                tagsres = await this.app.mysql.query(tagssql);
                console.log("the sql index is", i," ; try times of ",j);
                j = j + 1;
            }
            lvs["l" + i] = await generateLightData(tagsres);
        }
        let originlight = await this.getoriginlight(openid);
        let lightjson = JSON.parse(originlight);
        let index = 0;
        for (let key in lightjson) {
            if (key != "tfix") {
                let l1val = tohex(lvs.l1[index]);
                let l2val = tohex(lvs.l2[index]);
                let l3val = tohex(lvs.l3[index]);
                let l4val = tohex(lvs.l4[index]);
                let l5val = tohex(lvs.l5[index]);
                let l6val = tohex(lvs.l6[index]);
                let l7val = tohex(lvs.l7[index]);
                let l8val = tohex(lvs.l8[index]);
                lightjson[key] = l1val + l2val + l3val + l4val + l5val + l6val + l7val + l8val;
                //console.log("the update json is:",lightjson[key]);
            }
            index += 1;
        }
        
        let content = JSON.stringify(lightjson);
        //console.log("update conetnt is:",content);
        let updstr = `update userlight set t = '${content}' where openid = '${openid}'`;
        this.app.mysql.query(updstr).affectedRows == 0 ? false : true;
        let onlinemac = await this.getbindmachine(openid);
        for (let ta of onlinemac) {
            let sender = ta + "/setp";
            //await this.ctx.app.mqttclient.publish(sender, content, { qos: 2 });
            await this.ctx.app.mqttclient.publish(sender,"[{1: [10,10,10,10,10,10,10,10]},{1: [10,10,10,10,10,10,10,10]},{1: [10,10,10,10,10,10,10,10]},{1: [10,10,10,10,10,10,10,10]},{1: [10,10,10,10,10,10,10,10]},{1: [10,10,10,10,10,10,10,10]},{1: [10,10,10,10,10,10,10,10]},{1: [10,10,10,10,10,10,10,10]}]",{ qos: 2})
        }
        console.log("here we go test setp");
        return true;
    }

    async deletetag(openid, tag) {
        let sql = '';
        sql = `delete from userlightdetails where openid = '${openid}' and tag = ${tag}`;
        await this.app.mysql.query(sql);
        await this.updaterepeatdata(openid);
        return true;
    }

    async checktagvalue(openid) {
        let lvs = {};
        for (let i = 1; i <= 7; i++) {
            let tagssql = `select tag,tagvalue from userlightdetails where openid= '${openid}' and lid = ${i} order by tag`;
            let tagsres = await this.app.mysql.query(tagssql);
            lvs["l" + i] = await generateLightData(tagsres);
        }
        return true;
    }

    async test() {
        let tagsres = [
            { tag: 0, tagvalue: 51 },
            { tag: 64, tagvalue: 100 },
            { tag: 78, tagvalue: 100 },
            { tag: 80, tagvalue: 100 }
        ];

        let res = await generateLightData(tagsres);
        return res;
    }

    async emptytags(openid) {
        let emptysql = `delete from userlightdetails where openid = '${openid}'`;
        await this.app.mysql.query(emptysql);

        let originlight = await this.getoriginlight(openid);
        let lightjson = JSON.parse(originlight);
        let index = 0;
        for (let key in lightjson) {
            if (key != "tfix") {
                let l1val = "00";
                let l2val = "00";
                let l3val = "00";
                let l4val = "00";
                let l5val = "00";
                let l6val = "00";
                let l7val = "00";
                let l8val = "00";
                lightjson[key] = l1val + l2val + l3val + l4val + l5val + l6val + l7val + l8val;
            }
            index += 1;
        }
        let content = JSON.stringify(lightjson);
        let updstr = `update userlight set t = '${content}' where openid = '${openid}'`;
        this.app.mysql.query(updstr).affectedRows == 0 ? false : true;
        let onlinemac = await this.getbindmachine(openid);
        for (let ta of onlinemac) {
            let sender = ta + "/setp";
            await this.ctx.app.mqttclient.publish(sender, content, { qos: 2 });
        }
        return true;
    }
}

module.exports = PinoprSerive;

