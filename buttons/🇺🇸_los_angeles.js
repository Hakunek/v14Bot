const name = __filename.slice(__dirname.length + 6, -3);
const flag = __filename.slice(__dirname.length + 1, -(name.length + 4));
module.exports = {
    name: name,
    async execute(interaction, client) {
        const rooms = client.cachedRooms.cache.sort((a, b) => a.roomId - b.roomId).filter((room) => room.region.toLowerCase() == "los angeles");
        const roomLinks = rooms.map((room) => `${flag} ${room.roomId}. ${room.link}`).join("\n");
        const embed = {
            color: 0x049074,
            title: "Global Hosting Services",
            url: "https://discord.gg/ksZY2E6Wpz",
            description: `List of rooms for selected location`,
            fields: [{ name: "\u200b", value: `${flag} **__Los Angeles Rooms__** ${flag}\n\n${roomLinks}` }],
            thumbnail: {
                url: "https://cdn.discordapp.com/attachments/933693278379978762/1007613680566927480/78E6812D-47E5-4FDA-BEC8-68527FE1FA3A.jpg",
            },
            footer: { text: "Bot created by rashy" },
        };

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
