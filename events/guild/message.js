module.exports = (Discord, client, message) =>{
    const prefix = '-';

    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    // only jcrAggie can run commands right now
    if(message.author.id !== "116901947428044809") {
        message.channel.send ("Sorry. You are not jcrAggie. **This is the way.**");
        return;
    };

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);

    //const phantomBotFooter = "PhantomBot made by jcrAggie for the PhantomAlliance.";

    const phantomBotHelp = new Discord.MessageEmbed()
        .setTitle("PhantomBot Help")
        //.setDescription("**COMMAND: **" + this.description)
        .setTimestamp()
        
        .setFooter("PhantomBot made by jcrAggie for the PhantomAlliance. \nThis is the way.   Ver 3.0 beta",client.user.avatarURL());

    if(command) command.execute(client, message, args, Discord, phantomBotHelp);

}