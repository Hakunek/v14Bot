module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        if (interaction.type == 2) {
            if (!client.cmds.has(interaction.commandName)) return;
            const command = client.cmds.get(interaction.commandName);
            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error("[ Command Error ]=> ".red, error);
                let pick = 0;
                let action = ["reply", "editReply"];
                if (interaction.replied) pick = 1;
                return interaction[action[pick]]({
                    content: "There was an error while executing this command!",
                    ephemeral: true,
                });
            }
        } else if (interaction.type == 3) {
            if (!client.buttons.has(interaction.customId)) return;
            const button = client.buttons.get(interaction.customId);
            try {
                await button.execute(interaction, client);
            } catch (error) {
                console.error("[ Command Error ]=> ".red, error);
                let pick = 0;
                let action = ["reply", "editReply"];
                if (interaction.replied) pick = 1;
                return interaction[action[pick]]({
                    content: "There was an error while executing this command!",
                    ephemeral: true,
                });
            }
        } else if (interaction.type == 4) {
            if (!client.cmds.has(interaction.commandName)) return;
            const command = client.cmds.get(interaction.commandName);
            try {
                await command.autocomplete(interaction, client);
            } catch (error) {
                console.error("[ Command Error ]=> ".red, error);
                let pick = 0;
                let action = ["respond"];
                return interaction[action[pick]]([
                    {
                        name: "There was an error while executing this autocomplete!",
                        value: "0",
                    },
                ]);
            }
        }
    },
};
