module.exports = {
    name: "manage_links",
    description: "Sends Links",
    options: [
        {
            name: "add",
            description: "Add new url",
            type: 1,
            options: [
                {
                    name: "region",
                    description: "region",
                    type: 3,
                    autocomplete: true,
                    required: true,
                },
                {
                    name: "url",
                    description: "Url to the service",
                    type: 3,
                    required: false,
                },
            ],
        },
        {
            name: "remove",
            description: "Remove url",
            type: 1,
            options: [
                {
                    name: "region",
                    description: "region",
                    type: 3,
                    autocomplete: true,
                    required: true,
                },
                {
                    name: "entry",
                    description: "Fill the region first",
                    type: 4,
                    autocomplete: true,
                    required: true,
                },
            ],
        },

        {
            name: "edit",
            description: "Edit url",
            type: 1,
            options: [
                {
                    name: "region",
                    description: "region",
                    type: 3,
                    autocomplete: true,
                    required: true,
                },
                {
                    name: "entry",
                    description: "Fill the region first, to search type id",
                    type: 4,
                    autocomplete: true,
                    required: true,
                },
                {
                    name: "new_region",
                    description: "New region",
                    type: 3,
                    autocomplete: true,
                    required: false,
                },
                {
                    name: "new_url",
                    description: "New url",
                    type: 3,
                    required: false,
                },
                {
                    name: "new_id",
                    description: "New room ID",
                    type: 4,
                    required: false,
                },
            ],
        },
        {
            name: "save",
            description: "Perform manual save",
            type: 1,
            options: [],
        },
    ],
    defaultPermission: false,
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

        let region = interaction.options._hoistedOptions.filter((e) => e.name == "region")[0]?.value;
        let url = interaction.options._hoistedOptions.filter((e) => e.name == "url")[0]?.value;
        let entry = interaction.options._hoistedOptions.filter((e) => e.name == "entry")[0]?.value;
        let new_region = interaction.options._hoistedOptions.filter((e) => e.name == "new_region")[0]?.value;
        let new_url = interaction.options._hoistedOptions.filter((e) => e.name == "new_url")[0]?.value;
        let id = interaction.options._hoistedOptions.filter((e) => e.name == "new_id")[0]?.value;
        let flag = [...new Map(client.cachedRooms.cache.map((e) => [e.region, e.flag]))]?.filter(([r, f]) => r == region)[0];
        if (flag?.length == 2) flag = flag[1];
        let cached, removal, toEdit;
        switch (interaction.options._subcommand) {
            case "add":
                cached = client.cachedRooms.cache.filter((room) => room.region.toLowerCase() == region.toLowerCase()).sort((a, b) => a.roomId - b.roomId);
                let newRoom = {
                    region: region,
                    link: url,
                    flag: flag,
                };
                let newId = 0;
                cached.some((r, i) => {
                    if (r.roomId != i + 1) {
                        newId = i + 1;
                        return true;
                    }
                });
                if (newId == 0) {
                    newId = cached[cached.length - 1].roomId + 1;
                }
                newRoom.roomId = newId;
                client.cachedRooms.add = newRoom;
                await interaction.reply({ content: `Added!`, ephemeral: true });
                break;
            case "remove":
                removal = client.cachedRooms.cache
                    .filter((room) => {
                        return room.region.toLowerCase() == region.toLowerCase();
                    })
                    .filter((room) => {
                        return room.roomId == entry;
                    })[0];
                client.cachedRooms.remove = removal;
                await interaction.reply({ content: `Removed!`, ephemeral: true });
                break;
            case "edit":
                toEdit = client.cachedRooms.cache.filter((room) => room.region.toLowerCase() == region.toLowerCase() && room.roomId == entry)[0];
                toEdit.region = new_region || toEdit.region;
                toEdit.link = new_url || toEdit.link;
                toEdit.roomId = id || toEdit.roomId;
                await interaction.reply({ content: `Edited!`, ephemeral: true });
                break;
            case "save":
                client.cachedRooms.save;
                await interaction.reply({ content: `Saved!`, ephemeral: true });
                break;
            default:
                return interaction.reply(`! An error ocurred ! \n  Please report this to bot's dev.`);
        }
    },
    async autocomplete(interaction, client) {
        let input = interaction.options._hoistedOptions.filter((e) => e.focused)[0];
        let region = interaction.options._hoistedOptions.filter((e) => e.name == "region")[0]?.value;
        let result = [];
        switch (input.name) {
            case "new_region":
            case "region":
                result = await client.cachedRooms.regions
                    .filter((e) => e.toLowerCase().startsWith(input.value.toLowerCase()))
                    .map((e) => ({ name: e, value: e }));
                break;
            case "entry":
                if (!region) return interaction.respond([{ name: "Select region first!", value: 0 }]);
                else {
                    result = client.cachedRooms.cache
                        .filter((room) => room.region.toLowerCase() == region.toLowerCase() && (input.value ? `${room.roomId}`.startsWith(input.value) : true))
                        .map((e) => ({ name: `${e.roomId}. ${e.link}`, value: e.roomId }));
                }
                break;
        }
        if (result.length > 25) result = result.slice(0, 25);
        interaction.respond(result.length > 0 ? result : [{ name: "No valid autocompletion found", value: input.name == "entry" ? 0 : "0" }]);
    },
};
