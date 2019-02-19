const Service = require('egg').Service;

class SetupSerive extends Service { 
    async checktime() {
        const ctx = this.ctx;
        let timestamp = Date.now()/1000|0;
        await ctx.app.mqttclient.publish("esp32/checktime",timestamp.toString());
        return timestamp.toString();
    }

    async checkversion() {
        let checksql = 'select version from binversion order by version DESC limit 1';
        const result = await this.app.mysql.query(checksql);
        return result;
    }
}

module.exports = SetupSerive;