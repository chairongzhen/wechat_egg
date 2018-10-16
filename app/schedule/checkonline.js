module.exports = {
    schedule: {
        interval: '30s',
        type: 'worker',
    },

    async task(ctx) {
        const res = await ctx.service.account.offline(); 
        console.log("offline mark all machines");
    }
}