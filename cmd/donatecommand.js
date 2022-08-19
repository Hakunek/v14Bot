const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "donate",
    description: "Replies with all GHS donation links.",
    async execute(interaction, client) {
        const newDonate = new EmbedBuilder()
            .setColor("049074")
            .setTitle("Global Hosting Services")
            .setURL("https://discord.gg/ksZY2E6Wpz")
            .setDescription(
                'Rashy and Anon are Proud Founders of Global Hosting Services. Our services supply every Haxball participant a room to play in, from scrimmages and pubs to official competitions. Our objective is to help leagues and international tournaments find hosts to play their official matches. We are looking for people who want to donate to our services. \n\nTo find out more information on our services, a discord link to our official discord server is above this message. Click on the "Global Hosting Services" title, and you will be directed to an invite link.\n\n'
            )
            .setThumbnail("https://cdn.discordapp.com/attachments/933693278379978762/1007613680566927480/78E6812D-47E5-4FDA-BEC8-68527FE1FA3A.jpg")
            .addFields({
                name: "Donator Bot",
                value: "To donate via the donate bot you can join the GHS discord and go to the #donator channel and type donate. You will be sent a link to click, just follow the instructions the website gives you. This websites only payment method is Paypal.",
            })
            .addFields({
                name: "Ko-Fi",
                value: "Ko-Fi is a one time donation service that accepts credit/debit cards and PayPal. This service does not take any fees to donate, whatever money you donate is the exact amount we receive. \n• https://ko-fi.com/ghshaxball",
            })
            .addFields({
                name: "Patreon",
                value: "Patreon is a subscription service that accepts many different payment methods such as paypal, venmo, credit/debit cards, etc. \n• https://www.patreon.com/user?u=49686315&fan_landing=true",
            })
            .setFooter({ text: "Bot created by rashy" });
        interaction.reply({ embeds: [newDonate] });
    },
};
