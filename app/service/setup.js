const Service = require('egg').Service;

class SetupSerive extends Service { 
    async checktime() {
        const ctx = this.ctx;
        let timestamp = Date.now()/1000|0;
        await ctx.app.mqttclient.publish("esp32/checktime",timestamp.toString());
        return timestamp.toString();
    }

    // async checkversion() {
    //     let checksql = 'select version from binversion order by version DESC limit 1';
    //     const result = await this.app.mysql.query(checksql);
    //     return result;
    // }

    async checkVersion(type) {
        let checkSql = `select ${type} version from espversion where id = 1`;
        const result = await this.app.mysql.query(checkSql);
        //await this.ctx.app.mqttclient.publish("esp32/checkversion",result[0]["version"]);
        return result[0]["version"];
    }

    async checkEsp() {
        let checkSql = `select hardware version from espversion where id = 1`;
        const result = await this.app.mysql.query(checkSql);
        await this.ctx.app.mqttclient.publish("esp32/checkversion",result[0]["version"]);
        return result[0]["version"];
    }

    async espNew() {
        let version = await this.checkVersion("hardware");
        let topic = "esp32/checkversion"
        await this.ctx.app.mqttclient.publish(topic, version, { qos: 2 });
        return version;
    }
}

module.exports = SetupSerive;