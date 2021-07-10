module.exports = {
    name: "stats",
    description: "Shows stats of the user or server or both",
    async execute(client, message, args, Discord, swapi, ApiSwgohHelp) {
        const globalVar = require("../global.js");
        var fileUtils = require("../helpers/fileHelper");

        // EVERYONE HAS PERMISSION TO RUN THIS COMMAND

        //log the event to Discord (jcrAggie server) and the console
        fileUtils.logToDiscordAndConsole(client, message, args, Discord);

        function sendStatsHelp() {
            let newMemberHelpEmbed = globalVar.phantomBotHelp
                .setTitle("PhantomBot Help")
                .setDescription(
                    "**COMMAND: **" + "`" + module.exports.name + "`"
                )
                .addFields(
                    { name: "DESCRIPTION", value: module.exports.description },
                    {
                        name: "USER",
                        value: "`pb.stats user`\nShows some stats about you",
                    },
                    {
                        name: "SERVER",
                        value: "`pb.stats server`\nShows some stats about this server",
                    },
                    {
                        name: "BOTH or blank",
                        value: "`pb.stats both` or just `pb.stats`\nShows some stats about both you and this server",
                    },
                    { name: "\u200B", value: "\u200B" }
                );
            message.channel.send(newMemberHelpEmbed);
            newMemberHelpEmbed.fields = []; //clear the fields for the next use
        } // end function sendNewMemberHelp
        if (args[0] == "help") {
            sendStatsHelp();
            return;
            //log the event to Discord (jcrAggie server) and the console
            fileUtils.logToDiscordAndConsole(client, message, args, Discord);
        }

        if (args[0] == "user") {
            userStats(client, message, args, swapi, ApiSwgohHelp);
            return;
        } // if user

        if (args[0] == "server") {
            serverStats(client, message, args, swapi, ApiSwgohHelp);
            return;
        } // if server
        if (args[0] == "both" || !args[0]) {
            userStats(client, message, args, swapi, ApiSwgohHelp);
            serverStats(client, message, args, swapi, ApiSwgohHelp);
            return;
        } // end if both or blank
        else {
            message.channel.send("Invalid stats use. Please try again.");
            sendStatsHelp();
            return;
        } // end else

        function userStats(client, message, args, swapi, ApiSwgohHelp) {
            const user = message.author.id;
            const guild = message.guild;
            const guildMessageUser = message.guild.member(user);
            var joinDate = new Date(guildMessageUser.joinedAt);
            var date = joinDate.getDate();
            var month = joinDate.getMonth();
            var year = joinDate.getFullYear();
            dateString = month + 1 + "/" + date + "/" + year;
            // userEmbed.fields = [];
            const userEmbed = globalVar.phantomBotHelp
                .setTitle("USER STATS")
                .setAuthor(message.author.username, message.author.avatarURL())
                //.setColor(0xac30f1)
                .setDescription(" ")
                .addFields(
                    {
                        name: "JOINED ON: ",
                        value: "`" + dateString + ` (${checkDays(joinDate)})\``,
                    },
                    { name: "ID", value: "`" + guildMessageUser.id + "`" },
                    {
                        name: "ALL ROLES: ",
                        value: guildMessageUser.roles.cache
                            .map((r) => "`" + r.name + "`")
                            .slice(0, -1)
                            .join(" - "),
                        inline: true,
                    },

                    { name: "\u200B", value: "\u200B" }
                )
                .setThumbnail(message.author.avatarURL());
            message.channel.send({ embed: userEmbed });
            userEmbed.fields = [];
            
        } // end function userStats

        function serverStats(client, message, args, swapi, ApiSwgohHelp) {
            let msg = message;

            const srvrEmbed = globalVar.phantomBotHelp
                .setTitle("SERVER STATS")
                .setAuthor(msg.guild.name, msg.guild.iconURL())
                .addField("SERVER NAME", `\`${msg.guild.name}\``, true)
                .addField("ID", `\`${msg.guild.id}\``, true)
                .addField(
                    "OWNER",
                    `\`${msg.guild.owner.user.username}#${msg.guild.owner.user.discriminator}\``,
                    true
                )
                // .addField("Region", region[msg.guild.rtc_region], true)
                //
                .addField("TOTAL", `\`${msg.guild.members.cache.size}\``, true)
                .addField(
                    "HUMANS",
                    `\`${
                        msg.guild.members.cache.filter(
                            (member) => !member.user.bot
                        ).size
                    }\``,
                    true
                )
                .addField(
                    "BOTS",
                    `\`${
                        msg.guild.members.cache.filter(
                            (member) => member.user.bot
                        ).size
                    }\``,
                    true
                )
                // .addField("Verification Level", verifLevels[msg.guild.verificationLevel], true)
                .addField(
                    "CHANNELS",
                    `\`${msg.guild.channels.cache.size}\``,
                    true
                )
                .addField("ROLES", `\`${msg.guild.roles.cache.size}\``, true)
                .addField(
                    "CREATION DATE",
                    `\`${msg.channel.guild.createdAt
                        .toUTCString()
                        .substr(0, 16)} (${checkDays(
                        msg.channel.guild.createdAt
                    )})\``
                )
                .setThumbnail(msg.guild.iconURL());

            message.channel.send({ embed: srvrEmbed });
            srvrEmbed.fields = [];
            
        } // end function serverStats

        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " day" : " days") + " ago";
        }

        
    }, //end async execute
}; //end module.exports
