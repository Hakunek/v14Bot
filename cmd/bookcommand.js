const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "book",
    description: "Make your room reservation here:",
    options: [
        {
            name: "leaguename",
            description: "Input League/Tournament Name Here:",
            type: 3,
            required: true,
        },
        {
            name: "locations",
            description: "Input Location Needed Here:",
            type: 3,
            required: true,
        },
        {
            name: "roomnum",
            description: "Input Room Number Here:",
            type: 3,
            required: true,
        },
        {
            name: "linking",
            description: "Input Room Link Here:",
            type: 3,
            required: true,
        },
        {
            name: "time",
            description: "Input Time Frame Here:",
            type: 3,
            required: true,
        },
    ],
    async execute(interaction, client) {
        const allowedChannelIds = [
            "1006252612502425700",

            "975798151267110914",
            "935973453029322881",
            "935973374147047434",
            "935973466040057946",
            "935973662807457822",
            "935973710903529522",
            "977628655062773792",
            "978403693043007538",
            "978820547452473424",
            "978824065550790666",
            "978847476507361300",
        ];

        if (!allowedChannelIds.includes(interaction.channelId)) return interaction.reply("You cannot use that command in this channel");

        // Put the rest of the command code here

        const LeagueName = interaction.options.getString("leaguename");
        const Locations = interaction.options.getString("locations");
        const RoomNum = interaction.options.getString("roomnum");
        const Linking = interaction.options.getString("linking");
        const Time = interaction.options.getString("time");

        const roomObject = {
            leaguename: LeagueName,
            locations: Locations,
            roomnum: RoomNum,
            linking: Linking,
            time: Time,
        };
        const bookEmbed = new EmbedBuilder()
            .setColor("#049074")
            .setTitle("Global Hosting Services")
            .setURL("https://discord.gg/ksZY2E6Wpz")
            .setDescription(`\n\nTo book a room please use the following command. /book in any of the 5 booking channels.\n\n`)
            .addFields(
                { name: "League or Tournament Name", value: `${LeagueName}` },
                { name: "Location", value: `${Locations}` },
                { name: "Room Number", value: `${RoomNum}` },
                { name: "Room Link", value: `${Linking}` },
                { name: "Time Frame", value: `${Time}` }
            )
            .setThumbnail("https://cdn.discordapp.com/attachments/933693278379978762/1007613680566927480/78E6812D-47E5-4FDA-BEC8-68527FE1FA3A.jpg")
            .setFooter({ text: "Bot created by rashy" });
        interaction.reply({ embeds: [bookEmbed] });
    },
};
