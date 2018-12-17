module.exports = {
    schedule: {
        interval: '60m',
        type: 'worker',
        disable: false
    },

    async task(ctx) {
        const res = await ctx.service.setup.checktime(); 
        console.log(res);
    }
}