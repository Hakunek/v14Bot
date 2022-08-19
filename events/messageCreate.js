module.exports = {
    name: "messageCreate",
    async execute(message, client) {
        if (message.author.bot && !["1009875024217382993"].includes(message.channel.id)) return;
        setTimeout(async () => {
            try {
                await message.delete();
            } catch (e) {}
        }, 14500);
    },
};