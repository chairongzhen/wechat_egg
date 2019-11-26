module.exports = {
    schedule: {
        interval: '1d',
        type: 'worker',
        disable: false
    },

    async task(ctx) {
        const res = await ctx.service.setup.checkEsp(); 
        console.log(res);
    }
}