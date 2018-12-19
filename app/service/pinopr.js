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
                updatetime
            )
            VALUES
                (
                    '${openid}',
                    'fix',
                    'test',
                    '{"t000":"00000000000000","t001":"00000000000000","t002":"00000000000000","t003":"00000000000000","t004":"00000000000000","t005":"00000000000000","t010":"00000000000000","t011":"00000000000000","t012":"00000000000000","t013":"00000000000000","t014":"00000000000000","t015":"00000000000000","t020":"00000000000000","t021":"00000000000000","t022":"00000000000000","t023":"00000000000000","t024":"00000000000000","t025":"00000000000000","t030":"00000000000000","t031":"00000000000000","t032":"00000000000000","t033":"00000000000000","t034":"00000000000000","t035":"00000000000000","t040":"00000000000000","t041":"00000000000000","t042":"00000000000000","t043":"00000000000000","t044":"00000000000000","t045":"00000000000000","t050":"00000000000000","t051":"00000000000000","t052":"00000000000000","t053":"00000000000000","t054":"00000000000000","t055":"00000000000000","t060":"00000000000000","t061":"00000000000000","t062":"00000000000000","t063":"00000000000000","t064":"00000000000000","t065":"00000000000000","t070":"00000000000000","t071":"00000000000000","t072":"00000000000000","t073":"00000000000000","t074":"00000000000000","t075":"00000000000000","t080":"00000000000000","t081":"00000000000000","t082":"00000000000000","t083":"00000000000000","t084":"00000000000000","t085":"00000000000000","t090":"00000000000000","t091":"00000000000000","t092":"00000000000000","t093":"00000000000000","t094":"00000000000000","t095":"00000000000000","t100":"00000000000000","t101":"00000000000000","t102":"00000000000000","t103":"00000000000000","t104":"00000000000000","t105":"00000000000000","t110":"00000000000000","t111":"00000000000000","t112":"00000000000000","t113":"00000000000000","t114":"00000000000000","t115":"00000000000000","t120":"00000000000000","t121":"00000000000000","t122":"00000000000000","t123":"00000000000000","t124":"00000000000000","t125":"00000000000000","t130":"00000000000000","t131":"00000000000000","t132":"00000000000000","t133":"00000000000000","t134":"00000000000000","t135":"00000000000000","t140":"00000000000000","t141":"00000000000000","t142":"00000000000000","t143":"00000000000000","t144":"00000000000000","t145":"00000000000000","t150":"00000000000000","t151":"00000000000000","t152":"00000000000000","t153":"00000000000000","t154":"00000000000000","t155":"00000000000000","t160":"00000000000000","t161":"00000000000000","t162":"00000000000000","t163":"00000000000000","t164":"00000000000000","t165":"00000000000000","t170":"00000000000000","t171":"00000000000000","t172":"00000000000000","t173":"00000000000000","t174":"00000000000000","t175":"00000000000000","t180":"00000000000000","t181":"00000000000000","t182":"00000000000000","t183":"00000000000000","t184":"00000000000000","t185":"00000000000000","t190":"00000000000000","t191":"00000000000000","t192":"00000000000000","t193":"00000000000000","t194":"00000000000000","t195":"00000000000000","t200":"00000000000000","t201":"00000000000000","t202":"00000000000000","t203":"00000000000000","t204":"00000000000000","t205":"00000000000000","t210":"00000000000000","t211":"00000000000000","t212":"00000000000000","t213":"00000000000000","t214":"00000000000000","t215":"00000000000000","t220":"00000000000000","t221":"00000000000000","t222":"00000000000000","t223":"00000000000000","t224":"00000000000000","t225":"00000000000000","t230":"00000000000000","t231":"00000000000000","t232":"00000000000000","t233":"00000000000000","t234":"00000000000000","t235":"00000000000000","tfix":"00000000000000"}',
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
            await this.ctx.app.mqttclient.publish(sender, tpl_basic, { qos: 2 });
        }
        return result.affectedRows == 0 ? false : true;
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
            await this.ctx.app.mqttclient.publish(sender, content, { qos: 2 });
        }
        let result = this.app.mysql.query(updstr).affectedRows == 0 ? false : true;
        return result;
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
            }
        }
        res.t1 = l1;
        res.t2 = l2;
        res.t3 = l3;
        res.t4 = l4;
        res.t5 = l5;
        res.t6 = l6;
        res.t7 = l7;
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
        for (let i = 1; i <= 7; i++) {
            let tagssql = `select tag,tagvalue from userlightdetails where openid= '${openid}' and lid = ${i} order by tag`;
            let tagsres = await this.app.mysql.query(tagssql);
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
                lightjson[key] = l1val + l2val + l3val + l4val + l5val + l6val + l7val;
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
                lightjson[key] = l1val + l2val + l3val + l4val + l5val + l6val + l7val;
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

