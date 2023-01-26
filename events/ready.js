module.exports = {
    name: "ready",
    async execute(client) {
        //waiting 500ms as discord.js takes a little loner to load up than when the ready event is triggered
        await client.sleep(500);
        await client.cachedRooms.load;
        setInterval(() => client.cachedRooms.save, 60 * 1000);
        client.cmds = new Map();
        client.buttons = new Map();

        let cmdFs = require("fs")
            .readdirSync(__dirname + "/../cmd")
            .filter((e) => e.endsWith(".js"));
        let cmds = [];
        for (const cmdF of cmdFs) {
            const cmd = require(__dirname + "/../cmd/" + cmdF);
            cmds.push(cmd);
            client.cmds.set(cmd.name, cmd);
            if (cmds.length == cmdFs.length) client.application.commands.set(cmds);
        }

        let buttonFs = require("fs")
            .readdirSync(__dirname + "/../buttons")
            .filter((e) => e.endsWith(".js"));
        for (const buttonF of buttonFs) {
            const button = require(__dirname + "/../buttons/" + buttonF);
            client.buttons.set(button.name, button);
        }
        setInterval(client.pickPresence, 10 * 1000)
        console.log(`${client.user.tag} has logged into Discord!`);
    },
};
