module.exports = (Discord, client, message) => {
    const globalVar = require('../../global.js');
    const prefix = globalVar.botPrefix;

    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;

    // 116901947428044809 jcraggie ID
    // 419494570213244939 jcrAggieJedi ID

    // only jcraggie and jcrAggieJedi can run commands - works
    // if(message.author.id !== "116901947428044809" && message.author.id !== "419494570213244939") {
    //     message.channel.send ("Sorry. You are not jcrAggie or jcrAggieJedi. **This is the way.**");
    //     return;
    // };

    //only jcrAggie can run commands - works
    // if(message.author.id !== "116901947428044809") {
    //     message.channel.send ("Sorry. You are not jcrAggie. **This is the way.**");
    //     return;
    // };

    // REMOVING BELOW TO ALLOW FOR INDIVIDUAL COMMAND PERMISSIONS
    // var allowedRoles = ["admin", "Admin", "Royal Guards", "Recruiter", "Officer-Rebellion"];

    // var hasRole = false;
    // allowedRoles.forEach((findrole) => {
    //     if (message.member.roles.cache.some((role) => role.name === findrole)) hasRole = true;
    // });

    // if (!hasRole) {
    //     message.reply("Sorry you don't have permissions to use that command.");
    //     return;
    // } else {
    //     //message.reply("You have permission to run this command. Proceed.");
    // }

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);

    //const phantomBotFooter = "PhantomBot made by jcrAggie for the PhantomAlliance.";

    // const phantomBotHelp = new Discord.MessageEmbed()
    //     .setTitle("PhantomBot Help")
    //     //.setDescription("**COMMAND: **" + this.description)
    //     //.setColor(0xac30f1) // purple
    //     .setColor(0x580202) // maroon
    //     .setTimestamp()

    //     .setFooter("PhantomBot made by jcrAggie for the PhantomAlliance. \nThis is the way.   Ver 3.0.0 ", client.user.avatarURL());

    if (command) command.execute(client, message, args, Discord);
    else {
        console.log("what is that command?");
        message.channel.send("I don't know that command.\n**This is not the way.**");

        //log to discord
        let msg = "ERROR! \n`" + message.author.username + "` in #`" + message.channel.name + "` sent: `" + message.content + "`";
        client.channels.cache.get("605087450573963362").send(msg);

        //log the event to the console
        console.log(`COMMAND ERROR: ${message.author.tag} in #${message.channel.name} sent: ${message.content}`);
    }
};
