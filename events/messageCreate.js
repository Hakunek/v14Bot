module.exports = {
    name: "messageCreate",
    async execute(message, client) {
        if (!["1009875024217382993", "1011292436439515156"].includes(message.channel.id)) return;
        setTimeout(async () => {
            try {
                await message.delete();
            } catch (e) {}
        }, 14500);
    },
};