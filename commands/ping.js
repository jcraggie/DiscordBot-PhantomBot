module.exports = {
    name: 'ping',
    description: "this is a ping command",
    async execute(client, message, args, Discord,swapi, ApiSwgohHelp){
        message.channel.send('pong. New PhantomBot is alive!');
        console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);
        // let payload = {
        //     allycode: '135718294',
        //     language: 'eng_us'
        // }
        // let {result, error, warning} = await swapi.fetchPlayer(payload);
        // console.log(result[0]);

    }

}