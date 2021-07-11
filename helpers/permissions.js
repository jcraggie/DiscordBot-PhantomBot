//function code This determines who can run a command
// Branched 2021-07-09
// Language: javascript



const { GuildEmoji } = require('discord.js'); // I did not write this line; inserted by VS Code?


function hasPermission(client, message, Discord, rolesAllowed) {

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

    var hasPerm = false;
    var allowedRoles = rolesAllowed;
    // message.channel.send('Allowed roles: ' + allowedRoles);
    // console.log('Allowed roles: ' + allowedRoles);


    var hasRole = false;
    allowedRoles.forEach((findrole) => {
        if (message.member.roles.cache.some((role) => role.name === findrole)) hasRole = true;
    });

    if (!hasRole) {
        message.reply("Sorry you don't have permissions to use that command.");
        hasPerm = false;
        return hasPerm;
    } else {
        //message.reply("You have permission to run this command. Proceed.");
        hasPerm = true;
        return hasPerm;
    }



} // end of hasPermission()



//shows these functions to the outside world
module.exports = {
    hasPermission,


};
