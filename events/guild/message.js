module.exports = (Discord, client, message) =>{
    const prefix = 'pb.';


    if(!message.content.startsWith(prefix) || message.author.bot) return;

    // 116901947428044809 jcraggie ID
    // 419494570213244939 NOTjcraggie ID

    // only jcraggie and NOTjcraggie can run commands - works
    // if(message.author.id !== "116901947428044809" && message.author.id !== "419494570213244939") {
    //     message.channel.send ("Sorry. You are not jcrAggie or NOTjcraggie. **This is the way.**");
    //     return;
    // };


    //only jcrAggie can run commands - works
    // if(message.author.id !== "116901947428044809") {
    //     message.channel.send ("Sorry. You are not jcrAggie. **This is the way.**");
    //     return;
    // };


    // this does not works
    var allowedRoles = [
        'admin',
        'Admin',
        'Royal Guards',
        'Recruiter'

    ]

    var hasRole = false;
    allowedRoles.forEach(findrole => {
        if(message.member.roles.cache.some(role =>role.name === findrole)) hasRole = true;
        
    })

    if(!hasRole){
        message.reply("Sorry you don't have permissions to use that command.");
        return;
    } else {
        //message.reply("You have permission to run this command. Proceed.");
        
    }




    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);

    //const phantomBotFooter = "PhantomBot made by jcrAggie for the PhantomAlliance.";

    const phantomBotHelp = new Discord.MessageEmbed()
        .setTitle("PhantomBot Help")
        //.setDescription("**COMMAND: **" + this.description)
        //.setColor(0xac30f1) // purple
        .setColor(0x580202) // maroon
        .setTimestamp()
        
        .setFooter("PhantomBot made by jcrAggie for the PhantomAlliance. \nThis is the way.   Ver 3.0.0 ",client.user.avatarURL());

    if(command) command.execute(client, message, args, Discord, phantomBotHelp);
}