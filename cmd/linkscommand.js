module.exports = {
    name: "links",
    description: "Sends Links",
    options: [],
    defaultPermission: true,
    async execute(interaction, client) {
        let regions = [...new Map(client.cachedRooms.cache.map((e) => [e.region, e.flag]))];
        let buttons = regions.map(([label, flag]) => ({
            type: 2,
            style: 1,
            label: label,
            emoji: { name: flag },
            custom_id: label.toLowerCase().replace(/\s/gi, "_"),
        }));
        const embed = {
            color: 0x049074,
            title: "Global Hosting Services",
            url: "https://discord.gg/ksZY2E6Wpz",
            description: `\n\nRashy and Anon are Proud Founders of Global Hosting Services. Our services supply every Haxball participant a room to play in, from scrimmages and pubs to official competitions. Our objective is to help leagues and international tournaments find hosts to play their official matches. We are here to help you.\n\nTo find out more information on our services, a discord link to our official discord server is above this message. Click on the "Global Hosting Services" title, and you will be directed to an invite link.`,
            thumbnail: {
                url: "https://cdn.discordapp.com/attachments/933693278379978762/1007613680566927480/78E6812D-47E5-4FDA-BEC8-68527FE1FA3A.jpg",
            },
            footer: { text: "Bot created by rashy" },
        };

        let rows = [];
        let last = -1;
        for (let i = 0; i < buttons.length; i++) {
            let insrt = i > 0 ? Math.ceil((i + 1) / 5) - 1 : 0;
            if (insrt == last) rows[insrt].components.push(buttons[i]);
            else {
                last++;
                rows[insrt] = {
                    type: 1,
                    components: [buttons[i]],
                };
            }
        }
        await interaction.reply({
            embeds: [embed],
            components: rows,
        });
    },
};
