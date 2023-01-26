const { Client, EmbedBuilder } = require("discord.js"),
    client = new Client({
        intents: 131071,
    });
require("dotenv").config();

//needed in read event and inviteDelete event
client.sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};
const fs = require("fs");
const events = fs.readdirSync("./events").filter((e) => e.endsWith(".js"));
for (const eventF of events) {
    const event = require("./events/" + eventF);
    client.on(event.name, (...args) => event.execute(...args, client));
}
require("./pickPresence.js")(client)

client.cachedRooms = {
    cache: [],
};

Object.defineProperty(client.cachedRooms, "add", {
    set: function (roomObj) {
        this.cache.push(roomObj);
    },
});
Object.defineProperty(client.cachedRooms, "load", {
    get: function () {
        this.cache = require("./rooms.json").cache;
    },
});
Object.defineProperty(client.cachedRooms, "save", {
    get: function () {
        fs.writeFileSync("./rooms.json", JSON.stringify({ cache: this.cache }), "utf-8");
    },
});
Object.defineProperty(client.cachedRooms, "remove", {
    set: function (roomObj) {
        this.cache = this.cache.filter((room) => !(room.roomId == roomObj.roomId && room.region.toLowerCase() == roomObj.region.toLowerCase()));
    },
});
Object.defineProperty(client.cachedRooms, "regions", {
    get: function () {
        return [...new Set(client.cachedRooms.cache.map((e) => e.region))];
    },
});
//login
client.login(process.env.token);
